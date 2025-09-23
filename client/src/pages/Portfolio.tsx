import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PortfolioSection } from "@/components/PortfolioSection";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-portfolio">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-chart-2/10 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 backdrop-blur-sm bg-background/80">
            Our Work
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing successful maritime projects, client partnerships, and operational excellence across West Africa.
          </p>
        </div>
      </section>

      <main>
        <PortfolioSection />
      </main>

      <Footer />
    </div>
  );
}