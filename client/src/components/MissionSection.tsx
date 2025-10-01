import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "./LanguageProvider";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";

export function MissionSection() {
  const { content } = useLanguage();
  const [contentRef, isContentVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [statsRef, isStatsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });


  return (
    <section 
      className="py-24 relative bg-background overflow-hidden" 
      data-testid="section-mission"
      style={{
        backgroundImage: `url(${getAssetUrl(ASSET_PATHS.BACKGROUNDS.SHIP)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ backgroundAttachment: 'fixed' }}
        >
          <source src={getAssetUrl(ASSET_PATHS.BACKGROUNDS.SHIP)} type="video/mp4" />
        </video>
      </div>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div 
          ref={contentRef}
          className={`text-center mb-16 animate-fade-in-up ${isContentVisible ? 'animate-visible' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {content.mission?.title || "Our Mission"}
          </h2>
          <p className="text-lg text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
            {content.mission?.description1 || "Ships make money at sea when they are carrying cargo between ports, therefore, ports and terminals need to be efficient to minimise port time and get the ship back on its journey as soon as possible."}
          </p>
          <p className="text-lg text-white/90 leading-relaxed max-w-4xl mx-auto">
            {content.mission?.description2 || "Agilent Maritime is a premier Roll-on/Roll-off (RoRo) specialist handling over 400,000 RoRo units annually for major RoRo carriers throughout Africa. As a commercial stevedoring company, Agilent Maritime contracts with terminal owners to manage all terminal operations and provides full RoRo Stevedoring and Terminal Services for all types, sizes, shapes, high and heavy cargoes."}
          </p>
        </div>

        {/* Mission Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {(content.mission?.stats || [
            {
              value: "400,000+",
              label: "RoRo units handled annually",
              description: "Major RoRo carriers served throughout Africa"
            },
            {
              value: "Full",
              label: "Terminal Services",
              description: "Complete stevedoring and terminal operations"
            },
            {
              value: "All Types",
              label: "Cargo Handling",
              description: "Sizes, shapes, high and heavy cargoes"
            }
          ]).map((stat, index) => (
            <Card 
              key={index}
              className={`text-center hover-elevate animate-pop-up backdrop-blur-md bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground ${isStatsVisible ? 'animate-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-primary-foreground mb-2">
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
