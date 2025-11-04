"use client";
import { useEffect, useState } from "react";
// Importation de useRouter pour la navigation forcée
import { useRouter } from "next/navigation";


interface CountdownClientProps {
  locale: "en" | "fr" | "ar";
  translations: Record<string, Record<string, string>>;
}
export default function CountdownClient({
  locale,
  translations,
}: CountdownClientProps) {
  const router = useRouter(); // Initialisation du routeur
  const [countdown, setCountdown] = useState(3);
  
  // t devient une fonction
  const t = (key: string) => translations.countdown[key] || key;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Un petit délai supplémentaire après 0 pour que l'animation finale soit vue
      const finalDelay = setTimeout(() => {
        // Redirection forcée vers la page d'accueil avec la locale
        router.push("../../[locale]/accueil");
      }, 500);
      return () => clearTimeout(finalDelay);
    }
  }, [countdown, locale, router]); // router et locale ajoutés aux dépendances
  return (
    // Nouveau style : Pleine page, centré, fond sombre et moderne
    <div
      className={`relative min-h-screen flex items-center justify-center 
                    bg-gray-900 overflow-hidden ${
                      locale === "ar" ? "rtl" : "ltr"
                    }`}
    >
      <div
        className="absolute inset-0 bg-dot-pattern opacity-10"
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black/80 to-gray-900"
        aria-hidden="true"
      ></div>

      {/* 🚨 Panneau Principal (Glassmorphism / Frosted Glass) */}
      <div
        className="relative z-10 w-full max-w-lg p-8 mx-4 sm:mx-auto 
                         bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 
                         shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(255,255,255,0.1)] 
                         text-center transform transition-all duration-700 ease-out animate-in fade-in zoom-in-50"
      >
        {/* Section du Compte à Rebours */}
        <div className="mb-8">
          {/* 🌀 Indicateur de Chargement Amélioré (Plus subtil) */}
          <div className="relative mb-6 flex justify-center items-center h-24">
            {/* Le cercle de progression devient la seule animation visuelle */}
            <div
              className={`absolute rounded-full h-24 w-24 border-8 border-gray-700 border-t-orange-500 
                                     ${
                                       countdown > 0
                                         ? "animate-spin-slow"
                                         : "animate-ping-once"
                                     } `}
            ></div>

            {/* Le Compte à Rebours Numérique (Très Grand et Impactant) */}
            <div
              className="relative text-8xl font-black text-transparent 
                                         bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 
                                         font-mono tracking-tighter drop-shadow-xl z-20 transition-opacity duration-300"
            >
              {countdown > 0 ? countdown : "GO"}
            </div>
          </div>
          {/* Titre Principal */}
          <h1
            className="text-4xl font-extrabold mb-2 tracking-tight 
                                         text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
          >
            {t("welcome")}
          </h1>
          <p className="text-xl text-gray-400 font-light">{t("loading")}</p>
        </div>

        {/* Barre de Progression Visuelle */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-1000 ease-out"
            // La progression est calculée sur la base de 3 secondes (initialState=3)
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          ></div>
        </div>

        {/* Messages et Statut */}
        <div className="flex items-center justify-center space-x-3 text-gray-300">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-fast"></div>
          <span className="text-base font-medium">{t("status")}</span>
          <span className="text-base font-light ml-4">
            {t("connection")} {countdown > 0 ? countdown : 0}{" "}
            {countdown !== 1 ? t("seconds") : t("second")}
          </span>
        </div>

        {/* Message de fin */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">{t("wait")}</p>
        </div>
      </div>
    </div>
  );
}
