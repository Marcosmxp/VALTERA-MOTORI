import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/data/vehicles";

export function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  const productHref = vehicle.marketplaceSlug ? `/marketplace/${vehicle.marketplaceSlug}` : null;

  return (
    <article className="vehicle-card">
      <div className="vehicle-media">
        <Image src={vehicle.image} alt={vehicle.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
        <div className="vehicle-media-top"><span className="vehicle-category">{vehicle.label}</span><span className="vehicle-number">0{index + 1}</span></div>
        <a className="photo-credit" href={vehicle.imagePage} target="_blank" rel="noreferrer">Foto · {vehicle.credit}</a>
      </div>
      <div className="vehicle-content">
        <div className="vehicle-title-row"><div><p className="vehicle-brand">{vehicle.brand}</p><h3>{productHref ? <Link href={productHref}>{vehicle.model}</Link> : vehicle.model}</h3></div><span className="availability-dot"><i />{vehicle.status}</span></div>
        <div className="vehicle-price"><strong>{vehicle.price}</strong><span>{vehicle.monthly}</span></div>
        <dl className="vehicle-specs"><div><dt>Potenza</dt><dd>{vehicle.power}</dd></div><div><dt>0–100 / DNA</dt><dd>{vehicle.performance}</dd></div><div><dt>Trazione</dt><dd>{vehicle.drivetrain}</dd></div></dl>
        <div className="vehicle-actions">
          {productHref ? <Link className="text-link" href={productHref}>Apri scheda prodotto <span>↗</span></Link> : <Link className="text-link" href="/#contatto">Richiedi informazioni <span>↗</span></Link>}
          <Link className="text-link subtle" href="/#confronta">Confronta</Link>
        </div>
      </div>
    </article>
  );
}
