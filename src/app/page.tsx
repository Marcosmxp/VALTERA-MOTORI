import Link from "next/link";
import { BrandCatalog } from "@/components/brand-catalog";
import { CinematicShowcase } from "@/components/cinematic-showcase";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MarketIntelligence } from "@/components/market-intelligence";
import { Reveal } from "@/components/reveal";

const serviceMetrics = [["01", "Inventory", "52 prodotti tra auto e moto, organizzati per marca, famiglia, versione e segmento."], ["02", "Filtri reali", "Marca, famiglia, segmento, prezzo, potenza, anno e ordinamento sullo stesso dataset."], ["03", "Market Intelligence", "Listino, promo, dealer, storico e condizioni restano separati e verificabili."], ["04", "Color AI", "Una foto base può generare varianti di vernice offline, pubblicate solo dopo revisione."]] as const;

export default function Home() {
  return <main>
    <Header /><Hero />
    <section className="brand-marquee" aria-label="Valtera services"><div><span>INVENTORY INTELLIGENCE</span><i>•</i><span>52 PRODOTTI</span><i>•</i><span>32 AUTO</span><i>•</i><span>20 MOTO</span><i>•</i><span>LIVE PRICE HISTORY</span><i>•</i><span>AI COLOR PIPELINE</span><i>•</i><span>FONTI VERIFICABILI</span></div></section>
    <section className="statement section-pad" aria-labelledby="statement-title"><Reveal><div className="statement-grid"><p className="eyebrow dark">Inventory Intelligence · V0.6</p><h2 id="statement-title">Dalla famiglia alla versione. Dal listino allo storico reale.</h2><p className="statement-copy">La V0.6 trasforma Valtera in un inventario interrogabile: più versioni dello stesso modello, filtri reali, prezzi classificati per natura e un collector che costruisce il tempo invece di mostrare solo uno snapshot.</p></div></Reveal><div className="service-grid">{serviceMetrics.map(([number, title, text], index) => <Reveal key={title} delay={index * .04}><article className="service-item"><span>{number}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></section>
    <CinematicShowcase />

    <section id="auto" className="catalog section-pad" aria-labelledby="auto-title"><Reveal className="section-heading"><div><p className="eyebrow dark">Automobili · 32 versioni</p><h2 id="auto-title">Exotic, premium, sport, SUV e popolari.</h2></div><div className="section-heading-side"><p>Filtra per marca, famiglia, segmento, prezzo, potenza e anno. Macan, Golf, Grande Panda e Junior ora mostrano più versioni nello stesso sistema.</p><Link className="text-link dark-link" href="#confronta">Market Intelligence ↗</Link></div></Reveal><BrandCatalog category="Auto" /><p className="data-disclaimer">Prezzi classificati come listino, promozione o mercato. Gli asterischi indicano valori legati a condizioni specifiche della fonte, come finanziamento o rottamazione.</p></section>

    <section id="moto" className="catalog section-pad section-dark" aria-labelledby="moto-title"><Reveal className="section-heading"><div><p className="eyebrow">Valtera Moto · 20 modelli</p><h2 id="moto-title">Superbike, naked, adventure e collector.</h2></div><p className="section-quiet-copy">Ducati, BMW, Aprilia, Yamaha, Honda, Kawasaki, Triumph, KTM, Suzuki e MV Agusta condividono filtri, product experience e storico prezzo. Il collector V0.6 include anche fonti moto.</p></Reveal><BrandCatalog category="Moto" /></section>

    <MarketIntelligence />
    <section id="showroom" className="showroom" aria-labelledby="showroom-title"><div className="showroom-media" aria-hidden="true" /><Reveal className="showroom-content"><p className="eyebrow">Showroom digitale · Milano</p><h2 id="showroom-title">L&apos;emozione resta. I dati diventano più rigorosi.</h2><div className="showroom-points"><span>52 prodotti</span><span>Filtri reali</span><span>23 fonti monitorate</span><span>Color AI offline</span></div></Reveal></section>
    <section id="contatto" className="conversion section-pad" aria-labelledby="conversion-title"><Reveal><div className="conversion-kicker"><span>VALTERA CONCIERGE</span><span>Concept portfolio · Italia</span></div><h2 id="conversion-title">Filtra. Confronta. Guarda il prezzo nel tempo.</h2><p>La V0.6 continua senza raccolta di dati personali. Prezzi e promozioni rimandano alle fonti pubbliche e non costituiscono offerte Valtera.</p><div className="conversion-actions"><button className="button button-dark" type="button" disabled>Richiedi una proposta — presto</button><Link className="button button-outline-dark" href="#confronta">Apri il comparatore</Link></div></Reveal></section>
    <footer className="footer"><div className="brand footer-brand"><span className="brand-mark">V</span><span>VALTERA MOTORI</span></div><div><p>Concept portfolio · Milano, Italia · V0.6</p><p>Marchi citati appartengono ai rispettivi titolari.</p></div><p>Inventory + live market history · fonti pubbliche.</p></footer>
  </main>;
}
