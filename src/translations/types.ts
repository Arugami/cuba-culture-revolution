export type Language = "en" | "es";

export interface Translations {
  nav: {
    home: string;
    about: string;
    howToBuy: string;
    buyNow: string;
    community: string;
    vision: string;
    contractAddress: string;
    switchLanguage: string;
  };
  hero: {
    taglineStart: string;
    taglineMiddle: string;
    taglineEnd: string;
    subtitle: string;
    buyButton: string;
    joinButton: string;
    quote: string;
    flagAlt: string;
  };
  about: {
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    joinButton: string;
    imageAlt: string;
  };
  howToBuy: {
    title: string;
    subtitle: string;
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
    contractAddress: string;
    copyAddress: string;
    addressCopied: string;
    addressCopiedDesc: string;
    copyError: string;
    copyErrorDesc: string;
  };
  social: {
    joinTelegram: string;
    followX: string;
  };
  community: {
    buyNow: string;
    debitCard: string;
    buyButton: string;
    buyEasily: string;
  };
  revolution: {
    title: string;
    mission: string;
    description: string;
  };
  memes: {
    title: string;
    subtitle: string;
  };
  faq: {
    title: string;
    what: {
      question: string;
      answer: string;
    };
    buy: {
      question: string;
      answer: string;
    };
    safe: {
      question: string;
      answer: string;
    };
    join: {
      question: string;
      answer: string;
    };
    unique: {
      question: string;
      answer: string;
    };
  };
  footer: {
    quickLinks: string;
    home: string;
    about: string;
    howToBuy: string;
    faq: string;
    contract: string;
    copyAddress: string;
    community: string;
    telegram: string;
    x: string;
    copyright: string;
    madeBy: string;
  };
}
