import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useEffect, useState } from "react";

interface PageHeroProps {
  imageUrl?: string;
  videoUrl?: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
  scrollTarget?: string;
  showAnimations?: boolean;
}

export function PageHero({
  imageUrl,
  videoUrl,
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
  scrollTarget = "main-content",
  showAnimations = false
}: PageHeroProps) {
  const { scrollToSection } = useScrollTo();
  const [backgroundAttachment, setBackgroundAttachment] = useState<'fixed' | 'scroll'>('scroll');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const updateBackgroundAttachment = () => {
      setBackgroundAttachment(window.innerWidth > 768 ? 'fixed' : 'scroll');
    };

    // Set initial value
    updateBackgroundAttachment();

    // Add event listener for window resize
    window.addEventListener('resize', updateBackgroundAttachment);

    // Preload the hero image or video
    if (videoUrl) {
      const video = document.createElement('video');
      video.onloadedmetadata = () => {
        console.log('PageHero video loaded successfully:', videoUrl);
        setVideoLoaded(true);
      };
      video.oncanplaythrough = () => {
        console.log('PageHero video can play through:', videoUrl);
        setVideoLoaded(true);
      };
      video.onerror = () => {
        console.error('PageHero video failed to load:', videoUrl);
        setVideoError(true);
        setVideoLoaded(true); // Still show the section even if video fails
      };
      video.src = videoUrl;
      video.load();
    } else if (imageUrl) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true);
      img.src = imageUrl;
    }

    return () => {
      window.removeEventListener('resize', updateBackgroundAttachment);
    };
  }, [imageUrl, videoUrl]);

  const handleScrollDown = () => {
    scrollToSection(scrollTarget);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-600 to-slate-800"
      style={{
        backgroundImage: (imageUrl && imageLoaded && !videoUrl) ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${imageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: backgroundAttachment
      }}
      data-testid="section-page-hero"
    >
      {/* Video Background */}
      {videoUrl && videoLoaded && !videoError && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Image - Only show when video is not available or failed to load */}
      {(!videoUrl || videoError || !videoLoaded) && imageUrl && (
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Video/Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-700/60 z-[1]" />
      {/* Animated Background Elements */}
      {showAnimations && (
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
      )}
      
      {/* Content */}
      <div className="relative z-[3] max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className={`mb-8 ${showAnimations ? 'animate-fade-in' : ''}`}>
          <Badge 
            variant="secondary" 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm backdrop-blur-sm bg-background/20 border border-primary/20"
            data-testid="badge-page-hero"
          >
            <div className={`w-2 h-2 bg-primary rounded-full ${showAnimations ? 'animate-pulse-dot' : ''}`} />
            {badge}
          </Badge>
        </div>

        {/* Main Heading */}
        <div className={`mb-6 ${showAnimations ? 'animate-fade-in' : ''}`} style={showAnimations ? { animationDelay: '0.2s' } : {}}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
            {title}
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`mb-8 ${showAnimations ? 'animate-fade-in' : ''}`} style={showAnimations ? { animationDelay: '0.4s' } : {}}>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        {(primaryCta || secondaryCta) && (
          <div className={`mb-12 flex flex-col sm:flex-row gap-4 justify-center ${showAnimations ? 'animate-fade-in' : ''}`} style={showAnimations ? { animationDelay: '0.6s' } : {}}>
            {primaryCta && (
              <Button 
                size="lg" 
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={primaryCta.onClick}
                data-testid="button-primary-cta"
              >
                {primaryCta.text}
                {primaryCta.icon || <ArrowRight className="h-5 w-5" />}
              </Button>
            )}
            {secondaryCta && (
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 backdrop-blur-sm bg-background/20 border-white/30 text-white hover:bg-white/10"
                onClick={secondaryCta.onClick}
                data-testid="button-secondary-cta"
              >
                {secondaryCta.icon || <Phone className="h-5 w-5" />}
                {secondaryCta.text}
              </Button>
            )}
          </div>
        )}

        {/* Statistics - Desktop Only */}
        {stats && (
          <div className={`hidden lg:flex justify-center gap-12 ${showAnimations ? 'animate-fade-in' : ''}`} style={showAnimations ? { animationDelay: '0.8s' } : {}}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center backdrop-blur-sm bg-background/10 rounded-lg px-6 py-4 border border-white/10"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[3] ${showAnimations ? 'animate-bounce' : ''}`}>
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

