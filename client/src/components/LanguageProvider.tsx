import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import languageContentData from '../data/language-content.json';

interface ServiceItem {
  title: string;
  description: string;
  details?: string;
  capabilities?: string[];
  icon?: string;
}

interface LanguageContent {
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
    extendedDescription?: string;
    statistics?: Array<{
      value: string;
      label: string;
      description: string;
    }>;
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  ghana?: {
    title: string;
    subtitle: string;
    content: string;
  };
  mission: {
    title: string;
    description1: string;
    description2: string;
    stats: Array<{
      value: string;
      label: string;
      description: string;
    }>;
  };
  partners: {
    title: string;
    items: Array<{
      name: string;
      description: string;
    }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{
      quote: string;
      name: string;
      title: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      firstName: string;
      lastName: string;
      company: string;
      email: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      privacy: string;
      privacyLink: string;
    };
    testimonial: {
      quote: string;
      name: string;
      title: string;
    };
  };
  servicesPage: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      stats: Array<{
        value: string;
        label: string;
      }>;
    };
    detailedServices: {
      title: string;
      subtitle: string;
      services: Array<{
        title: string;
        description: string;
      }>;
    };
    portOperations: {
      title: string;
      subtitle: string;
      sections: Array<{
        title: string;
        details: string[];
      }>;
    };
    portContacts: {
      title: string;
      subtitle: string;
      sections: Array<{
        title: string;
        details: string[];
      }>;
    };
    customsDocumentation: {
      title: string;
      subtitle: string;
      sections: Array<{
        title: string;
        details: string[];
      }>;
    };
    weatherTides: {
      title: string;
      subtitle: string;
      sections: Array<{
        title: string;
        details: string[];
      }>;
    };
  };
  portfolioPage: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      stats: Array<{
        value: string;
        label: string;
      }>;
    };
    vesselFleet: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      filterAll: string;
      filterAllTypes: string;
      noVesselsFound: string;
      noVesselsMessage: string;
      noVesselsSearchMessage: string;
    };
    vesselModal: {
      basicInfo: string;
      technicalSpecs: string;
      classification: string;
      operations: string;
      labels: {
        type: string;
        series: string;
        flag: string;
        built: string;
        imo: string;
        mmsi: string;
        grossTonnage: string;
        deadweight: string;
        length: string;
        beam: string;
        draft: string;
        serviceSpeed: string;
        class: string;
        enginePower: string;
        classification: string;
        shipyard: string;
        manager: string;
        cargoType: string;
        origin: string;
      };
      units: {
        gt: string;
        dwt: string;
        meters: string;
        knots: string;
        kw: string;
      };
    };
    portfolioSection: {
      title: string;
      subtitle: string;
      stats: Array<{
        icon: string;
        value: string;
        label: string;
        description: string;
      }>;
    };
  };
  ghanaPage: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      stats: Array<{
        value: string;
        label: string;
      }>;
    };
    strategicPosition: {
      title: string;
      subtitle: string;
      highlights: Array<{
        title: string;
        description: string;
      }>;
    };
    ghanaAdvantage: {
      title: string;
      subtitle: string;
      highlights: Array<{
        title: string;
        description: string;
        details: string[];
      }>;
    };
    leadership: {
      title: string;
      subtitle: string;
      viewOpportunities: string;
      teamMembers: Array<{
        name: string;
        position: string;
        description: string;
        extendedBio: string;
        expertise: string[];
        achievements: string[];
        contact: {
          email: string;
          phone: string;
          linkedin: string;
        };
      }>;
    };
    partnerships: {
      title: string;
      subtitle: string;
      partnerships: Array<{
        name: string;
        role: string;
        description: string;
      }>;
    };
    operations: {
      title: string;
      subtitle: string;
      services: Array<{
        title: string;
        description: string;
      }>;
    };
    cta: {
      title: string;
      subtitle: string;
      contactTeam: string;
      visitFacilities: string;
    };
  };
  contactPage: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      stats: Array<{
        value: string;
        label: string;
      }>;
    };
    keyMetrics: {
      title: string;
      subtitle: string;
      metrics: Array<{
        label: string;
        value: string;
        period: string;
        details: string;
        trend: string;
        description: string;
      }>;
    };
    availableReports: {
      title: string;
      subtitle: string;
      categories: Array<{
        title: string;
        description: string;
        reports: Array<{
          title: string;
          date: string;
          size: string;
        }>;
      }>;
    };
    transparency: {
      title: string;
      description: string;
      features: string[];
      subscribeButton: string;
    };
    archive: {
      title: string;
      description: string;
      contactButton: string;
    };
  };
  footer: {
    company: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    sections: Array<{
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    }>;
    copyright: string;
    legal: {
      privacy: string;
      terms: string;
    };
    social: string[];
  };
  common: {
    learnMore: string;
    contactUs: string;
    getQuote: string;
    download: string;
  };
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  content: LanguageContent;
  isLoading: boolean;
  availableLanguages: Array<{
    code: string;
    name: string;
    flag: string;
    dir: 'ltr' | 'rtl';
  }>;
}

// Available languages with metadata
const availableLanguages = [
  { code: 'en', name: 'English', flag: 'EN', dir: 'ltr' as const },
  { code: 'zh', name: '中文', flag: 'ZH', dir: 'ltr' as const },
  { code: 'ar', name: 'العربية', flag: 'AR', dir: 'rtl' as const },
  { code: 'el', name: 'Ελληνικά', flag: 'EL', dir: 'ltr' as const },
  { code: 'ja', name: '日本語', flag: 'JA', dir: 'ltr' as const },
  { code: 'de', name: 'Deutsch', flag: 'DE', dir: 'ltr' as const },
  { code: 'es', name: 'Español', flag: 'ES', dir: 'ltr' as const },
  { code: 'nl', name: 'Nederlands', flag: 'NL', dir: 'ltr' as const },
  { code: 'fr', name: 'Français', flag: 'FR', dir: 'ltr' as const }
];

// Use the actual English content as default
const defaultContent: LanguageContent = languageContentData.en as LanguageContent;

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
  content: defaultContent,
  isLoading: false,
  availableLanguages
});

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [content, setContent] = useState<LanguageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(false);

  // Get content for a specific language
  const getLanguageContent = (lang: string): LanguageContent => {
    const extractedContent = languageContentData[lang as keyof typeof languageContentData];
    
    if (extractedContent) {
      // Return the extracted content directly
      return extractedContent as LanguageContent;
    }
    
    return defaultContent;
  };

  const setLanguage = async (lang: string) => {
    if (lang === currentLanguage) return;
    
    setIsLoading(true);
    
    try {
      // Use local JSON content directly
      const newContent = getLanguageContent(lang);
      
      setCurrentLanguage(lang);
      setContent(newContent);
      
      // Persist to localStorage
      localStorage.setItem('preferred-language', lang);
      
      // Update document language and direction
      const languageInfo = availableLanguages.find(l => l.code === lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = languageInfo?.dir || 'ltr';
      
      console.log(`Language switched to: ${lang}`);
    } catch (error) {
      console.warn('Failed to switch language, using default');
      setCurrentLanguage('en');
      setContent(defaultContent);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize with stored language preference or browser language
    const storedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language.split('-')[0];
    
    // Check if stored language is available
    if (storedLang && availableLanguages.find(l => l.code === storedLang)) {
      setLanguage(storedLang);
    } else if (availableLanguages.find(l => l.code === browserLang)) {
      setLanguage(browserLang);
    } else {
      // Default to English
      setLanguage('en');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      content,
      isLoading,
      availableLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};