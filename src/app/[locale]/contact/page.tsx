import React from "react";
import ContactForm from "../../components/features/ContactForm";
import { useTranslation } from "../../i18n";
import { LocaleCode } from "../../lib/global.type";

interface ContactPageProps {
  params: Promise<{
    locale: LocaleCode;
  }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  // Charger les traductions
  const { i18n } = await useTranslation(locale, "common");
  const translations = i18n.getResourceBundle(locale, "common");

  // Extraire les traductions nécessaires
  const contactTranslations = translations?.contact || {};
  const navTranslations = translations?.nav || {};

  return (
    <div>
      {/* <Navbar locale={locale} translations={navTranslations} /> */}
      <ContactForm translations={contactTranslations} />
    </div>
  );
}
