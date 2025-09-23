import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import heroImage from "@assets/generated_images/Maritime_port_hero_background_94b32449.png";

export function Hero() {
  const handleExploreServices = () => {
    console.log('Explore Services clicked');
    // TODO: Navigate to services section
  };

  const handleContactUs = () => {
    console.log('Contact Us clicked');
    // TODO: Open contact form or navigate to contact section
  };

  const handleScrollDown = () => {
    console.log('Scroll down clicked');
    // TODO: Smooth scroll to next section
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="section-hero"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8 animate-fade-in">
          <Badge 
            variant="secondary" 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm backdrop-blur-sm bg-background/20 border border-primary/20"
            data-testid="badge-maritime-excellence"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" />
            Maritime Excellence
          </Badge>
        </div>

        {/* Main Heading */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
            <span className="block">Agilent Maritime</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">
              Services Limited
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Leading Stevedore Shipping Services and Maritime Logistics Solutions at Tema Port, Ghana. 
            Professional vehicle shipping and cargo handling across West Africa.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-12 animate-fade-in flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleExploreServices}
            data-testid="button-explore-services"
          >
            Explore Our Services
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
            Contact Us
          </Button>
        </div>

        {/* Statistics - Desktop Only */}
        <div className="hidden lg:flex justify-center gap-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '400K+', label: 'Vehicles Shipped' },
            { value: '24/7', label: 'Port Operations' },
          ].map((stat, index) => (
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