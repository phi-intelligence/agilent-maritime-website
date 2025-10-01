#!/usr/bin/env node

/**
 * Language Content Extraction Script
 * Extracts content from static HTML pages and creates structured language content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Language mappings
const languages = {
  'en': { name: 'English', flag: 'EN', dir: 'ltr' },
  'zh': { name: '中文', flag: 'ZH', dir: 'ltr' },
  'ar': { name: 'العربية', flag: 'AR', dir: 'rtl' },
  'el': { name: 'Ελληνικά', flag: 'EL', dir: 'ltr' },
  'ja': { name: '日本語', flag: 'JA', dir: 'ltr' },
  'de': { name: 'Deutsch', flag: 'DE', dir: 'ltr' },
  'es': { name: 'Español', flag: 'ES', dir: 'ltr' },
  'nl': { name: 'Nederlands', flag: 'NL', dir: 'ltr' },
  'fr': { name: 'Français', flag: 'FR', dir: 'ltr' }
};

// Content structure template
const contentStructure = {
  navigation: {
    home: '',
    services: '',
    portfolio: '',
    ghana: '',
    reports: '',
    contact: ''
  },
  hero: {
    badge: '',
    title: '',
    subtitle: '',
    cta1: '',
    cta2: ''
  },
  services: {
    title: '',
    subtitle: '',
    items: []
  },
  portfolio: {
    title: '',
    subtitle: '',
    items: []
  },
  ghana: {
    title: '',
    subtitle: '',
    content: ''
  },
  reports: {
    title: '',
    subtitle: '',
    content: ''
  },
  footer: {
    company: '',
    description: '',
    links: []
  },
  common: {
    learnMore: '',
    contactUs: '',
    getQuote: '',
    download: ''
  }
};

/**
 * Extract content from HTML using regex patterns
 */
function extractContent(html, patterns) {
  const content = {};
  
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = html.match(pattern);
    if (match) {
      content[key] = match[1].trim();
    }
  }
  
  return content;
}

/**
 * Extract navigation content
 */
function extractNavigation(html) {
  const patterns = {
    home: /href="\/[^"]*\/home\/"[^>]*>([^<]+)</,
    services: /href="\/[^"]*\/services\/"[^>]*>([^<]+)</,
    portfolio: /href="\/[^"]*\/portfolio\/"[^>]*>([^<]+)</,
    ghana: /href="\/[^"]*\/ghana\/"[^>]*>([^<]+)</,
    contact: /href="\/[^"]*\/home\/#contact"[^>]*>([^<]+)</
  };
  
  return extractContent(html, patterns);
}

/**
 * Extract hero content
 */
function extractHero(html) {
  const patterns = {
    badge: /<span[^>]*class="[^"]*jsx[^"]*"[^>]*>([^<]+)<\/span>/,
    title: /<h1[^>]*class="[^"]*jsx[^"]*"[^>]*>([^<]+)<\/h1>/,
    subtitle: /<p[^>]*class="[^"]*jsx[^"]*"[^>]*>([^<]+)<\/p>/,
    cta1: /<a[^>]*href="\/[^"]*\/services\/"[^>]*>([^<]+)<\/a>/,
    cta2: /<a[^>]*href="tel:[^"]*"[^>]*>([^<]+)<\/a>/
  };
  
  return extractContent(html, patterns);
}

/**
 * Extract services content
 */
function extractServices(html) {
  const patterns = {
    title: /<h2[^>]*class="[^"]*text-4xl[^"]*"[^>]*>([^<]+)<\/h2>/,
    subtitle: /<p[^>]*class="[^"]*text-lg[^"]*"[^>]*>([^<]+)<\/p>/
  };
  
  const content = extractContent(html, patterns);
  
  // Extract service items
  const serviceItems = [];
  const serviceMatches = html.matchAll(/<h3[^>]*class="[^"]*text-xl[^"]*"[^>]*>([^<]+)<\/h3>/g);
  
  for (const match of serviceMatches) {
    serviceItems.push({
      title: match[1].trim(),
      description: ''
    });
  }
  
  content.items = serviceItems;
  return content;
}

/**
 * Extract page content for a specific language
 */
