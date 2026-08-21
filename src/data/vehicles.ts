export type VehicleColor = { name: string; hex: string };
export type VehicleCategory = "Auto" | "Moto";

export type Vehicle = {
  slug: string;
  marketplaceSlug: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  segment: string;
  label: string;
  price: string;
  monthly: string;
  power: string;
  performance: string;
  drivetrain: string;
  status: string;
  year: number;
  mileageKm: number;
  powerHp: number;
  fuel: string;
  transmission: string;
  colors: VehicleColor[];
  image: string;
  imageAlt: string;
  imagePage: string;
  credit: string;
};

type Seed = [
  slug: string, brand: string, model: string, category: VehicleCategory, segment: string,
  price: string, priceNote: string, hp: number, performance: string, drivetrain: string,
  year: number, mileageKm: number, fuel: string, transmission: string, imageKey: keyof typeof images,
];

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&fm=jpg&q=82&w=2200`;
const images = {
  ferrari: u("photo-1681322540912-cdae3ff40726"),
  lamborghini: u("photo-1544829099-b9a0c07fad1a"),
  porsche: u("photo-1775582524168-75b2c30e016f"),
  taycan: u("photo-1705947525504-0ecb3ec969d9"),
  amg: u("photo-1605559424843-9e4c228bf1c2"),
  bmw: u("photo-1715645951728-6ffd954aa23c"),
  audi: u("photo-1722308279770-e273a680049e"),
  alfa: u("photo-1603386329225-868f9b1ee6c9"),
  golf: u("photo-1560282105-222992ffb774"),
  fiat: u("photo-1617646142796-4c69c111c10a"),
  toyota: u("photo-1621007947382-bb3c3994e3fb"),
  ducati: u("photo-1645818481640-c0be89188521"),
  ducatiDark: u("photo-1727951298405-7d2a88ce986c"),
  motoDark: u("photo-1650487371432-2dffda8be065"),
  kawasaki: u("photo-1655484303584-ceea9b21f11f"),
} as const;

const pageForImage: Record<keyof typeof images, string> = {
  ferrari: "https://unsplash.com/photos/y872ENm67yY",
  lamborghini: "https://unsplash.com/s/photos/lamborghini",
  porsche: "https://unsplash.com/photos/OMSIShXyzi0",
  taycan: "https://unsplash.com/s/photos/porsche-taycan",
  amg: "https://unsplash.com/s/photos/mercedes-amg-gt",
  bmw: "https://unsplash.com/s/photos/bmw-m3",
  audi: "https://unsplash.com/s/photos/audi-rs3",
  alfa: "https://unsplash.com/s/photos/alfa-romeo-giulia",
  golf: "https://unsplash.com/s/photos/volkswagen-golf-gti",
  fiat: "https://unsplash.com/s/photos/fiat-500",
  toyota: "https://unsplash.com/s/photos/toyota-yaris",
  ducati: "https://unsplash.com/s/photos/ducati-panigale",
  ducatiDark: "https://unsplash.com/s/photos/ducati",
  motoDark: "https://unsplash.com/s/photos/sport-motorcycle",
  kawasaki: "https://unsplash.com/s/photos/kawasaki-z900",
};

const palettes: Record<string, VehicleColor[]> = {
  Ferrari: [["Rosso Corsa", "#cf152d"], ["Nero", "#111111"], ["Giallo Modena", "#f4c430"], ["Blu Pozzi", "#172641"]].map(([name, hex]) => ({ name, hex })),
  Lamborghini: [["Arancio", "#f15a24"], ["Verde", "#36a952"], ["Nero", "#0b0b0c"], ["Bianco", "#f1f1ec"]].map(([name, hex]) => ({ name, hex })),
  Porsche: [["Nero", "#111111"], ["Bianco", "#f4f3ef"], ["Guards Red", "#c4161c"], ["Gentian Blue", "#233c68"]].map(([name, hex]) => ({ name, hex })),
  "Mercedes-AMG": [["Obsidian Black", "#111216"], ["Alpine Grey", "#a5a5a2"], ["Patagonia Red", "#7d1722"], ["Spectral Blue", "#1b3f70"]].map(([name, hex]) => ({ name, hex })),
  BMW: [["Alpine White", "#f3f2ed"], ["Black Sapphire", "#121318"], ["M Blue", "#5f9ec7"], ["M Red", "#a31525"]].map(([name, hex]) => ({ name, hex })),
  Audi: [["Kyalami Green", "#6f9f36"], ["Daytona Grey", "#55595c"], ["Mythos Black", "#101113"], ["Ascari Blue", "#325578"]].map(([name, hex]) => ({ name, hex })),
  "Alfa Romeo": [["Rosso", "#8d151d"], ["Nero", "#151515"], ["Verde", "#2c5747"], ["Blu", "#2f66a0"]].map(([name, hex]) => ({ name, hex })),
  Volkswagen: [["Kings Red", "#a51e28"], ["Moonstone Grey", "#8b8d8c"], ["Pure White", "#f2f1ec"], ["Black", "#121315"]].map(([name, hex]) => ({ name, hex })),
  Fiat: [["Ice White", "#efefeb"], ["Celestial Blue", "#9fb5c6"], ["Nero", "#151515"]].map(([name, hex]) => ({ name, hex })),
  Toyota: [["Pure White", "#f1f1ed"], ["Scarlet", "#9e1b26"], ["Juniper Blue", "#668d9d"], ["Black", "#111214"]].map(([name, hex]) => ({ name, hex })),
  Ducati: [["Ducati Red", "#c8102e"], ["Thrilling Black", "#111111"], ["Artic White", "#ecebe6"]].map(([name, hex]) => ({ name, hex })),
  Bmw: [["Black Storm", "#121315"], ["Light White / M", "#efefeb"], ["M Blue", "#214e8a"]].map(([name, hex]) => ({ name, hex })),
  Aprilia: [["Dark", "#171719"], ["Red", "#b01724"], ["Acid Gold", "#c7cf35"]].map(([name, hex]) => ({ name, hex })),
  Yamaha: [["Tech Black", "#101113"], ["Icon Blue", "#1f4c92"], ["Red Line White", "#eeeae2"]].map(([name, hex]) => ({ name, hex })),
  Honda: [["Grand Prix Red", "#b11226"], ["Matt Black", "#151515"], ["Pearl White", "#efeee9"]].map(([name, hex]) => ({ name, hex })),
  Kawasaki: [["Lime Green", "#6cab2f"], ["Metallic Black", "#111214"], ["Graphite Grey", "#55595b"]].map(([name, hex]) => ({ name, hex })),
  Triumph: [["Granite / Diablo Red", "#5c5c59"], ["Sapphire Black", "#111214"], ["Performance Yellow", "#d5c626"]].map(([name, hex]) => ({ name, hex })),
  KTM: [["KTM Orange", "#ed5b24"], ["Black", "#121212"], ["Silver", "#a7a7a4"]].map(([name, hex]) => ({ name, hex })),
  Suzuki: [["Metallic Blue", "#295b8d"], ["Glass Sparkle Black", "#111214"], ["Pearl White", "#efeee9"]].map(([name, hex]) => ({ name, hex })),
  "MV Agusta": [["Ago Red", "#a41420"], ["Silver", "#b6b7b3"], ["Black", "#111214"]].map(([name, hex]) => ({ name, hex })),
};

const seeds: Seed[] = [
  ["ferrari-296-gtb", "Ferrari", "296 GTB", "Auto", "Supercar", "da € 275.000", "mercato verificato · 21/08/2026", 830, "2,9 s", "RWD", 2025, 4000, "Ibrida / Benzina", "F1 doppia frizione", "ferrari"],
  ["lamborghini-revuelto", "Lamborghini", "Revuelto", "Auto", "Hypercar", "da € 569.000", "mercato 2025 · dealer verificati", 1015, "2,5 s", "AWD", 2025, 6348, "Ibrida / Benzina", "Doppia frizione", "lamborghini"],
  ["porsche-911-carrera", "Porsche", "911 Carrera Coupé", "Auto", "Sports car", "da € 130.900", "listino € 142.855 · mercato verificato", 394, "4,1 s", "RWD", 2025, 28900, "Benzina", "PDK automatico", "porsche"],
  ["porsche-taycan-4", "Porsche", "Taycan 4 Black Edition", "Auto", "Electric performance", "da € 127.900", "mercato 2026 · dealer Porsche", 435, "EV performance", "AWD", 2026, 3990, "Elettrica", "Automatico", "taycan"],
  ["mercedes-amg-gt-43", "Mercedes-AMG", "GT 43 Coupé", "Auto", "Premium performance", "da € 112.890", "mercato europeo 2026", 421, "AMG", "RWD", 2026, 9300, "Benzina", "Automatico", "amg"],
  ["bmw-m3-competition-xdrive", "BMW", "M3 Competition xDrive", "Auto", "Premium performance", "€ 115.100", "listino Italia · mercato da € 88.890*", 530, "M xDrive", "AWD", 2026, 0, "Benzina", "M Steptronic", "bmw"],
  ["bmw-m2", "BMW", "M2", "Auto", "Sports compact", "da € 75.800", "mercato 2026 · 480 CV", 480, "M Coupé", "RWD", 2026, 0, "Benzina", "Automatico / Manuale", "bmw"],
  ["audi-rs3-sportback", "Audi", "RS 3 Sportback", "Auto", "Sports compact", "da € 63.900", "mercato 2026 · pronta consegna", 400, "quattro", "AWD", 2026, 1, "Benzina", "S tronic", "audi"],
  ["alfa-giulia-quadrifoglio", "Alfa Romeo", "Giulia Quadrifoglio", "Auto", "Premium performance", "da € 79.800", "mercato 2026 · 520 CV", 520, "V6 biturbo", "RWD", 2026, 1, "Benzina", "Automatico", "alfa"],
  ["volkswagen-golf-gti", "Volkswagen", "Golf GTI", "Auto", "Hot hatch", "da € 40.490", "mercato 2026 · 265 CV", 265, "GTI", "FWD", 2026, 10, "Benzina", "DSG", "golf"],
  ["fiat-500-hybrid-pop", "Fiat", "500 Hybrid Pop", "Auto", "Urban", "€ 19.900", "listino · mercato da € 14.900 con condizioni", 65, "Hybrid urban", "FWD", 2026, 0, "Ibrida / Benzina", "Manuale", "fiat"],
  ["toyota-yaris-hybrid-115", "Toyota", "Yaris Hybrid 115", "Auto", "Urban", "€ 24.750", "listino · mercato da € 20.900", 116, "Full hybrid", "FWD", 2026, 0, "Ibrida / Benzina", "e-CVT", "toyota"],

  ["ducati-panigale-v4-s", "Ducati", "Panigale V4 S", "Moto", "Superbike", "da € 33.990", "listino € 34.690", 216, "Superbike", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "ducati"],
  ["ducati-streetfighter-v4", "Ducati", "Streetfighter V4", "Moto", "Hyper naked", "da € 24.790", "listino € 25.290", 214, "Streetfighter", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "ducatiDark"],
  ["ducati-multistrada-v4-s", "Ducati", "Multistrada V4 S", "Moto", "Adventure", "da € 24.500", "listino € 25.490", 170, "Adventure GT", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "ducatiDark"],
  ["ducati-monster-890", "Ducati", "Monster 890", "Moto", "Naked", "da € 11.490", "listino € 12.980 · dealer 20/08", 111, "Naked", "Catena", 2026, 0, "Benzina", "6 marce", "ducatiDark"],
  ["bmw-m-1000-rr", "Bmw", "M 1000 RR", "Moto", "Superbike", "€ 37.450", "listino · dealer da € 37.910", 218, "M superbike", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["bmw-s-1000-rr", "Bmw", "S 1000 RR", "Moto", "Superbike", "da € 20.900", "listino € 21.650", 210, "RR", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["aprilia-rsv4-factory", "Aprilia", "RSV4 1100 Factory", "Moto", "Superbike", "da € 25.100", "listino € 27.100", 220, "V4 Factory", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["aprilia-tuono-v4-factory", "Aprilia", "Tuono V4 Factory", "Moto", "Hyper naked", "da € 19.600", "listino € 21.100", 180, "V4 naked", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["aprilia-rs-660", "Aprilia", "RS 660", "Moto", "Sport", "da € 10.900", "listino € 11.900", 105, "Middleweight sport", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["yamaha-yzf-r1-race", "Yamaha", "YZF-R1 Race", "Moto", "Superbike", "€ 20.499", "listino e dealer verificati", 200, "Race", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["yamaha-mt-09-sp", "Yamaha", "MT-09 SP", "Moto", "Naked", "€ 13.099", "listino e dealer verificati", 119, "SP", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["yamaha-tenere-700", "Yamaha", "Ténéré 700", "Moto", "Adventure", "€ 10.999", "dealer ufficiali · agosto 2026", 73, "CP2 adventure", "Catena", 2026, 0, "Benzina", "6 marce", "motoDark"],
  ["honda-fireblade-sp", "Honda", "CBR1000RR-R Fireblade SP", "Moto", "Superbike", "€ 27.490", "dealer ufficiali · pronta consegna", 217, "HRC superbike", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["honda-cb1000-hornet-sp", "Honda", "CB1000 Hornet SP", "Moto", "Naked", "€ 11.990", "dealer ufficiali · pronta consegna", 157, "SP naked", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["kawasaki-zx-10r", "Kawasaki", "Ninja ZX-10R", "Moto", "Superbike", "€ 18.990", "dealer ufficiali · agosto 2026", 203, "WorldSBK DNA", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "kawasaki"],
  ["kawasaki-z900", "Kawasaki", "Z900", "Moto", "Naked", "da € 9.190", "listino € 9.990 · promo dealer", 124, "Z naked", "Catena", 2026, 0, "Benzina", "6 marce", "kawasaki"],
  ["triumph-speed-triple-1200-rs", "Triumph", "Speed Triple 1200 RS", "Moto", "Hyper naked", "da € 20.295", "listino € 20.495", 183, "Triple RS", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["ktm-1390-super-duke-r-evo", "KTM", "1390 Super Duke R EVO", "Moto", "Hyper naked", "da € 20.990", "listino € 22.990", 190, "The Beast", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["suzuki-hayabusa", "Suzuki", "Hayabusa", "Moto", "Sport touring", "€ 19.990", "listino 2026 verificato", 190, "1340 cc", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
  ["mv-agusta-superveloce-1000", "MV Agusta", "Superveloce 1000 Serie Oro", "Moto", "Collector", "€ 70.700", "listino · usato quasi nuovo da € 72.000", 208, "Serie Oro", "Catena", 2026, 0, "Benzina", "6 marce / quickshifter", "motoDark"],
];

export const vehicles: Vehicle[] = seeds.map(([slug, brand, model, category, segment, price, priceNote, hp, performance, drivetrain, year, mileageKm, fuel, transmission, imageKey]) => ({
  slug,
  marketplaceSlug: slug,
  brand,
  model,
  category,
  segment,
  label: segment,
  price,
  monthly: priceNote,
  power: `${hp} CV`,
  performance,
  drivetrain,
  status: "Market Intelligence V0.5",
  year,
  mileageKm,
  powerHp: hp,
  fuel,
  transmission,
  colors: palettes[brand] ?? [{ name: "Nero", hex: "#111111" }, { name: "Bianco", hex: "#eeeeea" }, { name: "Rosso", hex: "#a51622" }],
  image: images[imageKey],
  imageAlt: `Visual editoriale per ${brand} ${model}`,
  imagePage: pageForImage[imageKey],
  credit: "Unsplash · visual editoriale",
}));

export const featuredVehicles = [
  vehicles.find((v) => v.slug === "lamborghini-revuelto")!,
  vehicles.find((v) => v.slug === "ferrari-296-gtb")!,
  vehicles.find((v) => v.slug === "porsche-911-carrera")!,
  vehicles.find((v) => v.slug === "ducati-panigale-v4-s")!,
];

export function getVehicle(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getBrands(category: VehicleCategory) {
  return [...new Set(vehicles.filter((vehicle) => vehicle.category === category).map((vehicle) => vehicle.brand))].sort((a, b) => a.localeCompare(b, "it"));
}
