import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, TrendingUp } from "lucide-react";
import containerImage from "@assets/stock_images/shipping_containers__4ae963ed.jpg";
import heavyLiftImage from "@assets/stock_images/heavy_machinery_port_83342e21.jpg";

const portfolioProjects = [
  {
    title: "West Africa Vehicle Import Terminal",
    category: "RoRo Operations",
    description: "Complete terminal management for 150,000+ vehicles annually with state-of-the-art facilities.",
    image: containerImage,
    metrics: [
      { label: "Vehicles", value: "150K+" },
      { label: "Efficiency", value: "98%" },
      { label: "Timeline", value: "2022-2024" }
    ],
    technologies: ["Terminal Management", "Vehicle Tracking", "Customs Integration"]
  },
  {
    title: "Mining Equipment Heavy Lift Project",
    category: "Heavy Lift",
    description: "Specialized handling of oversized mining equipment weighing up to 450 tons.",
    image: heavyLiftImage,
    metrics: [
      { label: "Max Weight", value: "450T" },
      { label: "Projects", value: "25+" },
      { label: "Success Rate", value: "100%" }
    ],
    technologies: ["Heavy Lift Cranes", "Project Planning", "Safety Protocols"]
  }
];

const clientTestimonials = [
  {
    quote: "Agilent Maritime's professional handling of our vehicle imports has been exceptional. Their RoRo expertise is unmatched in West Africa.",
    author: "Sarah Johnson",
    company: "Global Auto Logistics",
    role: "Operations Director"
  },
  {
    quote: "The heavy lift capabilities and safety standards exceeded our expectations. Professional service delivery every time.",
    author: "Michael Chen",
    company: "Mining Corp International",
    role: "Project Manager"
  }
];

export function PortfolioSection() {
  const handleViewProject = (projectTitle: string) => {
    console.log(`View project clicked: ${projectTitle}`);
    // TODO: Navigate to detailed project page
  };

  const handleViewAllProjects = () => {
    console.log('View All Projects clicked');
    // TODO: Navigate to portfolio page
  };

  return (
    <section className="py-24 bg-background" data-testid="section-portfolio">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing successful maritime projects and client partnerships across West Africa.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {portfolioProjects.map((project, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover-elevate backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/30 transition-all duration-300"
              data-testid={`card-project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 left-4 backdrop-blur-sm bg-background/20"
                >
                  {project.category}
                </Badge>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                <p className="text-muted-foreground">{project.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Project Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold text-primary">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => handleViewProject(project.title)}
                  data-testid={`button-view-project-${index}`}
                >
                  View Project Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Client Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clientTestimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="backdrop-blur-sm bg-card/80 border-border/50"
                data-testid={`card-testimonial-${index}`}
              >
                <CardContent className="p-8">
                  <blockquote className="text-lg text-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-primary">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Award, label: "Projects Completed", value: "200+", description: "Successful maritime operations" },
            { icon: Users, label: "Happy Clients", value: "50+", description: "Global partnerships" },
            { icon: TrendingUp, label: "Growth Rate", value: "25%", description: "Year-over-year expansion" }
          ].map((stat, index) => (
            <Card 
              key={index}
              className="text-center backdrop-blur-sm bg-card/80 border-border/50"
              data-testid={`card-portfolio-stat-${index}`}
            >
              <CardContent className="p-8">
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-semibold text-foreground mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="gap-2"
            onClick={handleViewAllProjects}
            data-testid="button-view-all-projects"
          >
            View All Projects
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}