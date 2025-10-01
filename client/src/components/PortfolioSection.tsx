import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { StatisticsCard, FeaturedCard } from "@/components/PortfolioCards";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";
import { ArrowRight, Users, Award, TrendingUp, Briefcase, Clock, MapPin, CheckCircle } from "lucide-react";

// Enhanced project data structure with comprehensive specifications
interface ProjectDetails {
  // Basic Info
  title: string;
  category: string;
  description: string;
  image: string;
  timeline: string;
  location: string;
  
  // Technical Specs
  maxWeight?: number;
  maxCapacity?: number;
  successRate: number;
  projectCount: number;
  
  // Client Info
  client: string;
  clientRole: string;
  clientCompany: string;
  
  // Technologies
  technologies: string[];
  
  // Additional Details
  status: 'completed' | 'ongoing' | 'planned';
  budget?: string;
  teamSize?: number;
}

const portfolioProjects: ProjectDetails[] = [
  {
    title: "West Africa Vehicle Import Terminal",
    category: "RoRo Operations",
    description: "Complete terminal management for 400,000+ vehicles annually with state-of-the-art facilities at Tema Port.",
    image: getAssetUrl(ASSET_PATHS.STOCK.SHIPPING_CONTAINERS),
    timeline: "2010-2024",
    location: "Tema Port, Ghana",
    maxCapacity: 400000,
    successRate: 98,
    projectCount: 1,
    client: "Kofi Webb",
    clientRole: "Ghana Operations Director",
    clientCompany: "Agilent Maritime Services Limited",
    technologies: ["Terminal Management", "Vehicle Tracking", "Customs Integration"],
    status: "completed",
    budget: "$50M+",
    teamSize: 45
  },
  {
    title: "Mining Equipment Heavy Lift Project",
    category: "Heavy Lift",
    description: "Specialized handling of oversized mining equipment weighing up to 450 tons with precision and safety.",
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_CRANE),
    timeline: "2018-2024",
    location: "Tema Port, Ghana",
    maxWeight: 450,
    successRate: 100,
    projectCount: 50,
    client: "So Frimpong",
    clientRole: "Senior Operations Manager",
    clientCompany: "Agilent Maritime Services Limited",
    technologies: ["Heavy Lift Cranes", "Project Planning", "Safety Protocols"],
    status: "completed",
    budget: "$25M+",
    teamSize: 25
  },
  {
    title: "Container Terminal Operations",
    category: "Container Handling",
    description: "Advanced container terminal operations with automated systems and real-time tracking capabilities.",
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_CRANE),
    timeline: "2015-2024",
    location: "Tema Port, Ghana",
    maxCapacity: 1000000,
    successRate: 99,
    projectCount: 1,
    client: "GPHA Operations Team",
    clientRole: "Port Operations",
    clientCompany: "Ghana Ports and Harbours Authority",
    technologies: ["Automated Systems", "Real-time Tracking", "Crane Operations"],
    status: "ongoing",
    budget: "$75M+",
    teamSize: 60
  },
  {
    title: "Bulk Cargo Handling System",
    category: "Bulk Operations",
    description: "Efficient bulk cargo handling system for grains, minerals, and raw materials with specialized equipment.",
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_OPERATIONS),
    timeline: "2012-2024",
    location: "Tema Port, Ghana",
    maxCapacity: 500000,
    successRate: 97,
    projectCount: 1,
    client: "Meridian Port Services Team",
    clientRole: "Terminal Operations",
    clientCompany: "Meridian Port Services",
    technologies: ["Bulk Handling", "Conveyor Systems", "Storage Management"],
    status: "completed",
    budget: "$30M+",
    teamSize: 35
  },
  {
    title: "Ship Agency Services",
    category: "Marine Services",
    description: "Comprehensive ship agency services including port clearance, crew management, and logistics coordination.",
    image: getAssetUrl(ASSET_PATHS.STOCK.SHIPPING_PORT),
    timeline: "2010-2024",
    location: "Tema Port, Ghana",
    maxCapacity: 2000,
    successRate: 99,
    projectCount: 500,
    client: "Grimaldi Lines Team",
    clientRole: "Fleet Operations",
    clientCompany: "Grimaldi Lines",
    technologies: ["Port Clearance", "Crew Management", "Logistics Coordination"],
    status: "ongoing",
    budget: "$15M+",
    teamSize: 20
  },
  {
    title: "Customs Clearance Operations",
    category: "Documentation",
    description: "Streamlined customs clearance operations with digital documentation and automated processing systems.",
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_OPERATIONS),
    timeline: "2018-2024",
    location: "Tema Port, Ghana",
    maxCapacity: 10000,
    successRate: 96,
    projectCount: 1,
    client: "Customs Authority Team",
    clientRole: "Customs Manager",
    clientCompany: "Ghana Customs Authority",
    technologies: ["Digital Documentation", "Automated Processing", "Compliance Systems"],
    status: "ongoing",
    budget: "$20M+",
    teamSize: 30
  },
  {
    title: "Port Infrastructure Development",
    category: "Infrastructure",
    description: "Comprehensive port infrastructure development including berth extensions, crane installations, and terminal upgrades.",
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_CRANE),
    timeline: "2016-2023",
    location: "Tema Port, Ghana",
    maxCapacity: 500000,
    successRate: 99,
    projectCount: 1,
    client: "Robert Mensah",
    clientRole: "Infrastructure Director",
    clientCompany: "Ghana Ports Authority",
    technologies: ["Civil Engineering", "Crane Systems", "Terminal Design"],
    status: "completed",
    budget: "$100M+",
    teamSize: 80
  },
  {
    title: "Emergency Response Services",
    category: "Marine Services",
    description: "24/7 emergency response services for maritime incidents, including salvage operations and environmental protection.",
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_OPERATIONS),
    timeline: "2014-2024",
    location: "Tema Port, Ghana",
    maxCapacity: 50,
    successRate: 100,
    projectCount: 200,
    client: "Captain John Asante",
    clientRole: "Harbor Master",
    clientCompany: "Tema Port Authority",
    technologies: ["Emergency Response", "Salvage Operations", "Environmental Protection"],
    status: "ongoing",
    budget: "$30M+",
    teamSize: 40
  },
  {
    title: "Maritime Training Programs",
    category: "Education",
    description: "Comprehensive maritime training programs for port workers, ship crews, and logistics professionals.",
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_OPERATIONS),
    timeline: "2012-2024",
    location: "Tema Port, Ghana",
    maxCapacity: 500,
    successRate: 98,
    projectCount: 1,
    client: "Dr. Grace Ofori",
    clientRole: "Training Director",
    clientCompany: "Maritime Training Institute",
    technologies: ["Training Systems", "Certification Programs", "Safety Protocols"],
    status: "ongoing",
    budget: "$15M+",
    teamSize: 25
  },
  {
    title: "Environmental Compliance Projects",
    category: "Environmental",
    description: "Environmental compliance and sustainability projects including waste management and pollution control systems.",
    image: getAssetUrl(ASSET_PATHS.STOCK.GHANA_PORT),
    timeline: "2019-2024",
    location: "Tema Port, Ghana",
    maxCapacity: 1000,
    successRate: 97,
    projectCount: 1,
    client: "Dr. Akosua Boateng",
    clientRole: "Environmental Manager",
    clientCompany: "Environmental Protection Agency",
    technologies: ["Waste Management", "Pollution Control", "Sustainability Systems"],
    status: "ongoing",
    budget: "$25M+",
    teamSize: 35
  },
  {
    title: "Digital Port Management System",
    category: "Technology",
    description: "Advanced digital port management system with real-time tracking, automated scheduling, and data analytics.",
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_OPERATIONS),
    timeline: "2020-2024",
    location: "Tema Port, Ghana",
    maxCapacity: 2000,
    successRate: 99,
    projectCount: 1,
    client: "Kwame Nkrumah",
    clientRole: "IT Director",
    clientCompany: "Port Technology Solutions",
    technologies: ["Digital Systems", "Real-time Tracking", "Data Analytics"],
    status: "ongoing",
    budget: "$40M+",
    teamSize: 50
  }
];

