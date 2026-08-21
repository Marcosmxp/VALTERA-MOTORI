"use client";

import { useMemo, useState } from "react";
import { VehicleCard } from "@/components/vehicle-card";
import { getBrands, vehicles, type VehicleCategory } from "@/data/vehicles";
import styles from "./brand-catalog.module.css";

export function BrandCatalog({ category }: { category: VehicleCategory }) {
  const brands = useMemo(() => getBrands(category), [category]);
  const [brand, setBrand] = useState("Tutti");
  const filtered = vehicles.filter((vehicle) => vehicle.category === category && (brand === "Tutti" || vehicle.brand === brand));
  const segmentCount = new Set(filtered.map((vehicle) => vehicle.segment)).size;

  return (
    <div className={styles.catalogExplorer}>
      <div className={styles.brandRail} role="tablist" aria-label={`Marche ${category}`}>
        {["Tutti", ...brands].map((item) => <button key={item} type="button" role="tab" aria-selected={brand === item} onClick={() => setBrand(item)} className={brand === item ? styles.active : ""}>{item}<small>{item === "Tutti" ? vehicles.filter((v) => v.category === category).length : vehicles.filter((v) => v.category === category && v.brand === item).length}</small></button>)}
      </div>
      <div className={styles.selectionMeta}><div><span>{category === "Auto" ? "Automobili" : "Motociclette"}</span><strong>{brand}</strong></div><p>{filtered.length} modelli · {segmentCount} categorie · ogni modello apre scroll experience, colori e confronto prezzi.</p></div>
      <div className={`vehicle-grid ${category === "Moto" ? "moto-grid" : ""}`}>{filtered.map((vehicle, index) => <VehicleCard key={vehicle.slug} vehicle={vehicle} index={index} />)}</div>
    </div>
  );
}
