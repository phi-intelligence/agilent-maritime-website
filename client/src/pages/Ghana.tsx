import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Users, TrendingUp, Building, Award, Globe, ArrowRight, Phone, Ship, Truck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";

const ghanaHighlights = [
  {
    icon: MapPin,
    title: "Strategic Location",
    description: "Tema Port serves as the gateway to West Africa with excellent connectivity to landlocked countries.",
    details: ["Primary port for Ghana", "Gateway to Burkina Faso, Mali, Niger", "Modern infrastructure", "Deep-water berths up to 16m"]
  },
  {
    icon: Users,
    title: "Local Expertise",
    description: "Experienced Ghanaian professionals with deep market knowledge and international standards.",
    details: ["100% Ghanaian workforce", "International maritime certifications", "Community partnerships", "Local language proficiency"]
  },
  {
    icon: TrendingUp,
    title: "Economic Impact",
    description: "Contributing significantly to Ghana's maritime sector growth and regional trade.",
    details: ["400,000+ vehicles handled annually", "500+ direct local jobs", "Supporting 2,000+ indirect jobs", "GHS 50M+ annual economic contribution"]
  },
  {
    icon: Building,
    title: "Infrastructure",
    description: "State-of-the-art facilities and modern equipment specifically designed for RoRo operations.",
    details: ["Dedicated RoRo terminals", "144-ton crane capacity", "53,000 sqm covered storage", "24/7 operations capability"]
  }
];

// Team members data - based on genuine assets with extended profiles
const teamMembers = [
  {
    name: "Kofi Webb",
    position: "Ghana Operations Director",
    image: getAssetUrl(ASSET_PATHS.TEAM.KOFI_WEBB),
    description: "Leading our Ghana operations with 12+ years of maritime experience in port operations and West African logistics. Former GPHA operations manager with deep understanding of regional trade patterns.",
    extendedBio: "Kofi brings over 12 years of maritime expertise to Agilent Maritime, having previously served as Operations Manager at Ghana Ports and Harbours Authority (GPHA). He holds a Master's in Maritime Studies from the University of Ghana and has been instrumental in developing Tema Port's RoRo capabilities. Kofi's deep understanding of West African trade patterns and his extensive network across the region make him an invaluable leader for our operations.",
    expertise: ["Port Operations", "West Africa Logistics", "Regional Trade", "GPHA Relations"],
    achievements: ["Led 400,000+ vehicle operations", "15+ years maritime experience", "GPHA Operations Manager", "University of Ghana Maritime Studies"],
    contact: {
      email: "kofi.webb@agilentmaritime.com",
      phone: "+233 24 123 4567",
      linkedin: "linkedin.com/in/kofiwebb"
    }
  },
  {
    name: "So Frimpong", 
    position: "Senior Operations Manager",
    image: getAssetUrl(ASSET_PATHS.TEAM.SO_FRIMPONG),
    description: "Managing day-to-day operations at Tema Port with 8+ years specialized experience in RoRo operations and cargo handling. Certified in maritime safety and port management.",
    extendedBio: "So has been with Agilent Maritime for 8+ years, specializing in RoRo operations and cargo handling at Tema Port. He holds multiple maritime certifications including IMO Safety Management and Port Operations Management. So's hands-on approach and attention to detail have contributed to our 98% success rate in vehicle handling operations. His expertise in coordinating complex logistics operations makes him a key asset to our team.",
    expertise: ["RoRo Operations", "Cargo Handling", "Safety Management", "Team Leadership"],
    achievements: ["8+ years RoRo expertise", "IMO Safety Certified", "98% success rate", "Complex logistics coordination"],
    contact: {
      email: "so.frimpong@agilentmaritime.com",
      phone: "+233 24 234 5678",
      linkedin: "linkedin.com/in/sofrimpong"
    }
  }
];

