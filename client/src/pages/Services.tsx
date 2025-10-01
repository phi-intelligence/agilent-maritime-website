import React from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/components/LanguageProvider";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";
import { 
  Ship, Truck, Container, Warehouse, Users, Shield, 
  Clock, MapPin, Phone, Radio
} from "lucide-react";

// Base interface matching language content structure
interface BaseDetail {
  title: string;
  details: string[];
}

// Extended interface for arrays with icons
interface DetailWithIcon extends BaseDetail {
  icon: React.ComponentType<{ className?: string }>;
}

// Function to merge language content with icons
function mergeContentWithIcons(languageContent: BaseDetail[] | undefined, hardcodedData: DetailWithIcon[]): DetailWithIcon[] {
  if (!languageContent) {
    return hardcodedData;
  }

  // Create a mapping of titles to icons from hardcoded data
  const iconMap = new Map<string, React.ComponentType<{ className?: string }>>();
  hardcodedData.forEach(item => {
    // Map both the original title and common variations
    iconMap.set(item.title.toLowerCase(), item.icon);
    
    // Map common title variations for better matching
    const titleVariations = [
      item.title.toLowerCase(),
      item.title.toLowerCase().replace(/[^\w\s]/g, ''), // Remove punctuation
      item.title.toLowerCase().replace(/\s+/g, ' ').trim() // Normalize whitespace
    ];
    
    titleVariations.forEach(variation => {
      iconMap.set(variation, item.icon);
    });
  });

  // Merge language content with icons
  return languageContent.map(contentItem => {
    const normalizedTitle = contentItem.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const icon = iconMap.get(normalizedTitle) || iconMap.get(contentItem.title.toLowerCase()) || hardcodedData[0]?.icon;
    
    return {
      ...contentItem,
      icon: icon || hardcodedData[0]?.icon // Fallback to first icon if no match found
    };
  });
}

const detailedServices = [
  {
    icon: Ship,
    title: "Oversized Cargo",
    description: "The bigger, the better. Our freight forwarding team, specialised in oversized cargo, likes challenges. They will never complain about your cargo being out-of-gauge. They are experienced and qualified to find a solution.",
    size: "large"
  },
  {
    icon: Container,
    title: "Bulk Cargo", 
    description: "Our experienced stevedores make sure that all bulk cargo loading and unloading operations are carried out in a manner that protects both the cargo and the hull structure of the bulk carrier and themselves of course.",
    size: "large"
  },
  {
    icon: Truck,
    title: "Ro/Ro Shipments",
    description: "Rolling the cargo on and off the vessel must be carried out with attention to detail. We know that the slightest wrong turn or inattention may prove costly. We always keep an eye on the cargo and vessel.",
    size: "small"
  },
  {
    icon: Container,
    title: "Container Handling",
    description: "Professional container operations with modern equipment and experienced teams for all container types and sizes.",
    size: "small"
  },
  {
    icon: Ship,
    title: "Heavy Lift",
    description: "Expert handling of heavy and oversized cargo with specialized lifting equipment and experienced personnel.",
    size: "small"
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Storage of any kind of commodities, storage hotel and bonded warehouse facilities to meet all your cargo storage and handling requirements.",
    size: "small"
  }
];

const operationalDetails: DetailWithIcon[] = [
  {
    icon: Clock,
    title: "Operating Hours",
    details: ["24/7 operations", "Closed: Good Friday and Christmas Day only", "Shift patterns: 3 x 8-hour shifts"]
  },
  {
    icon: Ship,
    title: "Pilotage Services",
    details: ["Compulsory for all vessels over 500 GT", "Pilot boarding 2 nautical miles from entrance", "24-hour service availability"]
  },
  {
    icon: Clock,
    title: "Time Zone",
    details: ["GMT+0 (Greenwich Mean Time)", "No daylight saving time adjustments", "Emergency response <30 min"]
  },
  {
    icon: Radio,
    title: "GMDSS Coordination",
    details: ["Tema Radio: Channel 16", "Rescue Coordination: Accra RCC", "SAR: Ghana Navy + Coast Guard"]
  }
];

