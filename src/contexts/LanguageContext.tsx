import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.howToBuy": "How to Buy",
    "nav.buyNow": "Buy Now",
    "nav.community": "Community",
    "nav.vision": "Vision",
    "nav.contractAddress": "Contract Address",
    "hero.taglineStart": "THE ONLY",
    "hero.taglineMiddle": "OFFICIAL",
    "hero.taglineEnd": "CUBA MEME",
    "hero.subtitle": "The First Ever Country Takeover. Join the Revolution!",
    "hero.buyButton": "Buy $CUBA Now",
    "hero.joinButton": "Join Community",
    "hero.quote": "Make Cuba Great Again!",
    "hero.flagAlt": "Hand holding Cuban flag",
    "about.title": "What is $CUBA?",
    "about.description1": "$CUBA is more than just a meme coin—it's a revolutionary movement and the first-ever 'Country Takeover' (CTO).",
    "about.description2": "Sparked by the Cuban government's failed attempts to launch a cryptocurrency—and the bold response of a global community—$CUBA is on a mission to empower the Cuban people and achieve true financial independence.",
    "about.description3": "$CUBA bridges the gap between digital assets and humanitarian initiatives, supporting the Cuban community worldwide while amplifying their voices and aspirations for freedom.",
    "social.joinTelegram": "Join Us on Telegram",
    "social.followX": "Follow Us on X",
    // Add more translations as needed
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Acerca",
    "nav.howToBuy": "Cómo Comprar",
    "nav.buyNow": "Comprar Ahora",
    "nav.community": "Comunidad",
    "nav.vision": "Visión",
    "nav.contractAddress": "Dirección del Contrato",
    "hero.taglineStart": "EL ÚNICO",
    "hero.taglineMiddle": "OFICIAL",
    "hero.taglineEnd": "MEME DE CUBA",
    "hero.subtitle": "La Primera Toma de Control de un País. ¡Únete a la Revolución!",
    "hero.buyButton": "Comprar $CUBA Ahora",
    "hero.joinButton": "Unirse a la Comunidad",
    "hero.quote": "¡Hagamos Cuba Grande Otra Vez!",
    "hero.flagAlt": "Mano sosteniendo la bandera cubana",
    "about.title": "¿Qué es $CUBA?",
    "about.description1": "$CUBA es más que una moneda meme: es un movimiento revolucionario y la primera 'Toma de Control de País' (CTO).",
    "about.description2": "Inspirado por los intentos fallidos del gobierno cubano de lanzar una criptomoneda—y la audaz respuesta de una comunidad global—$CUBA tiene la misión de empoderar al pueblo cubano y lograr una verdadera independencia financiera.",
    "about.description3": "$CUBA conecta los activos digitales con iniciativas humanitarias, apoyando a la comunidad cubana en todo el mundo mientras amplifica sus voces y aspiraciones de libertad.",
    "social.joinTelegram": "Únete a Telegram",
    "social.followX": "Síguenos en X",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
