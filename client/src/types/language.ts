// Auto-generated language content types
export interface LanguageContent {
  navigation: {
    home: string;
    services: string;
    portfolio: string;
    ghana: string;
    contact: string;
    models: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  portfolio: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  ghana?: {
    title: string;
    subtitle: string;
    content: string;
  };
  footer: {
    company: string;
    description: string;
    links: Array<{
      label: string;
      url: string;
    }>;
  };
  common: {
    learnMore: string;
    contactUs: string;
    getQuote: string;
    download: string;
  };
}

export type LanguageCode = 'en' | 'zh' | 'ar' | 'el' | 'ja' | 'de' | 'es' | 'nl' | 'fr';
export type LanguageContentMap = Record<string, LanguageContent>;
