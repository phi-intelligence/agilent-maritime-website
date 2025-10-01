import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "./LanguageProvider";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";

export function PartnersAndTestimonialsSection() {
  const { content } = useLanguage();
  
  const [partnersHeaderRef, isPartnersHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [partnersRef, isPartnersVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [testimonialsHeaderRef, isTestimonialsHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [testimonialsRef, isTestimonialsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });

  return (
    <section 
      className="py-24 relative bg-background overflow-hidden" 
      data-testid="section-partners-testimonials"
      style={{
        backgroundImage: `url(${getAssetUrl(ASSET_PATHS.STOCK.SHIPPING_PORT)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Partners Section */}
        <div 
          ref={partnersHeaderRef}
          className={`text-center mb-16 animate-fade-in-up ${isPartnersHeaderVisible ? 'animate-visible' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.partners?.title || "Trusted Partners in Maritime Operations"}
          </h2>
        </div>

        <div 
          ref={partnersRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24"
        >
          {(content.partners?.items || [
            {
              name: "Ghana Ports and Harbours Authority",
              description: "Official port authority managing Tema Port operations and infrastructure",
              logo: getAssetUrl(ASSET_PATHS.TEAM.GPHA_LOGO)
            },
            {
              name: "Meridian Port Services",
              description: "Delivering world-class container terminal services at Tema Port",
              logo: getAssetUrl(ASSET_PATHS.TEAM.MERIDIAN_LOGO)
            }
          ]).map((partner, index) => (
            <Card 
              key={index}
              className={`text-center hover-elevate animate-pop-up backdrop-blur-md bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground ${isPartnersVisible ? 'animate-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="w-32 h-24 mx-auto mb-6 bg-white/10 rounded-lg flex items-center justify-center p-4">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback to initials if logo fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="w-16 h-16 bg-primary-foreground/20 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg hidden">
                    {partner.name.split(' ').map(word => word[0]).join('')}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary-foreground mb-3">
                  {partner.name}
                </h3>
                <p className="text-primary-foreground/80">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <div 
          ref={testimonialsHeaderRef}
          className={`text-center mb-16 animate-fade-in-up ${isTestimonialsHeaderVisible ? 'animate-visible' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.testimonials?.title || "What Our Clients Say"}
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            {content.testimonials?.subtitle || "Trusted by leading companies across Africa for exceptional maritime services"}
          </p>
        </div>

        <div 
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(content.testimonials?.items || [
            {
              quote: "When we needed to ship a 85-ton transformer to Southeast Asia, other freight forwarders said it was impossible. Agilent Maritime Services not only accepted the challenge but delivered flawlessly. Their team calculated every detail - from crane specifications to route planning - and coordinated with multiple ports to ensure safe passage. Their expertise in out-of-gauge cargo is unmatched.",
              name: "Takeshi Yamamoto",
              title: "Logistics Manager - Heavy Machinery Corp"
            },
            {
              quote: "Agilent's stevedores handled our 45,000-ton iron ore cargo with remarkable precision. Their attention to proper weight distribution and hull protection gave us complete confidence throughout the operation. Loading was completed 6 hours ahead of schedule without a single safety incident. Their bulk cargo expertise clearly shows in every operation.",
              name: "Captain Maria Santos",
              title: "Vessel Operations - Atlantic Shipping Lines"
            },
            {
              quote: "Rolling 200 vehicles on and off vessels requires absolute precision. Agilent's team demonstrated meticulous attention to detail - from securing each vehicle to monitoring weather conditions during operations. We've never had damage to our cargo under their supervision. Their Ro/Ro expertise is exactly what we need for our automotive exports.",
              name: "Hans Mueller",
              title: "Export Director - European Auto Group"
            }
          ]).map((testimonial, index) => (
            <Card 
              key={index}
              className={`hover-elevate animate-pop-up backdrop-blur-md bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground ${isTestimonialsVisible ? 'animate-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-primary-foreground mb-4" />
                <blockquote className="text-primary-foreground/80 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-primary-foreground/20 pt-4">
                  <div className="font-semibold text-primary-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-primary-foreground/70">
                    {testimonial.title}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
