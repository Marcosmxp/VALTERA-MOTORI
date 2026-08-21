import Image from "next/image";
import Link from "next/link";
import type { InventoryVehicle } from "@/data/inventory-v06";
import type { Vehicle } from "@/data/vehicles";
import { VehicleColors } from "@/components/vehicle-colors";

type CardVehicle = Vehicle & Partial<Pick<InventoryVehicle, "family" | "priceKind" | "priceVerifiedAt">>;

export function VehicleCard({ vehicle, index = 0 }: { vehicle: CardVehicle; index?: number }) {
  const productHref = `/marketplace/${vehicle.marketplaceSlug}`;
  const priceKind = vehicle.priceKind === "promo" ? "Promo verificata" : vehicle.priceKind === "listino" ? "Listino" : "Mercato";
  return (
    <article className="vehicle-card">
      <div className="vehicle-media">
        <Image src={vehicle.image} alt={vehicle.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
        <div className="vehicle-media-top"><span className="vehicle-category">{vehicle.segment}</span><span className="vehicle-number">{String(index + 1).padStart(2, "0")}</span></div>
        <a className="photo-credit" href={vehicle.imagePage} target="_blank" rel="noreferrer">Visual · {vehicle.credit}</a>
      </div>
      <div className="vehicle-content">
        <div className="vehicle-title-row"><div><p className="vehicle-brand">{vehicle.brand}{vehicle.family && vehicle.family !== vehicle.model ? ` · ${vehicle.family}` : ""}</p><h3><Link href={productHref}>{vehicle.model}</Link></h3></div><span className="availability-dot"><i />V0.6</span></div>
        <div className="vehicle-price"><strong>{vehicle.price}</strong><span>{priceKind} · {vehicle.monthly}</span></div>
        <dl className="vehicle-specs"><div><dt>Potenza</dt><dd>{vehicle.power}</dd></div><div><dt>DNA</dt><dd>{vehicle.performance}</dd></div><div><dt>Anno</dt><dd>{vehicle.year}</dd></div></dl>
        <VehicleColors colors={vehicle.colors} compact />
        <div className="vehicle-actions"><Link className="text-link" href={productHref}>Esperienza completa <span>↗</span></Link><Link className="text-link subtle" href={`${productHref}#market-data`}>Confronta prezzi</Link></div>
      </div>
    </article>
  );
}
