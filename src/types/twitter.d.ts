interface TwitterWidgets {
  widgets: {
    load: () => void;
  };
}

declare global {
  interface Window {
    twttr?: TwitterWidgets;
  }
}

export {};