function extractLanguageContent(langCode) {
  const staticPath = path.join(__dirname, '..', 'static-preview', langCode);
  const content = { ...contentStructure };
  
  try {
    // Extract from home page
    const homeHtml = fs.readFileSync(path.join(staticPath, 'home', 'index.html'), 'utf8');
    
    // Navigation
    content.navigation = extractNavigation(homeHtml);
    
    // Hero
    content.hero = extractHero(homeHtml);
    
    // Services
    const servicesHtml = fs.readFileSync(path.join(staticPath, 'services', 'index.html'), 'utf8');
    content.services = extractServices(servicesHtml);
    
    // Portfolio
    const portfolioHtml = fs.readFileSync(path.join(staticPath, 'portfolio', 'index.html'), 'utf8');
    content.portfolio = extractServices(portfolioHtml);
    
    // Ghana
    const ghanaHtml = fs.readFileSync(path.join(staticPath, 'ghana', 'index.html'), 'utf8');
    content.ghana = extractServices(ghanaHtml);
    
    // Reports
    const reportsHtml = fs.readFileSync(path.join(staticPath, 'reports', 'index.html'), 'utf8');
    content.reports = extractServices(reportsHtml);
    
    // Common phrases
    content.common = {
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      getQuote: 'Get Quote',
      download: 'Download'
    };
    
    // Language-specific common phrases
    if (langCode === 'ar') {
      content.common = {
        learnMore: 'تعلم المزيد',
        contactUs: 'اتصل بنا',
        getQuote: 'احصل على عرض سعر',
        download: 'تحميل'
      };
    } else if (langCode === 'zh') {
      content.common = {
        learnMore: '了解更多',
        contactUs: '联系我们',
        getQuote: '获取报价',
        download: '下载'
      };
    } else if (langCode === 'es') {
      content.common = {
        learnMore: 'Saber Más',
        contactUs: 'Contáctanos',
        getQuote: 'Cotización',
        download: 'Descargar'
      };
    } else if (langCode === 'fr') {
      content.common = {
        learnMore: 'En Savoir Plus',
        contactUs: 'Nous Contacter',
        getQuote: 'Devis',
        download: 'Télécharger'
      };
    }
    
  } catch (error) {
    console.error(`Error extracting content for ${langCode}:`, error.message);
    return null;
  }
  
  return content;
}

/**
 * Main extraction function
 */
async function extractAllLanguages() {
  console.log('🌍 Starting language content extraction...\n');
  
  const allContent = {};
  
  for (const [langCode, langInfo] of Object.entries(languages)) {
    console.log(`📝 Extracting content for ${langInfo.name} (${langCode})...`);
    
    const content = extractLanguageContent(langCode);
    if (content) {
      allContent[langCode] = content;
      console.log(`✅ Successfully extracted ${langCode} content`);
    } else {
      console.log(`❌ Failed to extract ${langCode} content`);
    }
  }
  
  // Save extracted content
  const outputPath = path.join(__dirname, '..', 'client', 'src', 'data', 'language-content.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(allContent, null, 2));
  console.log(`\n💾 Saved extracted content to ${outputPath}`);
  
  // Generate TypeScript types
  generateTypeScriptTypes(allContent);
  
  console.log('\n🎉 Language content extraction completed!');
  return allContent;
}

/**
 * Generate TypeScript types for language content
 */
function generateTypeScriptTypes(content) {
  const typesPath = path.join(__dirname, '..', 'client', 'src', 'types', 'language.ts');
  const typesDir = path.dirname(typesPath);
  
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
  }
  
  const typeDefinition = `// Auto-generated language content types
export interface LanguageContent {
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
  ghana: {
    title: string;
    subtitle: string;
    content: string;
  };
  reports: {
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

export type LanguageCode = keyof typeof content;
export type LanguageContentMap = Record<string, LanguageContent>;
`;

  fs.writeFileSync(typesPath, typeDefinition);
  console.log(`📝 Generated TypeScript types at ${typesPath}`);
}

// Run extraction if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  extractAllLanguages().catch(console.error);
}

export { extractAllLanguages, extractLanguageContent };
