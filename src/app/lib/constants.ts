// src/lib/constants.ts

export const SITE_NAME = "AFRIKAMAZING";
export const BASE_URL = "https://afrikamazing.com";

export const SITE_INFO = {
  name: SITE_NAME,
  description: "Découvrez l'Afrique autrement",
  tagline: "Votre guide pour explorer l'Afrique",
  email: "contact@afrikamazing.com",
  phone: "+225 XX XX XX XX XX",
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/afrikamazing",
  instagram: "https://instagram.com/afrikamazing",
  whatsapp: "https://wa.me/225XXXXXXXXX",
  twitter: "https://twitter.com/afrikamazing",
  youtube: "https://youtube.com/@afrikamazing",
} as const;

export const NAVIGATION = [
  { label: "Accueil", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Expériences", href: "/experiences" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const COLORS = {
  primary: "#FF6B35",
  secondary: "#004E89",
  accent: "#F7B801",
} as const;
