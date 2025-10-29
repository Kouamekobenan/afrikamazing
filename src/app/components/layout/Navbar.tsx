"use client";
import { useState, useEffect } from "react";
import { Menu, X, Search, Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/Button";

const SITE_NAME = "AFRIKAMAZING";

const NAVIGATION = [
  { label: "Nos produits", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              <Image
                src="/logo/Logo-orange.png"
                width={280}
                height={280}
                alt="Logo de l'application"
                className="drop-shadow-lg"
                priority
              />
            </span>
          </a>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAVIGATION.map((item) => (
              <div key={item.label} className="relative">
                <a
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors flex items-center gap-1 group"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              aria-label="Rechercher"
            >
              <Search size={20} />
            </button>

            <button
              className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              aria-label="Changer de langue"
            >
              <Globe size={20} />
            </button>

            <a
              href="/reservation"
              // className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Button label="Réserver maintenant" className="w-[250px] text-white" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-gray-100 shadow-xl">
          {NAVIGATION.map((item) => (
            <div key={item.label}>
              <a
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </div>
          ))}

          {/* Mobile Actions */}
          <div className="pt-4 space-y-2 border-t border-gray-100 mt-4">
            <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Search size={18} />
              Rechercher
            </button>

            <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Globe size={18} />
              Langue
            </button>

            <a
              href="/reservation"
              // className="block w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg text-center hover:shadow-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Button label="Réserver maintenant" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
