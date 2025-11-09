"use client";
import React, { useMemo, useState, useEffect, useRef } from "react"; // <-- AJOUTS : useEffect, useRef
import { ShoppingCart, X, Download } from "lucide-react";
import { ProductEntity } from "../../lib/global.type";
import { getProductData } from "../../data/product";
import { useParams } from "next/navigation";
import { LocaleCode, getLocaleFromParams } from "../../lib/global.type";
type LocaleParams = {
  locale: LocaleCode;
};
interface ProductCardProps {
  translations: {
    title: string;
    order: string;
    orderShort: string;
    whatsapp: string;
    noProducts: string;
    whatsappMessageTemplate: string;
  };
}

// --- NOUVEAU COMPOSANT AVEC L'ANIMATION DE SCROLL ---
// ----------------------------------------------------

interface AnimatedProductCardProps {
  prod: ProductEntity;
  handleImageClick: (prod: ProductEntity) => void;
  translations: ProductCardProps["translations"];
  index: number; // Pour le délai d'animation (staggering)
}

const AnimatedProductCard = ({
  prod,
  handleImageClick,
  translations: t,
  index,
}: AnimatedProductCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si l'élément est visible dans le viewport, on met à jour l'état
        if (entry.isIntersecting) {
          setIsVisible(true);
          // On arrête d'observer cet élément une fois qu'il est apparu
          observer.unobserve(entry.target);
        }
      },
      // Configure l'observateur pour se déclencher quand 10% de l'élément est visible
      {
        root: null, // utilise le viewport comme racine
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Fonction de nettoyage
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Définition des classes d'animation : fondu en entrée (fade-in) et glissement vertical
  const animationClasses = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-12"; // Commence en bas et transparent

  // Le délai d'animation progressif (staggering) pour un bel effet de cascade
  const delayStyle = { transitionDelay: `${index * 75}ms` };

  return (
    <article
      ref={cardRef} // Référence pour l'Intersection Observer
      key={prod.id}
      // Combinaison des classes de base, des classes d'animation et du délai
      className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-700 ease-out overflow-hidden flex flex-col group ${animationClasses}`}
      style={delayStyle}
    >
      {/* Image du produit - Cliquable */}
      <div
        className="relative w-full aspect-square bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => handleImageClick(prod)}
      >
        <img
          src={prod.img.url}
          alt={prod.img.alt}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        {/* Badge Catégorie */}
        <span className="absolute top-2 right-2 md:top-4 md:right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 md:px-3 rounded-full">
          {prod.category}
        </span>
      </div>

      {/* Contenu du produit */}
      <div className="p-3 md:p-6 flex flex-col flex-grow">
        {/* Nom du produit */}
        <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 line-clamp-2">
          {prod.name}
        </h3>

        {/* Description - masquée sur très petits écrans */}
        <p className="hidden sm:block text-sm md:text-base text-gray-600 mb-3 md:mb-4 flex-grow line-clamp-2 md:line-clamp-3">
          {prod.desc}
        </p>

        {/* Boutons d'action */}
        <div className="flex gap-1.5 md:gap-2 mt-auto">
          {/* Bouton Commander */}
          <button
            style={{
              backgroundColor: "#FF5A00",
            }}
            className="flex-1 min-w-0 text-xs cursor-pointer md:text-sm hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-2 md:px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-1"
            aria-label={`${t.order} ${prod.name}`}
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="hidden sm:inline truncate">{t.order}</span>
            <span className="sm:hidden">{t.orderShort}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

// --- COMPOSANT PRINCIPAL ---
// ---------------------------

export default function ProductCard({ translations: t }: ProductCardProps) {
  const params = useParams() as LocaleParams;
  const currentLocale = useMemo<LocaleCode>(() => {
    return getLocaleFromParams(params);
  }, [params]);
  // State pour la modal d'image
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
    name: string;
  } | null>(null);

  // Obtenir les produits traduits selon la locale
  const products = getProductData(currentLocale);
  // Fonction pour ouvrir l'image
  const handleImageClick = (prod: ProductEntity) => {
    setSelectedImage({
      url: prod.img.url,
      alt: prod.img.alt,
      name: prod.name,
    });
  };

  // Fonction pour télécharger l'image
  const handleDownload = () => {
    if (!selectedImage) return;
    const link = document.createElement("a");
    link.href = selectedImage.url;
    link.download = `${selectedImage.name}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section className="w-full px-4 py-16 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        {/* En-tête de la section */}
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-3">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
        </div>
        {/* Grille de produits responsive */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
          {products.map((prod, index) => (
            <AnimatedProductCard // <-- UTILISATION DU COMPOSANT ANIMÉ
              key={prod.id}
              prod={prod}
              handleImageClick={handleImageClick}
              translations={t}
              index={index} // Passage de l'index pour le délai
            />
          ))}
        </div>

        {/* Message si aucun produit */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t.noProducts}</p>
          </div>
        )}
      </section>

      {/* Modal de visualisation d'image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Boutons fixes en haut à droite */}
          <div className="fixed top-4 right-4 flex gap-3 z-10">
            {/* Bouton Télécharger */}
            <button
              onClick={handleDownload}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-orange-600 p-3 rounded-full transition-all backdrop-blur-sm"
              aria-label="Télécharger"
            >
              <Download className="w-6 h-6" />
            </button>
            {/* Bouton Fermer */}
            <button
              onClick={() => setSelectedImage(null)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-orange-600 p-3 rounded-full transition-all backdrop-blur-sm"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="relative max-w-5xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />

            {/* Nom du produit */}
            <p className="text-orange-500 text-center mt-4 text-lg font-semibold">
              {selectedImage.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
