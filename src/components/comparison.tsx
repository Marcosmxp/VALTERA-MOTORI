const rows = [
  ["Prezzo demo", "€ 124.900", "€ 129.500"],
  ["Disponibilità", "Immediata", "Su richiesta"],
  ["Consegna demo", "3–5 giorni", "10–14 giorni"],
  ["Valutazione usato", "Inclusa", "Da verificare"],
];

export function Comparison() {
  return (
    <div className="comparison-shell">
      <div className="comparison-heading">
        <div>
          <p className="eyebrow dark">Valtera Compare</p>
          <h2>Decidere con dati chiari.</h2>
        </div>
        <p>
          Il comparatore definitivo userà fonti verificabili e data di rilevazione. In V0.1 i valori sono esplicitamente dimostrativi.
        </p>
      </div>

      <div className="comparison-table" role="table" aria-label="Confronto dimostrativo concessionarie">
        <div className="comparison-row comparison-head" role="row">
          <span role="columnheader">Parametro</span>
          <strong role="columnheader">Valtera</strong>
          <span role="columnheader">Mercato demo</span>
        </div>
        {rows.map(([label, valtera, market]) => (
          <div className="comparison-row" role="row" key={label}>
            <span role="cell">{label}</span>
            <strong role="cell">{valtera}</strong>
            <span role="cell">{market}</span>
          </div>
        ))}
      </div>

      <p className="comparison-note">Dati demo — nessuna affermazione commerciale reale viene pubblicata in questa fase.</p>
    </div>
  );
}
