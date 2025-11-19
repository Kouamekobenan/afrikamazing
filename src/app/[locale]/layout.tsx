import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "../../../src/globals.css";
import Navbar from "../components/layout/Navbar";
import { useTranslation } from "../i18n";
import Footer from "../components/layout/Footer";
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
export const metadata: Metadata = {
  title: {
    default: "AFRIKAMAZING - Produits Africains Authentiques",
    template: "%s | AFRIKAMAZING",
  },
  description: "Découvrez des produits africains authentiques et de qualité",
  keywords: ["produits africains", "artisanat", "alimentation", "mode"],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { i18n } = await useTranslation(locale, "common");
  const translations = i18n.getResourceBundle(locale, "common");
  const allTranslations = {
    countdown: translations?.countdown || {},
    hero: translations?.hero || {},
    gallery: translations?.gallery || {},
    footer: translations?.footer || {},
  };
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer locale={locale} translations={allTranslations} />
      </body>
    </html>
  );
}
