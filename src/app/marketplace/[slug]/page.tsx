import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { PriceHistory, type PriceSeries } from "@/components/price-history";
import { VehicleScrollStory } from "@/components/vehicle-scroll-story";
import { marketScenarios } from "@/data/market";
import { getProductExperience } from "@/data/product-experience";
import { bestRealDealer, formatEuro, similarityScore } from "@/lib/market";
import { getHistoryUpdatedAt, getPriceHistory } from "@/lib/market-history";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return marketScenarios.map((scenario) => ({ slug: scenario.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scenario = marketScenarios.find((item) => item.id === slug);
  if (!scenario) return {};
  return {
    title: `${scenario.label} | Valtera Market Intelligence`,
    description: `Esperienza prodotto, storico prezzi e confronto concessionarie per ${scenario.label}.`,
  };
}

export default async function MarketplaceProductPage({ params }: PageProps) {
  const { slug } = await params;
  const scenario = marketScenarios.find((item) => item.id === slug);
  const experience = getProductExperience(slug);
  if (!scenario || !experience) notFound();

  const valtera = scenario.listings.find((listing) => listing.sellerType === "valtera-demo");
  if (!valtera) notFound();
  const dealer = bestRealDealer(scenario.listings);
  const dealerDelta = dealer ? valtera.price - dealer.price : 0;
  const realListings = scenario.listings.filter((listing) => listing.sellerType === "dealer");
  const historySeries: PriceSeries[] = realListings.map((listing) => ({
    id: listing.id,
    label: listing.seller,
    location: listing.location,
    points: getPriceHistory(listing.id, listing.price, listing.verifiedAt),
  }));

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image src={experience.heroImage} alt={experience.imageAlt} fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroShade} />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroContent}>
          <Link href="/#confronta" className={styles.back}>← Market Intelligence</Link>
          <p>{experience.eyebrow}</p>
          <h1>{scenario.label}</h1>
          <span className={styles.subtitle}>{experience.subtitle}</span>
          <div className={styles.heroStats}>
            <div><small>Scenario Valtera</small><strong>{formatEuro(valtera.price)}</strong><span>demo, non offerta</span></div>
            <div><small>Miglior dealer verificato</small><strong>{dealer ? formatEuro(dealer.price) : "—"}</strong><span>{dealer?.seller ?? "nessun dato"}</span></div>
            <div><small>Posizione prezzo</small><strong>{dealer ? `${dealerDelta > 0 ? "+" : dealerDelta < 0 ? "−" : ""}${formatEuro(Math.abs(dealerDelta))}` : "—"}</strong><span>{dealerDelta > 0 ? "dealer più conveniente" : dealerDelta < 0 ? "Valtera demo più bassa" : "parità"}</span></div>
          </div>
        </div>
        <a className={styles.credit} href={experience.imagePage} target="_blank" rel="noreferrer">Foto editoriale · {experience.credit}</a>
        <div className={styles.scrollCue}><i /> Scroll to inspect</div>
      </section>

      <VehicleScrollStory image={experience.heroImage} imageAlt={experience.imageAlt} stages={experience.stages} />

      <section className={styles.marketSection} aria-labelledby="price-history-title">
        <div className={styles.marketHeading}>
          <div><p>Price intelligence · automatic snapshots</p><h2 id="price-history-title">Il prezzo diventa una linea temporale.</h2></div>
          <span>Il primo snapshot è reale e verificato. La curva cresce solo quando il collector registra nuove osservazioni plausibili dalle fonti pubbliche.</span>
        </div>
        {historySeries.length ? <PriceHistory series={historySeries} updatedAt={getHistoryUpdatedAt()} /> : null}
      </section>

      <section className={styles.offers} aria-labelledby="offers-title">
        <header><p>Dealer comparison</p><h2 id="offers-title">Stesso modello. Condizioni diverse.</h2></header>
        <div className={styles.offerList}>
          {scenario.listings.map((listing) => {
            const score = similarityScore(valtera.vehicle, listing.vehicle);
            const delta = listing.price - valtera.price;
            return (
              <article key={listing.id} className={listing.sellerType === "valtera-demo" ? styles.demoOffer : ""}>
                <div className={styles.offerTop}>
                  <div><span>{listing.sellerType === "dealer" ? "Dealer verificato" : listing.sellerType === "market-benchmark" ? "Benchmark" : "Scenario demo"}</span><h3>{listing.seller}</h3><p>{listing.location}</p></div>
                  <div className={styles.offerPrice}><strong>{formatEuro(listing.price)}</strong><small>{listing.sellerType === "valtera-demo" ? "scenario dimostrativo" : `${delta > 0 ? "+" : delta < 0 ? "−" : ""}${delta ? formatEuro(Math.abs(delta)) : "parità"} vs Valtera demo`}</small></div>
                </div>
                <div className={styles.offerSpecs}>
                  <span><small>Similarity</small><strong>{score}%</strong></span>
                  <span><small>Anno</small><strong>{listing.vehicle.year}</strong></span>
                  <span><small>Km</small><strong>{new Intl.NumberFormat("it-IT").format(listing.vehicle.mileageKm)}</strong></span>
                  <span><small>Potenza</small><strong>{listing.vehicle.powerHp} CV</strong></span>
                  <span><small>Cambio</small><strong>{listing.vehicle.transmission}</strong></span>
                </div>
                {listing.finance ? <div className={styles.finance}><span>Finanziamento pubblicato</span><strong>{formatEuro(listing.finance.monthly, 2)}/mese</strong><small>TAEG {listing.finance.taeg?.toFixed(2).replace(".", ",")}% · anticipo {formatEuro(listing.finance.deposit)} · {listing.finance.installments} rate</small></div> : null}
                <footer><span>Verificato {new Intl.DateTimeFormat("it-IT").format(new Date(`${listing.verifiedAt}T12:00:00Z`))}</span>{listing.sourceUrl ? <a href={listing.sourceUrl} target="_blank" rel="noreferrer">Verifica fonte ↗</a> : <span>{listing.sourceLabel}</span>}</footer>
              </article>
            );
          })}
        </div>
      </section>

      <section id="proposta" className={styles.conversion}>
        <p>Valtera concierge · V0.4</p>
        <h2>Dal dettaglio alla decisione, senza rompere l'esperienza.</h2>
        <span>Il prossimo backend commerciale potrà ricevere richiesta, permuta e test drive. Per ora la CTA resta intenzionalmente non operativa: nessun dato personale viene raccolto.</span>
        <Link href="/#confronta">Torna al mercato ↗</Link>
      </section>

      <footer className={styles.footer}><span>VALTERA MOTORI · MARKETPLACE INTELLIGENCE V0.4</span><span>Concept portfolio · dati esterni collegati alle rispettive fonti.</span></footer>
    </main>
  );
}
