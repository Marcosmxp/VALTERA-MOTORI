export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  category: "Auto" | "Moto";
  label: string;
  price: string;
  monthly: string;
  power: string;
  performance: string;
  drivetrain: string;
  status: string;
  image: string;
  imageAlt: string;
  imagePage: string;
  credit: string;
};

export const vehicles: Vehicle[] = [
  {
    slug: "porsche-911-carrera-gts",
    brand: "Porsche",
    model: "911 Carrera GTS",
    category: "Auto",
    label: "Gran Turismo",
    price: "da € 190.000*",
    monthly: "configurazione su misura",
    power: "Performance",
    performance: "911 DNA",
    drivetrain: "Posteriore / AWD",
    status: "Selection demo",
    image: "https://images.unsplash.com/photo-1775582524168-75b2c30e016f?auto=format&fit=crop&fm=jpg&q=82&w=2200",
    imageAlt: "Porsche 911 nero esposto in showroom",
    imagePage: "https://unsplash.com/photos/OMSIShXyzi0",
    credit: "Ishaan Sen",
  },
  {
    slug: "ferrari-296-gtb",
    brand: "Ferrari",
    model: "296 GTB",
    category: "Auto",
    label: "Hybrid supercar",
    price: "su richiesta*",
    monthly: "consulenza dedicata",
    power: "830 CV",
    performance: "2,9 s",
    drivetrain: "RWD",
    status: "Selection demo",
    image: "https://images.unsplash.com/photo-1681322540912-cdae3ff40726?auto=format&fit=crop&fm=jpg&q=82&w=2200",
    imageAlt: "Ferrari 296 GTB rossa in garage",
    imagePage: "https://unsplash.com/photos/y872ENm67yY",
    credit: "Piotr AMS",
  },
  {
    slug: "porsche-911-gt3",
    brand: "Porsche",
    model: "911 GT3",
    category: "Auto",
    label: "Track focused",
    price: "da € 215.000*",
    monthly: "configurazione su misura",
    power: "510 CV",
    performance: "3,4 s",
    drivetrain: "RWD",
    status: "Selection demo",
    image: "https://images.unsplash.com/photo-1762195347699-a842c3dd15e7?auto=format&fit=crop&fm=jpg&q=82&w=2200",
    imageAlt: "Porsche sportiva nera in ambiente premium",
    imagePage: "https://unsplash.com/s/photos/porsche-911-gt3",
    credit: "Unsplash community",
  },
  {
    slug: "ducati-panigale-v4",
    brand: "Ducati",
    model: "Panigale V4",
    category: "Moto",
    label: "Superbike",
    price: "da € 29.000*",
    monthly: "test ride su richiesta",
    power: "216 CV",
    performance: "Racing DNA",
    drivetrain: "Chain drive",
    status: "Selection demo",
    image: "https://images.unsplash.com/photo-1727951298405-7d2a88ce986c?auto=format&fit=crop&fm=jpg&q=82&w=2200",
    imageAlt: "Ducati Panigale V4 rossa in ambiente scuro",
    imagePage: "https://unsplash.com/photos/KeWhJhFiJaE",
    credit: "Abhijeet Barak",
  },
  {
    slug: "ducati-selection",
    brand: "Ducati",
    model: "Performance Selection",
    category: "Moto",
    label: "Valtera Moto",
    price: "su richiesta*",
    monthly: "consulenza dedicata",
    power: "Sport",
    performance: "Italian DNA",
    drivetrain: "Moto",
    status: "Selection demo",
    image: "https://images.unsplash.com/photo-1650487371432-2dffda8be065?auto=format&fit=crop&fm=jpg&q=82&w=2200",
    imageAlt: "Motocicletta sportiva nera in ambiente industriale",
    imagePage: "https://unsplash.com/s/photos/ducati-panigale-v4",
    credit: "Unsplash community",
  },
];

export const featuredVehicles = vehicles.slice(0, 4);
