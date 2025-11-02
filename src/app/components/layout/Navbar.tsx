"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Menu, X, Search, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { Button } from "../ui/Button";

type LocaleParams = {
  locale: LocaleCode; // Assurez-vous que LocaleCode est importé
};
// Imports de la configuration

import {
  getLocaleFromParams,
  isRtlLocale,
  LocaleCode,
  LOCALES,
} from "../../lib/global.type";
import { useTypedTranslation } from "@/src/config/translate";

const SITE_NAME = "AFRIKAMAZING";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  // const params = useParams();
  const params = useParams() as LocaleParams;

  // Obtenir la locale courante de manière sécurisée
  const currentLocale = useMemo<LocaleCode>(() => {
    return getLocaleFromParams(params);
  }, [params]);

  // Hook de traduction typé
  const { t } = useTypedTranslation(currentLocale);

  // Vérifier si RTL
  const isRtl = useMemo(() => isRtlLocale(currentLocale), [currentLocale]);
  // Liens de navigation
  const NAVIGATION_LINKS = useMemo(
    () => [
      { label: t("nav.products"), href: "/products" },
      { label: t("nav.blog"), href: "/blog" },
      { label: t("nav.about"), href: "/about" },
      { label: t("nav.contact"), href: "/contact" },
    ],
    [t]
  );
  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le dropdown au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLangDropdown(false);
      }
    };

    if (showLangDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showLangDropdown]);

  // Fermer le menu mobile au changement de route
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  // Fonction pour changer de langue
  const changeLanguage = useCallback(
    (newLocale: LocaleCode) => {
      let pathWithoutLocale = pathname;

      // Retirer le préfixe de locale actuel
      if (pathname.startsWith(`/${currentLocale}`)) {
        pathWithoutLocale = pathname.substring(`/${currentLocale}`.length);
      }

      // Si le chemin est vide, utiliser "/"
      if (!pathWithoutLocale || pathWithoutLocale === "") {
        pathWithoutLocale = "/";
      }

      // Construire la nouvelle URL
      const newPath = `/${newLocale}${pathWithoutLocale}`;

      // Navigation
      router.push(newPath);

      // Fermer les menus
      setShowLangDropdown(false);
      setIsOpen(false);
    },
    [pathname, currentLocale, router]
  );

  // Gestion du clavier pour le dropdown
  const handleLangKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowLangDropdown(false);
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            href={`/${currentLocale}`}
            className="relative flex items-center space-x-2 group overflow-hidden rounded-xl p-2"
            aria-label={t("nav.home")}
          >
            {/* Dégradé noir élégant */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-transparent group-hover:from-black/30 group-hover:via-black/20 transition-all duration-500"></div>
            <Image
              src="/logo/logo-or2.png"
              width={280}
              height={280}
              alt={`${SITE_NAME} logo`}
              className="relative z-10 drop-shadow-2xl filter brightness-110 group-hover:brightness-125 transition-all duration-300"
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_LINKS.map((item) => (
              <Link
                key={item.href}
                href={`/${currentLocale}${item.href}`}
                className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Bouton de recherche */}
            <button
              className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              aria-label={t("nav.search")}
            >
              <Search size={20} />
            </button>

            {/* Sélecteur de langue */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowLangDropdown((prev) => !prev)}
                onKeyDown={handleLangKeyDown}
                className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all flex items-center gap-1"
                aria-label={t("nav.language")}
                aria-expanded={showLangDropdown}
                aria-haspopup="true"
              >
                <Globe size={20} />
                <span className="uppercase font-bold text-sm">
                  {currentLocale}
                </span>
              </button>

              {/* Menu déroulant */}
              {showLangDropdown && (
                <div
                  className={`absolute ${
                    isRtl ? "left-0" : "right-0"
                  } mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-1">
                    {LOCALES.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={() =>
                          changeLanguage(locale.code as LocaleCode)
                        }
                        className={`w-full text-left px-4 py-2 text-sm ${
                          locale.code === currentLocale
                            ? "bg-orange-100 text-orange-600 font-bold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        dir={locale.isRtl === true ? "rtl" : "ltr"}
                        role="menuitem"
                        aria-current={
                          locale.code === currentLocale ? "true" : undefined
                        }
                      >
                        {locale.flag && (
                          <span className="mr-2">{locale.flag}</span>
                        )}
                        {locale.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bouton Commander */}
            <Button label={t("nav.order")} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isOpen ? t("nav.close") : t("nav.menu")}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-gray-100 shadow-xl">
          {/* Mobile Links */}
          {NAVIGATION_LINKS.map((item) => (
            <Link
              key={item.href}
              href={`/${currentLocale}${item.href}`}
              className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Actions */}
          <div className="pt-4 space-y-2 border-t border-gray-100 mt-4">
            {/* Bouton Rechercher Mobile */}
            <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Search size={18} />
              {t("nav.search")}
            </button>

            {/* Sélecteur de langue Mobile */}
            {LOCALES.map((locale) => (
              <button
                key={locale.code}
                onClick={() => changeLanguage(locale.code as LocaleCode)}
                className={`w-full px-4 py-3 text-left rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  locale.code === currentLocale
                    ? "bg-orange-100 text-orange-600 font-bold"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
                dir={locale.isRtl === true ? "rtl" : "ltr"}
              >
                <Globe size={18} />
                {locale.flag && <span className="mr-1">{locale.flag}</span>}
                {locale.label}
              </button>
            ))}

            {/* Bouton Commander Mobile */}
            <Button label={t("nav.order")} />
          </div>
        </div>
      </div>
    </nav>
  );
}
