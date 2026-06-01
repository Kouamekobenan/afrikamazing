"use client";
import React from 'react';

export default function LogoAnime() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 650 140"
      className="w-full h-auto max-w-[360px] drop-shadow-md select-none"
    >
      <defs>
        <style>{`
          .text-letter {
            opacity: 0;
            animation: fadeInLetter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            fill: #E65A15; /* Ton orange de marque appliqué sur tout le texte */
          }
          
          /* Keyframes pour l'apparition fluide en cascade */
          @keyframes fadeInLetter {
            0% {
              opacity: 0;
              transform: translateY(8px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </defs>

      {/* 
        --- TON LOGO "A" SVG ORIGINAL ---
        Inclus proprement via une référence vectorielle pour respecter parfaitement ses proportions d'origine 
      */}
      <g transform="translate(10, 15)">
        <image 
          href="/logo/logo.svg" 
          width="140" 
          height="110"
        />
      </g>

      {/* 
        --- LE TEXTE AFRIKAMAZING EN ORANGE (Lettre par Lettre) ---
        Le positionnement (x, y) est optimisé pour s'aligner parfaitement à droite du logo
      */}
      <g 
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        fontWeight="800" 
        fontSize="38" 
        letterSpacing="3"
      >
        {/* Chaque lettre dispose d'un délai incrémenté de 0.04s pour un effet de slide-in propre */}
        <text x="140" y="82" className="text-letter" style={{ animationDelay: '0.08s' }}>A</text>
        <text x="172" y="82" className="text-letter" style={{ animationDelay: '0.12s' }}>F</text>
        <text x="200" y="82" className="text-letter" style={{ animationDelay: '0.16s' }}>R</text>
        <text x="232" y="82" className="text-letter" style={{ animationDelay: '0.20s' }}>I</text>
        <text x="250" y="82" className="text-letter" style={{ animationDelay: '0.24s' }}>K</text>
        <text x="282" y="82" className="text-letter" style={{ animationDelay: '0.28s' }}>A</text>
        <text x="314" y="82" className="text-letter" style={{ animationDelay: '0.32s' }}>M</text>
        <text x="356" y="82" className="text-letter" style={{ animationDelay: '0.36s' }}>A</text>
        <text x="388" y="82" className="text-letter" style={{ animationDelay: '0.40s' }}>Z</text>
        <text x="418" y="82" className="text-letter" style={{ animationDelay: '0.44s' }}>I</text>
        <text x="436" y="82" className="text-letter" style={{ animationDelay: '0.48s' }}>N</text>
        <text x="470" y="82" className="text-letter" style={{ animationDelay: '0.52s' }}>G</text>
      </g>
    </svg>
  );
}