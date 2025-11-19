"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  ShoppingCart, // Revenir à l'icône de panier
  X,
  Download,
} from "lucide-react";
// Importations inchangées...
import { ProductEntity } from "../../lib/global.type";
import { getProductData } from "../../data/product";
import { useParams } from "next/navigation";
import { LocaleCode, getLocaleFromParams } from "../../lib/global.type";

// TODO: REMPLACEZ 'VOTRE_LIEN_COMMANDE' PAR L'URL RÉELLE (ex: '/contact' ou 'mailto:votre@email.com')
const ORDER_LINK_URL = "#section-contact-ou-formulaire-de-commande";

type LocaleParams = {
  locale: LocaleCode;
};
interface ProductCardProps {
  translations: {
    title: string;
    order: string; // Utilisé pour le bouton flottant
    orderShort: string;
    whatsapp: string;
    noProducts: string;
    whatsappMessageTemplate: string;
  };
}

// --- NOUVEAU COMPOSANT : Bouton Flottant "Commander" (Orange) ---
// ----------------------------------------------------------------

interface FloatingOrderButtonProps {
  translations: ProductCardProps["translations"];
}

const FloatingOrderButton = ({ translations: t }: FloatingOrderButtonProps) => {
  return (
    <a
      href={ORDER_LINK_URL}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40" // Position flottante
      aria-label={`${t.order} (Accéder à la commande)`}
    >
      <div
        // Utilisation de la couleur orange (FF5A00) ou une couleur d'accent similaire pour un look dynamique
        style={{ backgroundColor: "#FF5A00" }}
        className="text-white p-3 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center group cursor-pointer"
      >
        {/* Icône de panier rétirer pour le moment */}
        {/* <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-3" /> */}

        {/* Texte "Commander" toujours visible sur le bouton flottant */}
        <span className="font-bold text-base md:text-lg">{t.order}</span>
      </div>
    </a>
  );
};

// --- COMPOSANT DE CARTE PRODUIT ANIMÉE (Inchagéd) ---
// ----------------------------------------------------

// ... (Le composant AnimatedProductCard reste inchangé, sans bouton de commande) ...
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
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const animationClasses = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-12";
  const delayStyle = { transitionDelay: `${index * 75}ms` };

  return (
    <article
      ref={cardRef}
      key={prod.id}
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

        {/* Espace pour l'uniformité (pas de bouton) */}
        <div className="flex gap-1.5 md:gap-2 mt-auto">
          {/* Le bouton de commande individuel est supprimé */}
        </div>
      </div>
    </article>
  );
};

// --- COMPOSANT PRINCIPAL (INCLUT LE BOUTON FLOTTANT ORANGE) ---
// --------------------------------------------------------------

export default function ProductCard({ translations: t }: ProductCardProps) {
  const params = useParams() as LocaleParams;
  const currentLocale = useMemo<LocaleCode>(() => {
    return getLocaleFromParams(params);
  }, [params]);

  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
    name: string;
  } | null>(null);

  const products = getProductData(currentLocale);

  const handleImageClick = (prod: ProductEntity) => {
    setSelectedImage({
      url: prod.img.url,
      alt: prod.img.alt,
      name: prod.name,
    });
  };

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
            <AnimatedProductCard
              key={prod.id}
              prod={prod}
              handleImageClick={handleImageClick}
              translations={t}
              index={index}
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

      {/* --- NOUVEAU COMPOSANT : BOUTON FLOTTANT "COMMANDER" ORANGE --- */}
      <FloatingOrderButton translations={t} />
      {/* -------------------------------------------------------------- */}

      {/* Modal de visualisation d'image (Inchagéd) */}
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
