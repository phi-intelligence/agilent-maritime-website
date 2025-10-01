import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useEffect, useState } from "react";

import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';

// Use organized asset path
const getHeroVideoUrl = () => {
  return getAssetUrl(ASSET_PATHS.HERO.VIDEO_HOME);
};

export function Hero() {
  const { content } = useLanguage();
  const { scrollToSection } = useScrollTo();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Preload the hero video
    const videoUrl = getHeroVideoUrl();
    
    const video = document.createElement('video');
    video.preload = 'auto';
    video.loop = true;
    video.muted = true;
    
    video.onloadedmetadata = () => {
      setVideoLoaded(true);
    };
    video.onerror = () => {
      setVideoError(true);
      setVideoLoaded(true); // Still show the section even if video fails
    };
    video.onended = () => {
      video.currentTime = 0;
      video.play();
    };
    video.src = videoUrl;
    video.load();
  }, []);

  const handleExploreServices = () => {
    scrollToSection('services');
  };

  const handleContactUs = () => {
    scrollToSection('contact');
  };

  const handleScrollDown = () => {
    scrollToSection('services');
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-600 to-slate-800 pt-16 md:pt-0"
      data-testid="section-hero"
    >
      {/* Video Background */}
      {videoLoaded && !videoError && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={getAssetUrl(ASSET_PATHS.HERO.PORT_AERIAL)}
          onEnded={(e) => {
            // Ensure seamless looping
            e.currentTarget.currentTime = 0;
            e.currentTarget.play();
          }}
        >
          <source src={getHeroVideoUrl()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-700/60 z-[1]" />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        {/* Floating Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Gradient Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-gradient-x" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-chart-2/20 to-transparent animate-gradient-x" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center pt-4 md:pt-0">
        {/* Logo */}
        <div className="mb-8 md:mb-12 animate-fade-in">
          <img 
            src={getAssetUrl(ASSET_PATHS.HERO.LOGO)} 
            alt="Agilent Maritime Logo" 
            className="h-20 md:h-32 lg:h-40 w-auto mx-auto drop-shadow-lg"
            data-testid="hero-logo"
          />
        </div>

        {/* Main Heading */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
            {content.hero.title}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
          {/* Extended Company Description */}
          <div className="mt-6 max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 leading-relaxed">
              {content.hero.extendedDescription || "Premier Roll-on/Roll-off (RoRo) specialist in West Africa, handling 400,000+ vehicles annually at Tema Port, Ghana. With 15+ years of maritime excellence, we provide comprehensive stevedoring and port services across the region."}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mb-12 animate-fade-in flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleExploreServices}
            data-testid="button-explore-services"
          >
            {content.hero.cta1}
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2 backdrop-blur-sm bg-background/20 border-white/30 text-white hover:bg-white/10"
            onClick={handleContactUs}
            data-testid="button-contact-us"
          >
            <Phone className="h-5 w-5" />
            {content.hero.cta2}
          </Button>
        </div>

        {/* Statistics - Desktop Only */}
        <div className="hidden lg:flex justify-center gap-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {(content.hero.statistics || [
            { value: '15+', label: 'Years Experience', description: 'Maritime Excellence' },
            { value: '400K+', label: 'Vehicles Annually', description: 'RoRo Operations' },
            { value: '1000+', label: 'Vehicles Shipped', description: 'Successfully Delivered' },
            { value: '24/7', label: 'Port Operations', description: 'Round the Clock' },
            { value: '98%', label: 'Success Rate', description: 'Customer Satisfaction' },
          ]).map((stat, index) => (
            <div 
              key={index} 
              className="text-center backdrop-blur-sm bg-background/10 rounded-lg px-6 py-4 border border-white/10 hover:bg-background/20 transition-all duration-300"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
              <div className="text-gray-400 text-xs mt-1">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-primary"
          onClick={handleScrollDown}
          data-testid="button-scroll-down"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}