import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    value: "15+",
    label: "Years of Experience",
    description: "Serving the maritime industry"
  },
  {
    value: "400K+",
    label: "Vehicles Handled",
    description: "Annually at Tema Port"
  },
  {
    value: "24/7",
    label: "Port Operations",
    description: "Round-the-clock service"
  },
  {
    value: "500+",
    label: "Expert Staff",
    description: "Experienced professionals"
  },
  {
    value: "100%",
    label: "Safety Record",
    description: "Committed to excellence"
  },
  {
    value: "50+",
    label: "Global Partners",
    description: "Worldwide network"
  }
];

export function StatsSection() {
  return (
    <section className="py-24 bg-background" data-testid="section-stats">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Delivering measurable results through professional maritime services and logistics excellence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="text-center hover-elevate backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/30 transition-all duration-300"
              data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-8">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-muted-foreground">
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