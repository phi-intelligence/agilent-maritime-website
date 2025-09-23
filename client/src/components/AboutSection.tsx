import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import rorImage from "@assets/generated_images/RoRo_operations_showcase_42f7be0c.png";

export function AboutSection() {
  const handleLearnMore = () => {
    console.log('Learn More clicked');
    // TODO: Navigate to about page or expand content
  };

  return (
    <section className="py-24 bg-muted/30" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Leading Maritime Operations in West Africa
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                With over 15 years of experience at Tema Port, Ghana, Agilent Maritime Services Limited 
                has established itself as the premier Roll-on/Roll-off specialist in West Africa. We handle 
                over 400,000 vehicles annually with world-class maritime logistics solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our commitment to excellence, safety, and environmental responsibility drives everything 
                we do. From vehicle shipping to heavy lift operations, we deliver professional maritime 
                services that exceed industry standards.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              {[
                "Premier RoRo specialist with dedicated terminals",
                "24/7 port operations with modern equipment",
                "Professional stevedoring and cargo handling",
                "Environmental compliance and safety protocols",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>

            <Button 
              className="gap-2" 
              onClick={handleLearnMore}
              data-testid="button-learn-more"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
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
            <div className="absolute -bottom-8 -left-8 backdrop-blur-md bg-primary text-primary-foreground p-6 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold">400K+</div>
              <div className="text-sm opacity-90">Vehicles Handled Annually</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}