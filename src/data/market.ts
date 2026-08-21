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
  sellerType: "valtera-demo" | "dealer" | "market-benchmark";
  location: string;
  price: number;
  vehicle: MarketVehicle;
  finance?: FinanceOffer;
  availability: string;
  verifiedAt: string;
  sourceLabel: string;
  sourceUrl?: string;
  note?: string;
};

export type MarketScenario = {
  id: string;
  label: string;
  descriptor: string;
  listings: MarketListing[];
};

export const marketScenarios: MarketScenario[] = [
  {
    id: "ferrari-296-gtb",
    label: "Ferrari 296 GTB",
    descriptor: "Hybrid supercar · confronto prezzo e specifiche",
    listings: [
      {
        id: "valtera-ferrari-demo",
        seller: "Valtera Motori",
        sellerType: "valtera-demo",
        location: "Milano · scenario demo",
        price: 274900,
        vehicle: {
          brand: "Ferrari",
          model: "296 GTB",
          trim: "3.0 V6 Hybrid",
          year: 2024,
          mileageKm: 1200,
          powerHp: 830,
          fuel: "Ibrida / Benzina",
          transmission: "F1 doppia frizione",
        },
        availability: "Scenario immediato",
        verifiedAt: "2026-08-21",
        sourceLabel: "Scenario Valtera — non è un'offerta reale",
        note: "Prezzo dimostrativo usato esclusivamente per mostrare il funzionamento del comparatore.",
      },
      {
        id: "autovergiate-296-2025",
        seller: "Autovergiate F.lli Rossi",
        sellerType: "dealer",
        location: "Vergiate · Varese",
        price: 275000,
        vehicle: {
          brand: "Ferrari",
          model: "296 GTB",
          trim: "Blu Pozzi · Full Carbon Spec",
          year: 2025,
          mileageKm: 4000,
          powerHp: 662,
          fuel: "Ibrida / Benzina",
          transmission: "Automatico",
        },
        availability: "Usato pubblicato",
        verifiedAt: "2026-08-21",
        sourceLabel: "Autovergiate · AutoScout24",
        sourceUrl: "https://www.autoscout24.it/annunci/ferrari-296-gtb-blu-pozzi-iva-esp-full-carbon-spec-elettrica-benzina-blu-azzurro-cat_ma27mo76862-e9979ae0-fd06-476d-9cea-85d38a222483",
        note: "La potenza mostrata riprende il valore pubblicato nell'annuncio della fonte.",
      },
      {
        id: "rossocorsa-296-2024",
        seller: "Rossocorsa",
        sellerType: "dealer",
        location: "Milano",
        price: 280000,
        vehicle: {
          brand: "Ferrari",
          model: "296 GTB",
          trim: "3.0 V6 Hybrid",
          year: 2024,
          mileageKm: 774,
          powerHp: 829,
          fuel: "Ibrida / Benzina",
          transmission: "F1 doppia frizione",
        },
        availability: "Annuncio pubblicato",
        verifiedAt: "2026-08-21",
        sourceLabel: "Rossocorsa · annuncio 296 GTB",
        sourceUrl: "https://www.rossocorsa.it/vetrina/1923-ferrari-296-milanomissaglia",
      },
      {
        id: "alvolante-296-benchmark",
        seller: "Mercato concessionarie",
        sellerType: "market-benchmark",
        location: "Italia · benchmark",
        price: 275100,
        vehicle: {
          brand: "Ferrari",
          model: "296 GTB",
          trim: "3.0 V6 turbo MY2022",
          year: 2026,
          mileageKm: 4200,
          powerHp: 829,
          fuel: "Ibrida / Benzina",
          transmission: "Automatico",
        },
        availability: "Quotazione mercato",
        verifiedAt: "2026-08-21",
        sourceLabel: "alVolante · quotazione concessionaria",
        sourceUrl: "https://www.alvolante.it/listino_auto/usato/ferrari/296-gtb/2026-1-sem",
        note: "Benchmark di mercato, non un singolo veicolo disponibile presso una concessionaria specifica.",
      },
    ],
  },
  {
    id: "porsche-911-carrera",
    label: "Porsche 911 Carrera Coupé",
    descriptor: "Usato 2025 · prezzo, finanziamento e comparabilità",
    listings: [
      {
        id: "valtera-porsche-demo",
        seller: "Valtera Motori",
        sellerType: "valtera-demo",
        location: "Milano · scenario demo",
        price: 132900,
        vehicle: {
          brand: "Porsche",
          model: "911 Carrera Coupé",
          trim: "3.0 Carrera 394 CV Auto",
          year: 2025,
          mileageKm: 12800,
          powerHp: 394,
          fuel: "Benzina",
          transmission: "Automatico",
        },
        availability: "Scenario immediato",
        verifiedAt: "2026-08-21",
        sourceLabel: "Scenario Valtera — non è un'offerta reale",
        note: "Prezzo dimostrativo usato esclusivamente per mostrare il funzionamento del comparatore.",
      },
      {
        id: "supercar-sm-911-carrera-2025",
        seller: "Supercar.SM",
        sellerType: "dealer",
        location: "San Marino",
        price: 130900,
        vehicle: {
          brand: "Porsche",
          model: "911 Carrera Coupé",
          trim: "992.2 Carrera Sport Chrono",
          year: 2025,
          mileageKm: 28900,
          powerHp: 394,
          fuel: "Benzina",
          transmission: "Automatico",
        },
        availability: "Ordinabile",
        verifiedAt: "2026-08-21",
        sourceLabel: "Supercar.SM · inventario Porsche",
        sourceUrl: "https://www.supercar.sm/l/porsche/",
        note: "La fonte indica vettura 06/2025, 394 CV, 28.900 km e prezzo pubblicato di €130.900.",
      },
      {
        id: "autotorino-911-carrera-2025",
        seller: "Autotorino",
        sellerType: "dealer",
        location: "Italia",
        price: 135400,
        vehicle: {
          brand: "Porsche",
          model: "911 Carrera Coupé",
          trim: "3.0 Carrera 394 CV Auto",
          year: 2025,
          mileageKm: 16738,
          powerHp: 394,
          fuel: "Benzina",
          transmission: "Automatico",
        },
        finance: {
          monthly: 1644.03,
          installments: 60,
          deposit: 33850,
          balloon: 40800,
          tan: 9.99,
          taeg: 10.71,
          totalDue: 139745,
        },
        availability: "Usato pubblicato",
        verifiedAt: "2026-08-21",
        sourceLabel: "Autotorino · U1233307",
        sourceUrl: "https://www.autotorino.it/veicoli/auto/porsche/911-carrera-coupe/usato/veicolo-911-coupe-3-0-carrera-394cv-auto-u1233307",
      },
      {
        id: "alvolante-911-benchmark",
        seller: "Mercato concessionarie",
        sellerType: "market-benchmark",
        location: "Italia · benchmark",
        price: 133300,
        vehicle: {
          brand: "Porsche",
          model: "911 Carrera Coupé",
          trim: "911 Carrera MY2026",
          year: 2026,
          mileageKm: 4200,
          powerHp: 394,
          fuel: "Benzina",
          transmission: "Automatico",
        },
        availability: "Quotazione mercato",
        verifiedAt: "2026-08-21",
        sourceLabel: "alVolante · quotazione concessionaria",
        sourceUrl: "https://www.alvolante.it/listino_auto/usato/porsche/911/2026-1-sem",
        note: "Benchmark di mercato; non rappresenta un singolo annuncio disponibile.",
      },
    ],
  },
];
