import Link from "next/link";
import React from "react";
export default function Video() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/video.mp4" type="video/mp4" />
        <source src="/videos/banner.webm" type="video/webm" />
        Votre navigateur ne supporte pas la vidéo.
      </video>

      {/* Overlay sombre pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenu par-dessus la vidéo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
          Afrikamazing 
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl drop-shadow-lg">
          Découvrez nos produits exceptionnels et profitez d'une expérience
          unique
        </p>
        <Link href="../../products">
          <button
            style={{
              backgroundColor: "#C99642",
              // backgroundColor: disabled ? undefined : "transparent",
            }}
            className="bg-orange-600 cursor-pointer hover:bg-orange-700 text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Découvrir nos articles
          </button>
        </Link>
      </div>

      {/* Indicateur de scroll (optionnel) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
}
