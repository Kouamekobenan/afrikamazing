"use client";
import React, { useState } from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { BlogEntity, LocaleCode } from "../../lib/global.type";
import Video from "./Video";

interface BlogPageProps {
  blogPosts: BlogEntity[];
  categories: string[];
  locale: LocaleCode; // ✅ Ajouté
  translations: {
    backToBlog: string;
    readArticle: string;
    readTime: string;
    noArticles: string;
    video?: {
      fallbackVideo: string;
      headline: string;
      description: string;
      button: string;
    };
  };
}

export default function BlogPage({
  blogPosts,
  categories,
  locale, // ✅ Destructurer locale
  translations: t,
}: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedPost, setSelectedPost] = useState<BlogEntity | null>(null);

  const filteredPosts =
    selectedCategory === categories[0]
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  // ✅ Préparer l'objet translations pour VideoI
  const videoTranslations = {
    video: t.video || {
      fallbackVideo: "Votre navigateur ne supporte pas la vidéo.",
      headline: "Afrikamazing",
      description:
        "Découvrez nos produits exceptionnels et profitez d'une expérience unique",
      button: "Découvrir nos articles",
    },
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-96 bg-gray-900">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-8 left-8 bg-white/90 hover:bg-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
          >
            ← {t.backToBlog}
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-10">
          <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
              {selectedPost.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{selectedPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{selectedPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  ⏱ {selectedPost.readTime} {t.readTime}
                </span>
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              {selectedPost.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {/* ✅ Utilisation correcte du composant VideoI */}
            <Video locale={locale} translations={videoTranslations} />
          </article>
        </div>
        <div className="h-24" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-800 to-gray-500 text-white py-2">
        {/* ✅ Utilisation correcte du composant VideoI */}
        <Video locale={locale} translations={videoTranslations} />
      </div>
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <span>⏱ {post.readTime}</span>
                </div>
                <div className="flex items-center text-orange-600 font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>{t.readArticle}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t.noArticles}</p>
          </div>
        )}
      </div>
    </div>
  );
}
