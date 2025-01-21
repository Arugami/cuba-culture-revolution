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
    "about.title": "$CUBA",
    "about.subtitle": "The First Country Take Over",
    "about.paragraph1": "On January 20, 2025, the Cuban government launched a cryptocurrency, claiming it would revolutionize the nation's financial future. For a brief moment, it seemed like hope had arrived for the Cuban people. The coin skyrocketed to a $30 million market cap, and investors believed change was within reach.",
    "about.paragraph2": "But in a cruel twist, the project collapsed just hours later in a devastating rug pull. It wasn't just a financial loss—it was a betrayal of trust. The government's failed attempt left the Cuban people disillusioned and abandoned. And yet, the story didn't end there.",
    "about.paragraph3": "In the face of despair, a bold global community rose up. $CUBA was born—not as a government-backed project, but as a movement of the people.",
    "about.paragraph4": "$CUBA isn't just a token—it's a revolutionary symbol of resilience and hope. It represents a historic Country Takeover (CTO), proving that power can and should belong to the people.",
    "about.joinButton": "Join the $CUBA Revolution",
    "about.imageAlt": "Person holding $CUBA sign in front of colorful Cuban buildings",
    "howToBuy.title": "How to Buy",
    "howToBuy.subtitle": "$CUBA",
    "howToBuy.step1.title": "Step 1",
    "howToBuy.step1.description": "Install a Solana Wallet (e.g., Phantom)",
    "howToBuy.step2.title": "Step 2",
    "howToBuy.step2.description": "Fund Your Wallet with SOL",
    "howToBuy.step3.title": "Step 3",
    "howToBuy.step3.description": "Swap SOL for $CUBA",
    "howToBuy.contractAddress": "Solana Contract Address",
    "howToBuy.copyAddress": "Copy Address",
    "howToBuy.addressCopied": "Address Copied!",
    "howToBuy.addressCopiedDesc": "Contract address has been copied to clipboard",
    "howToBuy.copyError": "Error",
    "howToBuy.copyErrorDesc": "Failed to copy address",
    "social.joinTelegram": "Join Us on Telegram",
    "social.followX": "Follow Us on X",
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
    "about.title": "$CUBA",
    "about.subtitle": "La Primera Toma de Control de un País",
    "about.paragraph1": "El 20 de enero de 2025, el gobierno cubano lanzó una criptomoneda, afirmando que revolucionaría el futuro financiero de la nación. Por un breve momento, pareció que la esperanza había llegado para el pueblo cubano. La moneda se disparó a una capitalización de mercado de $30 millones, y los inversores creyeron que el cambio estaba al alcance.",
    "about.paragraph2": "Pero en un giro cruel, el proyecto colapsó horas después en una devastadora estafa. No fue solo una pérdida financiera, fue una traición a la confianza. El intento fallido del gobierno dejó al pueblo cubano desilusionado y abandonado. Y sin embargo, la historia no terminó ahí.",
    "about.paragraph3": "Frente a la desesperación, una audaz comunidad global se levantó. $CUBA nació, no como un proyecto respaldado por el gobierno, sino como un movimiento del pueblo.",
    "about.paragraph4": "$CUBA no es solo un token, es un símbolo revolucionario de resiliencia y esperanza. Representa una histórica Toma de Control de País (CTO), demostrando que el poder puede y debe pertenecer al pueblo.",
    "about.joinButton": "Únete a la Revolución $CUBA",
    "about.imageAlt": "Persona sosteniendo un cartel de $CUBA frente a edificios coloridos cubanos",
    "howToBuy.title": "Cómo Comprar",
    "howToBuy.subtitle": "$CUBA",
    "howToBuy.step1.title": "Paso 1",
    "howToBuy.step1.description": "Instala una Billetera Solana (ej., Phantom)",
    "howToBuy.step2.title": "Paso 2",
    "howToBuy.step2.description": "Fondea tu Billetera con SOL",
    "howToBuy.step3.title": "Paso 3",
    "howToBuy.step3.description": "Intercambia SOL por $CUBA",
    "howToBuy.contractAddress": "Dirección del Contrato Solana",
    "howToBuy.copyAddress": "Copiar Dirección",
    "howToBuy.addressCopied": "¡Dirección Copiada!",
    "howToBuy.addressCopiedDesc": "La dirección del contrato ha sido copiada al portapapeles",
    "howToBuy.copyError": "Error",
    "howToBuy.copyErrorDesc": "Error al copiar la dirección",
    "social.joinTelegram": "Únete a Nosotros en Telegram",
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
