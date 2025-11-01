import {
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { LocaleCode } from "../../lib/global.type";

const SITE_NAME = "AFRIKAMAZING";

const SOCIAL_LINKS = {
  facebook: "https://facebook.com/afrikamazing",
  instagram: "https://instagram.com/afrikamazing",
  whatsapp: "https://wa.me/225XXXXXXXXX",
};

interface FooterProps {
  locale: LocaleCode;
  translations: Record<string, Record<string, string>>;
}

export default function Footer({ locale, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = translations.footer;
  // console.log("🔍 Footer translations received:", t);
  const FOOTER_LINKS = {
    company: [
      { label: t?.about ?? "À propos", href: `/${locale}/about` },
      { label: t?.careers ?? "Carrières", href: "#" },
      { label: t?.press ?? "Presse", href: "#" },
    ],
    explore: [
      { label: t?.blog ?? "Blog", href: `/${locale}/blog` },
      { label: t?.gallery ?? "Galerie", href: "#" },
    ],
    support: [
      { label: t?.help ?? "Centre d'aide", href: `/${locale}/help` },
      { label: t?.contact ?? "Contact", href: `/${locale}/contact` },
      { label: t?.faq ?? "FAQ", href: `/${locale}/faq` },
      { label: t?.terms ?? "Conditions", href: "#" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-2 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <a
                href={`/${locale}`}
                className="flex items-center space-x-2 group"
              >
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  <Image
                    src="/logo/Logo-orange.png"
                    width={280}
                    height={280}
                    alt="Logo AFRIKAMAZING"
                    className="drop-shadow-lg"
                    priority
                  />
                </span>
              </a>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md text-sm sm:text-base">
              {t?.description ?? "Découvrez l'Afrique authentique..."}
            </p>

            {/* Newsletter */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-white font-semibold text-xs sm:text-sm">
                {t?.newsletterTitle ?? "Restez informé"}
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t?.newsletterPlaceholder ?? "Votre email"}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500 text-xs sm:text-sm"
                />
                <button
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label={t?.newsletterButton ?? "S'abonner"}
                >
                  <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
            {/* Social Links */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-white font-semibold text-xs sm:text-sm">
                {t?.socialTitle ?? "Suivez-nous"}
              </h3>
              <div className="flex gap-2 sm:gap-3">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  aria-label={t?.facebook ?? "Facebook"}
                >
                  <Facebook
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  aria-label={t?.instagram ?? "Instagram"}
                >
                  <Instagram
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  aria-label={t?.whatsapp ?? "WhatsApp"}
                >
                  <MessageCircle
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>
          {/* Company Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {t?.company ?? "Entreprise"}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-xs sm:text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Explore Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {t?.explore ?? "Explorer"}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-xs sm:text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Support Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {t?.support ?? "Support"}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-xs sm:text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* Contact Info */}
            <div className="pt-3 sm:pt-4 space-y-2 sm:space-y-3 border-t border-gray-700">
              <a
                href="mailto:contact@afrikamazing.com"
                className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-xs sm:text-sm group"
              >
                <Mail
                  size={14}
                  className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform"
                />
                <span>contact@afrikamazing.com</span>
              </a>
              <a
                href="tel:+225XXXXXXXXX"
                className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-xs sm:text-sm group"
              >
                <Phone
                  size={14}
                  className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform"
                />
                <span>+225 XX XX XX XX XX</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400 text-xs sm:text-sm">
                <MapPin
                  size={14}
                  className="sm:w-4 sm:h-4 mt-0.5 flex-shrink-0"
                />
                <span>{t?.location ?? "Abidjan, Côte d'Ivoire"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span>
                © {currentYear} {SITE_NAME}.{" "}
                {t?.rights ?? "Tous droits réservés"}.
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>{t?.madeWith ?? "Fait avec"}</span>
              <Heart
                size={12}
                className="sm:w-[14px] sm:h-[14px] text-red-500 fill-red-500 animate-pulse"
              />
              <span>{t?.inAfrica ?? "en Afrique"}</span>
            </div>

            <div className="flex gap-4 sm:gap-6">
              <a
                href={`/${locale}/privacy`}
                className="hover:text-orange-400 transition-colors"
              >
                {t?.privacy ?? "Confidentialité"}
              </a>
              <a
                href={`/${locale}/terms`}
                className="hover:text-orange-400 transition-colors"
              >
                {t?.terms ?? "Conditions"}
              </a>
              <a
                href={`/${locale}/cookies`}
                className="hover:text-orange-400 transition-colors"
              >
                {t?.cookies ?? "Cookies"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
