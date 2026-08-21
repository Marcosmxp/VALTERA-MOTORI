"use client";

import { useMemo, useState } from "react";
import type { PricePoint } from "@/lib/market-history";
import styles from "./price-history.module.css";

export type PriceSeries = {
  id: string;
  label: string;
  location: string;
  points: PricePoint[];
};

const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "short", year: "numeric" });

function formatDate(value: string) {
  return date.format(new Date(`${value}T12:00:00Z`));
}

export function PriceHistory({ series, updatedAt }: { series: PriceSeries[]; updatedAt: string }) {
  const [activeId, setActiveId] = useState(series[0]?.id ?? "");
  const active = series.find((item) => item.id === activeId) ?? series[0];

  const chart = useMemo(() => {
    if (!active?.points.length) return null;
    const width = 920;
    const height = 280;
    const padX = 42;
    const padY = 34;
    const values = active.points.map((point) => point.price);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(max - min, Math.max(max * .025, 1));
    const center = (min + max) / 2;
    const visualMin = center - range / 2;
    const visualMax = center + range / 2;
    const coords = active.points.map((point, index) => ({
      ...point,
      x: active.points.length === 1 ? width / 2 : padX + index * ((width - padX * 2) / (active.points.length - 1)),
      y: padY + ((visualMax - point.price) / (visualMax - visualMin)) * (height - padY * 2),
    }));
    return { width, height, coords, polyline: coords.map((point) => `${point.x},${point.y}`).join(" ") };
  }, [active]);

  if (!active || !chart) return null;

  const first = active.points[0];
  const current = active.points[active.points.length - 1];
  const delta = current.price - first.price;
  const deltaPct = first.price ? (delta / first.price) * 100 : 0;
  const movement = active.points.length === 1 ? "Prima rilevazione" : delta < 0 ? "Prezzo in calo" : delta > 0 ? "Prezzo in aumento" : "Prezzo stabile";

  return (
    <div className={styles.history}>
      <div className={styles.tabs} role="tablist" aria-label="Storico prezzo per concessionaria">
        {series.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={item.id === active.id} onClick={() => setActiveId(item.id)} className={item.id === active.id ? styles.active : ""}>
            <span>{item.label}</span><small>{item.location}</small>
          </button>
        ))}
      </div>

      <div className={styles.summary}>
        <div><span>{movement}</span><strong>{euro.format(current.price)}</strong><small>ultima osservazione · {formatDate(current.date)}</small></div>
        <div><span>Variazione registrata</span><strong>{active.points.length === 1 ? "—" : `${delta > 0 ? "+" : ""}${euro.format(delta)}`}</strong><small>{active.points.length === 1 ? "lo storico crescerà con i prossimi snapshot" : `${deltaPct.toFixed(2).replace(".", ",")}% dal primo rilevamento`}</small></div>
        <div><span>Snapshot</span><strong>{active.points.length}</strong><small>collector automatico · dati pubblici</small></div>
      </div>

      <div className={styles.chartWrap}>
        <svg viewBox={`0 0 ${chart.width} ${chart.height}`} role="img" aria-label={`Storico prezzi ${active.label}`}>
          <line x1="42" x2="878" y1="140" y2="140" className={styles.gridLine} />
          {chart.coords.length > 1 ? <polyline points={chart.polyline} className={styles.line} /> : <line x1="130" x2="790" y1={chart.coords[0].y} y2={chart.coords[0].y} className={styles.singleLine} />}
          {chart.coords.map((point) => <circle key={`${point.date}-${point.price}`} cx={point.x} cy={point.y} r="6" className={styles.point} />)}
        </svg>
        <div className={styles.chartLabels}><span>{formatDate(first.date)}</span><span>{euro.format(current.price)}</span><span>{formatDate(current.date)}</span></div>
      </div>

      <p className={styles.note}>Ultimo aggiornamento dataset: {new Intl.DateTimeFormat("it-IT", { dateStyle: "medium", timeStyle: "short" }).format(new Date(updatedAt))}. Il collector conserva solo letture plausibili rispetto all&apos;ultimo prezzo noto; se una fonte cambia struttura o blocca l&apos;accesso, il dato precedente resta invariato.</p>
    </div>
  );
}
