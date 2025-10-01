import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";

const stats = [
  {
    value: "15+",
    label: "Years of Experience",
    description: "Founded in 2010, serving West Africa"
  },
  {
    value: "400,000+",
    label: "Vehicles Annually",
    description: "Handled at Tema Port, Ghana"
  },
  {
    value: "500+",
    label: "Expert Staff",
    description: "Experienced professionals"
  },
  {
    value: "24/7",
    label: "Port Operations",
    description: "Round-the-clock service"
  },
  {
    value: "100%",
    label: "Safety Record",
    description: "Committed to excellence"
  },
  {
    value: "50+",
    label: "Vessel Fleet",
    description: "Diverse maritime assets"
  }
];

export function StatsSection() {
  const [headerRef, isHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [cardsRef, isCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });

  return (
    <section 
      className="py-24 relative bg-background overflow-hidden" 
      data-testid="section-stats"
      style={{
        backgroundImage: `url(${getAssetUrl(ASSET_PATHS.GENERATED.HEAVY_LIFT)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 animate-fade-in-up ${isHeaderVisible ? 'animate-visible' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Premier RoRo Performance
          </h2>
          <p className={`text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up-delayed ${isHeaderVisible ? 'animate-visible' : ''}`}>
            Leading West Africa's maritime logistics with 400,000+ vehicles annually and 15+ years of excellence.
          </p>
        </div>

        {/* Stats Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className={`text-center hover-elevate backdrop-blur-sm bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground transition-all duration-300 animate-pop-up ${isCardsVisible ? 'animate-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-8">
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-primary-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-primary-foreground/80">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}