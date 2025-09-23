import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Anchor, Ship, Truck, Zap } from "lucide-react";

interface MapPoint {
  id: string;
  name: string;
  type: 'terminal' | 'port' | 'facility' | 'service';
  description: string;
  coordinates: { x: number; y: number };
  icon: React.ElementType;
  details: string[];
}

const mapPoints: MapPoint[] = [
  {
    id: '1',
    name: 'RoRo Terminal',
    type: 'terminal',
    description: 'Roll-on/Roll-off vehicle terminal operations',
    coordinates: { x: 35, y: 45 },
    icon: Ship,
    details: [
      'Vehicle loading/unloading operations',
      'Heavy machinery handling',
      'Dedicated RoRo berths',
      '24/7 operational capacity'
    ]
  },
  {
    id: '2',
    name: 'Container Terminal',
    type: 'terminal',
    description: 'Container handling and storage facility',
    coordinates: { x: 60, y: 30 },
    icon: Truck,
    details: [
      'Container yard operations',
      'Crane handling services',
      'Storage and logistics',
      'Import/Export processing'
    ]
  },
  {
    id: '3',
    name: 'Port Control Tower',
    type: 'facility',
    description: 'Central operations and port management',
    coordinates: { x: 50, y: 60 },
    icon: Navigation,
    details: [
      'Port traffic control',
      'Communication center',
      'Safety monitoring',
      'Vessel coordination'
    ]
  },
  {
    id: '4',
    name: 'Heavy Lift Area',
    type: 'service',
    description: 'Specialized heavy cargo handling zone',
    coordinates: { x: 25, y: 70 },
    icon: Zap,
    details: [
      'Mining equipment handling',
      'Industrial machinery',
      'Project cargo services',
      'Specialized lifting equipment'
    ]
  },
  {
    id: '5',
    name: 'Main Berth',
    type: 'port',
    description: 'Primary vessel docking and operations',
    coordinates: { x: 70, y: 50 },
    icon: Anchor,
    details: [
      'Deep water berths',
      'Vessel mooring services',
      'Cargo operations',
      'Maritime services'
    ]
  }
];

interface InteractiveMapProps {
  className?: string;
}

export function InteractiveMap({ className = "" }: InteractiveMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const getPointColor = (type: MapPoint['type']) => {
    switch (type) {
      case 'terminal': return 'bg-blue-500';
      case 'port': return 'bg-green-500';
      case 'facility': return 'bg-purple-500';
      case 'service': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Visualization */}
        <div className="relative">
          <Card className="h-[500px] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Tema Port Operations Map
              </CardTitle>
            </CardHeader>
            <CardContent className="relative h-full p-6">
              {/* Background port illustration */}
              <div className="absolute inset-4 bg-gradient-to-b from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900 rounded-lg opacity-30">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-400 to-transparent"></div>
              </div>
              
              {/* Port outline */}
              <svg className="absolute inset-4 w-full h-full" viewBox="0 0 100 100">
                <path
                  d="M10,80 L90,80 L90,20 L70,20 L70,40 L50,40 L50,60 L30,60 L30,80 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-muted-foreground opacity-50"
                />
                <path
                  d="M10,80 L10,90 L90,90 L90,80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                />
              </svg>

              {/* Interactive Points */}
              {mapPoints.map((point) => {
                const IconComponent = point.icon;
                const isHovered = hoveredPoint === point.id;
                const isSelected = selectedPoint?.id === point.id;
                
                return (
                  <div
                    key={point.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                      isHovered || isSelected ? 'scale-125 z-10' : 'z-5'
                    }`}
                    style={{
                      left: `${point.coordinates.x}%`,
                      top: `${point.coordinates.y}%`
                    }}
                    onClick={() => setSelectedPoint(point)}
                    onMouseEnter={() => setHoveredPoint(point.id)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    data-testid={`map-point-${point.id}`}
                  >
                    <div className={`relative ${getPointColor(point.type)} rounded-full p-3 shadow-lg hover-elevate`}>
                      <IconComponent className="h-5 w-5 text-white" />
                      
                      {/* Pulse animation for selected point */}
                      {isSelected && (
                        <div className={`absolute inset-0 ${getPointColor(point.type)} rounded-full animate-ping opacity-75`}></div>
                      )}
                      
                      {/* Tooltip on hover */}
                      {isHovered && !isSelected && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap z-20">
                          {point.name}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-3">Map Legend</h4>
            <div className="grid grid-cols-2 gap-2">
              {['terminal', 'port', 'facility', 'service'].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-4 h-4 ${getPointColor(type as MapPoint['type'])} rounded-full`}></div>
                  <span className="text-sm capitalize text-muted-foreground">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Point Details */}
        <div>
          {selectedPoint ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <selectedPoint.icon className="h-5 w-5" />
                      {selectedPoint.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      {selectedPoint.type}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPoint(null)}
                    data-testid="button-close-details"
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{selectedPoint.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {selectedPoint.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="w-full" data-testid="button-contact-about-facility">
                    Contact Us About This Facility
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Tema Port Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Click on any point on the map to explore our facilities and services at Tema Port, Ghana's premier maritime gateway.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Ship className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Strategic Location</h4>
                      <p className="text-sm text-muted-foreground">Gateway to West Africa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Zap className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">24/7 Operations</h4>
                      <p className="text-sm text-muted-foreground">Round-the-clock service</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Multi-Modal Hub</h4>
                      <p className="text-sm text-muted-foreground">Land, sea, and air connectivity</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}