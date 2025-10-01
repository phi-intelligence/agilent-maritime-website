import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useLanguage } from "@/components/LanguageProvider";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";
import React from "react";
import { 
  Phone, Mail, MapPin, Clock, Users, Ship, 
  ArrowRight, CheckCircle, Globe, MessageSquare, Quote
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone & VHF",
    details: [
      { label: "Main Office", value: "+233-30-202-1234" },
      { label: "VHF Channel", value: "16 (Calling) / 12 (Working)" },
      { label: "Emergency", value: "24/7 Available" }
    ],
    description: "Direct communication for all maritime operations"
  },
  {
    icon: Mail,
    title: "Email Contacts",
    details: [
      { label: "General Inquiries", value: "info@agilentmaritime.com" },
      { label: "Operations", value: "operations@agilentmaritime.com" },
      { label: "Management", value: "kofi.webb@agilentmaritime.com" }
    ],
    description: "Professional email support for all services"
  },
  {
    icon: MapPin,
    title: "Location & Address",
    details: [
      { label: "Port Location", value: "Tema Port, Ghana" },
      { label: "Region", value: "Greater Accra" },
      { label: "Coordinates", value: "5.6667°N, 0.0167°E" }
    ],
    description: "Strategic location at Ghana's premier port"
  },
  {
    icon: Clock,
    title: "Operating Hours",
    details: [
      { label: "Port Operations", value: "24/7 Year-Round" },
      { label: "Office Hours", value: "Mon-Fri: 8:00-17:00" },
      { label: "Emergency", value: "Always Available" }
    ],
    description: "Round-the-clock maritime services"
  }
];

const teamMembers = [
  {
    name: "Kofi Mitchell Webb",
    position: "Managing Director",
    email: "kofi.webb@agilentmaritime.com",
    phone: "+233 24 123 4567",
    image: getAssetUrl(ASSET_PATHS.TEAM.KOFI_WEBB),
    description: "15+ years maritime experience, leading Agilent Maritime's strategic operations"
  },
  {
    name: "S.O. Frimpong",
    position: "Operations Manager", 
    email: "so.frimpong@agilentmaritime.com",
    phone: "+233 24 234 5678",
    image: getAssetUrl(ASSET_PATHS.TEAM.SO_FRIMPONG),
    description: "Expert in port operations and vessel coordination"
  }
];

