// HomePage.tsx - VERSION CORRIGÉE ✅

import CountdownClient from "../components/features/CountdownClient";
import Footer from "../components/layout/Footer";
import { useTranslation } from "../i18n";
import { LocaleCode } from "../lib/global.type";

interface HomePageProps {
  params: Promise<{
    locale: LocaleCode;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // ✅ TOUT est dans "common", pas besoin de charger "footer" séparément
  const { i18n } = await useTranslation(locale, "common");
  const translations = i18n.getResourceBundle(locale, "common");

  // console.log("🔍 All translations:", translations);

  // ✅ Toutes les traductions sont déjà dans le bundle
  const allTranslations = {
    countdown: translations?.countdown || {},
    hero: translations?.hero || {},
    gallery: translations?.gallery || {},
    footer: translations?.footer || {}, // ✅ C'est déjà dans "common"
  };

  return (
    <div className="">
      <CountdownClient
        locale={locale as "en" | "fr" | "ar"}
        translations={allTranslations}
      />
      <Footer locale={locale} translations={allTranslations} />
    </div>
  );
}
