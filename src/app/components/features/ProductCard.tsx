"use client";
import React, { useState } from "react";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { ProductEntity } from "../../lib/global.type";
import { Product } from "../../data/product";
import { useMemo } from "react"; // 👈 Ajouté
import { useParams } from "next/navigation"; // 👈 Ajouté
import {
  LocaleCode,
  getLocaleFromParams,
  // Assurez-vous d'importer isRtlLocale si vous utilisez la direction
} from "../../lib/global.type";
import { useTypedTranslation } from "@/src/config/translate";
import { categories } from "../../data/blogPosts";
// TYPAGE SECURISÉ
type LocaleParams = {
  locale: LocaleCode;
};
export default function ProductCard() {
  const params = useParams() as LocaleParams;
  const currentLocale = useMemo<LocaleCode>(() => {
    return getLocaleFromParams(params);
  }, [params]);
  const { t } = useTypedTranslation(currentLocale);
  const phone = "2250506832678";

  const handleWhatsAppReservation = (prod: ProductEntity) => {
    const message = encodeURIComponent(
      `Bonjour ! Je souhaite réserver le sac "${prod.name}". Merci !`
    );
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <section className="w-full px-4 py-16 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      {/* En-tête de la section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-3">
          Nos produits disponibles
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>
      {/* Grille de produits responsive */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
        {Product.map((prod) => (
          <article
            key={prod.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
          >
            {/* Image du produit */}
            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
              <img
                src={prod.img.url}
                alt={prod.img.alt}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              {/* Badge "Nouveau" */}
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
              {/* Boutons d'action - SOLUTION OPTIMISÉE */}
              <div className="flex gap-1.5 md:gap-2 mt-auto">
                {/* Bouton Commander - Réduit sur mobile */}
                <button
                  style={{
                    backgroundColor: "#6C371A",
                  }}
                  className="flex-1 min-w-0 text-xs cursor-pointer md:text-sm hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-2 md:px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-1"
                  aria-label={`Commander ${prod.name}`}
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="hidden sm:inline truncate">Commander</span>
                  <span className="sm:hidden">commander</span>
                </button>
                {/* Bouton WhatsApp - Taille fixe garantie sur mobile */}
                <button
                  onClick={() => handleWhatsAppReservation(prod)}
                  className="w-9 h-9 md:w-auto md:h-auto bg-gradient-to-r from-green-500 to-green-600 text-white md:py-3 md:px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center md:gap-2 shadow-sm hover:shadow-md flex-shrink-0"
                  aria-label={`Commander ${prod.name} via WhatsApp`}
                  title="Commander via WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden md:inline whitespace-nowrap">
                    WhatsApp
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {/* Message si aucun produit */}
      {Product.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Aucun produit disponible pour le moment.
          </p>
        </div>
      )}
    </section>
  );
}
