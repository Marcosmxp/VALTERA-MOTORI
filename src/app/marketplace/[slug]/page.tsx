import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { PriceHistory, type PriceSeries } from "@/components/price-history";
import { VehicleColors } from "@/components/vehicle-colors";
import { VehicleScrollStory } from "@/components/vehicle-scroll-story";
import { marketScenarios } from "@/data/market";
import { getProductExperience } from "@/data/product-experience";
import { getVehicle } from "@/data/vehicles";
import { formatEuro, similarityScore } from "@/lib/market";
import { getHistoryUpdatedAt, getPriceHistory } from "@/lib/market-history";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return marketScenarios.map((scenario) => ({ slug: scenario.id })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scenario = marketScenarios.find((item) => item.id === slug);
  if (!scenario) return {};
  return { title: `${scenario.label} | Valtera Market Intelligence`, description: `Colori, esperienza prodotto e confronto prezzi verificati per ${scenario.label}.` };
}

const sourceKind = (type: "official-list" | "dealer" | "market-benchmark") => type === "official-list" ? "Listino verificato" : type === "dealer" ? "Dealer / annuncio" : "Benchmark mercato";

export default async function MarketplaceProductPage({ params }: PageProps) {
  const { slug } = await params;
  const scenario = marketScenarios.find((item) => item.id === slug);
  const vehicle = getVehicle(slug);
  const experience = getProductExperience(slug);
  if (!scenario || !vehicle || !experience) notFound();

  const reference = scenario.listings.find((item) => item.id === scenario.referenceId) ?? scenario.listings[0];
  const alternative = scenario.listings.filter((item) => item.id !== reference.id).sort((a, b) => a.price - b.price)[0];
  const delta = alternative ? alternative.price - reference.price : 0;
  const trackedListings = scenario.listings.filter((listing) => listing.sellerType === "dealer");
  const historySeries: PriceSeries[] = trackedListings.map((listing) => ({ id: listing.id, label: listing.seller, location: listing.location, points: getPriceHistory(listing.id, listing.price, listing.verifiedAt) }));

  return <main className={styles.page}>
    <Header />
    <section className={styles.hero}>
      <Image src={experience.heroImage} alt={experience.imageAlt} fill priority sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroShade} /><div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroContent}>
        <Link href="/#auto" className={styles.back}>← Catalogo multimarca</Link><p>{experience.eyebrow}</p><h1>{scenario.label}</h1><span className={styles.subtitle}>{experience.subtitle}</span>
        <div className={styles.heroStats}><div><small>Riferimento verificato</small><strong>{formatEuro(reference.price)}</strong><span>{reference.seller}</span></div><div><small>Alternativa pubblica</small><strong>{alternative ? formatEuro(alternative.price) : "—"}</strong><span>{alternative?.seller ?? "nessuna"}</span></div><div><small>Delta</small><strong>{alternative ? `${delta > 0 ? "+" : delta < 0 ? "−" : ""}${formatEuro(Math.abs(delta))}` : "—"}</strong><span>vs riferimento</span></div></div>
      </div>
      <a className={styles.credit} href={experience.imagePage} target="_blank" rel="noreferrer">Visual editoriale · {experience.credit}</a><div className={styles.scrollCue}><i /> Scroll to inspect</div>
    </section>

    <section style={{ background: "#0d0d0c", color: "#fff", padding: "30px clamp(20px,5vw,74px) 54px" }}><div style={{ maxWidth: 1480, margin: "0 auto" }}><VehicleColors colors={vehicle.colors} /></div></section>
    <VehicleScrollStory image={experience.heroImage} imageAlt={experience.imageAlt} stages={experience.stages} />

    <section id="market-data" className={styles.marketSection} aria-labelledby="price-history-title"><div className={styles.marketHeading}><div><p>Price intelligence · V0.5</p><h2 id="price-history-title">Il prezzo ha una fonte, non una fantasia.</h2></div><span>Ogni valore nasce da listino, annuncio o benchmark pubblico. Lo storico cresce automaticamente solo sulle fonti tecnicamente tracciabili; le altre restano snapshot datati.</span></div>{historySeries.length ? <PriceHistory series={historySeries} updatedAt={getHistoryUpdatedAt()} /> : null}</section>

    <section className={styles.offers} aria-labelledby="offers-title"><header><p>Smart comparison</p><h2 id="offers-title">Stesso modello. Condizioni diverse.</h2></header><div className={styles.offerList}>{scenario.listings.map((listing) => { const score = similarityScore(reference.vehicle, listing.vehicle); const diff = listing.price - reference.price; return <article key={listing.id} className={listing.id === reference.id ? styles.demoOffer : ""}><div className={styles.offerTop}><div><span>{sourceKind(listing.sellerType)}</span><h3>{listing.seller}</h3><p>{listing.location}</p></div><div className={styles.offerPrice}><strong>{formatEuro(listing.price)}</strong><small>{listing.id === reference.id ? "riferimento" : `${diff > 0 ? "+" : diff < 0 ? "−" : ""}${diff ? formatEuro(Math.abs(diff)) : "parità"} vs riferimento`}</small></div></div><div className={styles.offerSpecs}><span><small>Similarity</small><strong>{score}%</strong></span><span><small>Anno</small><strong>{listing.vehicle.year}</strong></span><span><small>Km</small><strong>{new Intl.NumberFormat("it-IT").format(listing.vehicle.mileageKm)}</strong></span><span><small>Potenza</small><strong>{listing.vehicle.powerHp} CV</strong></span><span><small>Cambio</small><strong>{listing.vehicle.transmission}</strong></span></div>{listing.finance ? <div className={styles.finance}><span>Finanziamento pubblicato</span><strong>{formatEuro(listing.finance.monthly, 2)}/mese</strong><small>TAEG {listing.finance.taeg?.toFixed(2).replace(".", ",")}% · anticipo {formatEuro(listing.finance.deposit)} · {listing.finance.installments} rate</small></div> : null}<footer><div><span>Verificato 21/08/2026</span>{listing.note ? <p>{listing.note}</p> : null}</div><a href={listing.sourceUrl} target="_blank" rel="noreferrer">Verifica fonte ↗</a></footer></article>; })}</div></section>

    <section id="proposta" className={styles.conversion}><p>Valtera Market Intelligence · V0.5</p><h2>Dal dettaglio alla decisione, con il mercato accanto.</h2><span>Valtera resta un concept portfolio: nessun prezzo mostrato viene presentato come offerta commerciale della concessionaria fittizia.</span><Link href="/#confronta">Confronta un altro modello ↗</Link></section>
    <footer className={styles.footer}><span>VALTERA MOTORI · MULTIBRAND MARKET V0.5</span><span>Marchi e fonti appartengono ai rispettivi titolari.</span></footer>
  </main>;
}
