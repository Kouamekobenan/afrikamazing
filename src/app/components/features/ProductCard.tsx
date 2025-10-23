"use client";
import React, { useState } from "react";
import { Product } from "@/app/data/product";
import Image from "next/image";
import { Button } from "../ui/Button";
import { ProductEntity } from "@/app/lib/global.type";
import { MessageCircle } from "lucide-react";

export default function ProductCard() {
  const phone = "2250506832678";
  const [product] = useState<ProductEntity>();

  const handleWhatsAppReservation = (prod: ProductEntity) => {
    const message = encodeURIComponent(
      `Bonjour ! Je souhaite réserver le sac "${prod.name}". Merci !`
    );
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  };
  return (
    <section className="w-full px-4 py-18 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      {/* En-tête de la section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-3">
          Nos produits disponibles
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      {/* Grille de produits responsive */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {Product.map((prod) => (
          <article
            key={prod.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
          >
            {/* Image du produit */}
            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
              <Image
                src={prod.img.url}
                width={prod.img.width}
                height={prod.img.height}
                alt={prod.img.alt}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              {/* Badge "Nouveau" - Vous pouvez le supprimer si nécessaire */}
              <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Nouveau
              </span>
            </div>
            {/* Contenu du produit */}
            <div className="p-5 md:p-6 flex flex-col flex-grow">
              {/* Nom du produit */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {prod.name}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 mb-4 flex-grow line-clamp-3">
                {prod.desc}
              </p>

              {/* Boutons d'action - Disposition améliorée */}
              <div className="flex md:flex-col gap-2 mt-auto">
                {/* Bouton Commander principal - Prend plus d'espace sur mobile */}
                <Button
                  label="Commander"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 md:px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                />

                {/* Bouton WhatsApp - Icône seule sur mobile, avec texte sur desktop */}
                <button
                  onClick={() => handleWhatsAppReservation(prod)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-3 md:px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md flex-shrink-0"
                  aria-label={`Commander ${prod.name} via WhatsApp`}
                  title="Commander via WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  {/* Texte visible uniquement sur tablette et desktop */}
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
