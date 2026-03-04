import React from "react";
import {
  MapPin,
  Heart,
  Award,
  Sparkles,
  Phone,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/layout/Navbar";
import { useTranslation } from "../../i18n";
import { LocaleCode } from "../../lib/global.type";

interface AboutPageProps {
  params: Promise<{
    locale: LocaleCode;
  }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const { i18n } = await useTranslation(locale, "common");
  const translations = i18n.getResourceBundle(locale, "common");

  const t = translations?.about || {};

  const brandColor = "#C99642";

  const values = [
    {
      icon: Award,
      title: t?.value1Title ?? "Qualité Premium",
      desc: t?.value1Description,
    },
    {
      icon: Heart,
      title: t?.value2Title ?? "Service Client",
      desc: t?.value2Description,
    },
    {
      icon: Sparkles,
      title: t?.value3Title ?? "Tendances",
      desc: t?.value3Description,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center"></div>
        </div>
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <span className="inline-block text-amber-500 font-semibold tracking-widest uppercase text-sm mb-4">
            L&apos;excellence à Katameya
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            {t?.heroTitle ?? "À propos d'Afrikamazing"}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            {t?.heroSubtitle ??
              "Votre destination privilégiée pour des sacs et chaussures tendance au cœur de Katameya"}
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/sac_1.jpg"
                  alt="Afrikamazing Store"
                  className="object-cover w-full h-full"
                />
              </div>
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ backgroundColor: brandColor }}
              >
                Depuis 2024
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                {t?.storyTitle ?? "Notre Histoire"}
              </h2>
              <div
                className="w-16 h-1.5 rounded-full"
                style={{ backgroundColor: brandColor }}
              ></div>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  <span className="font-bold text-slate-900 italic">
                    Afrikamazing
                  </span>{" "}
                  {t?.storyParagraph1 ??
                    "est née d'une passion pour la mode et d'un engagement à offrir des produits de qualité à la communauté abidjanaise. Située au cœur du Plateau, notre boutique est devenue une référence."}
                </p>
                <p>
                  {t?.storyParagraph2 ??
                    "Nous sélectionnons avec soin chaque sac et chaque paire de chaussures pour vous garantir des articles qui allient"}{" "}
                  <span
                    className="text-slate-900 font-medium underline"
                    style={{ textDecorationColor: brandColor }}
                  >
                    {t?.quality ?? "qualité"}
                  </span>
                  ,{" "}
                  <span
                    className="text-slate-900 font-medium underline"
                    style={{ textDecorationColor: brandColor }}
                  >
                    {t?.comfort ?? "confort"}
                  </span>{" "}
                  et{" "}
                  <span
                    className="text-slate-900 font-medium underline"
                    style={{ textDecorationColor: brandColor }}
                  >
                    {t?.design ?? "design"}
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {t?.valuesTitle ?? "Nos Valeurs"}
            </h2>
            <p className="text-slate-500">
              Ce qui fait battre le cœur de notre marque
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group text-center"
                >
                  <div
                    className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-6 transition-colors bg-slate-100 group-hover:bg-amber-50"
                    style={{ color: brandColor }}
                  >
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {value.desc ??
                      "Nous nous engageons à offrir le meilleur à nos clients."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Localisation & Contact */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Infos de contact */}
            <div className="md:w-1/2 p-10 md:p-16 text-white">
              <h2 className="text-3xl font-bold mb-8">
                {t?.locationTitle ?? "Où nous trouver"}
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">
                      {t?.shopTitle ?? "Notre Boutique"}
                    </h4>
                    <p className="text-slate-400">
                      {t?.shopLocation ??
                        "Villa 116 west golf, Le Caire, Égypte"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">
                      {t?.hoursTitle ?? "Nos Horaires"}
                    </h4>
                    <div className="text-slate-400 text-sm space-y-1 mt-1">
                      <p>Lun - Ven: {t?.weekdaysHours ?? "9h00 - 18h00"}</p>
                      <p>Sam: {t?.saturdayHours ?? "9h00 - 17h00"}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <a
                    href="#"
                    className="flex items-center gap-3 text-amber-500 font-bold hover:text-amber-400 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {t?.contactWhatsapp ?? "Nous contacter sur WhatsApp"}
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps - Villa 116 west golf */}
            <div className="md:w-1/2 min-h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3455.92792459972!2d31.39287211!3d29.9815013!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583b0027f730df%3A0x90ffc9ef42c1d20f!2sVilla%20116%20west%20golf!5e0!3m2!1sfr!2sci!4v1762215411895!5m2!1sfr!2sci"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Afrikamazing - Villa 116 west golf"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            {t?.ctaTitle ?? "Prêt à sublimer votre style ?"}
          </h2>
          <p className="text-lg text-slate-600 mb-10">
            {t?.ctaDescription ??
              "Découvrez nos collections exclusives de sacs et chaussures."}
          </p>
          <Link href={`/${locale}/products`}>
            <button
              style={{ backgroundColor: brandColor }}
              className="group inline-flex items-center gap-2 text-white font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 shadow-xl"
            >
              {t?.ctaButton ?? "Parcourir la collection"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