const partnerships = [
  {
    name: "Ghana Ports and Harbours Authority",
    role: "Strategic Port Partnership",
    description: "Long-term collaboration since 2010 for port development and operations. Official RoRo terminal operator at Tema Port with exclusive rights for vehicle handling.",
    logo: getAssetUrl(ASSET_PATHS.TEAM.GPHA_LOGO)
  },
  {
    name: "Meridian Port Services",
    role: "Joint Venture Partner",
    description: "Strategic partnership for container terminal services at Tema Port Terminal 3. Collaborative approach to port modernization and efficiency improvements.",
    logo: getAssetUrl(ASSET_PATHS.TEAM.MERIDIAN_LOGO)
  }
];

export default function Ghana() {
  const { content } = useLanguage();
  const [highlightsHeaderRef, isHighlightsHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [highlightsCardsRef, isHighlightsCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [leadershipRef, isLeadershipVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [partnershipsHeaderRef, isPartnershipsHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [partnershipsCardsRef, isPartnershipsCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [projectsRef, isProjectsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [ctaRef, isCtaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });

  const handleViewOpportunities = () => {
    console.log('View Opportunities clicked');
    // Navigate to careers or opportunities page
  };

  const handleContactLocal = () => {
    console.log('Contact Local Team clicked');
    // Open contact form for Ghana office
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-ghana">
      <Navigation />
      
      <PageHero
        videoUrl={getAssetUrl(ASSET_PATHS.HERO.VIDEO_TEMA)}
        imageUrl={getAssetUrl(ASSET_PATHS.STOCK.GHANA_PORT)}
        badge={content.ghanaPage?.hero?.badge || "🇬🇭 Ghana Operations"}
        title={content.ghanaPage?.hero?.title || "Proudly Ghanaian"}
        subtitle={content.ghanaPage?.hero?.subtitle || "Premier RoRo specialist at Tema Port, Ghana, handling 400,000+ vehicles annually with deep local expertise, strong community partnerships, and commitment to Ghana's economic development. Operating at the Greenwich Meridian - the world's center point."}
        primaryCta={{
          text: content.ghanaPage?.hero?.primaryCta || "View Opportunities",
          onClick: handleViewOpportunities
        }}
        secondaryCta={{
          text: content.ghanaPage?.hero?.secondaryCta || "Contact Local Team",
          onClick: handleContactLocal,
          icon: <Phone className="h-5 w-5" />
        }}
        stats={content.ghanaPage?.hero?.stats || [
          { value: "15+", label: "Years Experience" },
          { value: "400K+", label: "Vehicles Annually" },
          { value: "24/7", label: "Port Operations" }
        ]}
        scrollTarget="ghana-content"
      />


      <main id="ghana-content" className="pb-8">
        {/* Ghana Highlights */}
        <section className="py-16 relative overflow-hidden">
              {/* Video Background */}
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src={getAssetUrl(ASSET_PATHS.BACKGROUNDS.TEM2)} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20" />
              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Ghana's Strategic Position */}
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {content.ghanaPage?.strategicPosition?.title || "Ghana's Strategic Position"}
                  </h2>
                  <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
                    {content.ghanaPage?.strategicPosition?.subtitle || "Located at the Greenwich Meridian (0°00'), Ghana serves as West Africa's premier maritime gateway, connecting global trade routes and serving landlocked nations across the region."}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Globe className="h-6 w-6 text-blue-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {content.ghanaPage?.strategicPosition?.highlights?.[0]?.title || "Greenwich Meridian"}
                      </h3>
                      <p className="text-sm text-white/80">
                        {content.ghanaPage?.strategicPosition?.highlights?.[0]?.description || "Operating at 0°00' longitude - the world's center point for global time and navigation."}
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MapPin className="h-6 w-6 text-green-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {content.ghanaPage?.strategicPosition?.highlights?.[1]?.title || "Gateway to West Africa"}
                      </h3>
                      <p className="text-sm text-white/80">
                        {content.ghanaPage?.strategicPosition?.highlights?.[1]?.description || "Serving landlocked countries including Burkina Faso, Mali, and Niger with efficient logistics."}
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-6 w-6 text-purple-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {content.ghanaPage?.strategicPosition?.highlights?.[2]?.title || "Economic Hub"}
                      </h3>
                      <p className="text-sm text-white/80">
                        {content.ghanaPage?.strategicPosition?.highlights?.[2]?.description || "Ghana's $75.49B GDP economy drives regional trade and maritime commerce growth."}
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  ref={highlightsHeaderRef}
                  className={`text-center mb-12 animate-fade-in-up ${isHighlightsHeaderVisible ? 'animate-visible' : ''}`}
                >
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {content.ghanaPage?.ghanaAdvantage?.title || "Our Ghana Advantage"}
                  </h2>
                  <p className="text-xl text-white/90">
                    {content.ghanaPage?.ghanaAdvantage?.subtitle || "Premier RoRo specialist at Tema Port with deep local knowledge and international maritime expertise."}
                  </p>
                </div>

                <div 
                  ref={highlightsCardsRef}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {ghanaHighlights.map((highlight, index) => {
                    const translatedHighlight = content.ghanaPage?.ghanaAdvantage?.highlights?.[index] || highlight;
                    return (
                      <Card 
                        key={index}
                        className={`hover-elevate backdrop-blur-sm bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground transition-all duration-300 animate-pop-up ${isHighlightsCardsVisible ? 'animate-visible' : ''}`}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                        data-testid={`card-ghana-highlight-${index}`}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-full bg-primary-foreground/20">
                              <highlight.icon className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <CardTitle className="text-xl text-primary-foreground">{translatedHighlight.title}</CardTitle>
                          </div>
                          <p className="text-primary-foreground/80">{translatedHighlight.description}</p>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {(translatedHighlight.details || highlight.details).map((detail, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                                <span className="text-sm text-primary-foreground">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>

        {/* Local Leadership, Global Standards */}
        <section 
          ref={leadershipRef}
          className={`py-16 relative overflow-hidden animate-fade-in-up ${isLeadershipVisible ? 'animate-visible' : ''}`}
          style={{
            backgroundImage: `url(${getAssetUrl(ASSET_PATHS.GENERATED.RORO_OPERATIONS)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.ghanaPage?.leadership?.title || "Local Leadership, Global Standards"}
              </h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                {content.ghanaPage?.leadership?.subtitle || "Our Ghana operations are led by experienced local professionals who understand both the regional market dynamics and international maritime standards, ensuring premier RoRo services at Tema Port."}
              </p>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {teamMembers.map((member, index) => {
                const translatedMember = content.ghanaPage?.leadership?.teamMembers?.[index] || member;
                return (
                <Card 
                  key={index}
                  className="overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-lg transition-all duration-300"
                  data-testid={`card-team-member-${index}`}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={member.image} 
                        alt={`${member.name} - ${member.position}`}
                        className="w-full h-64 object-cover"
                        data-testid={`img-team-member-${index}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{translatedMember.name}</h3>
                        <p className="text-white/90 text-sm mb-2">{translatedMember.position}</p>
                        <div className="flex flex-wrap gap-1">
                          {(translatedMember.expertise || member.expertise).map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex}
                              variant="secondary" 
                              className="text-xs bg-white/20 text-white border-white/30"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {translatedMember.description || member.description}
                      </p>
                      
                      {/* Extended Bio */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Professional Background</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {translatedMember.extendedBio || member.extendedBio}
                        </p>
                      </div>
                      
                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Achievements</h4>
                        <div className="flex flex-wrap gap-1">
                          {(translatedMember.achievements || member.achievements).map((achievement, achievementIndex) => (
                            <Badge 
                              key={achievementIndex}
                              variant="outline" 
                              className="text-xs"
                            >
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Contact Information */}
                      <div className="border-t pt-3">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Contact</h4>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>📧 {member.contact.email}</p>
                          <p>📞 {member.contact.phone}</p>
                          <p>🔗 {member.contact.linkedin}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>

            <div className="text-center">
              <Button 
                className="gap-2" 
                onClick={handleViewOpportunities}
                data-testid="button-view-opportunities"
              >
{content.ghanaPage?.leadership?.viewOpportunities || "View Career Opportunities"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Strategic Partnerships */}
            <div className="mt-16 pt-16 border-t border-white/20">
              <div 
                ref={partnershipsHeaderRef}
                className={`text-center mb-12 animate-fade-in-up ${isPartnershipsHeaderVisible ? 'animate-visible' : ''}`}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {content.ghanaPage?.partnerships?.title || "Strategic Partnerships"}
                </h3>
                <p className="text-lg text-white/90">
                  {content.ghanaPage?.partnerships?.subtitle || "Building strong relationships across Ghana's maritime ecosystem for premier RoRo operations."}
                </p>
              </div>

              <div 
                ref={partnershipsCardsRef}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {partnerships.map((partnership, index) => {
                  const translatedPartnership = content.ghanaPage?.partnerships?.partnerships?.[index] || partnership;
                  return (
                  <Card 
                    key={index}
                    className={`text-center backdrop-blur-sm bg-card/80 border-border/50 hover:shadow-lg transition-all duration-300 animate-pop-up ${isPartnershipsCardsVisible ? 'animate-visible' : ''}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                    data-testid={`card-partnership-${index}`}
                  >
                    <CardContent className="p-8">
                      <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
                        {partnership.logo ? (
                          <img 
                            src={partnership.logo} 
                            alt={`${partnership.name} logo`}
                            className="h-8 w-8 object-contain"
                            data-testid={`img-partnership-logo-${index}`}
                          />
                        ) : (
                          <Globe className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{translatedPartnership.name}</h4>
                      <Badge variant="outline" className="mb-4">{translatedPartnership.role}</Badge>
                      <p className="text-sm text-muted-foreground">{translatedPartnership.description}</p>
                    </CardContent>
                  </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>



        {/* Our Ghana Operations */}
        <section 
          ref={projectsRef}
          className={`py-16 relative overflow-hidden animate-fade-in-up ${isProjectsVisible ? 'animate-visible' : ''}`}
          style={{
            backgroundImage: `url(${getAssetUrl(ASSET_PATHS.GENERATED.HEAVY_LIFT)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.ghanaPage?.operations?.title || "Our Ghana Operations"}
              </h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                {content.ghanaPage?.operations?.subtitle || "Operating at Tema Port, Ghana's premier maritime gateway, we provide comprehensive RoRo and maritime logistics services across West Africa. Tema Port handles 80% of Ghana's national trade and serves as the primary gateway for landlocked countries in the region."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(content.ghanaPage?.operations?.services || [
                {
                  title: "RoRo Operations",
                  description: "Premier Roll-on/Roll-off specialist handling 400,000+ vehicles annually at Tema Port. Dedicated terminals with specialized equipment for cars, trucks, and heavy machinery."
                },
                {
                  title: "Cargo Handling", 
                  description: "Professional stevedoring and cargo handling services with modern equipment and experienced teams. ISO-certified operations with 99.8% on-time delivery record."
                },
                {
                  title: "Strategic Location",
                  description: "Positioned at Tema Port, Ghana's gateway to West Africa with excellent connectivity. Serving landlocked countries including Burkina Faso, Mali, and Niger. Located at 5.6667°N, 0.0167°W on the Greenwich Meridian."
                }
              ]).map((service, index) => (
                <div key={index} className="text-center p-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {index === 0 && <Ship className="h-8 w-8 text-primary" />}
                    {index === 1 && <Truck className="h-8 w-8 text-primary" />}
                    {index === 2 && <MapPin className="h-8 w-8 text-primary" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaRef}
          className={`py-16 bg-primary/5 animate-fade-in-up ${isCtaVisible ? 'animate-visible' : ''}`}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {content.ghanaPage?.cta?.title || "Connect with Our Ghana Team"}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {content.ghanaPage?.cta?.subtitle || "Get in touch with our local experts for personalized RoRo and maritime solutions in Ghana and West Africa."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={handleContactLocal}
                data-testid="button-contact-ghana-team"
              >
                {content.ghanaPage?.cta?.contactTeam || "Contact Ghana Team"}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-visit-facilities">
                {content.ghanaPage?.cta?.visitFacilities || "Visit Our Facilities"}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}