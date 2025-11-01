import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import type { Metadata } from "next";

import "../../../src/globals.css";
import Navbar from "../components/layout/Navbar";
// ============================================
// Configuration des polices
// ============================================
const poppins = localFont({
  src: [
    { path: "../fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
});

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

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; // ✅ params est une Promise
}) {
  const { locale } = await params; // ✅ Await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-16 lg:pt-20">{children}</main>
      </body>
    </html>
  );
}