const contactDetails: DetailWithIcon[] = [
  {
    icon: Phone,
    title: "Primary Port Contacts",
    details: ["Ghana Ports & Harbours Authority", "Tema Port Control: VHF Channel 16/12", "+233 303 202 631 | info@ghaports.gov.gh"]
  },
  {
    icon: Users,
    title: "Terminal Operators",
    details: ["Meridian Port Services (MPS) - Terminal 3", "GPHA Direct Operations - Terminals 1 & 2", "Berths: 1-14 | Draft: 8.2-12m"]
  },
  {
    icon: Shield,
    title: "Emergency Services",
    details: ["Emergency Pilotage: 24/7 | VHF Channel 16", "Tug Services: 2 harbor tugs | 32-42 ton pull", "Emergency response <30 min"]
  }
];

const customsDetails: DetailWithIcon[] = [
  {
    icon: MapPin,
    title: "Import Procedures",
    details: ["Risk Period: After timeline expires", "Goods may be subject to sale or forfeiture", "ICUMS System: Digital Platform"]
  },
  {
    icon: Clock,
    title: "Processing Fees",
    details: ["CIF Value: 1%", "Minimum: GHS 30", "Examination, overtime, storage fees may apply"]
  },
  {
    icon: Shield,
    title: "Special Permits Required",
    details: ["Food and Drugs Authority (FDA)", "Plant Protection & Regulatory Services", "Bank of Ghana | Controlled Substances"]
  }
];

const weatherDetails: DetailWithIcon[] = [
  {
    icon: Ship,
    title: "Seasonal Weather Patterns",
    details: ["Harmattan Season (Dec-Feb): Ideal conditions", "Rainy Season (Apr-Oct): Enhanced protection needed", "Humidity: 15-25% | Temperature: 22-35°C"]
  },
  {
    icon: Radio,
    title: "Tidal Information",
    details: ["Tidal Range: 1.2-1.8m", "Entrance Depth: 16-19m (MLW)", "Main Channel: 14-16m"]
  }
];

