"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import colorAssets from "@/data/color-assets.json";
import type { VehicleColor } from "@/data/vehicles";
import styles from "./vehicle-color-preview.module.css";

type AssetIndex = Record<string, Record<string, string>>;

export function VehicleColorPreview({ vehicleSlug, baseImage, imageAlt, colors }: { vehicleSlug: string; baseImage: string; imageAlt: string; colors: VehicleColor[] }) {
  const [active, setActive] = useState(0);
  const assets = colorAssets as AssetIndex;
  const activeColor = colors[active];
  const generated = useMemo(() => activeColor ? assets[vehicleSlug]?.[activeColor.name] : undefined, [activeColor, assets, vehicleSlug]);
  const source = generated ?? baseImage;

  return <section className={styles.section} aria-labelledby={`colors-${vehicleSlug}`}>
    <div className={styles.visual}>
      <Image src={source} alt={`${imageAlt}${activeColor ? ` · ${activeColor.name}` : ""}`} fill sizes="(max-width: 900px) 100vw, 60vw" />
      <div className={styles.badge}>{generated ? "AI paint asset · approved" : "Base visual · AI variant pending"}</div>
    </div>
    <div className={styles.controls}>
      <p>Color Intelligence · V0.6</p>
      <h2 id={`colors-${vehicleSlug}`}>{activeColor?.name ?? "Colori"}</h2>
      <span>Le varianti vengono generate offline con Qwen Image Edit e pubblicate solo dopo revisione. Vercel non esegue IA durante il click.</span>
      <div className={styles.swatches} aria-label="Colori disponibili">{colors.map((color, index) => <button key={`${color.name}-${color.hex}`} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={active === index ? styles.active : ""}><i style={{ background: color.hex }} /><b>{color.name}</b><small>{assets[vehicleSlug]?.[color.name] ? "AI ready" : "palette"}</small></button>)}</div>
      <small className={styles.note}>Se una variante non è ancora stata validata, il sito conserva la fotografia editoriale originale invece di simulare la vernice via CSS.</small>
    </div>
  </section>;
}
