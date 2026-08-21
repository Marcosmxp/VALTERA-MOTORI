import { getVehicle, vehicles } from "@/data/vehicles";

export type MarketVehicle = {
  brand: string;
  model: string;
  trim: string;
  year: number;
  mileageKm: number;
  powerHp: number;
  fuel: string;
  transmission: string;
};

export type FinanceOffer = {
  monthly: number;
  installments: number;
  deposit: number;
  balloon?: number;
  tan?: number;
  taeg?: number;
  totalDue?: number;
};

export type MarketListing = {
  id: string;
  seller: string;
  sellerType: "official-list" | "dealer" | "market-benchmark";
  location: string;
  price: number;
  vehicle: MarketVehicle;
  finance?: FinanceOffer;
  availability: string;
  verifiedAt: string;
  sourceLabel: string;
  sourceUrl: string;
  note?: string;
};

export type MarketScenario = {
  id: string;
  label: string;
  descriptor: string;
  category: "Auto" | "Moto";
  referenceId: string;
  listings: MarketListing[];
};

type Evidence = [
  id: string,
  seller: string,
  type: MarketListing["sellerType"],
  location: string,
  price: number,
  url: string,
  note?: string,
  year?: number,
  km?: number,
  hp?: number,
  trim?: string,
];

const E: Record<string, Evidence[]> = {
  "ferrari-296-gtb": [
    ["autovergiate-296-2025", "Autovergiate F.lli Rossi", "dealer", "Vergiate · Varese", 275000, "https://www.autoscout24.it/annunci/ferrari-296-gtb-blu-pozzi-iva-esp-full-carbon-spec-elettrica-benzina-blu-azzurro-cat_ma27mo76862-e9979ae0-fd06-476d-9cea-85d38a222483", "Annuncio pubblico verificato", 2025, 4000, 830, "Blu Pozzi · Full Carbon Spec"],
    ["rossocorsa-296-2024", "Rossocorsa", "dealer", "Milano", 280000, "https://www.rossocorsa.it/vetrina/1923-ferrari-296-milanomissaglia", "Annuncio pubblico verificato", 2024, 774, 829, "3.0 V6 Hybrid"],
    ["ferrari-296-autoscout-2025", "Errepicar", "dealer", "Udine", 286700, "https://www.autoscout24.it/lst/ferrari/296-gtb/re_2025", "Snapshot AutoScout del 21/08/2026", 2025, 237, 829, "296 GTB"],
  ],
  "lamborghini-revuelto": [
    ["lamborghini-milano-revuelto-569", "Lamborghini Milano / Eurocar", "dealer", "Milano", 569000, "https://www.autoscout24.it/lst/lamborghini/revuelto/re_2025", "Snapshot AutoScout del 21/08/2026", 2025, 6348, 1015, "Revuelto"],
    ["lamborghini-milano-revuelto-579", "Lamborghini Milano", "dealer", "Milano", 579000, "https://www.autoscout24.it/lst/lamborghini/revuelto/re_2025", "Snapshot AutoScout del 21/08/2026", 2025, 3842, 1015, "Revuelto"],
  ],
  "porsche-911-carrera": [
    ["porsche-911-listino", "Porsche Italia", "official-list", "Italia", 142855, "https://www.porsche.com/italy/models/911/carrera-models/911-carrera/", "Listino ufficiale Italia", 2026, 0, 394, "911 Carrera"],
    ["supercar-sm-911-carrera-2025", "Supercar.SM", "dealer", "San Marino", 130900, "https://www.supercar.sm/l/porsche/", "Annuncio pubblico verificato", 2025, 28900, 394, "992.2 Carrera Sport Chrono"],
    ["autotorino-911-carrera-2025", "Autotorino", "dealer", "Italia", 135400, "https://www.autotorino.it/veicoli/auto/porsche/911-carrera-coupe/usato/veicolo-911-coupe-3-0-carrera-394cv-auto-u1233307", "Annuncio pubblico verificato", 2025, 16738, 394, "3.0 Carrera 394 CV Auto"],
  ],
  "porsche-taycan-4": [
    ["porsche-varese-taycan4-2026", "Centro Porsche Varese", "dealer", "Varese", 127900, "https://www.autoscout24.it/lst/porsche/taycan/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 3990, 435, "Taycan 4 Black Edition"],
    ["porsche-vicenza-taycan4-2026", "Centro Porsche Vicenza", "dealer", "Vicenza", 129000, "https://www.autoscout24.it/lst/porsche/taycan/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 4390, 435, "Taycan 4 Black Edition"],
  ],
  "mercedes-amg-gt-43": [
    ["merbag-amg-gt43-2026", "Merbag", "dealer", "Wiesbaden · DE", 112890, "https://www.autoscout24.it/lst/mercedes-benz/amg-gt/re_2026", "Mercato europeo AutoScout · 21/08/2026", 2026, 9300, 421, "AMG GT 43"],
    ["senger-amg-gt43-2026", "Senger", "dealer", "Germania", 117990, "https://www.autoscout24.it/lst/mercedes-benz/amg-gt/re_2026", "Mercato europeo AutoScout · 21/08/2026", 2026, 3000, 421, "AMG GT 43"],
  ],
  "bmw-m3-competition-xdrive": [
    ["bmw-m3-listino-2026", "BMW Italia", "official-list", "Italia", 115100, "https://www.bmw.it/it/all-models/m-series/m3-series/bmw-m3-berlina.html", "Listino ufficiale Italia", 2026, 0, 530, "M3 Competition xDrive"],
    ["venezia-auto-m3-2026", "Venezia Auto", "dealer", "Italia", 88890, "https://www.autoscout24.it/lst/bmw/m3/re_2026", "Prezzo pubblicato con condizioni: verificare l'annuncio", 2026, 4050, 529, "M3 Competition xDrive"],
    ["m3-market-96900", "Dealer AutoScout", "dealer", "Italia", 96900, "https://www.autoscout24.it/lst/bmw/m3/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 1000, 530, "M3 Competition xDrive"],
  ],
  "bmw-m2": [
    ["autoargentiero-m2-2026", "Autoargentiero", "dealer", "Italia", 75800, "https://www.autoscout24.it/lst/bmw/m2/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 0, 480, "BMW M2"],
    ["terniauto-m2-2026", "Terniauto", "dealer", "Terni", 79900, "https://www.autoscout24.it/lst/bmw/m2/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 50, 480, "BMW M2"],
  ],
  "audi-rs3-sportback": [
    ["cromus-rs3-2026", "Cromus Car Group", "dealer", "Italia", 63900, "https://www.autoscout24.it/lst/audi/rs3/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 1, 400, "RS 3 Sportback"],
    ["sm-motors-rs3-2026", "SM Motors", "dealer", "Italia", 66900, "https://www.autoscout24.it/lst/audi/rs3/re_2026", "Prezzo dichiarato senza vincoli di finanziamento", 2026, 100, 400, "RS 3 Sportback"],
  ],
  "alfa-giulia-quadrifoglio": [
    ["ellemotors-giulia-qv-798", "Ellemotors", "dealer", "Italia", 79800, "https://www.autoscout24.it/lst/alfa-romeo/giulia/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 1, 520, "Giulia Quadrifoglio"],
    ["ellemotors-giulia-qv-838", "Ellemotors", "dealer", "Italia", 83800, "https://www.autoscout24.it/lst/alfa-romeo/giulia/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 1, 520, "Giulia Quadrifoglio"],
  ],
  "volkswagen-golf-gti": [
    ["eurowagen-golf-gti-2026", "Eurowagen", "dealer", "Italia", 40490, "https://www.autoscout24.it/lst/volkswagen/golf-gti/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 10, 265, "Golf GTI"],
    ["eurocar-golf-gti-2026", "Eurocar", "dealer", "Italia", 42900, "https://www.autoscout24.it/lst/volkswagen/golf-gti/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 1, 265, "Golf GTI"],
  ],
  "fiat-500-hybrid-pop": [
    ["fiat-500-hybrid-listino", "Fiat Italia", "official-list", "Italia", 19900, "https://www.fiat.it/lp/promo-500-ibrida", "Listino ufficiale; eventuali promo hanno condizioni separate", 2026, 0, 65, "500 Hybrid Pop"],
    ["autoscout-fiat500-hybrid-pop", "Dealer AutoScout", "dealer", "Italia", 14900, "https://www.autoscout24.it/lst/fiat/500/ve_hybrid-pop", "Prezzo pubblicato con condizioni/promozioni: verificare annuncio", 2026, 10, 65, "500 Hybrid Pop"],
  ],
  "toyota-yaris-hybrid-115": [
    ["toyota-yaris-listino", "Toyota Italia", "official-list", "Italia", 24750, "https://www.toyota.it/gamma/yaris", "Listino ufficiale Italia", 2026, 0, 116, "Yaris Hybrid 115"],
    ["tdcar-yaris-2026", "T.D. Car", "dealer", "Italia", 20900, "https://www.autoscout24.it/lst/toyota/yaris/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 1, 116, "Yaris Hybrid 115"],
    ["fiori-yaris-2026", "A. Fiori Spa", "dealer", "Italia", 22900, "https://www.autoscout24.it/lst/toyota/yaris/re_2026", "Snapshot AutoScout del 21/08/2026", 2026, 10, 116, "Yaris Hybrid 115 Active"],
  ],

  "ducati-panigale-v4-s": [
    ["panigale-v4s-listino", "Listino Moto.it / Ducati", "official-list", "Italia", 34690, "https://www.moto.it/moto-nuove/ducati/panigale-v4/gEopnx", "Listino corrente 2025-26"],
    ["panigale-v4s-arcene", "Dealer Ducati", "dealer", "Arcene · BG", 33990, "https://www.moto.it/moto-nuove/ducati/panigale-v4/gEopnx", "Annuncio nuovo corrente · agosto 2026"],
  ],
  "ducati-streetfighter-v4": [
    ["streetfighter-v4-listino", "Listino Moto.it / Ducati", "official-list", "Italia", 25290, "https://www.moto.it/moto-nuove/ducati/streetfighter-v4/g7RaLt", "Listino corrente 2025-26"],
    ["streetfighter-v4-vicenza", "Dealer Ducati", "dealer", "Vicenza", 24790, "https://www.moto.it/moto-nuove/ducati/streetfighter-v4/g7RaLt", "Annuncio nuovo corrente"],
  ],
  "ducati-multistrada-v4-s": [
    ["multistrada-v4s-listino", "Listino Moto.it / Ducati", "official-list", "Italia", 25490, "https://www.moto.it/moto-nuove/ducati/multistrada-v4/WZzeR3", "Listino corrente"],
    ["multistrada-v4s-galliate", "Dealer Ducati", "dealer", "Galliate · NO", 24500, "https://www.moto.it/moto-nuove/ducati/multistrada-v4/WZzeR3", "Annuncio nuovo corrente"],
  ],
  "ducati-monster-890": [
    ["monster-890-listino", "Listino Moto.it / Ducati", "official-list", "Italia", 12980, "https://www.moto.it/moto-nuove/ducati/monster-890/RG6aTE", "Listino corrente 2026"],
    ["monster-890-vicenza", "Dealer Ducati", "dealer", "Vicenza", 11490, "https://www.moto.it/moto-nuove/ducati", "Annuncio del 20/08/2026"],
  ],
  "bmw-m-1000-rr": [
    ["m1000rr-listino", "Listino Moto.it / BMW", "official-list", "Italia", 37450, "https://www.moto.it/moto-nuove/bmw/m-1000-rr", "Listino corrente"],
    ["m1000rr-capua", "Dealer BMW", "dealer", "Capua · CE", 37910, "https://www.moto.it/moto-nuove/bmw/m-1000-rr", "Annuncio 13/08/2026"],
  ],
  "bmw-s-1000-rr": [
    ["s1000rr-listino", "BMW Motorrad", "official-list", "Italia", 21650, "https://www.moto.it/moto-nuove/bmw/s-1000-rr", "Listino 2026"],
    ["s1000rr-market", "Dealer BMW", "dealer", "Italia", 20900, "https://www.moto.it/moto-nuove/bmw/s-1000-rr", "Prezzo dealer corrente"],
  ],
  "aprilia-rsv4-factory": [
    ["rsv4-factory-listino", "Listino Moto.it / Aprilia", "official-list", "Italia", 27100, "https://www.moto.it/listino/aprilia/rsv4-1100/rsv4-1100-factory-2025-26/Pa6tol", "Listino corrente 2025-26"],
    ["rsv4-factory-market", "Dealer Aprilia", "dealer", "Italia", 25100, "https://www.moto.it/moto-nuove/aprilia/rsv4-1100", "Prezzo dealer corrente"],
  ],
  "aprilia-tuono-v4-factory": [
    ["tuono-v4-factory-listino", "Listino Moto.it / Aprilia", "official-list", "Italia", 21100, "https://www.moto.it/listino/aprilia/tuono-v4/tuono-v4-factory-2025-26/Qt7Ptu", "Listino corrente 2025-26"],
    ["tuono-v4-factory-market", "Dealer Aprilia", "dealer", "Italia", 19600, "https://www.moto.it/moto-nuove/aprilia/tuono-v4", "Prezzo dealer corrente"],
  ],
  "aprilia-rs-660": [
    ["rs660-listino", "Listino Moto.it / Aprilia", "official-list", "Italia", 11900, "https://www.moto.it/listino/aprilia/rs-660/rs-660-2025-26/NgvmKd", "Listino corrente 2025-26"],
    ["rs660-market", "Dealer Aprilia", "dealer", "Italia", 10900, "https://www.moto.it/moto-nuove/aprilia/rs-660/NgvmKd", "Numerosi annunci dealer correnti"],
  ],
  "yamaha-yzf-r1-race": [
    ["r1-race-listino", "Listino Moto.it / Yamaha", "official-list", "Italia", 20499, "https://www.moto.it/listino/yamaha/yzf-r1/yzf-r1-race-2025-26/XgjM4c", "Listino corrente"],
    ["r1-race-dealer", "Dealer Yamaha", "dealer", "Italia", 20499, "https://www.moto.it/moto-nuove/yamaha/yzf-r1", "Annunci dealer correnti"],
  ],
  "yamaha-mt-09-sp": [
    ["mt09sp-listino", "Listino Moto.it / Yamaha", "official-list", "Italia", 13099, "https://www.moto.it/listino/yamaha/mt-09/mt-09-sp-2024-26/uZdzRZ", "Listino corrente"],
    ["mt09sp-dealer", "Dealer Yamaha", "dealer", "Italia", 13099, "https://www.moto.it/moto-nuove/yamaha/mt-09/uZdzRZ", "Annunci dealer correnti"],
  ],
  "yamaha-tenere-700": [
    ["tenere700-listino", "Listino Moto.it / Yamaha", "official-list", "Italia", 10999, "https://www.moto.it/listino/yamaha/tenere-700/tenere-700-2025-26/OKbQcG", "Listino corrente"],
    ["tenere700-roma", "Aureli Moto · Yamaha", "dealer", "Roma", 10999, "https://www.moto.it/moto-nuove/yamaha/tenere-700/tenere-700-2025-26/9595003", "Pronta consegna · annuncio luglio 2026"],
  ],
  "honda-fireblade-sp": [
    ["fireblade-sp-listino", "Listino Moto.it / Honda", "official-list", "Italia", 27490, "https://www.moto.it/listino/honda/cbr-1000-rr/cbr-1000-rr-r-fireblade-sp-2024-26/9sywKA", "Listino corrente"],
    ["fireblade-sp-dominioni", "Dominioni Moto · Honda", "dealer", "Olgiate Comasco", 27490, "https://www.moto.it/moto-nuove/honda/cbr-1000-rr/cbr-1000-rr-r-fireblade-sp-2024-26/10005942", "Pronta consegna 2026"],
  ],
  "honda-cb1000-hornet-sp": [
    ["hornet-sp-listino", "Listino Moto.it / Honda", "official-list", "Italia", 11990, "https://www.moto.it/listino/honda/cb-1000-hornet/cb-1000-hornet-sp-2025-26/n99kun", "Listino corrente"],
    ["hornet-sp-sarzana", "Espressionemoto · Honda", "dealer", "Sarzana", 11990, "https://www.moto.it/moto-nuove/honda/cb-1000-hornet/cb-1000-hornet-sp-2025-26/10081685", "Pronta consegna reale 2026"],
  ],
  "kawasaki-zx-10r": [
    ["zx10r-listino", "Listino Moto.it / Kawasaki", "official-list", "Italia", 18990, "https://www.moto.it/listino/kawasaki/ninja-1000-zx-10r", "Listino 2026"],
    ["zx10r-firenze", "Dealer Kawasaki", "dealer", "Firenze", 18990, "https://www.moto.it/moto-nuove/kawasaki/ninja-1000-zx-10r", "Annuncio dealer agosto 2026"],
  ],
  "kawasaki-z900": [
    ["z900-listino", "Listino Moto.it / Kawasaki", "official-list", "Italia", 9990, "https://www.moto.it/listino/kawasaki/z-900/z-900-2025-26/FB2IYj", "Listino corrente"],
    ["z900-vigevano", "Dealer Kawasaki", "dealer", "Vigevano", 9190, "https://www.moto.it/moto-nuove/kawasaki/pagina-78", "Promo dealer pubblicata"],
  ],
  "triumph-speed-triple-1200-rs": [
    ["speedtriple-listino", "Listino Moto.it / Triumph", "official-list", "Italia", 20495, "https://www.moto.it/listino/triumph/speed-triple-1200/speed-triple-1200-rs-2025-26/NURDWB", "Listino corrente"],
    ["speedtriple-firenze", "Fani Motors · Triumph", "dealer", "Firenze", 20295, "https://www.moto.it/moto-nuove/triumph/speed-triple-1200/speed-triple-1200-rs-2025-26/9629217", "Pronta consegna"],
  ],
  "ktm-1390-super-duke-r-evo": [
    ["superduke-evo-listino", "Listino Moto.it / KTM", "official-list", "Italia", 22990, "https://www.moto.it/moto-nuove/ktm/1390-super-duke-r/DDTiXz", "Listino corrente"],
    ["superduke-evo-firenze", "Dealer KTM", "dealer", "Firenze", 20990, "https://www.moto.it/moto-nuove/ktm/1390-super-duke-r/DDTiXz", "Annuncio dealer 14/08/2026"],
  ],
  "suzuki-hayabusa": [
    ["hayabusa-listino", "Listino Moto.it / Suzuki", "official-list", "Italia", 19990, "https://www.moto.it/listino/suzuki/gsx-1300-r-hayabusa/gsx-1300-r-hayabusa-2026/8idFES", "Listino 2026 verificato"],
    ["hayabusa-market", "Mercato Moto.it", "market-benchmark", "Italia", 19990, "https://www.moto.it/listino/suzuki/gsx-1300-r-hayabusa", "Riferimento mercato/listino corrente"],
  ],
  "mv-agusta-superveloce-1000": [
    ["superveloce1000-listino", "Listino Moto.it / MV Agusta", "official-list", "Italia", 70700, "https://www.moto.it/listino/mv-agusta/superveloce-1000/superveloce-1000-serie-oro-2024-26/gutyNY", "Listino Serie Oro"],
    ["superveloce1000-seregno", "Hypermoto", "dealer", "Seregno · MB", 72000, "https://www.moto.it/moto-usate/mv-agusta/superveloce-1000/gutyNY", "Usato 2025 con 13 km · agosto 2026", 2025, 13, 208, "Serie Oro"],
  ],
};

function toListing(slug: string, evidence: Evidence): MarketListing {
  const vehicle = getVehicle(slug)!;
  const [id, seller, sellerType, location, price, sourceUrl, note, year, mileageKm, powerHp, trim] = evidence;
  return {
    id,
    seller,
    sellerType,
    location,
    price,
    vehicle: {
      brand: vehicle.brand,
      model: vehicle.model,
      trim: trim ?? vehicle.model,
      year: year ?? vehicle.year,
      mileageKm: mileageKm ?? vehicle.mileageKm,
      powerHp: powerHp ?? vehicle.powerHp,
      fuel: vehicle.fuel,
      transmission: vehicle.transmission,
    },
    availability: sellerType === "official-list" ? "Listino / configurazione" : sellerType === "dealer" ? "Annuncio pubblico" : "Benchmark mercato",
    verifiedAt: "2026-08-21",
    sourceLabel: seller,
    sourceUrl,
    note,
    ...(id === "autotorino-911-carrera-2025" ? { finance: { monthly: 1644.03, installments: 60, deposit: 33850, balloon: 40800, tan: 9.99, taeg: 10.71, totalDue: 139745 } } : {}),
  };
}

export const marketScenarios: MarketScenario[] = vehicles.map((vehicle) => {
  const evidence = E[vehicle.slug];
  if (!evidence?.length) throw new Error(`Missing market evidence for ${vehicle.slug}`);
  const listings = evidence.map((item) => toListing(vehicle.slug, item));
  return {
    id: vehicle.slug,
    label: `${vehicle.brand} ${vehicle.model}`,
    descriptor: `${vehicle.segment} · prezzi pubblici verificati`,
    category: vehicle.category,
    referenceId: listings[0].id,
    listings,
  };
});
