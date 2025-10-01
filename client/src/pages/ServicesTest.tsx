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

export default function ServicesTest() {
  const { content } = useLanguage();
  
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
          onClick: () => console.log('Get Quote clicked')
        }}
        secondaryCta={{
          text: content.servicesPage?.hero?.secondaryCta || "Contact Us",
          onClick: () => console.log('Contact Sales clicked'),
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl mb-4">
            {content.servicesPage?.detailedServices?.title || "Our Services"}
          </h2>
          <p className="sm:text-xl text-lg/8 text-white/90 max-w-3xl">
            {content.servicesPage?.detailedServices?.subtitle || "From the first point in the ship's or ship's hold to the first point on the quay or vice versa - comprehensive stevedoring and terminal services."}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
