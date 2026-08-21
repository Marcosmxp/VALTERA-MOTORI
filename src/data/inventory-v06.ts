import type { Vehicle } from "@/data/vehicles";
import { vehicles as legacyVehicles } from "@/data/vehicles";

export type InventoryPriceKind = "listino" | "promo" | "market";

export type InventoryVehicle = Vehicle & {
  family: string;
  priceValue: number;
  priceKind: InventoryPriceKind;
  priceSourceUrl?: string;
  priceVerifiedAt: string;
  colorAssetMode: "editorial" | "ai-ready";
};

function parsePrice(value: string) {
  const match = value.replace(/\u00a0/g, " ").match(/([0-9]{1,3}(?:[.\s][0-9]{3})+)/);
  if (!match) return 0;
  return Number(match[1].replace(/[.\s]/g, ""));
}

const legacyOverrides: Record<string, Partial<InventoryVehicle>> = {
  "volkswagen-golf-gti": {
    family: "Golf",
    price: "€ 46.350",
    monthly: "listino ufficiale MY26 · validità 15/05/2026",
    priceValue: 46350,
    priceKind: "listino",
    priceSourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf-Allestimenti-Sportivi.pdf",
    priceVerifiedAt: "2026-08-21",
  },
};

const legacyInventory: InventoryVehicle[] = legacyVehicles.map((vehicle) => ({
  ...vehicle,
  family: vehicle.model,
  priceValue: parsePrice(vehicle.price),
  priceKind: vehicle.monthly.toLowerCase().includes("listino") ? "listino" : "market",
  priceVerifiedAt: "2026-08-21",
  colorAssetMode: "ai-ready",
  ...legacyOverrides[vehicle.slug],
}));

type InventoryCore = Omit<InventoryVehicle, "image" | "imageAlt" | "imagePage" | "credit" | "colors">;

function withVisual(baseSlug: string, core: InventoryCore): InventoryVehicle {
  const base = legacyVehicles.find((vehicle) => vehicle.slug === baseSlug);
  if (!base) throw new Error(`Missing base visual: ${baseSlug}`);
  return {
    ...core,
    colors: base.colors,
    image: base.image,
    imageAlt: `Visual editoriale per ${core.brand} ${core.model}`,
    imagePage: base.imagePage,
    credit: `${base.credit} · base visual per varianti colore AI`,
  };
}

const VERIFIED_AT = "2026-08-21";

