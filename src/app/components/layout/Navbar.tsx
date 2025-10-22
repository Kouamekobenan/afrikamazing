"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";

const SITE_NAME = "AFRIKAMAZING";

const NAVIGATION = [
  {
    label: "Destinations",
    href: "/destinations",
    submenu: [
      { label: "Afrique de l'Ouest", href: "/destinations/ouest" },
      { label: "Afrique Centrale", href: "/destinations/centrale" },
      { label: "Afrique de l'Est", href: "/destinations/est" },
      { label: "Afrique Australe", href: "/destinations/australe" },
    ],
  },
  { label: "Expériences", href: "/experiences" },
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAVIGATION.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.submenu && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors flex items-center gap-1 group"
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      size={16}
                      className="group-hover:rotate-180 transition-transform duration-300"
                    />
                  )}
                </a>

                {/* Dropdown Menu */}
                {item.submenu && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.submenu.map((subitem) => (
                      <a
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        {subitem.label}
                      </a>
                    ))}
                  </div>
                )}
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
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Réserver
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
                onClick={() => !item.submenu && setIsOpen(false)}
              >
                <div className="flex items-center justify-between">
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        );
                      }}
                    />
                  )}
                </div>
              </a>

              {/* Mobile Submenu */}
              {item.submenu && activeDropdown === item.label && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu.map((subitem) => (
                    <a
                      key={subitem.label}
                      href={subitem.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {subitem.label}
                    </a>
                  ))}
                </div>
              )}
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
              className="block w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg text-center hover:shadow-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              Réserver maintenant
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
