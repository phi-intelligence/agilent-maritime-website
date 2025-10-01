import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { MissionSection } from "@/components/MissionSection";
import { PartnersAndTestimonialsSection } from "@/components/PartnersAndTestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/components/LanguageProvider";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { content } = useLanguage();

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <SEOHead 
        title={content.hero.title}
        description={content.hero.subtitle}
        keywords="RoRo services, maritime logistics, vehicle shipping, port operations, West Africa, Ghana, Tema Port"
      />
      <Navigation />
          <main>
            <Hero />
            <ServicesSection />
            <MissionSection />
            <PartnersAndTestimonialsSection />
            <ContactSection />
          </main>
      <Footer />
    </div>
  );
}