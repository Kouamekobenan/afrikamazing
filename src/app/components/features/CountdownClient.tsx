"use client";
import Image from "next/image";
import Navbar from "../layout/Navbar";
import Hero from "./Hero";
import Gallery from "./Gallery";
import { useEffect, useState } from "react";
import Footer from "../layout/Footer";

interface CountdownClientProps {
  locale: "en" | "fr" | "ar";
  translations: Record<string, Record<string, string>>;
}

export default function CountdownClient({
  locale,
  translations,
}: CountdownClientProps) {
  const [countdown, setCountdown] = useState(3);
  const [showLogin, setShowLogin] = useState(false);

  // t devient une fonction
  const t = (key: string) => translations.countdown[key] || key;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowLogin(true);
    }
  }, [countdown]);

  if (showLogin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="text-xl flex flex-col justify-center items-center">
          <Navbar />
          <Hero locale={locale} translations={translations} />
          <Gallery locale={locale} translations={translations} />
          <Footer locale={locale} translations={translations} />
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${locale === "ar" ? "rtl" : "ltr"}`}>
      <div className="mb-12">
        <div className="relative mb-2">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-200 border-t-orange-500 mx-auto"></div>
          <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-orange-300 animate-pulse mx-auto"></div>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight font-sans">
          <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent font-extrabold">
            {t("welcome")}
          </span>
        </h1>
        <p className="text-lg text-slate-600 font-medium font-sans">
          {t("loading")}
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-10 max-w-md mx-auto">
        <div className="flex justify-center items-center mb-8">
          <div className="relative border-2 rounded-2xl">
            <Image
              src="/logo/Logo-orange.png"
              width={180}
              height={180}
              alt={t("logo_alt")}
              className="drop-shadow-lg"
              priority
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-7xl font-black text-transparent bg-gradient-to-b from-orange-500 to-orange-600 bg-clip-text mb-4 font-mono tracking-tight">
            {countdown}
          </div>
          <p className="text-slate-700 font-medium text-lg font-sans">
            {t("connection")} {countdown}{" "}
            {countdown !== 1 ? t("seconds") : t("second")}
          </p>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-slate-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium font-sans">{t("status")}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm font-sans">{t("wait")}</p>
      </div>
    </div>
  );
}
