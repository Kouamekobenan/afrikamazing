// ============================================
// config/translations.ts
// Traductions avec typage complet
// ============================================
import { LocaleCode } from "../app/lib/global.type";
/**
 * Structure des traductions
 */
export type Translations = {
  nav: {
    products: string;
    blog: string;
    about: string;
    contact: string;
    search: string;
    language: string;
    order: string;
    menu: string;
    close: string;
    home: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
  };
  products: {
    title: string;
    description: string;
    viewAll: string;
  };
  blog: {
    title: string;
    latest: string;
    readMore: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    address: string;
    send: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
  };
};

/**
 * Traductions complètes
 */
export const TRANSLATIONS: Record<LocaleCode, Translations> = {
  en: {
    nav: {
      products: "Products",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      search: "Search",
      language: "Language",
      order: "Order Now",
      menu: "Menu",
      close: "Close",
      home: "Home",
    },
    home: {
      title: "Welcome to AFRIKAMAZING",
      subtitle: "Discover authentic African products",
      cta: "Explore Now",
    },
    products: {
      title: "Our Products",
      description: "Discover our selection of African products",
      viewAll: "View All",
    },
    blog: {
      title: "Our Blog",
      latest: "Latest Articles",
      readMore: "Read More",
    },
    about: {
      title: "About Us",
      description: "Learn more about AFRIKAMAZING",
    },
    contact: {
      title: "Contact Us",
      email: "Email",
      phone: "Phone",
      address: "Address",
      send: "Send Message",
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      success: "Success!",
      cancel: "Cancel",
      confirm: "Confirm",
    },
  },
  fr: {
    nav: {
      products: "Produits",
      blog: "Blog",
      about: "À propos",
      contact: "Contact",
      search: "Rechercher",
      language: "Langue",
      order: "Commander",
      menu: "Menu",
      close: "Fermer",
      home: "Accueil",
    },
    home: {
      title: "Bienvenue chez AFRIKAMAZING",
      subtitle: "Découvrez des produits africains authentiques",
      cta: "Explorer Maintenant",
    },
    products: {
      title: "Nos Produits",
      description: "Découvrez notre sélection de produits africains",
      viewAll: "Voir Tout",
    },
    blog: {
      title: "Notre Blog",
      latest: "Derniers Articles",
      readMore: "Lire Plus",
    },
    about: {
      title: "À Propos",
      description: "En savoir plus sur AFRIKAMAZING",
    },
    contact: {
      title: "Nous Contacter",
      email: "Email",
      phone: "Téléphone",
      address: "Adresse",
      send: "Envoyer le Message",
    },
    common: {
      loading: "Chargement...",
      error: "Une erreur s'est produite",
      success: "Succès !",
      cancel: "Annuler",
      confirm: "Confirmer",
    },
  },
  ar: {
    nav: {
      products: "المنتجات",
      blog: "المدونة",
      about: "من نحن",
      contact: "اتصل بنا",
      search: "بحث",
      language: "اللغة",
      order: "اطلب الآن",
      menu: "القائمة",
      close: "إغلاق",
      home: "الرئيسية",
    },
    home: {
      title: "مرحبا بكم في AFRIKAMAZING",
      subtitle: "اكتشف المنتجات الأفريقية الأصيلة",
      cta: "استكشف الآن",
    },
    products: {
      title: "منتجاتنا",
      description: "اكتشف مجموعتنا من المنتجات الأفريقية",
      viewAll: "عرض الكل",
    },
    blog: {
      title: "مدونتنا",
      latest: "أحدث المقالات",
      readMore: "اقرأ المزيد",
    },
    about: {
      title: "معلومات عنا",
      description: "تعرف على المزيد عن AFRIKAMAZING",
    },
    contact: {
      title: "اتصل بنا",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      address: "العنوان",
      send: "إرسال رسالة",
    },
    common: {
      loading: "جار التحميل...",
      error: "حدث خطأ",
      success: "نجاح!",
      cancel: "إلغاء",
      confirm: "تأكيد",
    },
  },
};

/**
 * Hook de traduction typé
 */
export function useTypedTranslation(locale: LocaleCode) {
  const translations = TRANSLATIONS[locale];

  /**
   * Fonction de traduction avec support des clés imbriquées
   * Exemple: t("nav.products") ou t("home.title")
   */
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key} for locale ${locale}`);
        return key;
      }
    }

    return value;
  };

  return { t, translations };
}
