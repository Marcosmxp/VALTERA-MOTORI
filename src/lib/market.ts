import type { MarketListing, MarketVehicle } from "@/data/market";

export function formatEuro(value: number, decimals = 0) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function calculateSavings(referencePrice: number, candidatePrice: number) {
  const amount = Math.max(referencePrice - candidatePrice, 0);
  const percentage = referencePrice > 0 ? (amount / referencePrice) * 100 : 0;
  return { amount, percentage };
}

function normalized(value: string) {
  return value.toLocaleLowerCase("it-IT").replace(/[^a-z0-9]+/g, " ").trim();
}

export function similarityScore(target: MarketVehicle, candidate: MarketVehicle) {
  let score = 0;

  if (normalized(target.brand) === normalized(candidate.brand) && normalized(target.model) === normalized(candidate.model)) score += 35;

  const targetTrim = normalized(target.trim);
  const candidateTrim = normalized(candidate.trim);
  if (targetTrim === candidateTrim) score += 20;
  else if (targetTrim.includes(candidateTrim) || candidateTrim.includes(targetTrim)) score += 13;

  const yearDelta = Math.abs(target.year - candidate.year);
  score += yearDelta === 0 ? 15 : yearDelta === 1 ? 10 : yearDelta === 2 ? 5 : 0;

  const mileageDelta = Math.abs(target.mileageKm - candidate.mileageKm);
  const mileageBase = Math.max(target.mileageKm, candidate.mileageKm, 1);
  const mileageSimilarity = Math.max(0, 1 - mileageDelta / mileageBase);
  score += Math.round(mileageSimilarity * 15);

  const powerDelta = Math.abs(target.powerHp - candidate.powerHp);
  const powerSimilarity = Math.max(0, 1 - powerDelta / Math.max(target.powerHp, candidate.powerHp, 1));
  score += Math.round(powerSimilarity * 10);

  if (normalized(target.fuel) === normalized(candidate.fuel)) score += 3;
  if (normalized(target.transmission) === normalized(candidate.transmission)) score += 2;

  return Math.min(100, score);
}

export function bestRealDealer(listings: MarketListing[]) {
  return listings
    .filter((listing) => listing.sellerType === "dealer")
    .sort((a, b) => a.price - b.price)[0];
}
