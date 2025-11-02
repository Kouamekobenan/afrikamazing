import ProductCard from "../../components/features/ProductCard";
import Video from "../../components/features/Video";
import { useTranslation } from "../../i18n";
import { LocaleCode } from "../../lib/global.type";
interface ProductsPageProps {
  params: Promise<{ locale: LocaleCode }>;
}
export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const { i18n } = await useTranslation(locale, "common");
  const translations = i18n.getResourceBundle(locale, "common");
 
  // ✅ Toutes les traductions sont déjà dans le bundle
  const allTranslations = {
    countdown: translations?.countdown || {},
    hero: translations?.hero || {},
    gallery: translations?.gallery || {},
    footer: translations?.footer || {}, // ✅ C'est déjà dans "common"
    video: translations?.video || {},
  };

  const videoTranslations = {
    video: allTranslations.video || {
      fallbackVideo: "Votre navigateur ne supporte pas la vidéo.",
      headline: "Afrikamazing",
      description:
        "Découvrez nos produits exceptionnels et profitez d'une expérience unique",
      button: "Découvrir nos articles",
    },
  };
  const productsTranslations = translations?.products || {};
  // const currentTranslations = TRANSLATIONS[locale] || TRANSLATIONS.fr;
  return (
    <div>
      <Video locale={locale} translations={videoTranslations} />
      <ProductCard
        translations={{
          title: productsTranslations?.title ?? "Nos produits disponibles",
          order: productsTranslations?.order ?? "Commander",
          orderShort: productsTranslations?.orderShort ?? "commander",
          whatsapp: productsTranslations?.whatsapp ?? "WhatsApp",
          noProducts:
            productsTranslations?.noProducts ?? "Aucun produit disponible.",
          whatsappMessageTemplate:
            productsTranslations?.whatsappMessage ??
            'Bonjour ! Je souhaite réserver le sac "{name}". Merci !', // ✅ String template
        }}
      />
    </div>
  );
}
