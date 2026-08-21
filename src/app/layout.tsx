import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valtera Motori | Auto & Moto Premium Milano",
  description: "Concept digitale immersivo di una concessionaria premium multimarca italiana: auto, moto, confronto e consulenza.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Valtera Motori | Auto & Moto Premium Milano",
    description: "Showroom digitale immersivo per auto e moto premium.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
