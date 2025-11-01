import CountdownClient from "../components/features/CountdownClient";
import { useTranslation } from "../i18n";
import { LocaleCode } from "../lib/global.type";
interface HomePageProps {
  params: Promise<{
    locale: LocaleCode;
  }>;
}
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Charger les traductions communes (countdown, hero, etc.)
  const { i18n } = await useTranslation(locale, "common");
  const commonTranslations = i18n.getResourceBundle(locale, "common");

  // ✅ Charger les traductions du footer séparément
  const { i18n: i18nFooter } = await useTranslation(locale, "footer");
  const footerTranslations = i18nFooter.getResourceBundle(locale, "footer");

  // Combiner toutes les traductions
  const allTranslations = {
    countdown: commonTranslations?.countdown || {},
    hero: commonTranslations?.hero || {},
    gallery: commonTranslations?.gallery || {},
    footer: footerTranslations?.footer || {}, // ✅ Ajouter les traductions footer
  };

  console.log("🔍 Footer translations:", footerTranslations); // Debug

  return (
    <div className="">
      <CountdownClient
        locale={locale as "en" | "fr" | "ar"}
        translations={allTranslations}
      />
      {/* <Footer locale={locale as LocaleCode} translations={allTranslations} /> */}
    </div>
  );
}