export default function Contact() {
  const { content } = useLanguage();
  const [contactHeaderRef, isContactHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [contactCardsRef, isContactCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [teamHeaderRef, isTeamHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [teamCardsRef, isTeamCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [formRef, isFormVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });

  const { scrollToSection } = useScrollTo();

  const handleContactClick = (type: string, value: string) => {
    if (type === 'phone') {
      window.open(`tel:${value}`);
    } else if (type === 'email') {
      window.open(`mailto:${value}`);
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Navigation />
      
      <PageHero
        videoUrl={getAssetUrl(ASSET_PATHS.HERO.VIDEO_PORT)}
        imageUrl={getAssetUrl(ASSET_PATHS.STOCK.PORT_CRANE)}
        badge={content.contactPage?.hero?.badge || "Get in Touch"}
        title={content.contactPage?.hero?.title || "Contact Us"}
        subtitle={content.contactPage?.hero?.subtitle || "Connect with our maritime experts for professional RoRo services, port operations, and logistics solutions in West Africa."}
        stats={content.contactPage?.hero?.stats || [
          { value: "24/7", label: "Support" },
          { value: "15+", label: "Years Experience" },
          { value: "100%", label: "Client Focus" }
        ]}
        scrollTarget="contact-content"
        showAnimations={false}
      />

      <main id="contact-content" className="pb-8">
        {/* Contact Information */}
        <section 
          className="py-16 relative overflow-hidden"
          style={{
            backgroundImage: `url(${getAssetUrl(ASSET_PATHS.STOCK.PORT_CRANE)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div 
              ref={contactHeaderRef}
              className={`text-center mb-12 animate-fade-in-up ${isContactHeaderVisible ? 'animate-visible' : ''}`}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Contact Information
              </h2>
              <p className="text-xl text-white/90">
                Get in touch with our maritime experts for professional services.
              </p>
            </div>

            <div 
              ref={contactCardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {contactInfo.map((info, index) => (
                <Card 
                  key={index}
                  className={`text-center backdrop-blur-sm bg-white/95 border-gray-200 hover:border-primary hover:bg-white text-gray-900 transition-all duration-300 animate-pop-up ${isContactCardsVisible ? 'animate-visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  data-testid={`card-contact-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
                      {React.createElement(info.icon, { className: "h-8 w-8 text-primary" })}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                    <div className="space-y-2 text-sm">
                      {info.details.map((detail, i) => (
                        <div key={i} className="text-gray-700">
                          <span className="font-medium">{detail.label}:</span>
                          <br />
                          <span 
                            className={`${detail.label === 'General Inquiries' || detail.label === 'Operations' || detail.label === 'Management' ? 'cursor-pointer hover:text-primary' : ''}`}
                            onClick={() => {
                              if (detail.label === 'General Inquiries' || detail.label === 'Operations' || detail.label === 'Management') {
                                handleContactClick('email', detail.value);
                              } else if (detail.label === 'Main Office') {
                                handleContactClick('phone', detail.value);
                              }
                            }}
                          >
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-3">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section 
          className="py-16 relative overflow-hidden"
          style={{
            backgroundImage: `url(${getAssetUrl(ASSET_PATHS.STOCK.PORT_OPERATIONS)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div 
              ref={teamHeaderRef}
              className={`text-center mb-12 animate-fade-in-up ${isTeamHeaderVisible ? 'animate-visible' : ''}`}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Team
              </h2>
              <p className="text-xl text-white/90">
                Meet our maritime professionals ready to assist you.
              </p>
            </div>

            <div 
              ref={teamCardsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {teamMembers.map((member, index) => (
                <Card 
                  key={index}
                  className={`backdrop-blur-sm bg-white/95 border-gray-200 hover:border-primary hover:bg-white text-gray-900 transition-all duration-300 animate-pop-up ${isTeamCardsVisible ? 'animate-visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                  data-testid={`card-team-${index}`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/assets/images/team/default-avatar.jpg";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-primary font-medium mb-3">{member.position}</p>
                        <p className="text-sm text-gray-600 mb-4">{member.description}</p>
                        <div className="space-y-2">
                          <div 
                            className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary"
                            onClick={() => handleContactClick('email', member.email)}
                          >
                            <Mail className="h-4 w-4" />
                            <span>{member.email}</span>
                          </div>
                          <div 
                            className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary"
                            onClick={() => handleContactClick('phone', member.phone)}
                          >
                            <Phone className="h-4 w-4" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Get in Touch Section - Same as Home Page */}
        <section className="py-24 relative overflow-hidden" data-testid="section-get-in-touch">
          {/* Video Background */}
          <video 
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={getAssetUrl(ASSET_PATHS.BACKGROUNDS.SHIP_MOVEMENT)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/40 z-[1]" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div 
              ref={formRef}
              className={`text-center mb-16 animate-fade-in-up ${isFormVisible ? 'animate-visible' : ''}`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {content.contact?.title || "Get in Touch"}
              </h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                {content.contact?.subtitle || "Ready to optimize your maritime operations? Contact us today to discuss your stevedoring and terminal service needs."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div 
                className={`animate-fade-in-up ${isFormVisible ? 'animate-visible' : ''}`}
              >
                <Card>
                  <CardContent className="p-8">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      // Handle form submission
                      console.log('Form submitted');
                    }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">{content.contact?.form?.firstName || "First name"}</Label>
                          <Input id="firstName" name="firstName" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">{content.contact?.form?.lastName || "Last name"}</Label>
                          <Input id="lastName" name="lastName" required />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="company">{content.contact?.form?.company || "Company"}</Label>
                        <Input id="company" name="company" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">{content.contact?.form?.email || "Email"}</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">{content.contact?.form?.message || "Message"}</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          rows={4} 
                          required 
                          placeholder={content.contact?.form?.messagePlaceholder || "Tell us about your maritime logistics needs..."}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        {content.contact?.form?.submit || "Send Message"}
                      </Button>
                      
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Testimonial */}
              <div 
                className={`animate-fade-in-up ${isFormVisible ? 'animate-visible' : ''}`}
                style={{ transitionDelay: '0.2s' }}
              >
                <Card className="h-full">
                  <CardContent className="p-8 h-full flex flex-col justify-center">
                    <Quote className="w-12 h-12 text-primary mb-6" />
                    <blockquote className="text-lg text-muted-foreground leading-relaxed mb-8">
                      "{content.contact?.testimonial?.quote || "At our core, we believe every cargo movement tells a story of trust. Our customers aren't just clients—they're partners whose success defines our purpose. In stevedoring, there's no room for compromise on safety or service. When we handle their vessels, we're handling their reputation, their commitments, and their future. Our customers trust us with their most valuable assets, and we honor that trust with precision, care, and an unwavering commitment to operational excellence in every port we serve."}"
                    </blockquote>
                    <div className="border-t pt-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={getAssetUrl(ASSET_PATHS.TEAM.KOFI_WEBB)} 
                          alt={`${content.contact?.testimonial?.name || "Kofi Mitchell Webb"} - ${content.contact?.testimonial?.title || "Managing Director"}`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                          <div className="font-semibold text-foreground text-lg">
                            {content.contact?.testimonial?.name || "Kofi Mitchell Webb"}
                          </div>
                          <div className="text-muted-foreground">
                            {content.contact?.testimonial?.title || "Managing Director"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}