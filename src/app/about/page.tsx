import React from "react";
import {
  ShoppingBag,
  MapPin,
  Heart,
  Award,
  Users,
  Sparkles,
  Phone,
  Clock,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            À propos d'Afrikamazing
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Votre destination privilégiée pour des sacs et chaussures tendance
            au cœur d'Abidjan
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Notre Histoire
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
              <span className="text-xl md:text-2xl font-bold text-blue-600">
                Afrikamazing
              </span>{" "}
              est née d'une passion pour la mode et d'un engagement à offrir des
              produits de qualité à la communauté abidjanaise. Située au cœur du
              Plateau, notre boutique est devenue une référence pour tous ceux
              qui recherchent l'élégance et le style.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Nous sélectionnons avec soin chaque sac et chaque paire de
              chaussures pour vous garantir des articles qui allient{" "}
              <span className="font-semibold">qualité</span>,{" "}
              <span className="font-semibold">confort</span> et{" "}
              <span className="font-semibold">design</span>. Notre mission est
              de vous faire vivre une expérience d'achat exceptionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Nos Valeurs
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Qualité */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Award className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 text-center">
                Qualité Premium
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                Nous sélectionnons uniquement des produits de haute qualité pour
                garantir votre satisfaction et votre confort au quotidien.
              </p>
            </div>

            {/* Service Client */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Heart className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 text-center">
                Service Client Exceptionnel
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                Votre satisfaction est notre priorité. Notre équipe est toujours
                disponible pour vous conseiller et vous accompagner.
              </p>
            </div>

            {/* Style */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 text-center">
                Tendances & Style
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                Des collections actuelles qui suivent les dernières tendances
                pour vous permettre d'exprimer votre style unique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que nous proposons */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Ce que nous proposons
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Sacs */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 md:p-10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-md">
                <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                Sacs pour toutes occasions
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Découvrez notre collection variée de sacs :
              </p>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                  <span>Sacs à main élégants</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                  <span>Sacs bandoulière pratiques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                  <span>Sacs de voyage spacieux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                  <span>Mini sacs tendance</span>
                </li>
              </ul>
            </div>

            {/* Chaussures */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 md:p-10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-md">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                Chaussures confort & style
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                Une sélection de chaussures pour tous les styles :
              </p>
              <ul className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 flex-shrink-0">•</span>
                  <span>Chaussures décontractées</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 flex-shrink-0">•</span>
                  <span>Chaussures de soirée</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 flex-shrink-0">•</span>
                  <span>Baskets tendance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 flex-shrink-0">•</span>
                  <span>Sandales confortables</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Localisation & Contact */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Où nous trouver
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Adresse */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <MapPin className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-center">
                Notre Boutique
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center mb-3">
                <span className="font-semibold block text-base md:text-lg mb-2">
                  Le Plateau, Abidjan
                </span>
                Située dans le quartier d'affaires du Plateau, notre boutique
                est facilement accessible et vous accueille dans un cadre
                moderne et chaleureux.
              </p>
            </div>

            {/* Horaires & Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Clock className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-center">
                Nos Horaires
              </h3>
              <div className="text-sm md:text-base text-gray-700 space-y-2 text-center mb-4">
                <p>
                  <span className="font-semibold">Lundi - Vendredi:</span> 9h00
                  - 18h00
                </p>
                <p>
                  <span className="font-semibold">Samedi:</span> 9h00 - 17h00
                </p>
                <p>
                  <span className="font-semibold">Dimanche:</span> Fermé
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-center text-sm md:text-base text-gray-600">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 inline mr-2 text-green-600" />
                  <span className="font-semibold">
                    Contactez-nous via WhatsApp
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-16 shadow-2xl">
            <Users className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-4 md:mb-6" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
              Rejoignez la communauté Afrikamazing
            </h2>
            <p className="text-base md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto">
              Découvrez nos collections et laissez-vous séduire par notre
              sélection unique de sacs et chaussures !
            </p>
            <Link href="../products">
              <button className="bg-white text-blue-600 font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg text-base md:text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Découvrir nos produits
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
