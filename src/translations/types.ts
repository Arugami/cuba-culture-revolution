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
    title: string;
    subtitle: string;
    description: string;
    buyNow: string;
    viewChart: string;
  };
  about: {
    title: string;
    subtitle: string;
  };
  howToBuy: {
    title: string;
    subtitle: string;
    steps: {
      wallet: {
        title: string;
        description: string;
      };
      sol: {
        title: string;
        description: string;
      };
      raydium: {
        title: string;
        description: string;
      };
      swap: {
        title: string;
        description: string;
      };
    };
  };
  community: {
    title: string;
    subtitle: string;
    joinUs: string;
  };
  revolution: {
    title: string;
    subtitle: string;
  };
  faq: {
    title: string;
    subtitle: string;
    questions: {
      what: {
        question: string;
        answer: string;
      };
      why: {
        question: string;
        answer: string;
      };
      how: {
        question: string;
        answer: string;
      };
      when: {
        question: string;
        answer: string;
      };
    };
  };
  footer: {
    rights: string;
  };
  social: {
    joinTelegram: string;
    followX: string;
  };
  memes: {
    title: string;
    subtitle: string;
    upload: string;
    yourMemes: string;
    noMemesYet: string;
    startUploading: string;
    signInToView: string;
    loading: string;
  };
}