import { useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { useLanguageRouting } from '../hooks/useLanguageRouting';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEOHead({ 
  title, 
  description, 
  keywords, 
  image = '/assets/images/agilent-maritime-og.jpg',
  url 
}: SEOHeadProps) {
  const { content, currentLanguage, availableLanguages } = useLanguage();
  const { getLocalizedUrl, currentPath } = useLanguageRouting();

  useEffect(() => {
    // Set document title
    const pageTitle = title || content.hero.title;
    document.title = pageTitle;

    // Set meta description
    const metaDescription = description || content.hero.subtitle;
    updateMetaTag('description', metaDescription);

    // Set meta keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Set Open Graph tags
    updateMetaTag('og:title', pageTitle, 'property');
    updateMetaTag('og:description', metaDescription, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url || window.location.href, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:locale', getLocaleCode(currentLanguage), 'property');

    // Set Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', pageTitle, 'name');
    updateMetaTag('twitter:description', metaDescription, 'name');
    updateMetaTag('twitter:image', image, 'name');

    // Set canonical URL
    updateCanonicalUrl(url || window.location.href);

    // Set hreflang tags
    setHreflangTags();

    // Set document language
    document.documentElement.lang = currentLanguage;

  }, [title, description, keywords, image, url, content, currentLanguage, currentPath]);

  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const updateCanonicalUrl = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  };

  const setHreflangTags = () => {
    // Remove existing hreflang tags
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());

    // Add hreflang tags for all languages
    availableLanguages.forEach(lang => {
      const alternateUrl = getLocalizedUrl(currentPath, lang.code);
      const hreflang = document.createElement('link');
      hreflang.setAttribute('rel', 'alternate');
      hreflang.setAttribute('hreflang', lang.code);
      hreflang.setAttribute('href', `${window.location.origin}${alternateUrl}`);
      document.head.appendChild(hreflang);
    });

    // Add x-default hreflang (English)
    const defaultUrl = getLocalizedUrl(currentPath, 'en');
    const defaultHreflang = document.createElement('link');
    defaultHreflang.setAttribute('rel', 'alternate');
    defaultHreflang.setAttribute('hreflang', 'x-default');
    defaultHreflang.setAttribute('href', `${window.location.origin}${defaultUrl}`);
    document.head.appendChild(defaultHreflang);
  };

  const getLocaleCode = (lang: string) => {
    const localeMap: Record<string, string> = {
      'en': 'en_US',
      'zh': 'zh_CN',
      'ar': 'ar_SA',
      'el': 'el_GR',
      'ja': 'ja_JP',
      'de': 'de_DE',
      'es': 'es_ES',
      'nl': 'nl_NL',
      'fr': 'fr_FR'
    };
    return localeMap[lang] || 'en_US';
  };

  return null; // This component doesn't render anything
}
