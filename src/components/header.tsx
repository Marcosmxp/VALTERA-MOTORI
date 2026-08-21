"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigation = [
  ["Selection", "/#selection"],
  ["Auto", "/#auto"],
  ["Moto", "/#moto"],
  ["Mercato", "/#confronta"],
  ["Showroom", "/#showroom"],
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = window.scrollY;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrolled(top > 28);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(top / max, 1)})`;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="brand" href="/" aria-label="Valtera Motori — Home">
          <span className="brand-mark" aria-hidden="true">V</span>
          <span className="brand-wordmark">VALTERA MOTORI</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigazione principale">
          {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="header-cta" href="/#contatto">Prenota</Link>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Chiudi menu" : "Apri menu"} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
        </div>
        <span className="scroll-progress" ref={progressRef} aria-hidden="true" />
      </header>
      <div id="mobile-navigation" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <p className="eyebrow">Navigazione</p>
          {navigation.map(([label, href], index) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</Link>)}
          <Link className="button button-primary" href="/#contatto" onClick={() => setMenuOpen(false)}>Prenota un&apos;esperienza</Link>
        </div>
      </div>
    </>
  );
}
