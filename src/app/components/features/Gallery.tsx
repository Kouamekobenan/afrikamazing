import React, { useState } from "react";
import { Product } from "@/app/data/product";
import { X, Download, ZoomIn } from "lucide-react";

// Interface pour le type de produit
interface ProductType {
  id: number | string;
  img: {
    url: string;
    alt: string;
  };
}
export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedImage, setSelectedImage] = useState<ProductType | null>(null);
  const ITEMS_PER_PAGE = 4;

  const visibleProducts = Product.slice(0, visibleCount);
  const hasMore = visibleCount < Product.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, Product.length));
  };

  const openLightbox = (prod: ProductType) => {
    setSelectedImage(prod);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const downloadImage = async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch(selectedImage.img.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedImage.img.alt || "image"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
    }
  };
  return (
    <>
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Titre */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Notre Galerie
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            {Product.length} {Product.length > 1 ? "produits" : "produit"} au
            total
          </p>
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {visibleProducts.map((prod) => (
            <button
              key={prod.id}
              onClick={() => openLightbox(prod)}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 aspect-square bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <img
                src={prod.img.url}
                alt={prod.img.alt}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Overlay avec icône zoom */}
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              {/* Titre en bas */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3">
                <p className="text-white text-xs sm:text-sm font-medium truncate">
                  {prod.img.alt}
                </p>
              </div>
            </button>
          ))}
        </div>
        {/* Bouton "Voir plus" */}
        {hasMore && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-900 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base"
            >
              Voir plus (
              {Math.min(ITEMS_PER_PAGE, Product.length - visibleCount)} de plus)
            </button>
          </div>
        )}

        {/* Message quand tout est affiché */}
        {!hasMore && Product.length > ITEMS_PER_PAGE && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              ✓ Vous avez vu tous les produits ({Product.length})
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 "
          onClick={closeLightbox}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Bouton télécharger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              downloadImage();
            }}
            className="absolute top-4 right-16 sm:right-20 text-orange-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 flex items-center gap-2 "
            aria-label="Télécharger"
          >
            <Download className="w-6 h-6 sm:w-8 sm:h-8 " />
            <span className="hidden sm:inline text-sm">Télécharger</span>
          </button>
          {/* Image container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.img.url}
              alt={selectedImage.img.alt}
              className="w-full h-full object-contain rounded-lg"
            />
            {/* Titre de l'image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 rounded-b-lg">
              <p className="text-white text-base sm:text-lg font-semibold">
                {selectedImage.img.alt}
              </p>
            </div>
          </div>
          {/* Instructions mobile */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-xs sm:text-sm">
            Touchez l'extérieur pour fermer
          </div>
        </div>
      )}
    </>
  );
}
