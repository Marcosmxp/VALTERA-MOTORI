"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProductFocus, ProductStage } from "@/data/product-experience";
import styles from "./vehicle-scroll-story.module.css";

gsap.registerPlugin(ScrollTrigger);

const focusMap: Record<ProductFocus, { scale: number; x: number; y: number; markerX: string; markerY: string }> = {
  front: { scale: 1.16, x: 5, y: 0, markerX: "30%", markerY: "58%" },
  powertrain: { scale: 1.34, x: -4, y: 1, markerX: "53%", markerY: "54%" },
  wheel: { scale: 1.52, x: 13, y: -5, markerX: "33%", markerY: "72%" },
  cockpit: { scale: 1.58, x: -16, y: 4, markerX: "65%", markerY: "38%" },
};

export function VehicleScrollStory({ image, imageAlt, stages }: { image: string; imageAlt: string; stages: ProductStage[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const triggers: ScrollTrigger[] = [];
        const activate = (index: number) => {
          const stage = stages[index];
          const focus = focusMap[stage.focus];
          setActiveIndex(index);
          if (imageRef.current) gsap.to(imageRef.current, { scale: focus.scale, xPercent: focus.x, yPercent: focus.y, duration: 1.1, ease: "power3.out", overwrite: true });
          if (markerRef.current) gsap.to(markerRef.current, { left: focus.markerX, top: focus.markerY, duration: .8, ease: "power3.out", overwrite: true });
        };
        stageRefs.current.forEach((node, index) => {
          if (!node) return;
          triggers.push(ScrollTrigger.create({ trigger: node, start: "top 58%", end: "bottom 42%", onEnter: () => activate(index), onEnterBack: () => activate(index) }));
        });
        activate(0);
        return () => triggers.forEach((trigger) => trigger.kill());
      });
      return () => media.revert();
    }, section);
    return () => context.revert();
  }, [stages]);

  return (
    <section ref={sectionRef} className={styles.story} aria-label="Esplorazione tecnica del veicolo">
      <div className={styles.copy}>
        <header className={styles.intro}><p>Scroll engineering · V0.4</p><h2>Scorri. La macchina si svela nei dettagli.</h2><span>Il visual usa zoom, maschere e focus progressivo. Nessun dato 3D viene simulato come se fosse CAD reale.</span></header>
        {stages.map((stage, index) => (
          <article key={stage.id} ref={(node) => { stageRefs.current[index] = node; }} className={`${styles.stage} ${activeIndex === index ? styles.activeStage : ""}`}>
            <div className={styles.stageIndex}>{stage.index}</div>
            <div><p>{stage.label}</p><h3>{stage.title}</h3><span className={styles.stageText}>{stage.text}</span><div className={styles.metric}><strong>{stage.metric}</strong><small>{stage.metricLabel}</small></div></div>
          </article>
        ))}
      </div>
      <div className={styles.visual} aria-hidden="true"><div className={styles.visualFrame}><Image ref={imageRef} src={image} alt={imageAlt} fill sizes="(max-width: 900px) 100vw, 58vw" className={styles.image} priority /><div className={styles.vignette} /><div className={styles.scan} /><div ref={markerRef} className={styles.marker}><span /><i /></div><div className={styles.visualHud}><span>VALTERA / DETAIL MODE</span><b>0{activeIndex + 1} / 04</b></div><div className={styles.activeLabel}>{stages[activeIndex]?.label}</div></div></div>
    </section>
  );
}
