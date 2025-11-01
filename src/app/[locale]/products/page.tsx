// app/[locale]/products/page.tsx
import React from "react";
import { LocaleCode } from "../../lib/global.type";
import { TRANSLATIONS } from "@/src/config/translate";
import Navbar from "../../components/layout/Navbar";
import Video from "../../components/features/Video";
import ProductCard from "../../components/features/ProductCard";

interface PageProps {
  params: Promise<{
    locale: LocaleCode;
  }>;
}

export default async function Page({ params }: PageProps) {
  // ✅ Await params avant de l'utiliser
  const { locale } = await params;

  // Récupérer les traductions pour la locale actuelle
  const currentTranslations = TRANSLATIONS[locale] || TRANSLATIONS.fr;

  return (
    <div>
      <Navbar />
      <Video locale={locale} translations={currentTranslations} />
      <ProductCard />
    </div>
  );
}

// Générer les pages statiques pour chaque locale
export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "ar" }];
}
