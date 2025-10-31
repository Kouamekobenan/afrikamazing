// pages/404.tsx
"use client";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <AlertTriangle className="text-orange-500 w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Page introuvable
      </h1>
      <p className="text-gray-600 mb-6">
        Oups ! La page que vous recherchez n&apos;existe pas.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
