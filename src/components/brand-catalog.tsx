"use client";

import { useMemo, useState } from "react";
import { VehicleCard } from "@/components/vehicle-card";
import { getInventoryBrands, getInventorySegments, inventoryVehicles, type InventoryVehicle } from "@/data/inventory-v06";
import type { VehicleCategory } from "@/data/vehicles";
import styles from "./brand-catalog.module.css";

const priceCaps = [20000, 40000, 80000, 150000, 300000, 600000] as const;
const powerFloors = [0, 100, 200, 400, 600] as const;

function sortVehicles(items: InventoryVehicle[], sort: string) {
  const result = [...items];
  if (sort === "price-asc") result.sort((a, b) => a.priceValue - b.priceValue);
  if (sort === "price-desc") result.sort((a, b) => b.priceValue - a.priceValue);
  if (sort === "power-desc") result.sort((a, b) => b.powerHp - a.powerHp);
  if (sort === "year-desc") result.sort((a, b) => b.year - a.year || a.priceValue - b.priceValue);
  return result;
}

export function BrandCatalog({ category }: { category: VehicleCategory }) {
  const brands = useMemo(() => getInventoryBrands(category), [category]);
  const segments = useMemo(() => getInventorySegments(category), [category]);
  const categoryVehicles = useMemo(() => inventoryVehicles.filter((vehicle) => vehicle.category === category), [category]);
  const families = useMemo(() => [...new Set(categoryVehicles.map((vehicle) => vehicle.family))].sort((a, b) => a.localeCompare(b, "it")), [categoryVehicles]);
  const years = useMemo(() => [...new Set(categoryVehicles.map((vehicle) => vehicle.year))].sort((a, b) => b - a), [categoryVehicles]);

  const [brand, setBrand] = useState("Tutti");
  const [family, setFamily] = useState("Tutte");
  const [segment, setSegment] = useState("Tutti");
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(600000);
  const [minPower, setMinPower] = useState(0);
  const [year, setYear] = useState(0);
  const [sort, setSort] = useState("price-asc");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("it");
    const matches = categoryVehicles.filter((vehicle) => {
      if (brand !== "Tutti" && vehicle.brand !== brand) return false;
      if (family !== "Tutte" && vehicle.family !== family) return false;
      if (segment !== "Tutti" && vehicle.segment !== segment) return false;
      if (vehicle.priceValue > maxPrice || vehicle.powerHp < minPower) return false;
      if (year && vehicle.year !== year) return false;
      if (normalizedQuery && !`${vehicle.brand} ${vehicle.model} ${vehicle.family} ${vehicle.segment}`.toLocaleLowerCase("it").includes(normalizedQuery)) return false;
      return true;
    });
    return sortVehicles(matches, sort);
  }, [brand, categoryVehicles, family, maxPrice, minPower, query, segment, sort, year]);

  function resetFilters() {
    setBrand("Tutti"); setFamily("Tutte"); setSegment("Tutti"); setQuery(""); setMaxPrice(600000); setMinPower(0); setYear(0); setSort("price-asc");
  }

  return (
    <div className={styles.catalogExplorer}>
      <div className={styles.brandRail} role="tablist" aria-label={`Marche ${category}`}>
        {["Tutti", ...brands].map((item) => <button key={item} type="button" role="tab" aria-selected={brand === item} onClick={() => { setBrand(item); setFamily("Tutte"); }} className={brand === item ? styles.active : ""}>{item}<small>{item === "Tutti" ? categoryVehicles.length : categoryVehicles.filter((vehicle) => vehicle.brand === item).length}</small></button>)}
      </div>

      <div className={styles.filterPanel} aria-label={`Filtri inventario ${category}`}>
        <label className={styles.search}><span>Cerca</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={category === "Auto" ? "Golf, Macan, Ferrari…" : "Ducati, naked, superbike…"} /></label>
        <label><span>Famiglia</span><select value={family} onChange={(event) => setFamily(event.target.value)}><option>Tutte</option>{families.filter((item) => brand === "Tutti" || categoryVehicles.some((vehicle) => vehicle.brand === brand && vehicle.family === item)).map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Segmento</span><select value={segment} onChange={(event) => setSegment(event.target.value)}><option>Tutti</option>{segments.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Prezzo max</span><select value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))}>{priceCaps.map((value) => <option value={value} key={value}>€ {new Intl.NumberFormat("it-IT").format(value)}</option>)}</select></label>
        <label><span>Potenza min</span><select value={minPower} onChange={(event) => setMinPower(Number(event.target.value))}>{powerFloors.map((value) => <option value={value} key={value}>{value ? `${value}+ CV` : "Tutte"}</option>)}</select></label>
        <label><span>Anno</span><select value={year} onChange={(event) => setYear(Number(event.target.value))}><option value={0}>Tutti</option>{years.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
        <label><span>Ordina</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="price-asc">Prezzo ↑</option><option value="price-desc">Prezzo ↓</option><option value="power-desc">Potenza ↓</option><option value="year-desc">Anno ↓</option></select></label>
        <button className={styles.reset} type="button" onClick={resetFilters}>Reset</button>
      </div>

      <div className={styles.selectionMeta}><div><span>{category === "Auto" ? "Automobili" : "Motociclette"}</span><strong>{brand === "Tutti" ? "Inventory" : brand}</strong></div><p>{filtered.length} risultati su {categoryVehicles.length} · versioni, segmenti e fasce prezzo condividono lo stesso motore Market Intelligence.</p></div>
      {filtered.length ? <div className={`vehicle-grid ${category === "Moto" ? "moto-grid" : ""}`}>{filtered.map((vehicle, index) => <VehicleCard key={vehicle.slug} vehicle={vehicle} index={index} />)}</div> : <div className={styles.empty}><strong>Nessun risultato.</strong><span>Modifica prezzo, potenza o categoria.</span><button type="button" onClick={resetFilters}>Azzera filtri</button></div>}
    </div>
  );
}
