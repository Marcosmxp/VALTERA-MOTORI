export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  category: "Auto" | "Moto";
  price: string;
  monthly: string;
  power: string;
  zeroToHundred: string;
  image: string;
  imageAlt: string;
};

export const vehicles: Vehicle[] = [
  {
    slug: "porsche-911-gt3",
    brand: "Porsche",
    model: "911 GT3",
    category: "Auto",
    price: "da €215.543",
    monthly: "da €2.190/mese",
    power: "510 CV",
    zeroToHundred: "3,4 s",
    image:
      "https://images.unsplash.com/photo-1762195347699-a842c3dd15e7?auto=format&fit=crop&fm=jpg&q=82&w=1800",
    imageAlt: "Porsche nero in uno showroom premium",
  },
  {
    slug: "ferrari-selection",
    brand: "Ferrari",
    model: "Selection",
    category: "Auto",
    price: "su richiesta",
    monthly: "consulenza dedicata",
    power: "Performance",
    zeroToHundred: "Su misura",
    image:
      "https://images.unsplash.com/photo-1776102669015-21d5f6c0cdf8?auto=format&fit=crop&fm=jpg&q=82&w=1800",
    imageAlt: "Supercar Ferrari in uno showroom scuro",
  },
  {
    slug: "ducati-panigale-v4",
    brand: "Ducati",
    model: "Panigale V4",
    category: "Moto",
    price: "da €29.490",
    monthly: "da €389/mese",
    power: "216 CV",
    zeroToHundred: "Racing DNA",
    image:
      "https://images.unsplash.com/photo-1650487371432-2dffda8be065?auto=format&fit=crop&fm=jpg&q=82&w=1800",
    imageAlt: "Ducati sportiva nera in ambiente industriale",
  },
];
