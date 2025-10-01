import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import rorImage from "@assets/stock_images/cargo_ship_loading_v_7b40175e.jpg";

export function AboutSection() {
  const handleLearnMore = () => {
    console.log('Learn More clicked');
    // TODO: Navigate to about page or expand content
  };

  const [contentRef, isContentVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [imageRef, isImageVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });

  return (
    <section className="py-24 bg-muted/30" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div 
            ref={contentRef}
            className={`space-y-8 animate-fade-in-up ${isContentVisible ? 'animate-visible' : ''}`}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Premier RoRo Specialist in West Africa
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded in 2010, Agilent Maritime Services Limited has established itself as the premier 
                Roll-on/Roll-off specialist in West Africa. Operating from Tema Port, Ghana, we handle 
                over 400,000 vehicles annually with our team of 500+ experienced professionals.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our commitment to excellence, safety, and environmental responsibility drives everything 
                we do. From vehicle shipping to heavy lift operations, we deliver professional maritime 
                services that exceed industry standards across West Africa.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              {[
                "Premier RoRo specialist with dedicated terminals at Tema Port",
                "400,000+ vehicles handled annually across West Africa",
                "500+ experienced professionals and 24/7 operations",
                "Founded in 2010 with 15+ years of maritime expertise",
              ].map((point, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 animate-slide-in-left ${isContentVisible ? 'animate-visible' : ''}`}
                  style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>

            <div className={`animate-fade-in-up-delayed ${isContentVisible ? 'animate-visible' : ''}`}>
              <Button 
                className="gap-2" 
                onClick={handleLearnMore}
                data-testid="button-learn-more"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Image */}
          <div 
            ref={imageRef}
            className={`relative animate-slide-in-right ${isImageVisible ? 'animate-visible' : ''}`}
          >
            <Card className="overflow-hidden backdrop-blur-sm bg-card/80 border-border/50">
              <CardContent className="p-0">
                <img 
                  src={rorImage} 
                  alt="RoRo operations at Tema Port"
                  className="w-full h-96 object-cover"
                  data-testid="img-roro-operations"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </CardContent>
            </Card>

            {/* Floating Stats */}
            <div className={`absolute -bottom-8 -left-8 backdrop-blur-md bg-primary text-primary-foreground p-6 rounded-lg border border-primary/20 animate-pop-up ${isImageVisible ? 'animate-visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
              <div className="text-2xl font-bold">400,000+</div>
              <div className="text-sm opacity-90">Vehicles Annually</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}