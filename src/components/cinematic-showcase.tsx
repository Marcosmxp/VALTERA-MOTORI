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
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const getDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: () => `+=${getDistance() + window.innerHeight * 0.7}`, scrub: 0.8, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      return () => tween.kill();
    });
    return () => media.revert();
  }, []);

  return (
    <section id="selection" ref={sectionRef} className="cinematic" aria-labelledby="cinematic-title">
      <div className="cinematic-topline"><p className="eyebrow">Valtera Selection · V0.3</p><span>Scorri per esplorare</span></div>
      <div ref={trackRef} className="cinematic-track">
        <article className="cinematic-intro">
          <p className="eyebrow dark">Curated in Milano</p>
          <h2 id="cinematic-title">Ogni macchina ha un carattere. Il sito deve fartelo sentire.</h2>
          <p>La V0.3 unisce showroom editoriale e Market Intelligence: immagini grandi, ritmo, profondità e confronto commerciale verificabile.</p>
        </article>
        {featuredVehicles.map((vehicle, index) => (
          <article className="cinematic-panel" key={vehicle.slug}>
            <Image src={vehicle.image} alt={vehicle.imageAlt} fill sizes="85vw" /><div className="cinematic-shade" /><div className="cinematic-index">0{index + 1}</div>
            <div className="cinematic-copy"><p>{vehicle.brand} · {vehicle.label}</p><h3>{vehicle.model}</h3><div className="cinematic-specs"><span><small>Potenza</small>{vehicle.power}</span><span><small>Performance</small>{vehicle.performance}</span></div><Link href="#contatto">Richiedi una proposta <span>↗</span></Link></div>
            <a className="photo-credit" href={vehicle.imagePage} target="_blank" rel="noreferrer">Foto · {vehicle.credit}</a>
          </article>
        ))}
      </div>
    </section>
  );
}
