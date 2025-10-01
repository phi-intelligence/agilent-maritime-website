import { useLocation, useRouter } from 'wouter';
import { useLanguage } from '../components/LanguageProvider';

/**
 * Hook for language-aware routing
 * Handles language-specific URLs and navigation
 */
export function useLanguageRouting() {
  const [location, setLocation] = useLocation();
  const router = useRouter();
  const { currentLanguage, setLanguage } = useLanguage();

  /**
   * Navigate to a path with language support
   */
  const navigateTo = (path: string, lang?: string) => {
    const targetLang = lang || currentLanguage;
    const languagePath = targetLang === 'en' ? path : `/${targetLang}${path}`;
    setLocation(languagePath);
  };

  /**
   * Get the current path without language prefix
   */
  const getCurrentPath = () => {
    const pathWithoutLang = location.replace(`/${currentLanguage}`, '') || '/';
    return pathWithoutLang;
  };

  /**
   * Get language from URL path
   */
  const getLanguageFromPath = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    // Check if first segment is a language code
    const supportedLanguages = ['en', 'zh', 'ar', 'el', 'ja', 'de', 'es', 'nl', 'fr'];
    if (supportedLanguages.includes(firstSegment)) {
      return firstSegment;
    }
    
    return 'en'; // Default to English
  };

  /**
   * Switch language while maintaining current path
   */
  const switchLanguage = (newLang: string) => {
    const currentPath = getCurrentPath();
    setLanguage(newLang);
    navigateTo(currentPath, newLang);
  };

  /**
   * Get localized URL for a given path and language
   */
  const getLocalizedUrl = (path: string, lang?: string) => {
    const targetLang = lang || currentLanguage;
    return targetLang === 'en' ? path : `/${targetLang}${path}`;
  };

  /**
   * Check if current path matches a given path (language-aware)
   */
  const isCurrentPath = (path: string) => {
    const currentPath = getCurrentPath();
    return currentPath === path;
  };

  return {
    navigateTo,
    getCurrentPath,
    getLanguageFromPath,
    switchLanguage,
    getLocalizedUrl,
    isCurrentPath,
    currentLanguage,
    currentPath: getCurrentPath()
  };
}
