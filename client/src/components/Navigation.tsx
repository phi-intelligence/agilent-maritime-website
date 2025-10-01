import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Globe, Ship, Settings, LogIn } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { ContactFormModal } from "./ContactFormModal";
import { useScrollTo } from "@/hooks/useScrollTo";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";

// Languages are now provided by the LanguageProvider

const navItems = [
  { path: '/', label: 'home', key: 'home' },
  { path: '/services', label: 'services', key: 'services' },
  { path: '/portfolio', label: 'portfolio', key: 'portfolio' },
  { path: '/ghana', label: 'ghana', key: 'ghana' },
  { path: '/contact', label: 'contact', key: 'contact' },
];

export function Navigation() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { currentLanguage, setLanguage, content, availableLanguages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { scrollToSection } = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
  };

  const handleNavClick = (path: string, sectionId?: string) => {
    if (location === path && sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-md bg-background/80 border-b border-border/50' 
            : 'backdrop-blur-sm bg-background/20'
        }`}
        data-testid="navigation-desktop"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-2 md:space-x-3 hover-elevate rounded-lg px-2 md:px-3 py-2">
                <img 
                  src={getAssetUrl(ASSET_PATHS.HERO.LOGO)} 
                  alt="Agilent Maritime Logo" 
                  className="h-6 md:h-8 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold text-foreground">Agilent</span>
                  <span className="text-xs text-muted-foreground -mt-1">Maritime</span>
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase()}`}>
                  <Button
                    variant={location === item.path ? "default" : "ghost"}
                    size="sm"
                    className="font-medium"
                    onClick={() => handleNavClick(item.path)}
                  >
                    {content.navigation[item.key as keyof typeof content.navigation] || item.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    data-testid="button-language-switcher"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="text-xs font-medium">{availableLanguages.find(l => l.code === currentLanguage)?.flag}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="backdrop-blur-md bg-popover/90">
                  {availableLanguages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="gap-3"
                      data-testid={`option-language-${lang.code}`}
                    >
                      <span className="text-xs font-medium">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    data-testid="button-settings"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="backdrop-blur-md bg-popover/90">
                  <DropdownMenuItem
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="gap-3"
                    data-testid="option-theme-toggle"
                  >
                    {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => window.location.href = '/admin'}
                    className="gap-3"
                    data-testid="option-company-login"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Company Login</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </div>
        </div>

      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-background/95 border-t border-border/50">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant={location === item.path ? "default" : "ghost"}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => handleNavClick(item.path)}
                data-testid={`bottom-nav-${item.label.toLowerCase()}`}
              >
                {content.navigation[item.label.toLowerCase() as keyof typeof content.navigation] || item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      {/* Modals */}
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}