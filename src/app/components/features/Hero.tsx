import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      src: "/images/sac_1.jpg",
      title: "Collection Élégante",
      subtitle: "Découvrez nos sacs premium",
    },
    {
      src: "/images/HNP-1.jpg",
      title: "Style Moderne",
      subtitle: "Pour toutes vos occasions",
    },
    {
      src: "/images/HNP-3.jpg",
      title: "Qualité Supérieure",
      subtitle: "Des produits qui durent",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Carousel Section */}
      <div className="relative w-full h-screen">
        {/* Slides */}
        <div className="relative w-full h-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                fill
                alt={slide.title}
                className="object-cover object-center"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
          ))}
        </div>
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl text-orange-500 sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-200">
              {slides[currentSlide].subtitle}
            </p>
            <Link href="../../products">
              <Button
                label="Voir nos produits"
                // className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              />
            </Link>
          </div>
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 p-3 rounded-full transition-all"
          aria-label="Image précédente"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 p-3 rounded-full transition-all"
          aria-label="Image suivante"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* About Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              À propos de nous
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Nous sommes une entreprise spécialisée dans la commercialisation
              de sacs et accessoires de qualité supérieure. Notre mission est de
              vous offrir des produits élégants, durables et adaptés à votre
              style de vie.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Produits</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  10K+
                </div>
                <div className="text-gray-600">Clients satisfaits</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">5★</div>
                <div className="text-gray-600">Avis clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
