import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LanguageContent {
  navigation: {
    home: string;
    services: string;
    portfolio: string;
    ghana: string;
    reports: string;
    contact: string;
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
}

const defaultContent: LanguageContent = {
  navigation: {
    home: "Home",
    services: "Services",
    portfolio: "Portfolio",
    ghana: "Ghana",
    reports: "Reports",
    contact: "Contact"
  },
  hero: {
    badge: "Maritime Excellence",
    title: "Agilent Maritime Services Limited",
    subtitle: "Leading Stevedore Shipping Services and Maritime Logistics Solutions at Tema Port, Ghana. Professional vehicle shipping and cargo handling across West Africa.",
    cta1: "Explore Our Services",
    cta2: "Contact Us"
  },
  services: {
    title: "Maritime Services",
    subtitle: "Professional stevedoring and port services tailored to meet the demands of modern maritime commerce."
  },
  common: {
    learnMore: "Learn More",
    contactUs: "Contact Us",
    getQuote: "Get Quote",
    download: "Download"
  }
};

const languageContent: Record<string, LanguageContent> = {
  en: defaultContent,
  es: {
    navigation: {
      home: "Inicio",
      services: "Servicios", 
      portfolio: "Portafolio",
      ghana: "Ghana",
      reports: "Informes",
      contact: "Contacto"
    },
    hero: {
      badge: "Excelencia Marítima",
      title: "Agilent Maritime Services Limited",
      subtitle: "Servicios líder de estiba y logística marítima en el Puerto de Tema, Ghana. Transporte profesional de vehículos y manejo de carga en África Occidental.",
      cta1: "Explorar Servicios",
      cta2: "Contáctanos"
    },
    services: {
      title: "Servicios Marítimos",
      subtitle: "Servicios profesionales de estiba y puertos adaptados a las demandas del comercio marítimo moderno."
    },
    common: {
      learnMore: "Saber Más",
      contactUs: "Contáctanos", 
      getQuote: "Cotización",
      download: "Descargar"
    }
  },
  fr: {
    navigation: {
      home: "Accueil",
      services: "Services",
      portfolio: "Portfolio", 
      ghana: "Ghana",
      reports: "Rapports",
      contact: "Contact"
    },
    hero: {
      badge: "Excellence Maritime",
      title: "Agilent Maritime Services Limited",
      subtitle: "Services de manutention et de logistique maritime de premier plan au Port de Tema, Ghana. Transport professionnel de véhicules et manutention de fret en Afrique de l'Ouest.",
      cta1: "Explorer Nos Services",
      cta2: "Nous Contacter"
    },
    services: {
      title: "Services Maritimes",
      subtitle: "Services professionnels de manutention portuaire adaptés aux exigences du commerce maritime moderne."
    },
    common: {
      learnMore: "En Savoir Plus",
      contactUs: "Nous Contacter",
      getQuote: "Devis",
      download: "Télécharger"
    }
  }
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
  content: defaultContent,
  isLoading: false
});

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [content, setContent] = useState(defaultContent);
  const [isLoading, setIsLoading] = useState(false);

  const setLanguage = async (lang: string) => {
    if (lang === currentLanguage) return;
    
    setIsLoading(true);
    
    // Simulate API call delay for language loading
    setTimeout(() => {
      setCurrentLanguage(lang);
      setContent(languageContent[lang] || defaultContent);
      setIsLoading(false);
      
      // Update document language
      document.documentElement.lang = lang;
      
      console.log(`Language switched to: ${lang}`);
    }, 300);
  };

  useEffect(() => {
    // Initialize with browser language if available
    const browserLang = navigator.language.split('-')[0];
    if (languageContent[browserLang]) {
      setLanguage(browserLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      content,
      isLoading
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