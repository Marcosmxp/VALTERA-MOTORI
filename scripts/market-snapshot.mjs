import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const historyPath = path.join(process.cwd(), "src/data/market-history.json");
const sources = [
  { id: "autovergiate-296-2025", url: "https://www.autoscout24.it/annunci/ferrari-296-gtb-blu-pozzi-iva-esp-full-carbon-spec-elettrica-benzina-blu-azzurro-cat_ma27mo76862-e9979ae0-fd06-476d-9cea-85d38a222483" },
  { id: "rossocorsa-296-2024", url: "https://www.rossocorsa.it/vetrina/1923-ferrari-296-milanomissaglia" },
  { id: "supercar-sm-911-carrera-2025", url: "https://www.supercar.sm/l/porsche/" },
  { id: "autotorino-911-carrera-2025", url: "https://www.autotorino.it/veicoli/auto/porsche/911-carrera-coupe/usato/veicolo-911-coupe-3-0-carrera-394cv-auto-u1233307" },
];

function normalizePrice(value) {
  if (typeof value === "number") return Math.round(value);
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\u00a0/g, " ").replace(/[^0-9,\.]/g, "");
  if (!normalized) return null;
  const integerLike = normalized.replace(/[.,](?=\d{3}(?:\D|$))/g, "").replace(/,\d{2}$/, "").replace(/\.\d{2}$/, "");
  const parsed = Number(integerLike.replace(/,/g, "."));
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

function walk(value, prices) {
  if (!value) return;
  if (Array.isArray(value)) return value.forEach((item) => walk(item, prices));
  if (typeof value !== "object") return;
  for (const [key, item] of Object.entries(value)) {
    if (["price", "lowPrice", "highPrice"].includes(key)) {
      const price = normalizePrice(item);
      if (price && price > 10000) prices.push(price);
    }
    walk(item, prices);
  }
}

function extractPrices(html) {
  const prices = [];
  const jsonLd = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(jsonLd)) {
    try { walk(JSON.parse(match[1]), prices); } catch { /* malformed third-party JSON-LD */ }
  }

  const moneyPatterns = [
    /(?:€|EUR)\s*([0-9]{2,3}(?:[.\s][0-9]{3})+)(?:,[0-9]{2})?/gi,
    /([0-9]{2,3}(?:[.\s][0-9]{3})+)(?:,[0-9]{2})?\s*(?:€|EUR)/gi,
  ];
  for (const pattern of moneyPatterns) {
    for (const match of html.matchAll(pattern)) {
      const price = normalizePrice(match[1]);
      if (price && price > 10000) prices.push(price);
    }
  }
  return [...new Set(prices)];
}

function choosePlausiblePrice(candidates, previous) {
  const plausible = candidates
    .map((price) => ({ price, delta: Math.abs(price - previous) / previous }))
    .filter((item) => item.delta <= .12)
    .sort((a, b) => a.delta - b.delta);
  return plausible[0]?.price ?? null;
}

function daysBetween(a, b) {
  return Math.floor((Date.parse(b) - Date.parse(a)) / 86400000);
}

const history = JSON.parse(await readFile(historyPath, "utf8"));
const today = new Date().toISOString().slice(0, 10);
let changed = false;

for (const source of sources) {
  const points = history.series[source.id];
  if (!Array.isArray(points) || !points.length) {
    console.warn(`[skip] ${source.id}: missing baseline`);
    continue;
  }

  const previous = points[points.length - 1];
  try {
    const response = await fetch(source.url, {
      headers: { "user-agent": "ValteraMarketMonitor/0.4 (+public price verification)" },
      signal: AbortSignal.timeout(15000),
      redirect: "follow",
    });
    if (!response.ok) {
      console.warn(`[skip] ${source.id}: HTTP ${response.status}`);
      continue;
    }

    const html = await response.text();
    const nextPrice = choosePlausiblePrice(extractPrices(html), previous.price);
    if (!nextPrice) {
      console.warn(`[skip] ${source.id}: no confident price candidate`);
      continue;
    }

    const dueHeartbeat = daysBetween(previous.date, today) >= 7;
    if (nextPrice !== previous.price || dueHeartbeat) {
      points.push({ date: today, price: nextPrice });
      changed = true;
      console.log(`[snapshot] ${source.id}: ${previous.price} -> ${nextPrice}`);
    } else {
      console.log(`[same] ${source.id}: ${nextPrice}`);
    }
  } catch (error) {
    console.warn(`[skip] ${source.id}: ${error instanceof Error ? error.message : "fetch failed"}`);
  }
}

if (changed) {
  history.updatedAt = new Date().toISOString();
  await writeFile(historyPath, `${JSON.stringify(history, null, 2)}\n`, "utf8");
  console.log("Market history updated.");
} else {
  console.log("No market history changes.");
}
