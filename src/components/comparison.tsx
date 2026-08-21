const metrics = [
  { label: "Prezzo demo", valtera: "€ 124.900", market: "€ 129.500", valteraScore: 78, marketScore: 88, detail: "- € 4.600 demo" },
  { label: "Disponibilità", valtera: "Immediata", market: "Su richiesta", valteraScore: 92, marketScore: 48, detail: "vantaggio Valtera" },
  { label: "Consegna demo", valtera: "3–5 giorni", market: "10–14 giorni", valteraScore: 89, marketScore: 42, detail: "più rapida demo" },
];

export function Comparison() {
  return (
    <div className="comparison-shell">
      <div className="comparison-heading"><div><p className="eyebrow dark">Valtera Compare</p><h2>Il cliente deve capire il vantaggio in pochi secondi.</h2></div><p>Nella versione con dati reali ogni confronto mostrerà fonte, timestamp e condizioni. In V0.2 i numeri restano volutamente dimostrativi.</p></div>
      <div className="comparison-grid">
        {metrics.map((metric) => (
          <article className="comparison-card" key={metric.label}>
            <div className="comparison-card-head"><span>{metric.label}</span><strong>{metric.detail}</strong></div>
            <div className="compare-line"><div className="compare-label"><b>Valtera</b><span>{metric.valtera}</span></div><div className="compare-track"><i style={{ width: `${metric.valteraScore}%` }} /></div></div>
            <div className="compare-line competitor"><div className="compare-label"><b>Mercato demo</b><span>{metric.market}</span></div><div className="compare-track"><i style={{ width: `${metric.marketScore}%` }} /></div></div>
          </article>
        ))}
      </div>
      <div className="comparison-footer"><p>Dati demo · nessuna affermazione commerciale reale viene pubblicata in questa fase.</p><a href="#contatto">Ricevi una proposta personalizzata ↗</a></div>
    </div>
  );
}
