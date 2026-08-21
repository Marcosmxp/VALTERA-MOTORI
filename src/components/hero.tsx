"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = "https://images.unsplash.com/photo-1776102669015-21d5f6c0cdf8?auto=format&fit=crop&fm=jpg&q=88&w=2600";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .from(".hero-kicker", { y: 20, autoAlpha: 0, duration: 0.7 })
          .from(".hero-title-line > span", { yPercent: 110, duration: 1.05, stagger: 0.08 }, "-=0.35")
          .from(".hero-copy, .hero-actions", { y: 26, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, "-=0.55")
          .from(metaRef.current, { autoAlpha: 0, duration: 0.8 }, "-=0.4");

        gsap.to(imageRef.current, {
          yPercent: 12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1.1 },
        });

        gsap.to(contentRef.current, {
          yPercent: 22,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: section, start: "35% top", end: "bottom top", scrub: true },
        });
      }, section);
      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div ref={imageRef} className="hero-media"><Image className="hero-image" src={HERO_IMAGE} alt="Supercar in uno showroom premium" fill priority sizes="100vw" /></div>
      <div className="hero-overlay" /><div className="hero-grid" aria-hidden="true" />
      <div ref={contentRef} className="hero-content">
        <p className="eyebrow hero-kicker">Milano · Auto & Moto Premium</p>
        <h1 id="hero-title"><span className="hero-title-line"><span>L&apos;emozione</span></span><span className="hero-title-line"><span>si guida.</span></span></h1>
        <p className="hero-copy">Una concessionaria digitale costruita come un&apos;esperienza: selezione premium, confronto chiaro e consulenza prima ancora della visita.</p>
        <div className="hero-actions"><Link className="button button-primary" href="#selection">Esplora la selection</Link><Link className="button button-ghost" href="#confronta">Confronta offerte</Link></div>
      </div>
      <div ref={metaRef} className="hero-meta" aria-label="Servizi Valtera"><span><b>01</b> Selection</span><span><b>02</b> Trade-in</span><span><b>03</b> Test drive</span><span><b>04</b> Consegna Italia</span></div>
      <a className="hero-photo-credit" href="https://unsplash.com/s/photos/ferrari-296" target="_blank" rel="noreferrer">Foto · Unsplash</a>
    </section>
  );
}
