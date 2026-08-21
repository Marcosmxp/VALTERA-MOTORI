import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1776102669015-21d5f6c0cdf8?auto=format&fit=crop&fm=jpg&q=88&w=2400";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero-image"
        src={HERO_IMAGE}
        alt="Supercar esposte in uno showroom premium"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-overlay" />
      <div className="hero-noise" aria-hidden="true" />

      <div className="hero-content">
        <p className="eyebrow">Milano · Auto & Moto Premium</p>
        <h1 id="hero-title">L&apos;emozione non si sceglie. Si guida.</h1>
        <p className="hero-copy">
          Icone italiane, performance internazionali e una consulenza costruita intorno al tuo prossimo veicolo.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="#auto">
            Scopri le auto
          </Link>
          <Link className="button button-ghost" href="#moto">
            Scopri le moto
          </Link>
        </div>
      </div>

      <div className="hero-meta" aria-label="Servizi Valtera">
        <span>Selection</span>
        <span>Trade-in</span>
        <span>Test drive</span>
        <span>Consegna Italia</span>
      </div>
    </section>
  );
}
