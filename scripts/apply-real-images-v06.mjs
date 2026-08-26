import fs from "node:fs";

const file = "src/data/vehicles.ts";
let source = fs.readFileSync(file, "utf8");

const expectedSlugs = [
  "ferrari-296-gtb",
  "lamborghini-revuelto",
  "porsche-911-carrera",
  "porsche-taycan-4",
  "mercedes-amg-gt-43",
  "bmw-m3-competition-xdrive",
  "bmw-m2",
  "audi-rs3-sportback",
  "alfa-giulia-quadrifoglio",
  "volkswagen-golf-gti",
  "fiat-500-hybrid-pop",
  "toyota-yaris-hybrid-115",
  "ducati-panigale-v4-s",
  "ducati-streetfighter-v4",
  "ducati-multistrada-v4-s",
  "ducati-monster-890",
  "bmw-m-1000-rr",
  "bmw-s-1000-rr",
  "aprilia-rsv4-factory",
  "aprilia-tuono-v4-factory",
  "aprilia-rs-660",
  "yamaha-yzf-r1-race",
  "yamaha-mt-09-sp",
  "yamaha-tenere-700",
  "honda-fireblade-sp",
  "honda-cb1000-hornet-sp",
  "kawasaki-zx-10r",
  "kawasaki-z900",
  "triumph-speed-triple-1200-rs",
  "ktm-1390-super-duke-r-evo",
  "suzuki-hayabusa",
  "mv-agusta-superveloce-1000",
];

const realImagesBlock = `type RealVehicleSource = { page: string; credit: string };

const realVehicleCdn = (slug: string) =>
  "https://res.cloudinary.com/dgpteian1/image/upload/f_auto,q_auto,w_2200/valtera/real-vehicles/" + slug + ".webp";

const realVehicleSources: Record<string, RealVehicleSource> = {
  "ferrari-296-gtb": { page: "https://www.ilsecoloxix.it/motori/2022/03/07/news/ferrari-296-gtb-la-prova-su-strada-e-in-pista-1.41281385", credit: "Il Secolo XIX · foto reale del modello" },
  "lamborghini-revuelto": { page: "https://www.lamborghini-ried.at/blog/17493/lamboghini-revuelto-austattung/", credit: "Lamborghini Ried · foto reale del modello" },
  "porsche-911-carrera": { page: "https://www.diepresse.com/19044441/auch-basis-muss-sein-porsche-911-ohne-chichi", credit: "Die Presse · foto reale del modello" },
  "porsche-taycan-4": { page: "https://westlake.porsche.com/en/inventory/porsche/porsche-taycan-black-edition-new-WZ0E2L", credit: "Porsche Finder · foto reale del modello" },
  "mercedes-amg-gt-43": { page: "https://autopapo.com.br/curta/mercedes-amg-gt-43/", credit: "AutoPapo · foto reale del modello" },
  "bmw-m3-competition-xdrive": { page: "https://kalisz.premiumarena.pl/samochody/nowe-bmw/show/BMW-M3-BMW-M3-Competition-M-xDrive-Sedan-Demo-G80", credit: "BMW Premium Arena Kalisz · foto reale del modello" },
  "bmw-m2": { page: "https://paultan.org/2023/01/17/2023-bmw-m2-launched-in-malaysia/", credit: "paultan.org · foto reale del modello" },
  "audi-rs3-sportback": { page: "https://manofmany.com/auto/cars/2025-audi-rs-3-review", credit: "Man of Many · foto reale del modello" },
  "alfa-giulia-quadrifoglio": { page: "https://web.motormagazine.co.jp/_ct/17705093", credit: "Motor Magazine · foto reale del modello" },
  "volkswagen-golf-gti": { page: "https://www.slashgear.com/1411851/best-new-hatchbacks-you-can-buy/", credit: "SlashGear · foto reale do modelo" },
  "fiat-500-hybrid-pop": { page: "https://tr.motor1.com/news/779910/fiat-500-hybrid-resmen-tanitildi/", credit: "Motor1 · foto reale del modello" },
  "toyota-yaris-hybrid-115": { page: "https://www.toyota-oslo.no/kampanjer/personbil/yaris", credit: "Toyota Oslo · foto reale del modello" },
  "ducati-panigale-v4-s": { page: "https://www.1000ps.at/modellnews-id-3011864-motorrad-neuheiten-2025-im-ueberblick", credit: "1000PS · foto reale del modello" },
  "ducati-streetfighter-v4": { page: "https://www.24h.com.vn/xe-may-xe-dap/ktm-1290-super-duke-r-vs-ducati-streetfighter-v4-naked-bike-tien-ty-nen-chon-xe-nao-c748a1588158.html", credit: "24h · foto reale del modello" },
  "ducati-multistrada-v4-s": { page: "https://www.revzilla.com/common-tread/2025-ducati-multistrada-v4-s-first-ride-review", credit: "RevZilla · foto reale del modello" },
  "ducati-monster-890": { page: "https://www.brm.co.nz/ducati-unveils-2026-monster-with-new-890cc-v2-engine/", credit: "BRM · foto reale del modello" },
  "bmw-m-1000-rr": { page: "https://www.1000ps.at/motorradvergleich-bmw-m-1000-rr-2026-vs-yamaha-r1-2012-478915", credit: "1000PS · foto reale del modello" },
  "bmw-s-1000-rr": { page: "https://www.cyclenews.com/2024/10/article/2025-bmw-s-1000-rr-first-look-and-specs/", credit: "Cycle News · foto reale del modello" },
  "aprilia-rsv4-factory": { page: "https://www.motorcyclenews.com/bike-reviews/aprilia/rsv4-1100-factory/2025/", credit: "MCN · foto reale del modello" },
  "aprilia-tuono-v4-factory": { page: "https://www.motorcyclenews.com/bike-reviews/aprilia/tuono-v4-1100-factory/2021/", credit: "MCN · foto reale del modello" },
  "aprilia-rs-660": { page: "https://www.motofichas.com/comparativa/aprilia/rs-660/honda/cbr650r-2019", credit: "MotoFichas · foto reale del modello" },
  "yamaha-yzf-r1-race": { page: "https://www.hdmotori.it/yamaha-articoli-n593372-yamaha-r1-race-2025-caratteristiche-motore-foto/", credit: "HDmotori · foto reale del modello" },
  "yamaha-mt-09-sp": { page: "https://www.willhaben.at/iad/gebrauchtwagen/d/motorrad/yamaha-mt-09-sp-lagernd-naked-bike-1228016274/", credit: "willhaben · foto reale del modello" },
  "yamaha-tenere-700": { page: "https://www.caradisiac.com/l-avis-de-la-redaction-sur-la-yamaha-tenere-700-2025-215117.htm", credit: "Caradisiac · foto reale del modello" },
  "honda-fireblade-sp": { page: "https://www.motorcyclenews.com/bike-reviews/honda/cbr1000rr-r-fireblade-sp/2024/", credit: "MCN · foto reale del modello" },
  "honda-cb1000-hornet-sp": { page: "https://www.motoplanete.com/honda/11944/CB-1000-Hornet-SP-2026/contact.html", credit: "MotoPlanete · foto reale del modello" },
  "kawasaki-zx-10r": { page: "https://www.kawasaki.es/es/products/Supersport/2025/Ninja_ZX-10R/overview", credit: "Kawasaki Europe · foto reale del modello" },
  "kawasaki-z900": { page: "https://www.kawasaki.ch/de/products/category/2025/Z900/overview", credit: "Kawasaki Europe · foto reale del modello" },
  "triumph-speed-triple-1200-rs": { page: "https://www.motoconcess.com/occasion/roadster/triumph/2319086-speed-triple-1200-rs-2022-1160-cm3-doubs", credit: "MotoConcess · foto reale del modello" },
  "ktm-1390-super-duke-r-evo": { page: "https://www.motorradundreisen.de/motorraeder/ktm-1390-super-duke-r-evo-superlativ-zwei-raedern/7991/", credit: "Motorrad & Reisen · foto reale del modello" },
  "suzuki-hayabusa": { page: "https://www.sturgismotorsports.net/New-Inventory-2026-Suzuki-Motorcycle-Scooter-Hayabusa-Sturgis-Motorsports-18106192", credit: "Sturgis Motorsports · foto reale del modello" },
  "mv-agusta-superveloce-1000": { page: "https://www.bikesales.com.au/editorial/details/mv-agusta-superveloce-1000-serie-oro-revealed-146715/", credit: "bikesales · foto reale del modello" },
};`;

