import Link from "next/link";
import { BrandCatalog } from "@/components/brand-catalog";
import { CinematicShowcase } from "@/components/cinematic-showcase";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MarketIntelligence } from "@/components/market-intelligence";
import { Reveal } from "@/components/reveal";

const serviceMetrics = [["01", "Marche", "Dalle hypercar alle city car, organizzate per brand e categoria."], ["02", "Market Intelligence", "Listino, dealer, benchmark, data e condizioni nello stesso confronto."], ["03", "Product Experience", "Ogni modello apre colori e quattro atti cinematografici durante lo scroll."], ["04", "Moto", "20 modelli tra superbike, naked, adventure, sport e collector."]] as const;

export default function Home() {
  return <main>
    <Header /><Hero />
    <section className="brand-marquee" aria-label="Valtera services"><div><span>MULTIBRAND</span><i>•</i><span>32 MODELLI</span><i>•</i><span>MARKET INTELLIGENCE</span><i>•</i><span>COLORI</span><i>•</i><span>SCROLL EXPERIENCE</span><i>•</i><span>12 AUTO</span><i>•</i><span>20 MOTO</span><i>•</i><span>FONTI VERIFICABILI</span></div></section>
    <section className="statement section-pad" aria-labelledby="statement-title"><Reveal><div className="statement-grid"><p className="eyebrow dark">Multibrand market · V0.5</p><h2 id="statement-title">Dal marchio al modello. Dal colore al prezzo reale.</h2><p className="statement-copy">La V0.5 trasforma Valtera in un marketplace multimarca: categoria, marca, modello, palette, esperienza prodotto e confronto intelligente convivono nello stesso flusso.</p></div></Reveal><div className="service-grid">{serviceMetrics.map(([number, title, text], index) => <Reveal key={title} delay={index * .04}><article className="service-item"><span>{number}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></section>
    <CinematicShowcase />

    <section id="auto" className="catalog section-pad" aria-labelledby="auto-title"><Reveal className="section-heading"><div><p className="eyebrow dark">Automobili · 12 modelli</p><h2 id="auto-title">Exotic, premium, sport e popolari.</h2></div><div className="section-heading-side"><p>Seleziona una marca. Ogni auto apre una scheda con colori, scroll experience e prezzi pubblici confrontabili.</p><Link className="text-link dark-link" href="#confronta">Market Intelligence ↗</Link></div></Reveal><BrandCatalog category="Auto" /><p className="data-disclaimer">Prezzi snapshot al 21/08/2026. Listini, annunci e promozioni restano identificati separatamente; gli asterischi indicano valori che possono dipendere da condizioni specifiche della fonte.</p></section>

    <section id="moto" className="catalog section-pad section-dark" aria-labelledby="moto-title"><Reveal className="section-heading"><div><p className="eyebrow">Valtera Moto · 20 modelli</p><h2 id="moto-title">Superbike, naked, adventure e collector.</h2></div><p className="section-quiet-copy">Ducati, BMW, Aprilia, Yamaha, Honda, Kawasaki, Triumph, KTM, Suzuki e MV Agusta. Tutte usano lo stesso motore di esperienza e comparazione.</p></Reveal><BrandCatalog category="Moto" /></section>

    <MarketIntelligence />
    <section id="showroom" className="showroom" aria-labelledby="showroom-title"><div className="showroom-media" aria-hidden="true" /><Reveal className="showroom-content"><p className="eyebrow">Showroom digitale · Milano</p><h2 id="showroom-title">La parte emozionale non nasconde il prezzo. Lo prepara.</h2><div className="showroom-points"><span>32 prodotti</span><span>Brand explorer</span><span>Price evidence</span><span>Similarity Score</span></div></Reveal></section>
    <section id="contatto" className="conversion section-pad" aria-labelledby="conversion-title"><Reveal><div className="conversion-kicker"><span>VALTERA CONCIERGE</span><span>Concept portfolio · Italia</span></div><h2 id="conversion-title">Confronta prima. Decidi dopo.</h2><p>La V0.5 continua senza raccolta di dati personali. I prezzi sono riferimenti pubblici e non offerte Valtera.</p><div className="conversion-actions"><button className="button button-dark" type="button" disabled>Richiedi una proposta — presto</button><Link className="button button-outline-dark" href="#confronta">Apri il comparatore</Link></div></Reveal></section>
    <footer className="footer"><div className="brand footer-brand"><span className="brand-mark">V</span><span>VALTERA MOTORI</span></div><div><p>Concept portfolio · Milano, Italia · V0.5</p><p>Marchi citati appartengono ai rispettivi titolari.</p></div><p>Prezzi collegati alle fonti · snapshot 21/08/2026.</p></footer>
  </main>;
}
