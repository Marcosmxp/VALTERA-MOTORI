export const realVehicleImageSlugs = new Set([
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
] as const);

export function getRealVehicleImage(slug: string) {
  if (!realVehicleImageSlugs.has(slug as never)) return null;

  return `https://res.cloudinary.com/dgpteian1/image/upload/f_auto,q_auto,w_2200/valtera/real-vehicles/${slug}.webp`;
}
