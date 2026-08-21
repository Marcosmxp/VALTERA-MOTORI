import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { PriceHistory, type PriceSeries } from "@/components/price-history";
import { VehicleColorPreview } from "@/components/vehicle-color-preview";
import { VehicleScrollStory } from "@/components/vehicle-scroll-story";
import { inventoryMarketScenarios } from "@/data/market-v06";
import { getProductExperienceV06 } from "@/data/product-experience-v06";
import { getInventoryVehicle } from "@/data/inventory-v06";
import { formatEuro, similarityScore } from "@/lib/market";
import { getHistoryUpdatedAt, getPriceHistory } from "@/lib/market-history";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return inventoryMarketScenarios.map((scenario) => ({ slug: scenario.id })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scenario = inventoryMarketScenarios.find((item) => item.id === slug);
  if (!scenario) return {};
  return { title: `${scenario.label} | Valtera Inventory Intelligence`, description: `Versioni, colori, esperienza prodotto e confronto prezzi verificati per ${scenario.label}.` };
}

const sourceKind = (type: "official-list" | "dealer" | "market-benchmark") => type === "official-list" ? "Listino verificato" : type === "dealer" ? "Dealer / annuncio" : "Promo / benchmark";
const formatDate = (value: string) => new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${value}T12:00:00Z`));

export default async function MarketplaceProductPage({ params }: PageProps) {
  const { slug } = await params;
  const scenario = inventoryMarketScenarios.find((item) => item.id === slug);
  const vehicle = getInventoryVehicle(slug);
  const experience = getProductExperienceV06(slug);
  if (!scenario || !vehicle || !experience) notFound();

  const reference = scenario.listings.find((item) => item.id === scenario.referenceId) ?? scenario.listings[0];
  const alternative = scenario.listings.filter((item) => item.id !== reference.id).sort((a, b) => a.price - b.price)[0];
  const delta = alternative ? alternative.price - reference.price : 0;
  const historySeries: PriceSeries[] = scenario.listings.map((listing) => ({ id: listing.id, label: listing.seller, location: listing.location, points: getPriceHistory(listing.id, listing.price, listing.verifiedAt) }));
  const coverageLimited = scenario.listings.length < 2;

  return <main className={styles.page}>
    <Header />
    <section className={styles.hero}>
      <Image src={experience.heroImage} alt={experience.imageAlt} fill priority sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroShade} /><div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroContent}>
        <Link href={vehicle.category === "Moto" ? "/#moto" : "/#auto"} className={styles.back}>← Inventory multimarca</Link><p>{experience.eyebrow}</p><h1>{scenario.label}</h1><span className={styles.subtitle}>{experience.subtitle}</span>
        <div className={styles.heroStats}><div><small>Riferimento verificato</small><strong>{formatEuro(reference.price)}</strong><span>{reference.seller}</span></div><div><small>Alternativa pubblica</small><strong>{alternative ? formatEuro(alternative.price) : "—"}</strong><span>{alternative?.seller ?? "copertura limitata"}</span></div><div><small>Delta</small><strong>{alternative ? `${delta > 0 ? "+" : delta < 0 ? "−" : ""}${formatEuro(Math.abs(delta))}` : "—"}</strong><span>{coverageLimited ? "una sola fonte" : "vs riferimento"}</span></div></div>
      </div>
      <a className={styles.credit} href={experience.imagePage} target="_blank" rel="noreferrer">Visual editoriale · {experience.credit}</a><div className={styles.scrollCue}><i /> Scroll to inspect</div>
    </section>

    <VehicleColorPreview vehicleSlug={vehicle.slug} baseImage={experience.heroImage} imageAlt={experience.imageAlt} colors={vehicle.colors} />
    <VehicleScrollStory image={experience.heroImage} imageAlt={experience.imageAlt} stages={experience.stages} />

    <section id="market-data" className={styles.marketSection} aria-labelledby="price-history-title"><div className={styles.marketHeading}><div><p>Price intelligence · V0.6</p><h2 id="price-history-title">Il prezzo ha una fonte, una data e una condizione.</h2></div><span>{coverageLimited ? "Copertura di mercato limitata: per questa versione è disponibile una sola evidenza verificata. Non viene creato un concorrente fittizio." : "Listino, dealer e promozioni restano separati. Lo storico cresce solo quando il collector trova una lettura compatibile con la fonte e il modello."}</span></div><PriceHistory series={historySeries} updatedAt={getHistoryUpdatedAt()} /></section>

    <section className={styles.offers} aria-labelledby="offers-title"><header><p>Smart comparison</p><h2 id="offers-title">Stessa versione. Condizioni leggibili.</h2></header><div className={styles.offerList}>{scenario.listings.map((listing) => { const score = similarityScore(reference.vehicle, listing.vehicle); const diff = listing.price - reference.price; return <article key={listing.id} className={listing.id === reference.id ? styles.demoOffer : ""}><div className={styles.offerTop}><div><span>{sourceKind(listing.sellerType)}</span><h3>{listing.seller}</h3><p>{listing.location}</p></div><div className={styles.offerPrice}><strong>{formatEuro(listing.price)}</strong><small>{listing.id === reference.id ? "riferimento" : `${diff > 0 ? "+" : diff < 0 ? "−" : ""}${diff ? formatEuro(Math.abs(diff)) : "parità"} vs riferimento`}</small></div></div><div className={styles.offerSpecs}><span><small>Similarity</small><strong>{score}%</strong></span><span><small>Anno</small><strong>{listing.vehicle.year}</strong></span><span><small>Km</small><strong>{new Intl.NumberFormat("it-IT").format(listing.vehicle.mileageKm)}</strong></span><span><small>Potenza</small><strong>{listing.vehicle.powerHp} CV</strong></span><span><small>Cambio</small><strong>{listing.vehicle.transmission}</strong></span></div>{listing.finance ? <div className={styles.finance}><span>Finanziamento pubblicato</span><strong>{formatEuro(listing.finance.monthly, 2)}/mese</strong><small>TAEG {listing.finance.taeg?.toFixed(2).replace(".", ",")}% · anticipo {formatEuro(listing.finance.deposit)} · {listing.finance.installments} rate{listing.finance.balloon ? ` · rata finale ${formatEuro(listing.finance.balloon)}` : ""}</small></div> : null}<footer><div><span>Verificato {formatDate(listing.verifiedAt)}</span>{listing.note ? <p>{listing.note}</p> : null}</div><a href={listing.sourceUrl} target="_blank" rel="noreferrer">Verifica fonte ↗</a></footer></article>; })}</div></section>

    <section id="proposta" className={styles.conversion}><p>Valtera Inventory Intelligence · V0.6</p><h2>Dal dettaglio alla decisione, con il mercato accanto.</h2><span>Valtera resta un concept portfolio: prezzi, promozioni e listini rimandano alle rispettive fonti e non costituiscono un&apos;offerta Valtera.</span><Link href="/#confronta">Confronta un altro modello ↗</Link></section>
    <footer className={styles.footer}><span>VALTERA MOTORI · INVENTORY INTELLIGENCE V0.6</span><span>Marchi e fonti appartengono ai rispettivi titolari.</span></footer>
  </main>;
}
