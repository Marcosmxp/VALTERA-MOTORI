import { getVehicle } from "@/data/vehicles";

export type ProductFocus = "front" | "powertrain" | "wheel" | "cockpit";
export type ProductStage = { id: string; index: string; label: string; title: string; text: string; metric: string; metricLabel: string; focus: ProductFocus };
export type ProductExperience = { scenarioId: string; eyebrow: string; subtitle: string; heroImage: string; imageAlt: string; imagePage: string; credit: string; stages: ProductStage[] };

const overrides: Record<string, Partial<Pick<ProductExperience, "eyebrow" | "subtitle">>> = {
  "ferrari-296-gtb": { eyebrow: "Hybrid supercar · Market Intelligence", subtitle: "Tecnica, design e prezzo convivono nello stesso percorso: prima il prodotto, poi il mercato verificato." },
  "lamborghini-revuelto": { eyebrow: "V12 hybrid · Hypercar intelligence", subtitle: "La Revuelto entra in scena per dettagli progressivi e termina nel confronto tra annunci realmente pubblicati." },
  "porsche-911-carrera": { eyebrow: "Gran Turismo · Market Intelligence", subtitle: "La 911 viene presentata come prodotto e contemporaneamente come decisione d'acquisto: tecnica, prezzo, chilometraggio e fonte." },
};

export function getProductExperience(scenarioId: string): ProductExperience | undefined {
  const vehicle = getVehicle(scenarioId);
  if (!vehicle) return undefined;
  const isMoto = vehicle.category === "Moto";
  const stages: ProductStage[] = [
    {
      id: "design", index: "01", label: isMoto ? "Frontale & aerodinamica" : "Design & aerodinamica",
      title: isMoto ? "La forma nasce per tagliare l'aria." : "Le proporzioni entrano in primo piano.",
      text: `Lo scroll concentra lo sguardo sul frontale di ${vehicle.brand} ${vehicle.model}. Il visual è editoriale: non viene presentato come CAD o ricostruzione tecnica del costruttore.`,
      metric: vehicle.performance, metricLabel: vehicle.segment, focus: "front",
    },
    {
      id: "powertrain", index: "02", label: "Powertrain", title: "La prestazione diventa un dato confrontabile.",
      text: `${vehicle.powerHp} CV, ${vehicle.fuel.toLowerCase()} e ${vehicle.transmission.toLowerCase()} entrano nella stessa esperienza usata dal Similarity Score per evitare confronti superficiali.`,
      metric: `${vehicle.powerHp} CV`, metricLabel: vehicle.fuel, focus: "powertrain",
    },
    {
      id: "chassis", index: "03", label: isMoto ? "Ciclistica & controllo" : "Telaio, ruote & controllo", title: "Il dettaglio serve alla decisione.",
      text: `Ruote, appoggio e trazione ${vehicle.drivetrain} diventano il punto visivo della scena. Su desktop il visual resta sticky; su mobile il movimento viene alleggerito.`,
      metric: vehicle.drivetrain, metricLabel: isMoto ? "trasmissione finale" : "trazione", focus: "wheel",
    },
    {
      id: "cockpit", index: "04", label: isMoto ? "Posto guida" : "Cockpit", title: "Dall'emozione al mercato, senza cambiare contesto.",
      text: `L'ultimo passaggio chiude l'esplorazione di ${vehicle.model} e apre immediatamente prezzi, fonti, delta e storico delle osservazioni tracciabili.`,
      metric: vehicle.transmission, metricLabel: "trasmissione", focus: "cockpit",
    },
  ];
  return {
    scenarioId,
    eyebrow: overrides[scenarioId]?.eyebrow ?? `${vehicle.segment} · Valtera Market Intelligence`,
    subtitle: overrides[scenarioId]?.subtitle ?? `Esperienza completa di ${vehicle.brand} ${vehicle.model}: colori, dettaglio progressivo, prezzo reale e confronto tra fonti pubbliche.`,
    heroImage: vehicle.image,
    imageAlt: vehicle.imageAlt,
    imagePage: vehicle.imagePage,
    credit: vehicle.credit,
    stages,
  };
}
