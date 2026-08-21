import Link from "next/link";
import { CinematicShowcase } from "@/components/cinematic-showcase";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MarketIntelligence } from "@/components/market-intelligence";
import { Reveal } from "@/components/reveal";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles } from "@/data/vehicles";

const serviceMetrics = [
  ["01", "Selection", "Auto e moto sportive curate in un unico showroom digitale."],
  ["02", "Market Intelligence", "Prezzi pubblici, fonti verificabili e comparabilità tra offerte."],
  ["03", "Trade-in", "Permuta integrata nel percorso commerciale, non come pagina secondaria."],
  ["04", "Concierge", "Una CTA chiara porta dalla curiosità alla consulenza."],
] as const;

export default function Home() {
  const cars = vehicles.filter((vehicle) => vehicle.category === "Auto");
  const motorcycles = vehicles.filter((vehicle) => vehicle.category === "Moto");

  return (
    <main>
      <Header />
      <Hero />

      <section className="brand-marquee" aria-label="Valtera services">
        <div>
          <span>PERFORMANCE</span><i>•</i><span>SELECTION</span><i>•</i><span>MARKET INTELLIGENCE</span><i>•</i><span>MILANO</span><i>•</i><span>VALTERA</span><i>•</i>
          <span>PERFORMANCE</span><i>•</i><span>SELECTION</span><i>•</i><span>MARKET INTELLIGENCE</span><i>•</i><span>AUTO & MOTO</span>
        </div>
      </section>

      <section className="statement section-pad" aria-labelledby="statement-title">
        <Reveal>
          <div className="statement-grid">
            <p className="eyebrow dark">Digital dealership · 2026</p>
            <h2 id="statement-title">Non un catalogo. Un percorso che costruisce desiderio e rende il prezzo trasparente.</h2>
            <p className="statement-copy">La direzione combina esperienza automotive premium con confronto commerciale: il cliente può capire cosa compra, quanto costa e come si posiziona rispetto al mercato.</p>
          </div>
        </Reveal>

        <div className="service-grid">
          {serviceMetrics.map(([number, title, text], index) => (
            <Reveal key={title} delay={index * 0.04}>
              <article className="service-item"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            </Reveal>
          ))}
        </div>
      </section>

      <CinematicShowcase />

      <section id="auto" className="catalog section-pad" aria-labelledby="auto-title">
        <Reveal className="section-heading">
          <div><p className="eyebrow dark">Automobili</p><h2 id="auto-title">Curated performance.</h2></div>
          <div className="section-heading-side"><p>Selection dimostrativa per la V0.3.</p><Link className="text-link dark-link" href="#confronta">Confronta con il mercato ↗</Link></div>
        </Reveal>
        <div className="vehicle-grid">
          {cars.map((vehicle, index) => <Reveal key={vehicle.slug} delay={index * 0.05}><VehicleCard vehicle={vehicle} index={index} /></Reveal>)}
        </div>
        <p className="data-disclaimer">*I veicoli Valtera restano scenari dimostrativi. Il modulo Market Intelligence distingue sempre i dati reali di terzi dai dati demo.</p>
      </section>

      <section id="moto" className="catalog section-pad section-dark" aria-labelledby="moto-title">
        <Reveal className="section-heading">
          <div><p className="eyebrow">Valtera Moto</p><h2 id="moto-title">Due ruote. Stessa ossessione.</h2></div>
          <p className="section-quiet-copy">Una sezione più scura e aggressiva distingue l&apos;universo moto senza spezzare il sistema visivo della marca.</p>
        </Reveal>
        <div className="vehicle-grid moto-grid">
          {motorcycles.map((vehicle, index) => <Reveal key={vehicle.slug} delay={index * 0.05}><VehicleCard vehicle={vehicle} index={index} /></Reveal>)}
          <Reveal className="moto-manifesto">
            <span>VALTERA / MOTO</span>
            <div><p className="eyebrow">Test ride</p><h3>Dal primo scroll alla prima accensione.</h3><p>La prossima fase estenderà Market Intelligence anche alle moto, con prezzo, disponibilità e finanziamento comparabili.</p></div>
            <Link href="#contatto">Prenota interesse ↗</Link>
          </Reveal>
        </div>
      </section>

      <MarketIntelligence />

      <section id="showroom" className="showroom" aria-labelledby="showroom-title">
        <div className="showroom-media" aria-hidden="true" />
        <Reveal className="showroom-content">
          <p className="eyebrow">Showroom digitale · Milano</p>
          <h2 id="showroom-title">Prima vendiamo la sensazione. Poi dimostriamo il valore con i dati.</h2>
          <div className="showroom-points"><span>Scroll cinematografico</span><span>Prezzi verificabili</span><span>Similarity Score</span><span>Conversion-first UX</span></div>
        </Reveal>
      </section>

      <section id="contatto" className="conversion section-pad" aria-labelledby="conversion-title">
        <Reveal>
          <div className="conversion-kicker"><span>VALTERA CONCIERGE</span><span>Milano · Italia</span></div>
          <h2 id="conversion-title">Hai visto il mercato. Ora costruisci la proposta giusta.</h2>
          <p>La V0.3 mantiene la CTA senza raccolta dati. Il modulo commerciale reale arriverà insieme a backend, validazione server-side, rate limiting e protezioni anti-abuso.</p>
          <div className="conversion-actions">
            <button className="button button-dark" type="button" disabled title="Backend previsto per versione futura">Richiedi una proposta — presto</button>
            <Link className="button button-outline-dark" href="#confronta">Rivedi il confronto</Link>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="brand footer-brand"><span className="brand-mark">V</span><span>VALTERA MOTORI</span></div>
        <div><p>Concept portfolio · Milano, Italia · V0.3</p><p>Marchi citati appartengono ai rispettivi titolari.</p></div>
        <p>Dati reali sempre collegati alla fonte · scenari Valtera esplicitamente demo.</p>
      </footer>
    </main>
  );
}
