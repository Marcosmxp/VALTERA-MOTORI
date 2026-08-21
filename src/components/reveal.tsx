"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = PropsWithChildren<{ className?: string; distance?: number; delay?: number }>;

export function Reveal({ children, className, distance = 34, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const animation = gsap.fromTo(ref.current, { autoAlpha: 0, y: distance }, { autoAlpha: 1, y: 0, delay, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } });
      return () => animation.kill();
    });
    return () => media.revert();
  }, [delay, distance]);
  return <div ref={ref} className={className}>{children}</div>;
}
