import { marketScenarios as legacyScenarios, type FinanceOffer, type MarketListing, type MarketScenario } from "@/data/market";
import { additionalInventoryVehicles, getInventoryVehicle } from "@/data/inventory-v06";

export type EvidenceV06 = {
  id: string;
  slug: string;
  seller: string;
  sellerType: MarketListing["sellerType"];
  location: string;
  price: number;
  sourceUrl: string;
  note: string;
  verifiedAt?: string;
  finance?: FinanceOffer;
};

const VERIFIED_AT = "2026-08-21";

const newEvidence: EvidenceV06[] = [
  { id: "porsche-macan-listino", slug: "porsche-macan-electric", seller: "Porsche Italia", sellerType: "official-list", location: "Italia", price: 85899, sourceUrl: "https://www.porsche.com/italy/models/macan/", note: "Listino ufficiale MY27 · IVA inclusa" },
  { id: "porsche-macan4-listino", slug: "porsche-macan-4", seller: "Porsche Italia", sellerType: "official-list", location: "Italia", price: 89590, sourceUrl: "https://www.porsche.com/italy/models/macan/macan-electric-models/macan-4-electric/", note: "Listino ufficiale MY27 · IVA inclusa" },
  { id: "porsche-macan4s-listino", slug: "porsche-macan-4s", seller: "Porsche Italia", sellerType: "official-list", location: "Italia", price: 96312, sourceUrl: "https://www.porsche.com/italy/models/macan/macan-electric-models/macan-4s-electric/", note: "Listino ufficiale MY27 · IVA inclusa" },
  { id: "porsche-macan-gts-listino", slug: "porsche-macan-gts", seller: "Porsche Italia", sellerType: "official-list", location: "Italia", price: 111568, sourceUrl: "https://www.porsche.com/italy/models/macan/macan-electric-models/macan-gts-electric/", note: "Listino ufficiale MY27 · IVA inclusa" },
  { id: "porsche-macan-turbo-listino", slug: "porsche-macan-turbo", seller: "Porsche Italia", sellerType: "official-list", location: "Italia", price: 124462, sourceUrl: "https://www.porsche.com/italy/models/macan/macan-electric-models/macan-turbo-electric/", note: "Listino ufficiale MY27 · IVA inclusa" },
  { id: "vw-golf-life-115-listino", slug: "volkswagen-golf-life-115", seller: "Volkswagen Italia", sellerType: "official-list", location: "Italia", price: 31350, sourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf.pdf", note: "Golf MY26 · prezzo chiavi in mano, IPT esclusa" },
  { id: "vw-golf-style-150-listino", slug: "volkswagen-golf-style-150", seller: "Volkswagen Italia", sellerType: "official-list", location: "Italia", price: 35500, sourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf.pdf", note: "Golf MY26 · prezzo chiavi in mano, IPT esclusa" },
  { id: "vw-golf-etsi-rline-150-listino", slug: "volkswagen-golf-etsi-rline-150", seller: "Volkswagen Italia", sellerType: "official-list", location: "Italia", price: 38350, sourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf.pdf", note: "Golf MY26 · 1.5 eTSI R-Line DSG" },
  { id: "vw-golf-ehybrid-life-listino", slug: "volkswagen-golf-ehybrid-life", seller: "Volkswagen Italia", sellerType: "official-list", location: "Italia", price: 43250, sourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf.pdf", note: "Golf MY26 · 1.5 eHybrid Life DSG" },
  { id: "vw-golf-gte-listino", slug: "volkswagen-golf-gte", seller: "Volkswagen Italia", sellerType: "official-list", location: "Italia", price: 49200, sourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf-Allestimenti-Sportivi.pdf", note: "Golf sportivi MY26 · GTE 272 CV" },
  { id: "vw-golf-gti50-listino", slug: "volkswagen-golf-gti-edition-50", seller: "Volkswagen Italia", sellerType: "official-list", location: "Italia", price: 54700, sourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf-Allestimenti-Sportivi.pdf", note: "Golf sportivi MY26 · GTI Edition 50 325 CV" },
  { id: "vw-golf-r-listino", slug: "volkswagen-golf-r", seller: "Volkswagen Italia", sellerType: "official-list", location: "Italia", price: 62700, sourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf-Allestimenti-Sportivi.pdf", note: "Golf sportivi MY26 · R 333 CV 4MOTION" },
  { id: "fiat-grande-panda-benzina-listino", slug: "fiat-grande-panda-benzina", seller: "Fiat Italia", sellerType: "official-list", location: "Italia", price: 17900, sourceUrl: "https://www.fiat.it/modello/grande-panda-benzina", note: "Listino ufficiale POP 1.2 Turbo 100" },
  { id: "fiat-grande-panda-benzina-promo", slug: "fiat-grande-panda-benzina", seller: "Fiat · concessionari aderenti", sellerType: "market-benchmark", location: "Italia", price: 14950, sourceUrl: "https://www.fiat.it/offerte-privati/grande-panda-benzina", note: "Promo con finanziamento; valida fino al 27/08/2026", finance: { monthly: 129, installments: 35, deposit: 2550, balloon: 10874, tan: 5.99, taeg: 9.02, totalDue: 15421.33 } },
  { id: "fiat-grande-panda-hybrid-listino", slug: "fiat-grande-panda-hybrid", seller: "Fiat Italia", sellerType: "official-list", location: "Italia", price: 20400, sourceUrl: "https://www.fiat.it/modello/grande-panda-ibrido", note: "Listino ufficiale POP 1.2 110 CV Hybrid 48V" },
  { id: "fiat-grande-panda-hybrid-promo", slug: "fiat-grande-panda-hybrid", seller: "Fiat · concessionari aderenti", sellerType: "market-benchmark", location: "Italia", price: 17450, sourceUrl: "https://www.fiat.it/offerte-privati/grande-panda-hybrid", note: "Promo con finanziamento; valida fino al 27/08/2026", finance: { monthly: 149, installments: 35, deposit: 3073, balloon: 12472, tan: 5.99, taeg: 8.65, totalDue: 17724.47 } },
  { id: "fiat-grande-panda-electric-listino", slug: "fiat-grande-panda-electric", seller: "Fiat Italia", sellerType: "official-list", location: "Italia", price: 23900, sourceUrl: "https://www.fiat.it/modello/grande-panda-elettrica", note: "Listino ufficiale POP 113 CV elettrica 44 kWh" },
  { id: "fiat-grande-panda-electric-promo", slug: "fiat-grande-panda-electric", seller: "Fiat · concessionari aderenti", sellerType: "market-benchmark", location: "Italia", price: 20950, sourceUrl: "https://www.fiat.it/offerte-privati/grande-panda-electric", note: "Promo con finanziamento e rottamazione; valida fino al 31/08/2026", finance: { monthly: 199, installments: 35, deposit: 5959, balloon: 11290, tan: 5.99, taeg: 8.7, totalDue: 18294.2 } },
  { id: "fiat-pandina-hybrid-listino", slug: "fiat-pandina-hybrid", seller: "Fiat Italia", sellerType: "official-list", location: "Italia", price: 15950, sourceUrl: "https://www.fiat.it/offerte-privati/nuova-fiat-pandina", note: "Listino ufficiale Pandina 1.0 65 CV Hybrid POP" },
  { id: "fiat-pandina-hybrid-promo", slug: "fiat-pandina-hybrid", seller: "Fiat · concessionari aderenti", sellerType: "market-benchmark", location: "Italia", price: 9950, sourceUrl: "https://www.fiat.it/offerte-privati/nuova-fiat-pandina", note: "Promo con finanziamento e rottamazione; valida fino al 27/08/2026", finance: { monthly: 99, installments: 35, deposit: 1699, balloon: 8011, tan: 8.99, taeg: 13.71, totalDue: 11496.68 } },
  { id: "fiat-500-dolcevita-listino", slug: "fiat-500-hybrid-dolcevita", seller: "Fiat Italia", sellerType: "official-list", location: "Italia", price: 25200, sourceUrl: "https://www.fiat.it/modello/fiat-500-hybrid-dolcevita", note: "Listino ufficiale 500 Hybrid Cabrio Dolcevita 65 CV" },
  { id: "fiat-500-dolcevita-promo", slug: "fiat-500-hybrid-dolcevita", seller: "Fiat · concessionari aderenti", sellerType: "market-benchmark", location: "Italia", price: 19950, sourceUrl: "https://www.fiat.it/offerte-privati/finanziamento-fiat-500-hybrid-dolcevita", note: "Promo con finanziamento; valida fino al 27/08/2026", finance: { monthly: 199, installments: 35, deposit: 2757, balloon: 15573, tan: 8.99, taeg: 11.57, totalDue: 22582.31 } },
  { id: "fiat-600-hybrid-listino", slug: "fiat-600-hybrid", seller: "Fiat Italia", sellerType: "official-list", location: "Italia", price: 26400, sourceUrl: "https://www.fiat.it/offerte-privati/600-hybrid", note: "Listino ufficiale 600 1.2 110 CV Hybrid POP" },
  { id: "fiat-600-hybrid-promo", slug: "fiat-600-hybrid", seller: "Fiat · concessionari aderenti", sellerType: "market-benchmark", location: "Italia", price: 19950, sourceUrl: "https://www.fiat.it/offerte-privati/600-hybrid", note: "Promo con finanziamento e rottamazione; valida fino al 27/08/2026", finance: { monthly: 199, installments: 35, deposit: 4214, balloon: 13844, tan: 8.99, taeg: 11.78, totalDue: 20849.51 } },
  { id: "alfa-junior-ibrida-sprint-listino", slug: "alfa-junior-ibrida-sprint", seller: "Alfa Romeo Italia", sellerType: "official-list", location: "Italia", price: 32950, sourceUrl: "https://www.alfaromeo.it/models/junior-ibrida", note: "Junior Ibrida Sprint · 145 CV eDCT6" },
  { id: "alfa-junior-ibrida-sprint-promo", slug: "alfa-junior-ibrida-sprint", seller: "Alfa Romeo · concessionari aderenti", sellerType: "market-benchmark", location: "Italia", price: 27950, sourceUrl: "https://www.alfaromeo.it/models/junior-ibrida", note: "Promo con finanziamento; valida fino al 31/08/2026", finance: { monthly: 159, installments: 35, deposit: 6012, balloon: 20963, tan: 5.75, taeg: 7.49 } },
  { id: "alfa-junior-q4-ti-listino", slug: "alfa-junior-ibrida-q4-ti", seller: "Alfa Romeo Italia", sellerType: "official-list", location: "Italia", price: 35950, sourceUrl: "https://www.alfaromeo.it/modelli/junior-ibrida-q4", note: "Junior Ibrida Q4 TI · 145 CV eDCT6" },
  { id: "alfa-junior-q4-ti-promo", slug: "alfa-junior-ibrida-q4-ti", seller: "Alfa Romeo · concessionari aderenti", sellerType: "market-benchmark", location: "Italia", price: 30950, sourceUrl: "https://www.alfaromeo.it/modelli/junior-ibrida-q4", note: "Promo con finanziamento; valida fino al 31/08/2026", finance: { monthly: 159, installments: 35, deposit: 7355, balloon: 22931, tan: 5.75, taeg: 7.37 } },
];

function toListing(evidence: EvidenceV06): MarketListing {
  const vehicle = getInventoryVehicle(evidence.slug);
  if (!vehicle) throw new Error(`Missing inventory vehicle for ${evidence.slug}`);
  return {
    id: evidence.id,
    seller: evidence.seller,
    sellerType: evidence.sellerType,
    location: evidence.location,
    price: evidence.price,
    vehicle: { brand: vehicle.brand, model: vehicle.model, trim: vehicle.model, year: vehicle.year, mileageKm: vehicle.mileageKm, powerHp: vehicle.powerHp, fuel: vehicle.fuel, transmission: vehicle.transmission },
    finance: evidence.finance,
    availability: evidence.sellerType === "official-list" ? "Listino ufficiale" : evidence.sellerType === "dealer" ? "Annuncio pubblico" : "Promozione / benchmark pubblico",
    verifiedAt: evidence.verifiedAt ?? VERIFIED_AT,
    sourceLabel: evidence.seller,
    sourceUrl: evidence.sourceUrl,
    note: evidence.note,
  };
}

function scenarioFor(slug: string): MarketScenario {
  const vehicle = getInventoryVehicle(slug);
  if (!vehicle) throw new Error(`Missing inventory vehicle for ${slug}`);
  const listings = newEvidence.filter((item) => item.slug === slug).map(toListing);
  if (!listings.length) throw new Error(`Missing V0.6 evidence for ${slug}`);
  const promo = listings.find((item) => item.sellerType === "market-benchmark");
  const reference = promo ?? listings[0];
  return { id: slug, label: `${vehicle.brand} ${vehicle.model}`, descriptor: `${vehicle.segment} · ${listings.length > 1 ? "confronto listino / mercato" : "copertura mercato limitata"}`, category: vehicle.category, referenceId: reference.id, listings };
}

const correctedGolfGti: MarketScenario = {
  id: "volkswagen-golf-gti", label: "Volkswagen Golf GTI", descriptor: "Hot hatch · listino ufficiale MY26", category: "Auto", referenceId: "vw-golf-gti-265-listino-v06",
  listings: [{ id: "vw-golf-gti-265-listino-v06", seller: "Volkswagen Italia", sellerType: "official-list", location: "Italia", price: 46350, vehicle: { brand: "Volkswagen", model: "Golf GTI", trim: "2.0 TSI GTI DSG", year: 2026, mileageKm: 0, powerHp: 265, fuel: "Benzina", transmission: "DSG" }, availability: "Listino ufficiale", verifiedAt: VERIFIED_AT, sourceLabel: "Volkswagen Italia", sourceUrl: "https://www.volkswagen.it/idhub/content/dam/onehub_pkw/importers/it/download/listini/Listino-prezzi-Volkswagen-Nuova-Golf-Allestimenti-Sportivi.pdf", note: "Anno modello 2026 · validità listino 15/05/2026 · IPT esclusa" }],
};

const newScenarios = additionalInventoryVehicles.map((vehicle) => scenarioFor(vehicle.slug));
export const inventoryMarketScenarios: MarketScenario[] = [...legacyScenarios.filter((scenario) => scenario.id !== "volkswagen-golf-gti"), correctedGolfGti, ...newScenarios];
