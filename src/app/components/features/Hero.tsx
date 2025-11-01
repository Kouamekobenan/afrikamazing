"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react"; 
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
  const t = translations.hero; 

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      src: "/images/HNP-1.jpg",
      title: t.collection ?? "Nouvelle Collection",
      subtitle: t.discover ?? "Découvrez nos dernières créations.",
      link: `/products`,
    },
    {
      src: "/images/sac_4.jpg",
      title: t.modernStyle ?? "Style Moderne et Authentique",
      subtitle: t.forAllOccasions ?? "Parfait pour toutes les occasions.",
      link: `/products`,
    },
    {
      src: "/images/HNP-11.jpg",
      title: t.quality ?? "Qualité Supérieure",
      subtitle: t.longLasting ?? "Des produits conçus pour durer.",
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
          // Amélioration du style : transition plus douce et plus longue
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          role="region"
          aria-label={`Slide ${index + 1} of ${slides.length}`}
        >
          {/* Remplacement de <Image> par une balise <img> standard */}
          <img
            src={slide.src}
            alt={slide.title}
            // 🔑 Utilisation des classes CSS pour simuler 'fill' et 'object-cover'
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Overlay sombre pour garantir la lisibilité du texte */}
          <div className="absolute inset-0 bg-black/60 md:bg-black/50 lg:bg-black/40"></div>
        </div>
      ))}

      {/* 2. Content Container (Par-dessus les slides) */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {/* Le conteneur du texte avec effet de transition pour le changement de slide */}
        <div
          key={currentSlide} // Ajout de la clé pour forcer le re-rendu et l'animation lors du changement de slide
          className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg animate-fadeInUp">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-10 text-gray-200 drop-shadow-md animate-fadeInUp delay-200">
            {slides[currentSlide].subtitle}
          </p>
          {/* Remplacement de <Link> par une balise <a> standard */}
          <a href={`/${locale}${slides[currentSlide].link ?? "/products"}`}>
            <SimpleButton
              label={t.seeProducts ?? "Voir les produits"}
              className="px-8 py-3 text-lg bg-yellow-600 hover:bg-yellow-700 transition duration-300 shadow-xl"
            />
          </a>
        </div>
      </div>
      {/* 3. Navigation Arrows (Par-dessus le contenu, z-30) */}
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
      {/* 4. Indicateurs de position (dots) */}
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
    </div>
  );
}
