"use client";

import { useState } from "react";
import type { VehicleColor } from "@/data/vehicles";
import styles from "./vehicle-colors.module.css";

export function VehicleColors({ colors, compact = false }: { colors: VehicleColor[]; compact?: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <div className={`${styles.colors} ${compact ? styles.compact : ""}`}>
      <div className={styles.heading}><span>Colori</span>{!compact ? <strong>{colors[active]?.name}</strong> : <small>{colors.length} opzioni</small>}</div>
      <div className={styles.swatches} aria-label="Selezione colori editoriale">
        {colors.map((color, index) => (
          <button key={`${color.name}-${index}`} type="button" title={color.name} aria-label={color.name} aria-pressed={index === active} onClick={() => setActive(index)} className={index === active ? styles.active : ""}>
            <i style={{ background: color.hex }} />
          </button>
        ))}
      </div>
      {!compact ? <p>Palette rappresentativa del modello/brand per esplorazione visuale. Il colore selezionato non ricolora artificialmente la fotografia editoriale.</p> : null}
    </div>
  );
}