export const additionalInventoryVehicles: InventoryVehicle[] = [
  withVisual("porsche-taycan-4", {
    slug: "porsche-macan-electric", marketplaceSlug: "porsche-macan-electric", brand: "Porsche", model: "Macan", family: "Macan", category: "Auto", segment: "Electric SUV", label: "Electric SUV",
    price: "€ 85.899", monthly: "listino ufficiale Porsche MY27", power: "360 CV", performance: "5,7 s", drivetrain: "RWD", status: "Inventory Intelligence V0.6",
    year: 2027, mileageKm: 0, powerHp: 360, fuel: "Elettrica", transmission: "Automatico", priceValue: 85899, priceKind: "listino",
    priceSourceUrl: "https://www.porsche.com/italy/models/macan/", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("porsche-taycan-4", {
    slug: "porsche-macan-4", marketplaceSlug: "porsche-macan-4", brand: "Porsche", model: "Macan 4", family: "Macan", category: "Auto", segment: "Electric SUV", label: "Electric SUV",
    price: "€ 89.590", monthly: "listino ufficiale Porsche MY27", power: "408 CV", performance: "5,2 s", drivetrain: "AWD", status: "Inventory Intelligence V0.6",
    year: 2027, mileageKm: 0, powerHp: 408, fuel: "Elettrica", transmission: "Automatico", priceValue: 89590, priceKind: "listino",
    priceSourceUrl: "https://www.porsche.com/italy/models/macan/macan-electric-models/macan-4-electric/", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("porsche-taycan-4", {
    slug: "porsche-macan-4s", marketplaceSlug: "porsche-macan-4s", brand: "Porsche", model: "Macan 4S", family: "Macan", category: "Auto", segment: "Electric SUV", label: "Electric SUV",
    price: "€ 96.312", monthly: "listino ufficiale Porsche MY27", power: "516 CV", performance: "4,1 s", drivetrain: "AWD", status: "Inventory Intelligence V0.6",
    year: 2027, mileageKm: 0, powerHp: 516, fuel: "Elettrica", transmission: "Automatico", priceValue: 96312, priceKind: "listino",
    priceSourceUrl: "https://www.porsche.com/italy/models/macan/macan-electric-models/macan-4s-electric/", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("porsche-taycan-4", {
    slug: "porsche-macan-gts", marketplaceSlug: "porsche-macan-gts", brand: "Porsche", model: "Macan GTS", family: "Macan", category: "Auto", segment: "Electric SUV", label: "Electric SUV",
    price: "€ 111.568", monthly: "listino ufficiale Porsche MY27", power: "571 CV", performance: "3,8 s", drivetrain: "AWD", status: "Inventory Intelligence V0.6",
    year: 2027, mileageKm: 0, powerHp: 571, fuel: "Elettrica", transmission: "Automatico", priceValue: 111568, priceKind: "listino",
    priceSourceUrl: "https://www.porsche.com/italy/models/macan/macan-electric-models/macan-gts-electric/", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("porsche-taycan-4", {
    slug: "porsche-macan-turbo", marketplaceSlug: "porsche-macan-turbo", brand: "Porsche", model: "Macan Turbo", family: "Macan", category: "Auto", segment: "Electric SUV", label: "Electric SUV",
    price: "€ 124.462", monthly: "listino ufficiale Porsche MY27", power: "639 CV", performance: "3,3 s", drivetrain: "AWD", status: "Inventory Intelligence V0.6",
    year: 2027, mileageKm: 0, powerHp: 639, fuel: "Elettrica", transmission: "Automatico", priceValue: 124462, priceKind: "listino",
    priceSourceUrl: "https://www.porsche.com/italy/models/macan/macan-electric-models/macan-turbo-electric/", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),

  withVisual("volkswagen-golf-gti", {
    slug: "volkswagen-golf-life-115", marketplaceSlug: "volkswagen-golf-life-115", brand: "Volkswagen", model: "Golf 1.5 TSI Life 115", family: "Golf", category: "Auto", segment: "Hatchback", label: "Hatchback",
    price: "€ 31.350", monthly: "listino ufficiale MY26", power: "115 CV", performance: "1.5 TSI", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 115, fuel: "Benzina", transmission: "Manuale", priceValue: 31350, priceKind: "listino",
    priceSourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf.pdf", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("volkswagen-golf-gti", {
    slug: "volkswagen-golf-style-150", marketplaceSlug: "volkswagen-golf-style-150", brand: "Volkswagen", model: "Golf 1.5 TSI Style 150", family: "Golf", category: "Auto", segment: "Hatchback", label: "Hatchback",
    price: "€ 35.500", monthly: "listino ufficiale MY26", power: "150 CV", performance: "1.5 TSI", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 150, fuel: "Benzina", transmission: "Manuale", priceValue: 35500, priceKind: "listino",
    priceSourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf.pdf", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("volkswagen-golf-gti", {
    slug: "volkswagen-golf-etsi-rline-150", marketplaceSlug: "volkswagen-golf-etsi-rline-150", brand: "Volkswagen", model: "Golf eTSI R-Line 150", family: "Golf", category: "Auto", segment: "Mild hybrid", label: "Mild hybrid",
    price: "€ 38.350", monthly: "listino ufficiale MY26", power: "150 CV", performance: "1.5 eTSI", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 150, fuel: "Mild Hybrid / Benzina", transmission: "DSG", priceValue: 38350, priceKind: "listino",
    priceSourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf.pdf", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("volkswagen-golf-gti", {
    slug: "volkswagen-golf-ehybrid-life", marketplaceSlug: "volkswagen-golf-ehybrid-life", brand: "Volkswagen", model: "Golf eHybrid Life 204", family: "Golf", category: "Auto", segment: "Plug-in hybrid", label: "Plug-in hybrid",
    price: "€ 43.250", monthly: "listino ufficiale MY26", power: "204 CV", performance: "1.5 eHybrid", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 204, fuel: "Plug-in Hybrid / Benzina", transmission: "DSG", priceValue: 43250, priceKind: "listino",
    priceSourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf.pdf", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("volkswagen-golf-gti", {
    slug: "volkswagen-golf-gte", marketplaceSlug: "volkswagen-golf-gte", brand: "Volkswagen", model: "Golf GTE", family: "Golf", category: "Auto", segment: "Performance hybrid", label: "Performance hybrid",
    price: "€ 49.200", monthly: "listino ufficiale sportivi MY26", power: "272 CV", performance: "GTE", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 272, fuel: "Plug-in Hybrid / Benzina", transmission: "DSG", priceValue: 49200, priceKind: "listino",
    priceSourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf-Allestimenti-Sportivi.pdf", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("volkswagen-golf-gti", {
    slug: "volkswagen-golf-gti-edition-50", marketplaceSlug: "volkswagen-golf-gti-edition-50", brand: "Volkswagen", model: "Golf GTI Edition 50", family: "Golf", category: "Auto", segment: "Hot hatch", label: "Hot hatch",
    price: "€ 54.700", monthly: "listino ufficiale sportivi MY26", power: "325 CV", performance: "GTI Edition 50", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 325, fuel: "Benzina", transmission: "DSG", priceValue: 54700, priceKind: "listino",
    priceSourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf-Allestimenti-Sportivi.pdf", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("volkswagen-golf-gti", {
    slug: "volkswagen-golf-r", marketplaceSlug: "volkswagen-golf-r", brand: "Volkswagen", model: "Golf R", family: "Golf", category: "Auto", segment: "Hot hatch AWD", label: "Hot hatch AWD",
    price: "€ 62.700", monthly: "listino ufficiale sportivi MY26", power: "333 CV", performance: "Golf R", drivetrain: "AWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 333, fuel: "Benzina", transmission: "DSG", priceValue: 62700, priceKind: "listino",
    priceSourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf-Allestimenti-Sportivi.pdf", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),

  withVisual("fiat-500-hybrid-pop", {
    slug: "fiat-grande-panda-benzina", marketplaceSlug: "fiat-grande-panda-benzina", brand: "Fiat", model: "Grande Panda Benzina Turbo 100", family: "Grande Panda", category: "Auto", segment: "Urban crossover", label: "Urban crossover",
    price: "da € 14.950*", monthly: "promo ufficiale · listino € 17.900 · finanziamento", power: "100 CV", performance: "1.2 Turbo", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 100, fuel: "Benzina", transmission: "Manuale", priceValue: 14950, priceKind: "promo",
    priceSourceUrl: "https://www.fiat.it/offerte-privati/grande-panda-benzina", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("fiat-500-hybrid-pop", {
    slug: "fiat-grande-panda-hybrid", marketplaceSlug: "fiat-grande-panda-hybrid", brand: "Fiat", model: "Grande Panda Hybrid 110", family: "Grande Panda", category: "Auto", segment: "Urban hybrid", label: "Urban hybrid",
    price: "da € 17.450*", monthly: "promo ufficiale · listino € 20.400 · finanziamento", power: "110 CV", performance: "Hybrid 48V", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 110, fuel: "Mild Hybrid / Benzina", transmission: "eDCT", priceValue: 17450, priceKind: "promo",
    priceSourceUrl: "https://www.fiat.it/offerte-privati/grande-panda-hybrid", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("fiat-500-hybrid-pop", {
    slug: "fiat-grande-panda-electric", marketplaceSlug: "fiat-grande-panda-electric", brand: "Fiat", model: "Grande Panda Elettrica 113", family: "Grande Panda", category: "Auto", segment: "Urban electric", label: "Urban electric",
    price: "da € 20.950*", monthly: "promo ufficiale · listino € 23.900 · finanziamento + rottamazione", power: "113 CV", performance: "44 kWh", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 113, fuel: "Elettrica", transmission: "Automatico", priceValue: 20950, priceKind: "promo",
    priceSourceUrl: "https://www.fiat.it/offerte-privati/grande-panda-electric", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("fiat-500-hybrid-pop", {
    slug: "fiat-pandina-hybrid", marketplaceSlug: "fiat-pandina-hybrid", brand: "Fiat", model: "Pandina Hybrid Pop", family: "Pandina", category: "Auto", segment: "City car", label: "City car",
    price: "da € 9.950*", monthly: "promo ufficiale · listino € 15.950 · finanziamento + rottamazione", power: "65 CV", performance: "Hybrid urban", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 65, fuel: "Mild Hybrid / Benzina", transmission: "Manuale", priceValue: 9950, priceKind: "promo",
    priceSourceUrl: "https://www.fiat.it/offerte-privati/nuova-fiat-pandina", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("fiat-500-hybrid-pop", {
    slug: "fiat-500-hybrid-dolcevita", marketplaceSlug: "fiat-500-hybrid-dolcevita", brand: "Fiat", model: "500 Hybrid Dolcevita", family: "500", category: "Auto", segment: "City cabrio", label: "City cabrio",
    price: "da € 19.950*", monthly: "promo ufficiale · listino € 25.200 · finanziamento", power: "65 CV", performance: "Dolcevita Cabrio", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 65, fuel: "Mild Hybrid / Benzina", transmission: "Manuale", priceValue: 19950, priceKind: "promo",
    priceSourceUrl: "https://www.fiat.it/offerte-privati/finanziamento-fiat-500-hybrid-dolcevita", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("fiat-500-hybrid-pop", {
    slug: "fiat-600-hybrid", marketplaceSlug: "fiat-600-hybrid", brand: "Fiat", model: "600 Hybrid Pop 110", family: "600", category: "Auto", segment: "Compact crossover", label: "Compact crossover",
    price: "da € 19.950*", monthly: "promo ufficiale · listino € 26.400 · finanziamento + rottamazione", power: "110 CV", performance: "Hybrid crossover", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 110, fuel: "Mild Hybrid / Benzina", transmission: "eDCT", priceValue: 19950, priceKind: "promo",
    priceSourceUrl: "https://www.fiat.it/offerte-privati/600-hybrid", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),

  withVisual("alfa-giulia-quadrifoglio", {
    slug: "alfa-junior-ibrida-sprint", marketplaceSlug: "alfa-junior-ibrida-sprint", brand: "Alfa Romeo", model: "Junior Ibrida Sprint", family: "Junior", category: "Auto", segment: "Compact hybrid", label: "Compact hybrid",
    price: "da € 27.950*", monthly: "promo ufficiale · listino € 32.950 · finanziamento", power: "145 CV", performance: "1.2 Hybrid", drivetrain: "FWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 145, fuel: "Mild Hybrid / Benzina", transmission: "eDCT6", priceValue: 27950, priceKind: "promo",
    priceSourceUrl: "https://www.alfaromeo.it/models/junior-ibrida", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
  withVisual("alfa-giulia-quadrifoglio", {
    slug: "alfa-junior-ibrida-q4-ti", marketplaceSlug: "alfa-junior-ibrida-q4-ti", brand: "Alfa Romeo", model: "Junior Ibrida Q4 TI", family: "Junior", category: "Auto", segment: "Compact hybrid AWD", label: "Compact hybrid AWD",
    price: "da € 30.950*", monthly: "promo ufficiale · listino € 35.950 · finanziamento", power: "145 CV", performance: "Hybrid Q4", drivetrain: "AWD", status: "Inventory Intelligence V0.6",
    year: 2026, mileageKm: 0, powerHp: 145, fuel: "Mild Hybrid / Benzina", transmission: "eDCT6", priceValue: 30950, priceKind: "promo",
    priceSourceUrl: "https://www.alfaromeo.it/modelli/junior-ibrida-q4", priceVerifiedAt: VERIFIED_AT, colorAssetMode: "ai-ready",
  }),
];

export const inventoryVehicles: InventoryVehicle[] = [...legacyInventory, ...additionalInventoryVehicles];

export function getInventoryVehicle(slug: string) {
  return inventoryVehicles.find((vehicle) => vehicle.slug === slug);
}

export function getInventoryBrands(category: Vehicle["category"]) {
  return [...new Set(inventoryVehicles.filter((vehicle) => vehicle.category === category).map((vehicle) => vehicle.brand))].sort((a, b) => a.localeCompare(b, "it"));
}

export function getInventorySegments(category: Vehicle["category"]) {
  return [...new Set(inventoryVehicles.filter((vehicle) => vehicle.category === category).map((vehicle) => vehicle.segment))].sort((a, b) => a.localeCompare(b, "it"));
}
