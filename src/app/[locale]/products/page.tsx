import { TRANSLATIONS } from "@/src/config/translate";
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

  const productsTranslations = translations?.products || {};
  const currentTranslations = TRANSLATIONS[locale] || TRANSLATIONS.fr;

  return (
    <div>
      <Video locale={locale} translations={currentTranslations} />
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
