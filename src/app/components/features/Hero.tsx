"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react"; // Ajout de MapPin pour l'icône

interface SimpleButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}
const SimpleButton: React.FC<SimpleButtonProps> = ({
  label,
  className,
  onClick,
}) => (
  <button
    className={`rounded-full font-semibold text-white transition-colors duration-300 transform hover:scale-[1.02] active:scale-95 ${className}`}
    onClick={onClick}
  >
    {label}
  </button>
);

interface HeroProps {
  locale: "en" | "fr" | "ar";
  translations: Record<string, Record<string, string>>;
}

export default function Hero({ locale, translations }: HeroProps) {
  // Traduction pour le carrousel (hero) et la localisation (location)
  const tHero = translations.hero;
  const tLocation = translations.hero;

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      src: "/images/HNP-1.jpg",
      title: tHero?.collection ?? "Nouvelle Collection",
      subtitle: tHero?.discover ?? "Découvrez nos dernières créations.",
      link: `/products`,
    },
    {
      src: "/images/sac_4.jpg",
      title: tHero?.modernStyle ?? "Style Moderne et Authentique",
      subtitle: tHero?.forAllOccasions ?? "Parfait pour toutes les occasions.",
      link: `/products`,
    },
    {
      src: "/images/HNP-11.jpg",
      title: tHero?.quality ?? "Qualité Supérieure",
      subtitle: tHero?.longLasting ?? "Des produits conçus pour durer.",
      link: `/products`,
    },
  ];
  // ============================================
  // Logique du Carrousel
  // ============================================
  useEffect(() => {
    // Le timer pour le défilement automatique
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 secondes
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  // ============================================
  // Rendu
  // ============================================

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      role="group"
      aria-live="polite"
    >
      {/* 1. Carousel Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          role="region"
          aria-label={`Slide ${index + 1} of ${slides.length}`}
        >
          <img
            src={slide.src}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Overlay sombre pour garantir la lisibilité du texte */}
          <div className="absolute inset-0 bg-black/60 md:bg-black/50 lg:bg-black/40"></div>
        </div>
      ))}

      {/* 2. Contenu du Texte Central (Titre et Bouton) */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          key={currentSlide}
          className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg animate-fadeInUp">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-10 text-gray-200 drop-shadow-md animate-fadeInUp delay-200">
            {slides[currentSlide].subtitle}
          </p>
          <a href={`/${locale}${slides[currentSlide].link ?? "/products"}`}>
            <SimpleButton
              label={tHero?.seeProducts ?? "Voir les produits"}
              className="px-8 py-3 text-lg bg-yellow-600 hover:bg-yellow-700 transition duration-300 shadow-xl"
            />
          </a>
        </div>
      </div>

      {/* 3. Contrôles de Navigation (Flèches et Points) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 
                    bg-white/20 text-white p-3 rounded-full 
                    transition-all duration-300 hover:bg-white/50 hover:scale-110 
                    focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
        aria-label="Diapositive précédente"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 
                    bg-white/20 text-white p-3 rounded-full 
                    transition-all duration-300 hover:bg-white/50 hover:scale-110 
                    focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
        aria-label="Diapositive suivante"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Indicateurs de position (dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
                          ${
                            index === currentSlide
                              ? "bg-yellow-600 w-8"
                              : "bg-white/50 hover:bg-white"
                          }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>

      {/* 4. Nouveau Bloc de Localisation (Positionné en bas à gauche/droite) */}
      <div
        className={`absolute bottom-6 p-3 sm:p-4 z-30 
                    max-w-xs sm:max-w-sm // Taille ajustée pour le mobile
                    // Style Glassmorphism pour la cohérence
                    bg-black/20 backdrop-blur-md rounded-xl shadow-2xl 
                    text-white transition-all duration-500
                    // Positionnement adaptatif selon la locale (ajusté pour mobile)
                    ${
                      locale === "ar"
                        ? "left-auto right-2 sm:right-4"
                        : "left-2 sm:left-4 right-auto"
                    } 
                    block`} // Rendu visible sur tous les écrans (retrait de 'hidden md:block')
      >
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <MapPin className="w-5 h-5 flex-shrink-0 text-yellow-400 mt-1 sm:w-6 sm:h-6" />
          <div>
            {/* Titre : Plus petit, en gras, accentué */}
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 text-yellow-400">
              {tLocation?.title ?? "Où nous localiser?"}
            </h3>
            {/* Description : Plus petite et élégante */}
            <p className="text-xxs sm:text-xs font-light text-gray-200">
              {tLocation?.desc ??
                "Nous somme située dans le quartier d'affaires du Plateau, notre boutique est facilement accessible et vous accueille dans un cadre moderne et chaleureux."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client";
// import React, { useState, useEffect } from "react";
// import { ArrowLeft, ArrowRight, MapPin } from "lucide-react"; // Ajout de MapPin pour l'icône

// interface SimpleButtonProps {
//   label: string;
//   className?: string;
//   onClick?: () => void;
// }
// const SimpleButton: React.FC<SimpleButtonProps> = ({
//   label,
//   className,
//   onClick,
// }) => (
//   <button
//     className={`rounded-full font-semibold text-white transition-colors duration-300 transform hover:scale-[1.02] active:scale-95 ${className}`}
//     onClick={onClick}
//   >
//     {label}
//   </button>
// );

// interface HeroProps {
//   locale: "en" | "fr" | "ar";
//   translations: Record<string, Record<string, string>>;
// }

// export default function Hero({ locale, translations }: HeroProps) {
//   // Traduction pour le carrousel (hero) et la localisation (location)
//   const tHero = translations.hero;
//   const tLocation = translations.hero;

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [
//     {
//       src: "/images/HNP-1.jpg",
//       title: tHero?.collection ?? "Nouvelle Collection",
//       subtitle: tHero?.discover ?? "Découvrez nos dernières créations.",
//       link: `/products`,
//     },
//     {
//       src: "/images/sac_4.jpg",
//       title: tHero?.modernStyle ?? "Style Moderne et Authentique",
//       subtitle: tHero?.forAllOccasions ?? "Parfait pour toutes les occasions.",
//       link: `/products`,
//     },
//     {
//       src: "/images/HNP-11.jpg",
//       title: tHero?.quality ?? "Qualité Supérieure",
//       subtitle: tHero?.longLasting ?? "Des produits conçus pour durer.",
//       link: `/products`,
//     },
//   ];
//   // ============================================
//   // Logique du Carrousel
//   // ============================================
//   useEffect(() => {
//     // Le timer pour le défilement automatique
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000); // 5 secondes
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const goToSlide = (index: number) => setCurrentSlide(index);
//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
//   const prevSlide = () =>
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   // ============================================
//   // Rendu
//   // ============================================

//   return (
//     <div
//       className="relative w-full h-screen overflow-hidden"
//       role="group"
//       aria-live="polite"
//     >
//       {/* 1. Carousel Slides */}
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
//             index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
//           }`}
//           role="region"
//           aria-label={`Slide ${index + 1} of ${slides.length}`}
//         >
//           <img
//             src={slide.src}
//             alt={slide.title}
//             className="absolute inset-0 w-full h-full object-cover object-center"
//           />
//           {/* Overlay sombre pour garantir la lisibilité du texte */}
//           <div className="absolute inset-0 bg-black/60 md:bg-black/50 lg:bg-black/40"></div>
//         </div>
//       ))}

//       {/* 2. Contenu du Texte Central (Titre et Bouton) */}
//       <div className="absolute inset-0 flex items-center justify-center z-20">
//         <div
//           key={currentSlide}
//           className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl"
//         >
//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg animate-fadeInUp">
//             {slides[currentSlide].title}
//           </h1>
//           <p className="text-xl sm:text-2xl md:text-3xl mb-10 text-gray-200 drop-shadow-md animate-fadeInUp delay-200">
//             {slides[currentSlide].subtitle}
//           </p>
//           <a href={`/${locale}${slides[currentSlide].link ?? "/products"}`}>
//             <SimpleButton
//               label={tHero?.seeProducts ?? "Voir les produits"}
//               className="px-8 py-3 text-lg bg-yellow-600 hover:bg-yellow-700 transition duration-300 shadow-xl"
//             />
//           </a>
//         </div>
//       </div>

//       {/* 3. Contrôles de Navigation (Flèches et Points) */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-30 
//                     bg-white/20 text-white p-3 rounded-full 
//                     transition-all duration-300 hover:bg-white/50 hover:scale-110 
//                     focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
//         aria-label="Diapositive précédente"
//       >
//         <ArrowLeft className="w-6 h-6" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-30 
//                     bg-white/20 text-white p-3 rounded-full 
//                     transition-all duration-300 hover:bg-white/50 hover:scale-110 
//                     focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
//         aria-label="Diapositive suivante"
//       >
//         <ArrowRight className="w-6 h-6" />
//       </button>

//       {/* Indicateurs de position (dots) */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 
//                           ${
//                             index === currentSlide
//                               ? "bg-yellow-600 w-8"
//                               : "bg-white/50 hover:bg-white"
//                           }`}
//             aria-label={`Aller à la diapositive ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* 4. Nouveau Bloc de Localisation (Positionné en bas à gauche/droite) */}
//       <div
//         className={`absolute bottom-6 p-4 z-30 max-w-sm 
//                     // Style Glassmorphism pour la cohérence
//                     bg-black/20 backdrop-blur-md rounded-xl shadow-2xl 
//                     text-white transition-all duration-500
//                     // Positionnement adaptatif selon la locale
//                     ${
//                       locale === "ar"
//                         ? "left-auto right-4"
//                         : "left-4 right-auto"
//                     } 
//                     hidden md:block`} // Masqué sur mobile pour éviter l'encombrement
//       >
//         <div className="flex items-start space-x-3 rtl:space-x-reverse">
//           <MapPin className="w-6 h-6 flex-shrink-0 text-yellow-400 mt-1" />
//           <div>
//             {/* Titre : Plus petit, en gras, accentué */}
//             <h3 className="text-sm font-bold uppercase tracking-wider mb-1 text-yellow-400">
//               {tLocation?.title ?? "Où nous localiser?"}
//             </h3>
//             {/* Description : Plus petite et élégante */}
//             <p className="text-xs font-light text-gray-200">
//               {tLocation?.desc ??
//                 "Nous somme située dans le quartier d'affaires du Plateau, notre boutique est facilement accessible et vous accueille dans un cadre moderne et chaleureux."}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }