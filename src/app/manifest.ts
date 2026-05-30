import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AFRIKAMAZING - Produits Africains Authentiques",
    short_name: "AFRIKAMAZING",
    description: "Découvrez des produits africains authentiques : artisanat d'art, mode, alimentation et accessoires.",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#C99642",
    icons: [
      {
        src: "/logo/logo.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/logo/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
