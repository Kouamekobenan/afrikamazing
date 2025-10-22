import {
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
} from "lucide-react";

const SITE_NAME = "AFRIKAMAZING";

const SOCIAL_LINKS = {
  facebook: "https://facebook.com/afrikamazing",
  instagram: "https://instagram.com/afrikamazing",
  whatsapp: "https://wa.me/225XXXXXXXXX",
};

const FOOTER_LINKS = {
  company: [
    { label: "À propos", href: "/about" },
    { label: "Notre équipe", href: "/team" },
    { label: "Carrières", href: "/careers" },
    { label: "Presse", href: "/press" },
  ],
  explore: [
    { label: "Destinations", href: "/destinations" },
    { label: "Expériences", href: "/experiences" },
    { label: "Blog", href: "/blog" },
    { label: "Galerie", href: "/gallery" },
  ],
  support: [
    { label: "Centre d'aide", href: "/help" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Conditions", href: "/terms" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                {SITE_NAME}
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-md">
              Découvrez l'Afrique authentique à travers des expériences uniques
              et inoubliables. Votre aventure commence ici.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm">
                Restez informé
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500 text-sm"
                />
                <button className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <Send size={18} />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm">Suivez-nous</h3>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  aria-label="Suivez-nous sur Facebook"
                >
                  <Facebook
                    size={18}
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>

                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  aria-label="Suivez-nous sur Instagram"
                >
                  <Instagram
                    size={18}
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>

                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  aria-label="Contactez-nous sur WhatsApp"
                >
                  <MessageCircle
                    size={18}
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Explorer
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="pt-4 space-y-3 border-t border-gray-700">
              <a
                href="mailto:contact@afrikamazing.com"
                className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group"
              >
                <Mail
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>contact@afrikamazing.com</span>
              </a>

              <a
                href="tel:+225XXXXXXXXX"
                className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm group"
              >
                <Phone
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>+225 XX XX XX XX XX</span>
              </a>

              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span>
                © {currentYear} {SITE_NAME}. Tous droits réservés.
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span>Fait avec</span>
              <Heart
                size={14}
                className="text-red-500 fill-red-500 animate-pulse"
              />
              <span>en Afrique</span>
            </div>

            <div className="flex gap-6">
              <a
                href="/privacy"
                className="hover:text-orange-400 transition-colors"
              >
                Confidentialité
              </a>
              <a
                href="/terms"
                className="hover:text-orange-400 transition-colors"
              >
                Conditions
              </a>
              <a
                href="/cookies"
                className="hover:text-orange-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