for (const slug of expectedSlugs) {
  if (!source.includes(`["${slug}",`)) {
    throw new Error(`Vehicle slug missing from seeds: ${slug}`);
  }
}

if (!source.includes("const realVehicleSources:")) {
  const marker = "const palettes: Record<string, VehicleColor[]> = {";
  if (!source.includes(marker)) throw new Error("Could not find palettes marker");
  source = source.replace(marker, realImagesBlock + "\n\n" + marker);
}

const oldImageBlock = `  image: images[imageKey],
  imageAlt: \`Visual editoriale per \${brand} \${model}\`,
  imagePage: pageForImage[imageKey],
  credit: "Unsplash · visual editoriale",`;

const newImageBlock = `  image: realVehicleCdn(slug),
  imageAlt: \`Foto reale di \${brand} \${model}\`,
  imagePage: realVehicleSources[slug]?.page ?? pageForImage[imageKey],
  credit: realVehicleSources[slug]?.credit ?? "Fonte fotografica reale",`;

if (source.includes(oldImageBlock)) {
  source = source.replace(oldImageBlock, newImageBlock);
} else if (!source.includes("image: realVehicleCdn(slug)")) {
  throw new Error("Could not find image mapping block");
}

source = source.replace('status: "Market Intelligence V0.5",', 'status: "Market Intelligence V0.6",');

const sourceEntries = [...realImagesBlock.matchAll(/^  "([^"]+)": \{/gm)].map((m) => m[1]);
if (sourceEntries.length !== expectedSlugs.length || new Set(sourceEntries).size !== expectedSlugs.length) {
  throw new Error(`Expected ${expectedSlugs.length} unique real-image mappings, got ${sourceEntries.length}`);
}
for (const slug of expectedSlugs) {
  if (!sourceEntries.includes(slug)) throw new Error(`Missing real-image metadata for ${slug}`);
}

fs.writeFileSync(file, source);
console.log(`Applied ${expectedSlugs.length} model-specific real vehicle images.`);
