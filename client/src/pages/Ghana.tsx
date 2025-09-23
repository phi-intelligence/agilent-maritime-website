import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, TrendingUp, Building, Award, Globe, ArrowRight } from "lucide-react";
import executiveImage from "@assets/stock_images/business_professiona_94362ace.jpg";

const ghanaHighlights = [
  {
    icon: MapPin,
    title: "Strategic Location",
    description: "Tema Port serves as the gateway to West Africa with excellent connectivity.",
    details: ["Primary port for Ghana", "Gateway to landlocked countries", "Modern infrastructure"]
  },
  {
    icon: Users,
    title: "Local Expertise",
    description: "500+ experienced local professionals with deep market knowledge.",
    details: ["Local recruitment programs", "Technical training initiatives", "Community partnerships"]
  },
  {
    icon: TrendingUp,
    title: "Economic Impact",
    description: "Contributing significantly to Ghana's maritime sector growth.",
    details: ["$50M+ annual economic impact", "1000+ direct and indirect jobs", "Local supplier network"]
  },
  {
    icon: Building,
    title: "Infrastructure",
    description: "State-of-the-art facilities and modern equipment at Tema Port.",
    details: ["Dedicated RoRo terminals", "Heavy lift capabilities", "Storage facilities"]
  }
];

const partnerships = [
  {
    name: "Ghana Ports and Harbours Authority",
    role: "Strategic Port Partnership",
    description: "Long-term collaboration for port development and operations"
  },
  {
    name: "Ghana Maritime Authority",
    role: "Regulatory Compliance",
    description: "Working together to maintain the highest safety standards"
  },
  {
    name: "Local Communities",
    role: "Community Development",
    description: "Supporting education and employment in coastal communities"
  }
];

export default function Ghana() {
  const handleViewOpportunities = () => {
    console.log('View Opportunities clicked');
    // TODO: Navigate to careers or opportunities page
  };

  const handleContactLocal = () => {
    console.log('Contact Local Team clicked');
    // TODO: Open contact form for Ghana office
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-ghana">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-chart-3/10 via-background to-chart-1/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 backdrop-blur-sm bg-background/80">
            🇬🇭 Ghana Operations
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Proudly Ghanaian
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading maritime operations at Tema Port with deep local expertise, 
            strong community partnerships, and commitment to Ghana's economic development.
          </p>
        </div>
      </section>

      <main className="pb-8">
        {/* Ghana Highlights */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Ghana Advantage
              </h2>
              <p className="text-muted-foreground">
                Deep local knowledge combined with international maritime expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ghanaHighlights.map((highlight, index) => (
                <Card 
                  key={index}
                  className="hover-elevate backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/30 transition-all duration-300"
                  data-testid={`card-ghana-highlight-${index}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <highlight.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{highlight.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {highlight.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Local Leadership */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Local Leadership, Global Standards
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our Ghana operations are led by experienced local professionals who understand 
                  both the regional market dynamics and international maritime standards.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "95% local workforce with specialized training",
                    "Cultural understanding of West African markets", 
                    "Strong relationships with local authorities",
                    "Commitment to sustainable local development"
                  ].map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="gap-2" 
                  onClick={handleViewOpportunities}
                  data-testid="button-view-opportunities"
                >
                  View Career Opportunities
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Leadership Image */}
              <div className="relative">
                <Card className="overflow-hidden backdrop-blur-sm bg-card/80 border-border/50">
                  <CardContent className="p-0">
                    <img 
                      src={executiveImage} 
                      alt="Ghana Operations Leadership"
                      className="w-full h-96 object-cover"
                      data-testid="img-ghana-leadership"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Partnerships */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Strategic Partnerships
              </h2>
              <p className="text-muted-foreground">
                Building strong relationships across Ghana's maritime ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnerships.map((partnership, index) => (
                <Card 
                  key={index}
                  className="text-center backdrop-blur-sm bg-card/80 border-border/50"
                  data-testid={`card-partnership-${index}`}
                >
                  <CardContent className="p-8">
                    <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{partnership.name}</h3>
                    <Badge variant="outline" className="mb-4">{partnership.role}</Badge>
                    <p className="text-sm text-muted-foreground">{partnership.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Connect with Our Ghana Team
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get in touch with our local experts for personalized maritime solutions in Ghana and West Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={handleContactLocal}
                data-testid="button-contact-ghana-team"
              >
                Contact Ghana Team
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-visit-facilities">
                Visit Our Facilities
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}