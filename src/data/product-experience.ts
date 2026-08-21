export type ProductFocus = "front" | "powertrain" | "wheel" | "cockpit";

export type ProductStage = {
  id: string;
  index: string;
  label: string;
  title: string;
  text: string;
  metric: string;
  metricLabel: string;
  focus: ProductFocus;
};

export type ProductExperience = {
  scenarioId: string;
  eyebrow: string;
  subtitle: string;
  heroImage: string;
  imageAlt: string;
  imagePage: string;
  credit: string;
  stages: ProductStage[];
};

export const productExperiences: ProductExperience[] = [
  {
    scenarioId: "ferrari-296-gtb",
    eyebrow: "Hybrid supercar · Market Intelligence",
    subtitle: "Un percorso tecnico-editoriale che accompagna il confronto commerciale: prima senti il prodotto, poi verifichi prezzo, fonte e posizione di mercato.",
    heroImage: "https://images.unsplash.com/photo-1681322540912-cdae3ff40726?auto=format&fit=crop&fm=jpg&q=88&w=2600",
    imageAlt: "Ferrari 296 GTB rossa in ambiente premium",
    imagePage: "https://unsplash.com/photos/y872ENm67yY",
    credit: "Piotr AMS",
    stages: [
      { id: "aero", index: "01", label: "Aerodinamica", title: "Il flusso prima della forza.", text: "Lo scroll porta il focus sulla zona anteriore e sulla forma della carrozzeria. Il visual non pretende di essere un CAD: è una lettura editoriale del veicolo pensata per far percepire proporzioni e funzione.", metric: "2,9 s", metricLabel: "0–100 km/h", focus: "front" },
      { id: "powertrain", index: "02", label: "Powertrain ibrido", title: "V6 ed elettrico lavorano come un solo sistema.", text: "Il secondo passaggio stringe l'inquadratura verso il centro vettura e lega la narrazione alla potenza dichiarata del modello. I dati commerciali rimangono separati dalle informazioni tecniche.", metric: "830 CV", metricLabel: "potenza di sistema", focus: "powertrain" },
      { id: "chassis", index: "03", label: "Assetto & controllo", title: "La prestazione deve arrivare a terra.", text: "Ruota, frenata e appoggio diventano il punto visivo della scena. L'animazione usa zoom, maschere e callout per mostrare parti del veicolo senza caricare un modello 3D pesante nella V0.4.", metric: "RWD", metricLabel: "trazione", focus: "wheel" },
      { id: "cockpit", index: "04", label: "Cockpit", title: "Dalla macchina al posto guida.", text: "L'ultimo movimento porta l'attenzione verso l'abitacolo e chiude la parte emozionale. Da qui l'utente entra direttamente nello storico prezzi e nelle offerte verificate.", metric: "F1 DCT", metricLabel: "trasmissione", focus: "cockpit" },
    ],
  },
  {
    scenarioId: "porsche-911-carrera",
    eyebrow: "Gran Turismo · Market Intelligence",
    subtitle: "La 911 viene presentata come prodotto e contemporaneamente come decisione d'acquisto: tecnica, prezzo, chilometraggio e finanziamento nello stesso percorso.",
    heroImage: "https://images.unsplash.com/photo-1775582524168-75b2c30e016f?auto=format&fit=crop&fm=jpg&q=88&w=2600",
    imageAlt: "Porsche 911 nera in showroom premium",
    imagePage: "https://unsplash.com/photos/OMSIShXyzi0",
    credit: "Ishaan Sen",
    stages: [
      { id: "aero", index: "01", label: "Forma & aero", title: "Un profilo riconoscibile, letto da vicino.", text: "La scena parte dalla zona anteriore e usa movimento controllato per evidenziare il volume della 911. Il contenuto visuale è editoriale e non sostituisce la scheda tecnica del costruttore.", metric: "2025", metricLabel: "anno scenario", focus: "front" },
      { id: "powertrain", index: "02", label: "Boxer 3.0", title: "La potenza entra nella comparazione.", text: "Il focus centrale introduce i 394 CV usati nel Similarity Score. In questo modo l'effetto cinematografico non vive separato dai dati che determinano se due annunci sono davvero comparabili.", metric: "394 CV", metricLabel: "potenza", focus: "powertrain" },
      { id: "chassis", index: "03", label: "Telaio & ruota", title: "Ogni dettaglio deve avere una ragione.", text: "L'inquadratura si sposta sulla ruota e trasforma una semplice fotografia in un'esperienza di ispezione. Su desktop il visual resta sticky; su mobile il comportamento viene alleggerito senza perdere la narrativa.", metric: "RWD", metricLabel: "trazione", focus: "wheel" },
      { id: "cockpit", index: "04", label: "Cockpit & PDK", title: "La parte emozionale finisce dove inizia la decisione.", text: "L'ultima fase porta al cockpit e poi allo storico prezzi. Il cliente può passare dall'interesse al confronto con Supercar.SM, Autotorino e benchmark senza cambiare contesto.", metric: "Auto", metricLabel: "trasmissione", focus: "cockpit" },
    ],
  },
];

export function getProductExperience(scenarioId: string) {
  return productExperiences.find((item) => item.scenarioId === scenarioId);
}
