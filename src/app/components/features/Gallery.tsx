import { useState } from "react";
import { ZoomIn, X, Download } from "lucide-react"; // Ajout de l'icône Download pour la Lightbox
import { Product } from "../../data/product";
import { ProductEntity } from "../../lib/global.type";

interface GalleryProps {
  locale: "en" | "fr" | "ar";
  translations: Record<string, Record<string, string>>;
}
export default function Gallery({ locale, translations }: GalleryProps) {
  const t = {
    title: translations.gallery?.title || "Galerie d'Artisanat Africain",
    total: translations.gallery?.total || "Total de {count} produits",
    loadMore: translations.gallery?.loadMore || "Charger plus ({count})",
    allSeen:
      translations.gallery?.allSeen ||
      "Tous les {count} produits sont affichés",
    close: translations.gallery?.close || "Fermer",
    download: translations.gallery?.download || "Télécharger",
    touchClose:
      translations.gallery?.touchClose || "Cliquez n'importe où pour fermer",
  };
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedImage, setSelectedImage] = useState<ProductEntity | null>(
    null
  );
  const ITEMS_PER_PAGE = 4;

  const visibleProducts = Product.slice(0, visibleCount);
  const hasMore = visibleCount < Product.length;

  const loadMore = () =>
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, Product.length));

  const openLightbox = (prod: ProductEntity) => {
    setSelectedImage(prod);
    // Masque le scroll sur le body pour une meilleure expérience modale
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
      <div className="w-full px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* En-tête de la galerie */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {t.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {t.total.replace("{count}", Product.length.toString())}
          </p>
        </div>
        {/* Grille d'images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {visibleProducts.map((prod) => (
            <button
              key={prod.id}
              onClick={() => openLightbox(prod)}
              // Amélioration de l'effet au survol : zoom doux
              className="group relative block w-full aspect-[4/5] overflow-hidden rounded-xl shadow-lg 
                         transition-transform duration-300 ease-in-out hover:scale-[1.03] active:scale-[0.98] 
                         focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
              aria-label={`Ouvrir la vue détaillée de ${prod.img.alt}`}
            >
              <img
                src={prod.img.url}
                alt={prod.img.alt}
                className="w-full h-full object-cover object-center transition-opacity duration-500 group-hover:opacity-90"
                loading="lazy"
              />
              {/* Overlay d'interaction au survol */}
              <div
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                           flex items-center justify-center pointer-events-none"
              >
                <ZoomIn className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Description au bas de l'image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                <p className="text-white text-xs sm:text-sm font-medium truncate text-left">
                  {prod.img.alt}
                </p>
              </div>
            </button>
          ))}
        </div>
        {/* Bouton Charger Plus */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              // Style professionnel du bouton
              className="px-8 py-3 text-lg font-semibold rounded-full text-white bg-yellow-600 shadow-lg 
                         hover:bg-orange-600 transition-colors duration-300 
                         focus:outline-none focus:ring-4 focus:ring-orange-500/50 transform hover:scale-[1.02]"
            >
              {t.loadMore.replace(
                "{count}",
                Math.min(
                  ITEMS_PER_PAGE,
                  Product.length - visibleCount
                ).toString()
              )}
            </button>
          </div>
        )}
        {/* Message "Tout vu" */}
        {!hasMore && Product.length > ITEMS_PER_PAGE && (
          <div className="mt-12 text-center py-4">
            <p className="text-gray-500 text-sm sm:text-base italic">
              {t.allSeen.replace("{count}", Product.length.toString())}
            </p>
          </div>
        )}
      </div>
      {/* Lightbox Modale (Améliorée) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Image : ${selectedImage.img.alt}`}
        >
          {/* Conteneur pour éviter la fermeture au clic sur l'image */}
          <div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Contenu */}
            <div className="relative w-full h-full">
              <img
                src={selectedImage.img.url}
                alt={selectedImage.img.alt}
                className="max-h-[85vh] w-auto mx-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
            {/* Description au bas */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
              <p className="text-white text-lg font-medium">
                {selectedImage.img.alt}
              </p>
            </div>
          </div>
          {/* Bouton Fermer */}
          <button
            onClick={closeLightbox}
            aria-label={t.close}
            className="absolute top-4 right-4 text-white p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Bouton Télécharger */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Empêche la fermeture de la lightbox
              downloadImage();
            }}
            aria-label={t.download}
            className="absolute top-4 right-16 text-white p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200 flex items-center space-x-2"
          >
            <Download className="w-6 h-6" />
            <span className="hidden sm:inline">{t.download}</span>
          </button>
          {/* Instruction pour l'utilisateur */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-xs sm:text-sm">
            {t.touchClose}
          </div>
        </div>
      )}
    </>
  );
}
