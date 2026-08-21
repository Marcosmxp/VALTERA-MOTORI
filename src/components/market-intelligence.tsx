"use client";

import { useMemo, useState } from "react";
import { marketScenarios } from "@/data/market";
import { bestRealDealer, formatEuro, similarityScore } from "@/lib/market";
import styles from "./market-intelligence.module.css";

function formatKm(value: number) {
  return new Intl.NumberFormat("it-IT").format(value) + " km";
}

function sourceKind(type: "valtera-demo" | "dealer" | "market-benchmark") {
  if (type === "dealer") return "Concessionaria verificata";
  if (type === "market-benchmark") return "Benchmark mercato";
  return "Scenario Valtera demo";
}

export function MarketIntelligence() {
  const [activeId, setActiveId] = useState(marketScenarios[0].id);
  const scenario = useMemo(
    () => marketScenarios.find((item) => item.id === activeId) ?? marketScenarios[0],
    [activeId],
  );

  const valtera = scenario.listings.find((listing) => listing.sellerType === "valtera-demo")!;
  const realDealer = bestRealDealer(scenario.listings);
  const priceGap = realDealer ? valtera.price - realDealer.price : 0;
  const positionAmount = Math.abs(priceGap);
  const positionPercentage = realDealer ? (positionAmount / realDealer.price) * 100 : 0;
  const positionLabel = priceGap < 0 ? "Vantaggio Valtera demo" : priceGap > 0 ? "Vantaggio dealer" : "Parità prezzo";
  const positionCopy = priceGap < 0
    ? `${positionPercentage.toFixed(2).replace(".", ",")}% in meno rispetto al dealer verificato più economico`
    : priceGap > 0
      ? `${positionPercentage.toFixed(2).replace(".", ",")}% sopra il dealer verificato più economico`
      : "Stesso prezzo del dealer verificato più economico";

  return (
    <section id="confronta" className={styles.section} aria-labelledby="market-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Valtera Market Intelligence · V0.3</p>
            <h2 id="market-title">Confronta il prezzo prima di entrare in concessionaria.</h2>
          </div>
          <div className={styles.headerCopy}>
            <p>Dati pubblici verificati, scenario Valtera chiaramente separato e comparabilità calcolata tra anno, km, potenza e configurazione.</p>
            <span className={styles.freshness}><i /> Aggiornato 21 ago 2026</span>
          </div>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Veicoli da confrontare">
          {marketScenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeId === item.id}
              className={activeId === item.id ? styles.activeTab : ""}
              onClick={() => setActiveId(item.id)}
            >
              <span>{item.label}</span>
              <small>{item.descriptor}</small>
            </button>
          ))}
        </div>

        <div className={styles.summary} aria-live="polite">
          <article className={styles.primaryKpi}>
            <span>{positionLabel}</span>
            <strong>{priceGap < 0 ? "− " : priceGap > 0 ? "+ " : ""}{formatEuro(positionAmount)}</strong>
            <small>{positionCopy}</small>
          </article>
          <article><span>Scenario Valtera</span><strong>{formatEuro(valtera.price)}</strong><small>non è un’offerta commerciale</small></article>
          <article><span>Miglior dealer verificato</span><strong>{realDealer ? formatEuro(realDealer.price) : "—"}</strong><small>{realDealer?.seller ?? "nessun dato"}</small></article>
          <article><span>Fonti confrontate</span><strong>{scenario.listings.length - 1}</strong><small>dealer reali + benchmark pubblico</small></article>
        </div>

        <div className={styles.listings}>
          {scenario.listings.map((listing) => {
            const score = similarityScore(valtera.vehicle, listing.vehicle);
            const priceDelta = listing.price - valtera.price;
            const isDemo = listing.sellerType === "valtera-demo";

            return (
              <article key={listing.id} className={`${styles.listing} ${isDemo ? styles.valtera : ""}`}>
                <div className={styles.listingTop}>
                  <div>
                    <span className={styles.kind}>{sourceKind(listing.sellerType)}</span>
                    <h3>{listing.seller}</h3>
                    <p>{listing.location}</p>
                  </div>
                  <div className={styles.priceBox}>
                    <span>Prezzo</span>
                    <strong>{formatEuro(listing.price)}</strong>
                    {!isDemo && priceDelta > 0 ? <small>+ {formatEuro(priceDelta)} vs Valtera demo</small> : null}
                    {!isDemo && priceDelta < 0 ? <small>− {formatEuro(Math.abs(priceDelta))} vs Valtera demo</small> : null}
                    {isDemo ? <small>scenario dimostrativo</small> : null}
                  </div>
                </div>

                <div className={styles.scoreRow}>
                  <div>
                    <span>Similarity Score</span>
                    <strong>{score}%</strong>
                  </div>
                  <div className={styles.scoreTrack} aria-label={`Comparabilità ${score}%`}><i style={{ width: `${score}%` }} /></div>
                </div>

                <dl className={styles.specs}>
                  <div><dt>Anno</dt><dd>{listing.vehicle.year}</dd></div>
                  <div><dt>Km</dt><dd>{formatKm(listing.vehicle.mileageKm)}</dd></div>
                  <div><dt>Potenza</dt><dd>{listing.vehicle.powerHp} CV</dd></div>
                  <div><dt>Alimentazione</dt><dd>{listing.vehicle.fuel}</dd></div>
                  <div><dt>Cambio</dt><dd>{listing.vehicle.transmission}</dd></div>
                  <div><dt>Stato</dt><dd>{listing.availability}</dd></div>
                </dl>

                {listing.finance ? (
                  <div className={styles.finance}>
                    <div><span>Mensile</span><strong>{formatEuro(listing.finance.monthly, 2)}</strong></div>
                    <div><span>Rate</span><strong>{listing.finance.installments}</strong></div>
                    <div><span>Anticipo</span><strong>{formatEuro(listing.finance.deposit)}</strong></div>
                    <div><span>Maxirata</span><strong>{listing.finance.balloon ? formatEuro(listing.finance.balloon) : "—"}</strong></div>
                    <div><span>TAEG</span><strong>{listing.finance.taeg?.toFixed(2).replace(".", ",")}%</strong></div>
                    <div><span>Totale dovuto</span><strong>{listing.finance.totalDue ? formatEuro(listing.finance.totalDue) : "—"}</strong></div>
                  </div>
                ) : null}

                <footer className={styles.listingFooter}>
                  <div>
                    <span>Verificato</span>
                    <time dateTime={listing.verifiedAt}>21/08/2026</time>
                    {listing.note ? <p>{listing.note}</p> : null}
                  </div>
                  {listing.sourceUrl ? (
                    <a href={listing.sourceUrl} target="_blank" rel="noreferrer">Verifica fonte ↗</a>
                  ) : (
                    <span className={styles.demoSource}>{listing.sourceLabel}</span>
                  )}
                </footer>
              </article>
            );
          })}
        </div>

        <aside className={styles.methodology}>
          <div><span>01</span><strong>Modello & versione</strong><p>Il punteggio privilegia modello e allestimento uguali.</p></div>
          <div><span>02</span><strong>Anno & chilometri</strong><p>Usati con età e percorrenza molto diverse vengono penalizzati.</p></div>
          <div><span>03</span><strong>Powertrain</strong><p>Potenza, alimentazione e cambio completano la comparabilità.</p></div>
          <div><span>04</span><strong>Fonte & timestamp</strong><p>Ogni dato reale espone origine e data di verifica.</p></div>
        </aside>

        <p className={styles.disclaimer}>Valtera Motori è un concept portfolio. I prezzi Valtera sono scenari dimostrativi; i prezzi di terzi provengono dalle fonti pubbliche collegate e possono cambiare dopo la data di verifica. Nessuna comparazione costituisce un’offerta di vendita.</p>
      </div>
    </section>
  );
}
