// src/lib/seo.config.ts
export const defaultSEO = {
  title: "AFRIKAMAZING - Mode et Culture Africaine",
  description:
    "Découvrez l'univers africain moderne d'AFRIKAMAZING : vêtements, accessoires et valeurs culturelles.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://afrikamazing.com",
    site_name: "AFRIKAMAZING",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AFRIKAMAZING site vitrine",
      },
    ],
  },
  twitter: {
    handle: "@afrikamazing",
    site: "@afrikamazing",
    cardType: "summary_large_image",
  },
};
