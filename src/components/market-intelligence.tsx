"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { marketScenarios } from "@/data/market";
import { formatEuro, similarityScore } from "@/lib/market";
import styles from "./market-intelligence-v05.module.css";

const km = (value: number) => `${new Intl.NumberFormat("it-IT").format(value)} km`;
const typeLabel = (type: "official-list" | "dealer" | "market-benchmark") => type === "official-list" ? "Listino verificato" : type === "dealer" ? "Annuncio dealer" : "Benchmark mercato";

export function MarketIntelligence() {
  const [category, setCategory] = useState<"Auto" | "Moto">("Auto");
  const scenarios = useMemo(() => marketScenarios.filter((item) => item.category === category), [category]);
  const [activeId, setActiveId] = useState("ferrari-296-gtb");
  const scenario = scenarios.find((item) => item.id === activeId) ?? scenarios[0];
  const reference = scenario.listings.find((item) => item.id === scenario.referenceId) ?? scenario.listings[0];
  const alternative = scenario.listings.filter((item) => item.id !== reference.id).sort((a, b) => a.price - b.price)[0];
  const delta = alternative ? alternative.price - reference.price : 0;

  function switchCategory(next: "Auto" | "Moto") {
    setCategory(next);
    const first = marketScenarios.find((item) => item.category === next);
    if (first) setActiveId(first.id);
  }

  return <section id="confronta" className={styles.section} aria-labelledby="market-title"><div className={styles.shell}>
    <header className={styles.header}><div><p>Valtera Market Intelligence · V0.5</p><h2 id="market-title">Prezzo reale. Fonte visibile. Confronto comparabile.</h2></div><div><span className={styles.live}><i /> Snapshot 21 ago 2026</span><p>Listino, dealer e benchmark restano distinti. Le condizioni promozionali vengono dichiarate nella nota della fonte.</p></div></header>
    <div className={styles.controls}><div className={styles.category}><button className={category === "Auto" ? styles.active : ""} onClick={() => switchCategory("Auto")}>Auto</button><button className={category === "Moto" ? styles.active : ""} onClick={() => switchCategory("Moto")}>Moto</button></div><label><span>Modello</span><select value={scenario.id} onChange={(event) => setActiveId(event.target.value)}>{scenarios.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><Link href={`/marketplace/${scenario.id}`}>Esperienza completa ↗</Link></div>
    <div className={styles.summary}><article><span>Riferimento verificato</span><strong>{formatEuro(reference.price)}</strong><small>{reference.seller}</small></article><article><span>Alternativa pubblica</span><strong>{alternative ? formatEuro(alternative.price) : "—"}</strong><small>{alternative?.seller ?? "nessuna"}</small></article><article><span>Delta</span><strong>{alternative ? `${delta > 0 ? "+" : delta < 0 ? "−" : ""}${formatEuro(Math.abs(delta))}` : "—"}</strong><small>vs riferimento</small></article><article><span>Fonti</span><strong>{scenario.listings.length}</strong><small>verificate</small></article></div>
    <div className={styles.listings}>{scenario.listings.map((listing) => { const score = similarityScore(reference.vehicle, listing.vehicle); const diff = listing.price - reference.price; return <article key={listing.id} className={listing.id === reference.id ? styles.reference : ""}><div className={styles.listingTop}><div><span>{typeLabel(listing.sellerType)}</span><h3>{listing.seller}</h3><p>{listing.location}</p></div><div><small>Prezzo pubblicato</small><strong>{formatEuro(listing.price)}</strong><em>{listing.id === reference.id ? "riferimento" : `${diff > 0 ? "+" : diff < 0 ? "−" : ""}${diff ? formatEuro(Math.abs(diff)) : "parità"}`}</em></div></div><div className={styles.score}><span>Similarity {score}%</span><i><b style={{ width: `${score}%` }} /></i></div><dl><div><dt>Anno</dt><dd>{listing.vehicle.year}</dd></div><div><dt>Km</dt><dd>{km(listing.vehicle.mileageKm)}</dd></div><div><dt>Potenza</dt><dd>{listing.vehicle.powerHp} CV</dd></div><div><dt>Fuel</dt><dd>{listing.vehicle.fuel}</dd></div><div><dt>Cambio</dt><dd>{listing.vehicle.transmission}</dd></div></dl>{listing.finance ? <p className={styles.finance}>Finanziamento pubblicato: {formatEuro(listing.finance.monthly, 2)}/mese · TAEG {listing.finance.taeg?.toFixed(2).replace(".", ",")}%</p> : null}<footer><div><span>Verificato 21/08/2026</span>{listing.note ? <p>{listing.note}</p> : null}</div><a href={listing.sourceUrl} target="_blank" rel="noreferrer">Fonte ↗</a></footer></article>; })}</div>
    <div className={styles.method}><div><b>01</b><strong>Versione</strong><p>Modello e allestimento.</p></div><div><b>02</b><strong>Anno & km</strong><p>Nuovo e usato restano distinguibili.</p></div><div><b>03</b><strong>Powertrain</strong><p>Potenza, fuel e cambio.</p></div><div><b>04</b><strong>Fonte</strong><p>Origine, data e condizioni.</p></div></div>
    <p className={styles.disclaimer}>Snapshot di fonti pubbliche al 21/08/2026. Prezzi e disponibilità possono cambiare. Le promozioni possono richiedere finanziamento o altre condizioni. Nessun valore costituisce un&apos;offerta Valtera.</p>
  </div></section>;
}
