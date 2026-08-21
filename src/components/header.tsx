import Link from "next/link";

const navigation = [
  ["Auto", "#auto"],
  ["Moto", "#moto"],
  ["Confronta", "#confronta"],
  ["Showroom", "#showroom"],
] as const;

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Valtera Motori — Home">
        <span className="brand-mark" aria-hidden="true">V</span>
        <span>VALTERA MOTORI</span>
      </Link>

      <nav className="desktop-nav" aria-label="Navigazione principale">
        {navigation.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" href="#contatto">
        Prenota una visita
      </Link>
    </header>
  );
}
