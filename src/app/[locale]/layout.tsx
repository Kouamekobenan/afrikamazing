import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import type { Metadata } from "next";

// import "../globals.css"; // Import global CSS
// import "../../glabals.css";
import "../../../src/globals.css";
import Navbar from "../components/layout/Navbar";
import { LOCALES } from "../lib/global.type";

// ============================================
// Configuration des polices
// ============================================
export async function generateStaticParams() {
  // Ceci dit à Next.js : "Construis statiquement les pages pour 'fr' et 'en'."
  return LOCALES.map((locale) => ({
    locale: locale.code as string,
  }));
}
// Police locale Poppins
const poppins = localFont({
  src: [
    { path: "../fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
});

// Polices Google
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================
// Métadonnées
// ============================================

export const metadata: Metadata = {
  title: {
    default: "AFRIKAMAZING - Produits Africains Authentiques",
    template: "%s | AFRIKAMAZING",
  },
  description: "Découvrez des produits africains authentiques et de qualité",
  keywords: ["produits africains", "artisanat", "alimentation", "mode"],
};

// ============================================
// Layout principal
// ============================================

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {/* Navbar globale */}
        <Navbar />

        {/* Contenu principal */}
        <main className="pt-16 lg:pt-20">{children}</main>

        {/* Footer optionnel */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
