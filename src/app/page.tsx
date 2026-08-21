import Link from "next/link";
import { Comparison } from "@/components/comparison";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles } from "@/data/vehicles";

export default function Home() {
  const cars = vehicles.filter((vehicle) => vehicle.category === "Auto");
  const motorcycles = vehicles.filter((vehicle) => vehicle.category === "Moto");

  return (
    <main>
      <Header />
      <Hero />

      <section className="statement section-pad" aria-labelledby="statement-title">
        <Reveal>
          <p className="eyebrow dark">Valtera Selection</p>
          <h2 id="statement-title">
            Non vendiamo semplicemente veicoli. Costruiamo il momento in cui trovi quello giusto.
          </h2>
        </Reveal>
      </section>

      <section id="auto" className="catalog section-pad" aria-labelledby="auto-title">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow dark">Automobili</p>
            <h2 id="auto-title">Performance, senza compromessi.</h2>
          </div>
          <Link className="text-link dark-link" href="#contatto">Vedi tutta la selezione ↗</Link>
        </Reveal>

        <div className="vehicle-grid">
          {cars.map((vehicle) => (
            <Reveal key={vehicle.slug}>
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="moto" className="catalog section-pad section-dark" aria-labelledby="moto-title">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">Valtera Moto</p>
            <h2 id="moto-title">Due ruote. La stessa ossessione.</h2>
          </div>
        </Reveal>

        <div className="vehicle-grid single">
          {motorcycles.map((vehicle) => (
            <Reveal key={vehicle.slug}>
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
          <Reveal className="moto-manifesto">
            <span>01</span>
            <h3>Test ride, permuta e consulenza premium nello stesso percorso.</h3>
            <p>La V1 collegherà inventario, disponibilità reale e richieste commerciali.</p>
          </Reveal>
        </div>
      </section>

      <section id="confronta" className="section-pad comparison-section">
        <Reveal>
          <Comparison />
        </Reveal>
      </section>

      <section id="showroom" className="showroom section-pad">
        <Reveal>
          <p className="eyebrow">Milano</p>
          <h2>Un showroom digitale prima ancora della visita.</h2>
          <p>
            Nelle prossime versioni: transizioni cinematografiche, viste 3D progressive, configuratore e caricamento adattivo per dispositivo.
          </p>
        </Reveal>
      </section>

      <section id="contatto" className="conversion section-pad" aria-labelledby="conversion-title">
        <Reveal>
          <p className="eyebrow dark">La tua prossima scelta</p>
          <h2 id="conversion-title">Prenota un&apos;esperienza Valtera.</h2>
          <p>Test drive, valutazione permuta o consulenza dedicata. Il form reale arriverà quando avremo backend e anti-abuse definiti.</p>
          <div className="conversion-actions">
            <button className="button button-dark" type="button" disabled title="Disponibile nella prossima versione">
              Prenota test drive — presto
            </button>
            <Link className="button button-outline-dark" href="#auto">Esplora la selection</Link>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="brand footer-brand"><span className="brand-mark">V</span><span>VALTERA MOTORI</span></div>
        <p>Concept portfolio · Milano, Italia · V0.1</p>
        <p>Marchi citati appartengono ai rispettivi titolari. Valtera Motori è un progetto dimostrativo.</p>
      </footer>
    </main>
  );
}
