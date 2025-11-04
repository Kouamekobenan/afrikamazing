"use client";
import React from "react";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/features/Hero";
import Gallery from "../../components/features/Gallery";
interface CountdownClientProps {
  locale: "en" | "fr" | "ar";
  translations: Record<string, Record<string, string>>;
}

export default function Accueil({ locale, translations }: CountdownClientProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="w-full">
        <Navbar />
        <Hero locale={locale} translations={translations} />
        <Gallery locale={locale} translations={translations} />
        {/* <Footer locale={locale} translations={translations} /> */}
      </div>
    </div>
  );
}