export default function Services() {
  const { content } = useLanguage();
  const [servicesHeaderRef, isServicesHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [servicesCardsRef, isServicesCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [operationsHeaderRef, isOperationsHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [operationsCardsRef, isOperationsCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [contactsHeaderRef, isContactsHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [contactsCardsRef, isContactsCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [customsHeaderRef, isCustomsHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [customsCardsRef, isCustomsCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [weatherHeaderRef, isWeatherHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [weatherCardsRef, isWeatherCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });

  const handleGetQuote = () => {
    console.log('Get Quote clicked');
    // TODO: Navigate to contact form or quote request
  };

  const handleContactSales = () => {
    console.log('Contact Sales clicked');
    // TODO: Navigate to contact form
  };

  const handleLearnMore = (service: string) => {
    console.log(`Learn more about ${service}`);
    // TODO: Navigate to detailed service page
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-services">
      <Navigation />
      
      <PageHero
        videoUrl={getAssetUrl(ASSET_PATHS.HERO.VIDEO_CARGO)}
        imageUrl={getAssetUrl(ASSET_PATHS.STOCK.SHIPPING_CONTAINERS)}
        badge={content.servicesPage?.hero?.badge || "Maritime Excellence"}
        title={content.servicesPage?.hero?.title || "Our Services"}
        subtitle={content.servicesPage?.hero?.subtitle || "From the first point in the ship's or ship's hold to the first point on the quay or vice versa - comprehensive stevedoring and terminal services."}
        primaryCta={{
          text: content.servicesPage?.hero?.primaryCta || "View Portfolio",
          onClick: handleGetQuote
        }}
        secondaryCta={{
          text: content.servicesPage?.hero?.secondaryCta || "Contact Us",
          onClick: handleContactSales,
          icon: <Phone className="h-5 w-5" />
        }}
        stats={content.servicesPage?.hero?.stats || [
          { value: "24/7", label: "Operations" },
          { value: "144T", label: "Crane Capacity" },
          { value: "21", label: "Berths" },
          { value: "6", label: "Service Types" }
        ]}
        scrollTarget="services-content"
        showAnimations={false}
      />


          <main id="services-content" className="pb-8">
            {/* Detailed Services */}
            <section className="py-16 relative overflow-hidden">
              {/* Video Background */}
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src={getAssetUrl(ASSET_PATHS.BACKGROUNDS.CARGO_SHIP)} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20" />
              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div 
                  ref={servicesHeaderRef}
                  className={`text-center mb-12 animate-fade-in-up ${isServicesHeaderVisible ? 'animate-visible' : ''}`}
                >
                  <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl mb-4">
                    {content.servicesPage?.detailedServices?.title || "Our Services"}
                  </h2>
                  <p className="sm:text-xl text-lg/8 text-white/90 max-w-3xl">
                    {content.servicesPage?.detailedServices?.subtitle || "From the first point in the ship's or ship's hold to the first point on the quay or vice versa - comprehensive stevedoring and terminal services."}
                  </p>
                </div>
            <div 
              ref={servicesCardsRef}
              className="grid grid-cols-12 gap-4 auto-rows-[20rem]"
            >
              {detailedServices.map((service, index) => (
                <div 
                  key={index}
                  className={`col-span-12 ${service.size === 'large' ? 'md:col-span-6' : 'md:col-span-3'} relative group`}
                >
                  <Card 
                    className={`hover-elevate backdrop-blur-sm bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground transition-all duration-300 animate-pop-up h-full ${isServicesCardsVisible ? 'animate-visible' : ''}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                    data-testid={`card-detailed-service-${index}`}
                  >
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-start mb-auto">
                        <div className="p-3 rounded-lg bg-primary-foreground/20 group-hover:bg-primary-foreground/30 transition-colors duration-300">
                          {service.icon ? React.createElement(service.icon, { className: "h-8 w-8 text-primary-foreground" }) : <div className="h-8 w-8" />}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <h3 className={`font-semibold text-primary-foreground mb-4 ${service.size === 'large' ? 'text-xl' : 'text-lg'}`}>
                          {(content.servicesPage?.detailedServices?.services?.[index]?.title || service.title)}
                        </h3>
                        <p className={`text-primary-foreground/80 leading-relaxed ${service.size === 'small' ? 'text-sm' : ''}`}>
                          {(content.servicesPage?.detailedServices?.services?.[index]?.description || service.description)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

            {/* Port Operations & Contacts */}
            <section 
              className="py-16 relative overflow-hidden"
              style={{
                backgroundImage: `url(${getAssetUrl(ASSET_PATHS.GENERATED.CONTAINER_HANDLING)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
              }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* Port Operations Subsection */}
                <div 
                  ref={operationsHeaderRef}
                  className={`text-center mb-12 animate-fade-in-up ${isOperationsHeaderVisible ? 'animate-visible' : ''}`}
                >
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {content.servicesPage?.portOperations?.title || "Port Operations"}
                  </h2>
                  <p className="text-xl text-white/90">
                    {content.servicesPage?.portOperations?.subtitle || "Professional maritime operations with modern equipment and experienced workforce."}
                  </p>
                </div>

                <div 
                  ref={operationsCardsRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                  {mergeContentWithIcons(content.servicesPage?.portOperations?.sections, operationalDetails).map((detail, index) => {
                    const detailItem = detail as DetailWithIcon;
                    return (
                    <Card 
                      key={index}
                      className={`text-center backdrop-blur-sm bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground transition-all duration-300 animate-pop-up ${isOperationsCardsVisible ? 'animate-visible' : ''}`}
                      style={{ transitionDelay: `${index * 0.1}s` }}
                      data-testid={`card-operational-detail-${index}`}
                    >
                      <CardContent className="p-6">
                        <div className="mx-auto mb-4 p-3 rounded-full bg-primary-foreground/20 w-fit">
                          {React.createElement(detailItem.icon, { className: "h-6 w-6 text-primary-foreground" })}
                        </div>
                        <h3 className="font-semibold text-primary-foreground mb-3">{detailItem.title}</h3>
                        <div className="space-y-1">
                          {detailItem.details.map((item, i) => (
                            <p key={i} className="text-sm text-primary-foreground/80">{item}</p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </div>

                {/* Port Contacts Subsection */}
                <div 
                  ref={contactsHeaderRef}
                  className={`text-center mb-12 animate-fade-in-up ${isContactsHeaderVisible ? 'animate-visible' : ''}`}
                >
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {content.servicesPage?.portContacts?.title || "Port Contacts"}
                  </h2>
                  <p className="text-xl text-white/90">
                    {content.servicesPage?.portContacts?.subtitle || "Essential contact information for port operations, emergency services, and terminal operators."}
                  </p>
                </div>

                <div 
                  ref={contactsCardsRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {mergeContentWithIcons(content.servicesPage?.portContacts?.sections, contactDetails).map((detail, index) => {
                    const detailItem = detail as DetailWithIcon;
                    return (
                    <Card 
                      key={index}
                      className={`text-center backdrop-blur-sm bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground transition-all duration-300 animate-pop-up ${isContactsCardsVisible ? 'animate-visible' : ''}`}
                      style={{ transitionDelay: `${index * 0.1}s` }}
                      data-testid={`card-contact-detail-${index}`}
                    >
                      <CardContent className="p-6">
                        <div className="mx-auto mb-4 p-3 rounded-full bg-primary-foreground/20 w-fit">
                          {'icon' in detailItem ? React.createElement((detailItem as DetailWithIcon).icon, { className: "h-6 w-6 text-primary-foreground" }) : <div className="h-6 w-6" />}
                        </div>
                        <h3 className="font-semibold text-primary-foreground mb-3">{detailItem.title}</h3>
                        <div className="space-y-1">
                          {detailItem.details.map((item, i) => (
                            <p key={i} className="text-sm text-primary-foreground/80">{item}</p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </div>
              </div>
            </section>

        {/* Customs & Documentation & Weather & Tides */}
        <section 
          className="py-16 relative overflow-hidden"
          style={{
            backgroundImage: `url(${getAssetUrl(ASSET_PATHS.STOCK.SHIPPING_PORT)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            
            {/* Customs & Documentation Subsection */}
            <div 
              ref={customsHeaderRef}
              className={`text-center mb-12 animate-fade-in-up ${isCustomsHeaderVisible ? 'animate-visible' : ''}`}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.servicesPage?.customsDocumentation?.title || "Customs & Documentation"}
              </h2>
              <p className="text-xl text-white/90">
                {content.servicesPage?.customsDocumentation?.subtitle || "Comprehensive customs clearance and documentation services for seamless cargo processing."}
              </p>
            </div>

            <div 
              ref={customsCardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              {mergeContentWithIcons(content.servicesPage?.customsDocumentation?.sections, customsDetails).map((detail, index) => {
                const detailItem = detail as DetailWithIcon;
                return (
                <Card 
                  key={index}
                  className={`text-center backdrop-blur-sm bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground transition-all duration-300 animate-pop-up ${isCustomsCardsVisible ? 'animate-visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  data-testid={`card-customs-detail-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary-foreground/20 w-fit">
                      {'icon' in detailItem ? React.createElement((detailItem as DetailWithIcon).icon, { className: "h-6 w-6 text-primary-foreground" }) : <div className="h-6 w-6" />}
                    </div>
                    <h3 className="font-semibold text-primary-foreground mb-3">{detailItem.title}</h3>
                    <div className="space-y-1">
                      {detailItem.details.map((item, i) => (
                        <p key={i} className="text-sm text-primary-foreground/80">{item}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>

            {/* Weather & Tides Subsection */}
            <div 
              ref={weatherHeaderRef}
              className={`text-center mb-12 animate-fade-in-up ${isWeatherHeaderVisible ? 'animate-visible' : ''}`}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.servicesPage?.weatherTides?.title || "Weather & Tides"}
              </h2>
              <p className="text-xl text-white/90">
                {content.servicesPage?.weatherTides?.subtitle || "Essential weather and tidal information for optimal port operations and vessel planning."}
              </p>
            </div>

            <div 
              ref={weatherCardsRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {mergeContentWithIcons(content.servicesPage?.weatherTides?.sections, weatherDetails).map((detail, index) => {
                const detailItem = detail as DetailWithIcon;
                return (
                <Card 
                  key={index}
                  className={`text-center backdrop-blur-sm bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground transition-all duration-300 animate-pop-up ${isWeatherCardsVisible ? 'animate-visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  data-testid={`card-weather-detail-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary-foreground/20 w-fit">
                      {'icon' in detailItem ? React.createElement((detailItem as DetailWithIcon).icon, { className: "h-6 w-6 text-primary-foreground" }) : <div className="h-6 w-6" />}
                    </div>
                    <h3 className="font-semibold text-primary-foreground mb-3">{detailItem.title}</h3>
                    <div className="space-y-1">
                      {detailItem.details.map((item, i) => (
                        <p key={i} className="text-sm text-primary-foreground/80">{item}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ship Operator FAQs Section */}
        <section className="py-16 relative overflow-hidden bg-gradient-to-br from-slate-600 to-slate-800">
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={getAssetUrl(ASSET_PATHS.BACKGROUNDS.SHIPPING_PORT)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-700/70 z-[1]" />
          
          <div className="container mx-auto px-4 relative z-[2]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ship Operator FAQs
              </h2>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                Common questions from ship operators about our services, rates, and operations at Tema Port.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 text-center hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/10 border-white/20">
                <CardContent className="p-0">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Ship className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-1 text-white">Rates & Pricing</h3>
                  <p className="text-xs text-gray-200">Transparent pricing for all services</p>
                </CardContent>
              </Card>

              <Card className="p-4 text-center hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/10 border-white/20">
                <CardContent className="p-0">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-1 text-white">Operations & Equipment</h3>
                  <p className="text-xs text-gray-200">Modern equipment and procedures</p>
                </CardContent>
              </Card>

              <Card className="p-4 text-center hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/10 border-white/20">
                <CardContent className="p-0">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-1 text-white">Safety & Compliance</h3>
                  <p className="text-xs text-gray-200">Highest safety standards</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <Card className="p-4 backdrop-blur-sm bg-white/10 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <Clock className="h-4 w-4 text-primary" />
                    Do you offer 24/7 operations and what are overtime charges?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-200">
                    Yes, we operate 24/7 year-round with only two exceptions: Good Friday and Christmas Day. 
                    Overtime charges apply for work outside standard hours and are calculated based on the 
                    specific service requirements and time of day.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-4 backdrop-blur-sm bg-white/10 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <Ship className="h-4 w-4 text-primary" />
                    What additional fees should we expect?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-200">
                    Additional fees may include examination fees, overtime charges, storage fees for extended 
                    dwell times, and special handling fees for oversized or hazardous cargo. All fees are 
                    transparent and communicated upfront.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-4 backdrop-blur-sm bg-white/10 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <Users className="h-4 w-4 text-primary" />
                    Do you offer payment terms and what are your banking details?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-200">
                    We offer flexible payment terms including credit facilities for established customers. 
                    Banking details and payment methods are provided upon service agreement. We accept 
                    various payment methods including bank transfers and letters of credit.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 p-4 backdrop-blur-sm bg-white/10 border-white/20">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-3 text-white">Have Additional Questions?</h3>
                <p className="text-sm text-gray-200 mb-3">
                  Our experienced operations team is available 24/7 to answer your specific questions 
                  and provide customized solutions for your vessel operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm text-white">+233 (0) 303 219120</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📧</span>
                    <span className="text-sm text-white">operations@agilentmaritime.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚨</span>
                    <span className="text-sm text-white">24/7 Emergency Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}