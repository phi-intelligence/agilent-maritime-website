import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, Truck, Ship, Eye, ExternalLink } from "lucide-react";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: 'roro' | 'container' | 'heavy-lift' | 'mining' | 'automotive';
  image: string;
  location: string;
  year: string;
  client: string;
  duration: string;
  scope: string[];
  highlights: string[];
  stats: { label: string; value: string }[];
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'West Africa Vehicle Terminal Expansion',
    description: 'Major expansion of RoRo terminal operations to accommodate increased vehicle imports from Europe and Asia.',
    category: 'roro',
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_CRANE),
    location: 'Tema Port, Ghana',
    year: '2023',
    client: 'Ghana Ports & Harbours Authority',
    duration: '18 months',
    scope: [
      'Terminal infrastructure upgrade',
      'RoRo ramp modernization',
      'Vehicle storage area expansion',
      'Security system implementation',
      'Staff training and certification'
    ],
    highlights: [
      'Increased capacity by 300%',
      'Reduced vehicle processing time by 50%',
      'Zero safety incidents during project',
      'Environmental compliance achieved'
    ],
    stats: [
      { label: 'Vehicles Handled', value: '50,000+' },
      { label: 'Terminal Area', value: '25 hectares' },
      { label: 'Daily Capacity', value: '500 units' },
      { label: 'Investment', value: '$12M' }
    ]
  },
  {
    id: '2',
    title: 'Mining Equipment Heavy Lift Project',
    description: 'Specialized handling and transportation of oversized mining equipment for major West African mining operations.',
    category: 'heavy-lift',
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_CRANE),
    location: 'Tema Port, Ghana',
    year: '2023',
    client: 'Agilent Maritime Services Limited',
    duration: '6 months',
    scope: [
      'Heavy lift crane operations',
      'Specialized transport coordination',
      'Port-to-mine logistics',
      'Equipment assembly support',
      'Safety protocol implementation'
    ],
    highlights: [
      'Successfully handled 200-ton equipment',
      'Complex multi-modal transportation',
      'On-time delivery guaranteed',
      'Custom engineering solutions'
    ],
    stats: [
      { label: 'Equipment Weight', value: '200+ tons' },
      { label: 'Project Value', value: '$5.2M' },
      { label: 'Distance Covered', value: '450 km' },
      { label: 'Equipment Units', value: '15' }
    ]
  },
  {
    id: '3',
    title: 'Container Terminal Automation',
    description: 'Implementation of automated container handling systems to improve efficiency and reduce operational costs.',
    category: 'container',
    image: getAssetUrl(ASSET_PATHS.STOCK.SHIPPING_CONTAINERS),
    location: 'Tema Port, Ghana',
    year: '2022',
    client: 'Meridian Port Services',
    duration: '12 months',
    scope: [
      'Automated crane systems',
      'Terminal operating system',
      'RFID tracking implementation',
      'Digital workflow optimization',
      'Operator training programs'
    ],
    highlights: [
      'Improved efficiency by 40%',
      'Reduced operational costs by 25%',
      'Enhanced cargo tracking',
      'Minimized human error'
    ],
    stats: [
      { label: 'Containers/Hour', value: '35 TEU' },
      { label: 'Accuracy Rate', value: '99.8%' },
      { label: 'Cost Reduction', value: '25%' },
      { label: 'ROI Timeline', value: '2 years' }
    ]
  },
  {
    id: '4',
    title: 'Automotive Import Hub Development',
    description: 'Establishment of dedicated automotive import processing facility with value-added services.',
    category: 'automotive',
    image: getAssetUrl(ASSET_PATHS.STOCK.SHIPPING_CONTAINERS),
    location: 'Tema Port, Ghana',
    year: '2022',
    client: 'Toyota Ghana',
    duration: '10 months',
    scope: [
      'Dedicated vehicle berth',
      'Pre-delivery inspection facility',
      'Customs processing center',
      'Vehicle storage compound',
      'Quality control systems'
    ],
    highlights: [
      'Streamlined import process',
      'Reduced port dwell time',
      'Enhanced vehicle security',
      'Improved customer satisfaction'
    ],
    stats: [
      { label: 'Annual Capacity', value: '25,000' },
      { label: 'Processing Time', value: '3 days' },
      { label: 'Storage Capacity', value: '2,000 units' },
      { label: 'Efficiency Gain', value: '60%' }
    ]
  },
  {
    id: '5',
    title: 'Gold Mining Logistics Hub',
    description: 'Specialized logistics facility for gold mining equipment and supplies serving multiple mining companies.',
    category: 'mining',
    image: getAssetUrl(ASSET_PATHS.STOCK.PORT_OPERATIONS),
    location: 'Tema Port, Ghana',
    year: '2021',
    client: 'Newmont Ghana',
    duration: '15 months',
    scope: [
      'Secure storage facilities',
      'Specialized handling equipment',
      'Mine-to-port transport network',
      'Supply chain optimization',
      'Emergency response systems'
    ],
    highlights: [
      'Zero security incidents',
      'Reduced logistics costs by 30%',
      'Improved supply chain reliability',
      'Enhanced mine productivity'
    ],
    stats: [
      { label: 'Storage Area', value: '10,000 m²' },
      { label: 'Annual Throughput', value: '$500M' },
      { label: 'Response Time', value: '24 hours' },
      { label: 'Cost Savings', value: '30%' }
    ]
  }
];

interface PortfolioGalleryProps {
  className?: string;
}

export function PortfolioGallery({ className = "" }: PortfolioGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'roro', label: 'RoRo Operations' },
    { key: 'container', label: 'Container Handling' },
    { key: 'heavy-lift', label: 'Heavy Lift' },
    { key: 'mining', label: 'Mining Projects' },
    { key: 'automotive', label: 'Automotive' }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'roro': return 'bg-blue-500';
      case 'container': return 'bg-green-500';
      case 'heavy-lift': return 'bg-orange-500';
      case 'mining': return 'bg-yellow-500';
      case 'automotive': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={activeCategory === category.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.key)}
            data-testid={`filter-${category.key}`}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover-elevate group cursor-pointer">
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getAssetUrl(ASSET_PATHS.STOCK.PORT_OPERATIONS);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className={`${getCategoryColor(project.category)} text-white mb-2`}>
                  {project.category.replace('-', ' ').toUpperCase()}
                </Badge>
                <h3 className="font-bold text-white text-lg line-clamp-2">
                  {project.title}
                </h3>
              </div>
            </div>
            
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{project.client}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSelectedProject(project)}
                data-testid={`view-project-${project.id}`}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Hero Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = getAssetUrl(ASSET_PATHS.STOCK.PORT_OPERATIONS);
                    }}
                  />
                  <Badge className={`${getCategoryColor(selectedProject.category)} text-white absolute top-4 left-4`}>
                    {selectedProject.category.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Project Overview</h3>
                    <p className="text-muted-foreground">{selectedProject.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-1">Location</h4>
                        <p className="text-sm text-muted-foreground">{selectedProject.location}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Year</h4>
                        <p className="text-sm text-muted-foreground">{selectedProject.year}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Client</h4>
                        <p className="text-sm text-muted-foreground">{selectedProject.client}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Duration</h4>
                        <p className="text-sm text-muted-foreground">{selectedProject.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.stats.map((stat, index) => (
                        <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Scope */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Project Scope</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.scope.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button className="flex-1" data-testid="button-similar-projects">
                    <Ship className="h-4 w-4 mr-2" />
                    View Similar Projects
                  </Button>
                  <Button variant="outline" className="flex-1" data-testid="button-contact-project">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Get Project Quote
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}