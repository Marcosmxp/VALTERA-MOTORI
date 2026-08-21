import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const historyPath = path.join(root, "src/data/market-history.json");
const registryPath = path.join(root, "src/data/market-sources-v06.json");

function normalizePrice(value) {
  if (typeof value === "number") return Math.round(value);
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\u00a0/g, " ").replace(/[^0-9,\.]/g, "");
  if (!normalized) return null;
  const integerLike = normalized.replace(/[.,](?=\d{3}(?:\D|$))/g, "").replace(/,\d{2}$/, "").replace(/\.\d{2}$/, "");
  const parsed = Number(integerLike.replace(/,/g, "."));
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

function walk(value, prices, minPrice) {
  if (!value) return;
  if (Array.isArray(value)) return value.forEach((item) => walk(item, prices, minPrice));
  if (typeof value !== "object") return;
  for (const [key, item] of Object.entries(value)) {
    if (["price", "lowPrice", "highPrice"].includes(key)) {
      const price = normalizePrice(item);
      if (price && price >= minPrice) prices.push(price);
    }
    walk(item, prices, minPrice);
  }
}

function extractPrices(html, minPrice) {
  const prices = [];
  const jsonLd = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(jsonLd)) {
    try { walk(JSON.parse(match[1]), prices, minPrice); } catch { /* malformed third-party JSON-LD */ }
  }

  const moneyPatterns = [
    /(?:€|EUR)\s*([0-9]{1,3}(?:[.\s][0-9]{3})+)(?:,[0-9]{2})?/gi,
    /([0-9]{1,3}(?:[.\s][0-9]{3})+)(?:,[0-9]{2})?\s*(?:€|EUR)/gi,
  ];
  for (const pattern of moneyPatterns) {
    for (const match of html.matchAll(pattern)) {
      const price = normalizePrice(match[1]);
      if (price && price >= minPrice) prices.push(price);
    }
  }
  return [...new Set(prices)];
}

function choosePlausiblePrice(candidates, previous, maxDelta) {
  return candidates
    .map((price) => ({ price, delta: Math.abs(price - previous) / previous }))
    .filter((item) => item.delta <= maxDelta)
    .sort((a, b) => a.delta - b.delta)[0]?.price ?? null;
}

function daysBetween(a, b) {
  return Math.floor((Date.parse(b) - Date.parse(a)) / 86400000);
}

function hasExpectedTokens(html, tokens = []) {
  const normalized = html.toLocaleLowerCase("it");
  return tokens.every((token) => normalized.includes(String(token).toLocaleLowerCase("it")));
}

function recordPoint(points, date, price) {
  const existing = points.find((point) => point.date === date);
  if (existing) {
    if (existing.price === price) return false;
    existing.price = price;
    return true;
  }
  points.push({ date, price });
  points.sort((a, b) => a.date.localeCompare(b.date));
  return true;
}

const registry = JSON.parse(await readFile(registryPath, "utf8"));
const history = JSON.parse(await readFile(historyPath, "utf8"));
history.version = Math.max(Number(history.version) || 1, 2);
history.series ??= {};

const today = new Date().toISOString().slice(0, 10);
let changed = false;
let fetched = 0;
let accepted = 0;
let skipped = 0;

for (const source of registry.sources) {
  const minPrice = source.minPrice ?? 9000;
  const maxDelta = source.maxDelta ?? (source.kind === "promo" ? 0.22 : 0.15);
  const points = history.series[source.id] ?? (history.series[source.id] = []);

  if (!points.length) {
    points.push({ date: registry.verifiedAt ?? today, price: source.baselinePrice });
    changed = true;
    console.log(`[baseline] ${source.id}: ${source.baselinePrice}`);
  }

  const previous = points[points.length - 1];
  try {
    const response = await fetch(source.url, {
      headers: {
        "user-agent": "ValteraMarketMonitor/0.6 (+public price verification; portfolio research)",
        "accept-language": "it-IT,it;q=0.9,en;q=0.6",
      },
      signal: AbortSignal.timeout(18000),
      redirect: "follow",
    });
    fetched += 1;
    if (!response.ok) {
      skipped += 1;
      console.warn(`[skip] ${source.id}: HTTP ${response.status}`);
      continue;
    }

    const html = await response.text();
    if (!hasExpectedTokens(html, source.contains)) {
      skipped += 1;
      console.warn(`[skip] ${source.id}: expected model tokens not found`);
      continue;
    }

    const candidates = extractPrices(html, minPrice);
    const nextPrice = choosePlausiblePrice(candidates, previous.price, maxDelta);
    if (!nextPrice) {
      skipped += 1;
      console.warn(`[skip] ${source.id}: no confident candidate near ${previous.price}`);
      continue;
    }

    const dueHeartbeat = daysBetween(previous.date, today) >= 7;
    if (nextPrice !== previous.price || dueHeartbeat) {
      if (recordPoint(points, today, nextPrice)) changed = true;
      accepted += 1;
      console.log(`[snapshot] ${source.id}: ${previous.price} -> ${nextPrice}`);
    } else {
      console.log(`[same] ${source.id}: ${nextPrice}`);
    }
  } catch (error) {
    skipped += 1;
    console.warn(`[skip] ${source.id}: ${error instanceof Error ? error.message : "fetch failed"}`);
  }
}

if (changed) {
  history.updatedAt = new Date().toISOString();
  await writeFile(historyPath, `${JSON.stringify(history, null, 2)}\n`, "utf8");
}

console.log(`[summary] registered=${registry.sources.length} fetched=${fetched} accepted=${accepted} skipped=${skipped} changed=${changed}`);
