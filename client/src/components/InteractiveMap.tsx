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
    name: 'Terminal 1 & 2 (GPHA)',
    type: 'terminal',
    description: 'GPHA direct operations - general cargo, RoRo, project cargo',
    coordinates: { x: 25, y: 60 },
    icon: Ship,
    details: [
      'Berths 1-14 (various cargo types)',
      '8.2-12m depth range',
      '53,000 tons covered warehouse capacity',
      'Break bulk, RoRo, project cargo, containers'
    ]
  },
  {
    id: '2',
    name: 'Terminal 3 (MPS)',
    type: 'terminal',
    description: 'Meridian Port Services - Container Terminal 3',
    coordinates: { x: 75, y: 40 },
    icon: Truck,
    details: [
      '3.7M TEU capacity',
      '1.4km quay wall, 16m depth',
      'APM Terminals & Bollore JV',
      'Operational since 2019'
    ]
  },
  {
    id: '3',
    name: 'Port Control',
    type: 'facility',
    description: 'VHF Channel 16 (calling) / Channel 12 (working)',
    coordinates: { x: 50, y: 75 },
    icon: Navigation,
    details: [
      '24/7 monitoring and vessel traffic control',
      '15 nautical miles coverage radius',
      'Emergency contact: Good Friday & Christmas only',
      'Vessel booking system coordination'
    ]
  },
  {
    id: '4',
    name: 'Pilotage Services',
    type: 'service',
    description: 'Compulsory for all vessels over 500 GT',
    coordinates: { x: 15, y: 85 },
    icon: Zap,
    details: [
      'Pilot boarding 2 nautical miles from entrance',
      '24-hour service availability',
      'Emergency pilotage available',
      'VHF Channel 16 coordination'
    ]
  },
  {
    id: '5',
    name: 'Main Berths',
    type: 'port',
    description: 'Deep water berths with 16-19m entrance depth',
    coordinates: { x: 85, y: 65 },
    icon: Anchor,
    details: [
      '16-19m entrance depth (MLW)',
      '14-16m main channel depth',
      'Semi-diurnal tides (1.2-1.8m range)',
      'GMT+0 timezone, no daylight saving'
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
      case 'terminal': return 'bg-blue-600 border-blue-700';
      case 'port': return 'bg-emerald-600 border-emerald-700';
      case 'facility': return 'bg-indigo-600 border-indigo-700';
      case 'service': return 'bg-amber-600 border-amber-700';
      default: return 'bg-slate-600 border-slate-700';
    }
  };

  const getPointSize = (type: MapPoint['type']) => {
    switch (type) {
      case 'terminal': return 'w-12 h-12 p-3';
      case 'port': return 'w-14 h-14 p-3.5';
      case 'facility': return 'w-10 h-10 p-2.5';
      case 'service': return 'w-10 h-10 p-2.5';
      default: return 'w-10 h-10 p-2.5';
    }
  };


  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        {/* Map Visualization */}
        <div className="relative">
          <Card className="h-[500px] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Tema Port - Ghana's Premier Maritime Gateway
              </CardTitle>
            </CardHeader>
            <CardContent className="relative h-full p-6 overflow-hidden">
              {/* Background port illustration */}
              <div className="absolute inset-4 bg-gradient-to-b from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900 rounded-lg opacity-30">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-400 to-transparent"></div>
                
                {/* Terminal Zone - Left side */}
                <div className="absolute top-4 left-4 w-2/5 h-3/5 bg-blue-100/20 dark:bg-blue-900/20 rounded-lg border border-blue-300/30 dark:border-blue-700/30">
                  <div className="absolute top-2 left-2 text-xs font-medium text-blue-700 dark:text-blue-300">Terminal Operations</div>
                </div>
                
                {/* Service Zone - Right side */}
                <div className="absolute top-4 right-4 w-2/5 h-3/5 bg-green-100/20 dark:bg-green-900/20 rounded-lg border border-green-300/30 dark:border-green-700/30">
                  <div className="absolute top-2 left-2 text-xs font-medium text-green-700 dark:text-green-300">Port Services</div>
                </div>
                
                {/* Control Zone - Bottom center */}
                <div className="absolute bottom-4 left-1/3 w-1/3 h-1/4 bg-purple-100/20 dark:bg-purple-900/20 rounded-lg border border-purple-300/30 dark:border-purple-700/30">
                  <div className="absolute top-1 left-1 text-xs font-medium text-purple-700 dark:text-purple-300">Port Control</div>
                </div>
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
                const pointSize = getPointSize(point.type);
                const pointColor = getPointColor(point.type);
                
                return (
                  <div
                    key={point.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                      isHovered || isSelected ? 'scale-125 z-20' : 'z-10'
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
                    <div className={`relative ${pointColor} ${pointSize} rounded-full shadow-lg border-2 hover:shadow-xl transition-all duration-300 group`}>
                      <IconComponent className="h-5 w-5 text-white" />
                      
                      {/* Pulse animation for selected point */}
                      {isSelected && (
                        <div className={`absolute inset-0 ${pointColor.split(' ')[0]} rounded-full animate-ping opacity-75`}></div>
                      )}
                      
                      {/* Enhanced tooltip on hover */}
                      {isHovered && !isSelected && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-30 min-w-40">
                          <div className="font-semibold text-white mb-1">{point.name}</div>
                          <div className="text-gray-300 text-xs">{point.description}</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Location label with smart positioning */}
                    <div 
                      className={`absolute px-2 py-1 bg-white/95 dark:bg-gray-800/95 rounded-md shadow-sm text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap transition-opacity duration-200 border border-gray-200 dark:border-gray-600 ${
                        isHovered || isSelected ? 'opacity-100' : 'opacity-80'
                      }`}
                      style={{
                        // Smart positioning to avoid overlaps
                        top: point.coordinates.y < 50 ? '100%' : 'auto',
                        bottom: point.coordinates.y >= 50 ? '100%' : 'auto',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: point.coordinates.y < 50 ? '8px' : '0px',
                        marginBottom: point.coordinates.y >= 50 ? '8px' : '0px',
                        // Adjust horizontal position for edge cases
                        marginLeft: point.coordinates.x < 15 ? '20px' : point.coordinates.x > 85 ? '-20px' : '0px'
                      }}
                    >
                      {point.name}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Enhanced Legend */}
          <div className="mt-6 p-4 bg-white/95 dark:bg-gray-800/95 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Map Legend</h4>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {mapPoints.length} locations
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['terminal', 'port', 'facility', 'service'].map((type) => {
                const typeData = mapPoints.filter(p => p.type === type);
                return (
                  <div key={type} className="flex items-center gap-3 group">
                    <div className={`w-5 h-5 ${getPointColor(type as MapPoint['type'])} rounded-full border-2 shadow-sm group-hover:scale-110 transition-transform duration-200`}></div>
                    <div className="flex-1">
                      <span className="text-sm font-medium capitalize text-gray-900 dark:text-gray-100">{type}</span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {typeData.length} location{typeData.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* North Arrow */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-gray-500"></div>
                <span>North</span>
              </div>
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
                  Click on any point to explore Tema Port's actual facilities and operations. 
                  Coordinates: 5.6667°N, 0.0167°E. Operating 24/7 year-round (closed Good Friday & Christmas only).
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Ship className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">GPHA Operations</h4>
                      <p className="text-sm text-muted-foreground">Berths 1-14, 53,000 tons warehouse</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Zap className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">MPS Terminal 3</h4>
                      <p className="text-sm text-muted-foreground">3.7M TEU capacity, 1.4km quay wall</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Pilotage Services</h4>
                      <p className="text-sm text-muted-foreground">Compulsory for vessels &gt;500 GT</p>
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