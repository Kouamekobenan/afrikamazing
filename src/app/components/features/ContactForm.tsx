"use client";
import React, { useState } from "react";

interface ContactFormProps {
  translations: Record<string, string>;
}

export default function ContactForm({ translations: t }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/myzbebnd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-gray-50 py-20" id="contact">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          {t?.title ?? "Contactez-nous"}
        </h2>
        <p className="text-gray-600 mb-8">
          {t?.subtitle ??
            "Une question ? Besoin d'un devis ? Nous serons ravis de vous répondre."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-left bg-white shadow-lg rounded-lg p-8"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t?.nameLabel ?? "Nom complet"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t?.emailLabel ?? "Adresse e-mail"}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t?.messageLabel ?? "Message"}
            </label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            ></textarea>
          </div>

          <button
            style={{
              backgroundColor: "#FF5A00",
            }}
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-green-700 text-white cursor-pointer py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading"
              ? t?.sending ?? "Envoi en cours..."
              : status === "success"
              ? t?.success ?? "Message envoyé ✅"
              : t?.submit ?? "Envoyer le message"}
          </button>

          {status === "error" && (
            <p className="text-red-600 text-sm text-center mt-2">
              {t?.error ?? "Une erreur est survenue. Réessayez plus tard."}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
