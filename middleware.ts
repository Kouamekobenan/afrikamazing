// src/middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Liste des locales supportées
  locales: ["fr", "en", "ar"],

  // Locale par défaut
  defaultLocale: "fr",

  // Détection automatique de la locale
  localeDetection: true,
});

export const config = {
  // Matcher pour toutes les routes sauf les fichiers statiques
  matcher: ["/", "/(fr|en|ar)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
