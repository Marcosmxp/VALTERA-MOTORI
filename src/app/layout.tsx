import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valtera Motori | Auto & Moto Premium",
  description:
    "Concept digitale di una concessionaria premium multimarca italiana, con showroom, comparazione e consulenza.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
