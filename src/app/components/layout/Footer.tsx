import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  Music2,
} from "lucide-react";
import Image from "next/image";
import { LocaleCode } from "../../lib/global.type";

const SITE_NAME = "AFRIKAMAZING";

const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@afrikamazing1",
  instagram:
    "https://www.instagram.com/afrikamazing5?igsh=MXIzNHdocnAxbWpmcQ==",
  whatsapp: "https://www.facebook.com/share/1JNNffvicj/",
};

interface FooterProps {
  locale: LocaleCode;
  translations: Record<string, Record<string, string>>;
}

export default function Footer({ locale, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = translations.footer;
  
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
      { label: t?.help ?? "Centre d'aide", href: `/${locale}/#` },
      { label: t?.contact ?? "Contact", href: `/${locale}/contact` },
      { label: t?.faq ?? "FAQ", href: `/${locale}/#` },
      { label: t?.terms ?? "Conditions", href: "#" },
    ],
  };
  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-amber-500/10 overflow-hidden">
      {/* Decorative Gold Light Leak / Subtle Glow effect to give it a rich luxury feel */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand & Newsletter Section (Spans full width on mobile/tablet, 2 columns on desktop) */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-6 sm:space-y-8 pr-0 lg:pr-8">
            <div className="space-y-4">
              <a href={`/${locale}`} className="inline-block group">
                <Image
                  src="/logo/logo-or2.png"
                  width={240}
                  height={80}
                  alt="Logo AFRIKAMAZING"
                  className="w-48 sm:w-56 h-auto drop-shadow-[0_2px_15px_rgba(201,150,66,0.15)] transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
              </a>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                {t?.description ?? "Découvrez l'Afrique authentique..."}
              </p>
            </div>

            {/* Newsletter form with gold border and glassmorphism styling */}
            <div className="space-y-3 max-w-md">
              <h3 className="text-slate-200 font-semibold text-sm tracking-wide">
                {t?.newsletterTitle ?? "Restez informé"}
              </h3>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder={t?.newsletterPlaceholder ?? "Votre email"}
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-white placeholder-slate-500 text-sm transition-all duration-300 min-w-0"
                />
                <button
                  style={{ backgroundColor: "#C99642" }}
                  className="absolute right-1.5 p-2 bg-gradient-to-r text-white rounded-lg hover:shadow-[0_0_15px_rgba(201,150,66,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
                  aria-label={t?.newsletterButton ?? "S'abonner"}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Social Links with stunning hover transitions */}
            <div className="space-y-3">
              <h3 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">
                {t?.socialTitle ?? "Suivez-nous"}
              </h3>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-black border border-white/5 hover:border-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_15px_rgba(0,0,0,0.4)] group"
                  aria-label="TikTok"
                >
                  <Music2 size={18} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 border border-white/5 hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_15px_rgba(219,39,119,0.3)] group"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-emerald-600 border border-white/5 hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_15px_rgba(16,185,129,0.3)] group"
                  aria-label={t?.facebook ?? "Facebook"}
                >
                  <Facebook size={18} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Company Links (Spans 1 column on mobile and desktop) */}
          <div className="col-span-1 space-y-4">
            <h3 className="text-amber-500 font-bold text-xs uppercase tracking-widest">
              {t?.company ?? "Entreprise"}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2.5 h-[2px] bg-amber-500 transition-all duration-350 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links (Spans 1 column on mobile and desktop) */}
          <div className="col-span-1 space-y-4">
            <h3 className="text-amber-500 font-bold text-xs uppercase tracking-widest">
              {t?.explore ?? "Explorer"}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2.5 h-[2px] bg-amber-500 transition-all duration-350 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links & Contact (Spans 2 columns on mobile so everything is super clean without wrapping, 1 column on desktop) */}
          <div className="col-span-2 sm:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-amber-500 font-bold text-xs uppercase tracking-widest">
                {t?.support ?? "Support"}
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2.5 h-[2px] bg-amber-500 transition-all duration-350 mr-0 group-hover:mr-2"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info list */}
            <div className="pt-6 space-y-3.5 border-t border-slate-800">
              <a
                href="mailto:contact@afrikamazing.com"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200 text-sm group"
              >
                <Mail size={16} className="text-amber-500/80 group-hover:scale-110 transition-transform duration-250" />
                <span className="truncate">afrikamazing@gmail.com</span>
              </a>
              <a
                href="tel:+201211218318"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200 text-sm group"
              >
                <Phone size={16} className="text-amber-500/80 group-hover:scale-110 transition-transform duration-250" />
                <span>+20 12 11218318</span>
              </a>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={16} className="text-amber-500/80 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  {t?.location ?? "villa 116 door 1, Katameya west golf"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Terms Bar */}
      <div className="relative border-t border-slate-900 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-slate-500">
            <div className="text-center md:text-left">
              © {currentYear} <span className="text-amber-500/90 font-medium">{SITE_NAME}</span>.{" "}
              {t?.rights ?? "Tous droits réservés"}.
            </div>
            
            <div className="flex items-center gap-1.5 py-1 px-3 bg-white/5 border border-white/5 rounded-full text-xs text-slate-400 hover:border-amber-500/10 transition-colors">
              <span>{t?.madeWith ?? "Fait avec"}</span>
              <Heart
                size={13}
                className="text-red-500 fill-red-500 animate-pulse"
              />
              <span>{t?.inAfrica ?? "en Afrique"}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a
                href={`/${locale}/privacy`}
                className="hover:text-white transition-colors duration-200"
              >
                {t?.privacy ?? "Confidentialité"}
              </a>
              <a
                href={`/${locale}/terms`}
                className="hover:text-white transition-colors duration-200"
              >
                {t?.terms ?? "Conditions"}
              </a>
              <a
                href={`/${locale}/cookies`}
                className="hover:text-white transition-colors duration-200"
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
