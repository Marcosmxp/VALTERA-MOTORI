import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/data/vehicles";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="vehicle-card">
      <div className="vehicle-media">
        <Image
          src={vehicle.image}
          alt={vehicle.imageAlt}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
        <span className="vehicle-category">{vehicle.category}</span>
      </div>

      <div className="vehicle-content">
        <div>
          <p className="vehicle-brand">{vehicle.brand}</p>
          <h3>{vehicle.model}</h3>
        </div>
        <div className="vehicle-price">
          <strong>{vehicle.price}</strong>
          <span>{vehicle.monthly}</span>
        </div>
        <dl className="vehicle-specs">
          <div>
            <dt>Potenza</dt>
            <dd>{vehicle.power}</dd>
          </div>
          <div>
            <dt>Performance</dt>
            <dd>{vehicle.zeroToHundred}</dd>
          </div>
        </dl>
        <Link className="text-link" href="#contatto">
          Richiedi informazioni <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
