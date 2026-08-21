"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredVehicles } from "@/data/vehicles";

gsap.registerPlugin(ScrollTrigger);

export function CinematicShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current; const track = trackRef.current; if (!section || !track) return;
      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0);
      const tween = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance() + window.innerHeight * .7}`, scrub: .8, pin: true, invalidateOnRefresh: true, anticipatePin: 1 } });
      return () => tween.kill();
    });
    return () => media.revert();
  }, []);

  return <section id="selection" ref={sectionRef} className="cinematic" aria-labelledby="cinematic-title"><div className="cinematic-topline"><p className="eyebrow">Valtera Selection · V0.5</p><span>Scorri per esplorare</span></div><div ref={trackRef} className="cinematic-track"><article className="cinematic-intro"><p className="eyebrow dark">Multibrand intelligence</p><h2 id="cinematic-title">Il prodotto emoziona. Il mercato conferma.</h2><p>Quattro modelli aprono il racconto, ma la stessa esperienza è ora disponibile su tutte le 32 schede prodotto.</p></article>{featuredVehicles.map((vehicle, index) => <article className="cinematic-panel" key={vehicle.slug}><Image src={vehicle.image} alt={vehicle.imageAlt} fill sizes="85vw" /><div className="cinematic-shade" /><div className="cinematic-index">0{index + 1}</div><div className="cinematic-copy"><p>{vehicle.brand} · {vehicle.segment}</p><h3>{vehicle.model}</h3><div className="cinematic-specs"><span><small>Potenza</small>{vehicle.power}</span><span><small>Mercato</small>{vehicle.price}</span></div><Link href={`/marketplace/${vehicle.marketplaceSlug}`}>Esperienza completa <span>↗</span></Link></div><a className="photo-credit" href={vehicle.imagePage} target="_blank" rel="noreferrer">Visual · {vehicle.credit}</a></article>)}</div></section>;
}
