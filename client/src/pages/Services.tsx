import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Ship, Truck, Container, Warehouse, Users, Shield, 
  Clock, MapPin, Phone, Radio, ArrowRight 
} from "lucide-react";

const detailedServices = [
  {
    icon: Truck,
    title: "RoRo (Roll-on/Roll-off) Operations",
    description: "Leading RoRo specialist with dedicated terminals for vehicle import/export operations.",
    features: [
      "Specialized vehicle terminals",
      "Car carrier vessel handling",
      "Drive-on/drive-off services", 
      "Vehicle inspection and documentation",
      "Customs clearance support",
      "400,000+ vehicles handled annually"
    ]
  },
  {
    icon: Container,
    title: "Container Handling Services", 
    description: "Comprehensive container operations with modern equipment and experienced teams.",
    features: [
      "Container loading/unloading",
      "Container yard operations",
      "Reefer container management",
      "Container repair services",
      "Documentation and tracking"
    ]
  },
  {
    icon: Ship,
    title: "Heavy Lift & Project Cargo",
    description: "Expert handling of oversized cargo and complex project shipments.",
    features: [
      "Specialized lifting equipment",
      "Project cargo planning", 
      "Breakbulk operations",
      "Over-dimensional cargo handling",
      "Engineering support"
    ]
  },
  {
    icon: Warehouse,
    title: "Cargo Storage & Logistics",
    description: "Complete warehousing and logistics solutions for all cargo types.",
    features: [
      "Warehousing facilities",
      "Container stuffing/stripping",
      "Inventory management",
      "Distribution services", 
      "Supply chain solutions"
    ]
  },
  {
    icon: Users,
    title: "Ship Agency Services",
    description: "Full-service port agency for all vessel operations and crew needs.",
    features: [
      "Port entry/exit procedures",
      "Documentation handling",
      "Crew services",
      "Supplies and provisions",
      "Waste management"
    ]
  },
  {
    icon: Shield,
    title: "HSSEQ Services",
    description: "Health, Safety, Security, Environment, and Quality management systems.",
    features: [
      "Health and safety protocols",
      "Environmental compliance", 
      "Quality management systems",
      "Security services",
      "Training programs"
    ]
  }
];

const operationalDetails = [
  {
    icon: Clock,
    title: "24/7 Operations",
    details: ["Round-the-clock port operations", "Emergency response services", "GMT+0 timezone (no DST)"]
  },
  {
    icon: MapPin,
    title: "Strategic Location",
    details: ["Tema Port, Greater Accra", "Gateway to West Africa", "2 nautical miles pilot boarding"]
  },
  {
    icon: Phone,
    title: "Communication",
    details: ["VHF Channel 16", "+233-30-202-1234", "GMDSS coordination with Tema Radio"]
  },
  {
    icon: Radio,
    title: "Marine Services",
    details: ["Harbor tugs (32-42 ton bollard pull)", "Pilot services available", "SAR coordination"]
  }
];

export default function Services() {
  const handleGetQuote = () => {
    console.log('Get Quote clicked');
    // TODO: Navigate to contact form or quote request
  };

  const handleLearnMore = (service: string) => {
    console.log(`Learn more about ${service}`);
    // TODO: Navigate to detailed service page
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-services">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 backdrop-blur-sm bg-background/80">
            Maritime Excellence
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Maritime Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Professional stevedoring and port services tailored to meet the demands of modern maritime commerce.
          </p>
          <Button size="lg" className="gap-2" onClick={handleGetQuote} data-testid="button-get-quote">
            Get Quote
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      <main className="pb-8">
        {/* Detailed Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {detailedServices.map((service, index) => (
                <Card 
                  key={index}
                  className="hover-elevate backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/30 transition-all duration-300"
                  data-testid={`card-detailed-service-${index}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full gap-2"
                      onClick={() => handleLearnMore(service.title)}
                      data-testid={`button-learn-more-${index}`}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Operational Details */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Port Operations Details
              </h2>
              <p className="text-muted-foreground">
                Professional maritime operations with modern equipment and experienced workforce.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {operationalDetails.map((detail, index) => (
                <Card 
                  key={index}
                  className="text-center backdrop-blur-sm bg-card/80 border-border/50"
                  data-testid={`card-operational-detail-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <detail.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-3">{detail.title}</h3>
                    <div className="space-y-1">
                      {detail.details.map((item, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{item}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact our professional team to discuss your maritime logistics requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" data-testid="button-contact-sales">
                Contact Sales
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-download-brochure">
                Download Brochure
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}