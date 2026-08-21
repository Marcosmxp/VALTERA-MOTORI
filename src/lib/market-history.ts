import marketHistory from "@/data/market-history.json";

export type PricePoint = {
  date: string;
  price: number;
};

type MarketHistoryData = {
  version: number;
  updatedAt: string;
  series: Record<string, PricePoint[]>;
};

const history = marketHistory as MarketHistoryData;

export function getPriceHistory(listingId: string, fallbackPrice: number, fallbackDate: string): PricePoint[] {
  const points = history.series[listingId];
  if (points?.length) return [...points].sort((a, b) => a.date.localeCompare(b.date));
  return [{ date: fallbackDate, price: fallbackPrice }];
}

export function getHistoryUpdatedAt() {
  return history.updatedAt;
}
