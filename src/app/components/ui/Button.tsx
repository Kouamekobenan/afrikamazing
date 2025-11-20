import React from "react";

// 1. Interface pour les propriétés du composant
interface ButtonProps {
  /** Le contenu du bouton (texte, icône, ou autre élément React). */
  label: string | React.ReactNode; // Simplifié pour retirer 'null' si l'intention est d'afficher quelque chose
  /** Fonction à exécuter lors du clic. */
  onClick?: () => void;
  /** Le type de bouton standard (button, submit, reset). Par défaut: 'button'. */
  type?: "button" | "submit" | "reset";
  /** Classes CSS additionnelles pour personnaliser l'apparence. */
  className?: string;
  /** État du bouton (actif/inactif). Par défaut: 'false'. */
  disabled?: boolean;
}

/**
 * Composant de Bouton d'Achat Réutilisable et Stylisé.
 * Optimisé avec Tailwind CSS pour une meilleure séparation des styles.
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseClasses = `
    text-white 
    font-bold 
    text-lg sm:text-xl md:text-2xl 
    h-[50px] 
    rounded-2xl 
    px-6 
    w-full max-w-[160px] md:max-w-[200px] 
    transition duration-200 ease-in-out 
    focus:outline-none focus:ring-4 focus:ring-orange-300 
  `;
  const appearanceClasses = disabled
    ? 
      `
      bg-gray-400 
      border border-gray-500 
      cursor-not-allowed 
      opacity-60
      `
    : 
      `
      bg-[#FF5A00] 
      border border-[#D14900] // Bordure pour l'effet de profondeur
      hover:bg-[#E65200] // Un peu plus foncé au survol
      active:bg-[#CC4700] // Encore plus foncé au clic
      shadow-lg hover:shadow-xl // Ajout d'une ombre pour la visibilité
      cursor-pointer
      `;

  return (
    <button
      type={type}
      onClick={!disabled ? onClick : undefined} // Assure que onClick n'est pas appelé si désactivé
      disabled={disabled}
      // Combinaison de toutes les classes
      className={`${baseClasses} ${appearanceClasses} ${className}`}
    >
      {label}
    </button>
  );
};