// Project statistics data
const projectStats = [
  {
    icon: Briefcase,
    value: "12+",
    label: "Major Projects",
    description: "Comprehensive project portfolio"
  },
  {
    icon: CheckCircle,
    value: "98%",
    label: "Success Rate",
    description: "Client satisfaction rate"
  },
  {
    icon: Clock,
    value: "15+",
    label: "Years Experience",
    description: "In maritime operations"
  },
  {
    icon: TrendingUp,
    value: "$400M+",
    label: "Total Value",
    description: "Project portfolio value"
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
  const [headerRef, isHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [statsRef, isStatsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [projectsRef, isProjectsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [testimonialsRef, isTestimonialsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing our successful maritime projects and operational excellence across West Africa
          </p>
        </div>

        {/* Project Statistics */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-200 ${
            isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {projectStats.map((stat, index) => (
            <StatisticsCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>

        {/* Featured Projects */}
        <div 
          ref={projectsRef}
          className={`mb-16 transition-all duration-700 delay-400 ${
            isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.slice(0, 6).map((project, index) => (
              <FeaturedCard
                key={index}
                title={project.title}
                subtitle={`${project.category} • ${project.timeline}`}
                description={project.description}
                image={project.image}
                badge={project.category}
                status={project.status}
                specifications={[
                  { label: "Capacity", value: project.maxCapacity ? `${(project.maxCapacity / 1000).toFixed(0)}K+` : project.maxWeight ? `${project.maxWeight}T` : 'N/A' },
                  { label: "Success", value: `${project.successRate}%` },
                  { label: "Projects", value: `${project.projectCount}+` },
                  { label: "Budget", value: project.budget || 'N/A' }
                ]}
                hoverDetails={[
                  { label: "Location", value: project.location },
                  { label: "Client", value: project.clientCompany },
                  { label: "Team", value: `${project.teamSize}+ members` }
                ]}
                technologies={project.technologies}
              />
            ))}
          </div>
        </div>

        {/* Client Testimonials */}
        <div 
          ref={testimonialsRef}
          className={`bg-muted/50 rounded-lg p-8 transition-all duration-700 delay-600 ${
            isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clientTestimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl text-primary mb-4">"</div>
                <p className="text-muted-foreground italic mb-4">
                  {testimonial.quote}
                </p>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}