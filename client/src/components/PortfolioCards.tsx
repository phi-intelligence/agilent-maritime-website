import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, MapPin, Users, Briefcase, Ship, Calendar, Flag, Gauge } from "lucide-react";

// Statistics Card Component
interface StatisticsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  description?: string;
}

export function StatisticsCard({ icon: IconComponent, value, label, description }: StatisticsCardProps) {
  return (
    <Card className="text-center p-6 backdrop-blur-sm bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground transition-all duration-300 group">
      <CardContent className="p-0">
        <IconComponent className="h-8 w-8 mx-auto mb-3 text-primary-foreground" />
        <div className="text-2xl font-bold text-primary-foreground mb-1">
          {value}
        </div>
        <div className="text-sm font-semibold text-primary-foreground mb-1">
          {label}
        </div>
        {description && (
          <div className="text-xs text-primary-foreground/80">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Featured Card Component
interface FeaturedCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  status?: 'completed' | 'ongoing' | 'planned';
  specifications: Array<{label: string, value: string}>;
  hoverDetails: Array<{label: string, value: string}>;
  technologies: string[];
}

export function FeaturedCard({ 
  title, 
  subtitle, 
  description, 
  image, 
  badge, 
  status,
  specifications,
  hoverDetails,
  technologies 
}: FeaturedCardProps) {
  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary-foreground/20 text-primary-foreground text-xs">
            {badge}
          </Badge>
        </div>
        {status && (
          <div className="absolute top-3 right-3">
            <Badge 
              variant="outline" 
              className={`text-xs ${
                status === 'completed' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : status === 'ongoing'
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
              }`}
            >
              {status}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold text-primary-foreground mb-1">
              {title}
            </h4>
            <p className="text-xs text-primary-foreground/80">
              {subtitle}
            </p>
          </div>
          
          <p className="text-xs text-primary-foreground/80 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
          
          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {specifications.map((spec, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-primary-foreground/70">{spec.label}:</span>
                <span className="font-semibold text-primary-foreground">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Hover Details (Hidden by default, shown on hover) */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2 pt-2 border-t border-primary-foreground/20">
            {hoverDetails.map((detail, index) => (
              <div key={index} className="text-xs">
                <div className="flex items-center gap-1 mb-1">
                  {index === 0 && <MapPin className="h-3 w-3 text-primary-foreground/70" />}
                  {index === 1 && <Users className="h-3 w-3 text-primary-foreground/70" />}
                  {index === 2 && <Briefcase className="h-3 w-3 text-primary-foreground/70" />}
                  <span className="text-primary-foreground/70">{detail.label}:</span>
                </div>
                <span className="font-semibold text-primary-foreground">{detail.value}</span>
              </div>
            ))}
            
            <div className="text-xs">
              <div className="text-primary-foreground/70 mb-1">Technologies:</div>
              <div className="flex flex-wrap gap-1">
                {technologies.slice(0, 2).map((tech, techIndex) => (
                  <Badge key={techIndex} variant="outline" className="text-xs border-primary-foreground/30 text-primary-foreground">
                    {tech}
                  </Badge>
                ))}
                {technologies.length > 2 && (
                  <Badge variant="outline" className="text-xs border-primary-foreground/30 text-primary-foreground">
                    +{technologies.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Compact Card Component
interface CompactCardProps {
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

export function CompactCard({ title, subtitle, image, badge }: CompactCardProps) {
  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-white/90 border-white/50 hover:bg-white/95 hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-24 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary/90 text-primary-foreground text-xs">
            {badge}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-3">
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-foreground truncate">
            {title}
          </h4>
          <p className="text-xs text-muted-foreground truncate">
            {subtitle}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Vessel Details Interface
export interface VesselDetails {
  name: string;
  type: string;
  series: string;
  flagCountry: string;
  builtYear: number;
  image: string;
  grossTonnage?: number;
  deadweight?: number;
  length?: number;
  beam?: number;
  draft?: number;
  serviceSpeed?: number;
  class?: string;
  manager: string;
  classification?: string;
  shipyard?: string;
  cargoType: string;
  originCountry: string;
  imo?: string;
  mmsi?: string;
  enginePower?: number;
}

// Vessel Card Component
interface VesselCardProps {
  vessel: VesselDetails;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function VesselCard({ vessel, onClick, className, style }: VesselCardProps) {
  const {
    name,
    type,
    series,
    flagCountry,
    builtYear,
    image,
    grossTonnage,
    deadweight,
    length,
    serviceSpeed,
    class: vesselClass,
    manager,
    classification,
    shipyard,
    cargoType,
    originCountry
  } = vessel;
  return (
    <Card 
      className={`overflow-hidden backdrop-blur-sm bg-white/95 border-gray-200 hover:border-primary hover:bg-white hover:shadow-xl text-gray-900 transition-all duration-300 group cursor-pointer h-80 w-80 ${className || ''}`}
      onClick={onClick}
      style={style}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary/90 text-white text-xs">
            {series}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary/90 text-white text-xs">
            {type}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">
              {name}
            </h4>
            <p className="text-xs text-gray-600">
              {flagCountry} • {builtYear}
            </p>
          </div>
          
          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">GT:</span>
              <span className="font-semibold text-gray-900">
                {grossTonnage?.toLocaleString() || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">DWT:</span>
              <span className="font-semibold text-gray-900">
                {deadweight?.toLocaleString() || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Length:</span>
              <span className="font-semibold text-gray-900">
                {length}m
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Speed:</span>
              <span className="font-semibold text-gray-900">
                {serviceSpeed}kn
              </span>
            </div>
          </div>
          
          {/* Hover Details (Hidden by default, shown on hover) */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2 pt-2 border-t border-gray-200">
            <div className="text-xs">
              <div className="flex items-center gap-1 mb-1">
                <Flag className="h-3 w-3 text-gray-600" />
                <span className="text-gray-600">Origin:</span>
              </div>
              <span className="font-semibold text-gray-900">{originCountry}</span>
            </div>
            
            <div className="text-xs">
              <div className="flex items-center gap-1 mb-1">
                <Ship className="h-3 w-3 text-gray-600" />
                <span className="text-gray-600">Manager:</span>
              </div>
              <span className="font-semibold text-gray-900">{manager}</span>
            </div>
            
            <div className="text-xs">
              <div className="flex items-center gap-1 mb-1">
                <Gauge className="h-3 w-3 text-gray-600" />
                <span className="text-gray-600">Class:</span>
              </div>
              <span className="font-semibold text-gray-900">{vesselClass}</span>
            </div>
            
            <div className="text-xs">
              <div className="text-gray-600 mb-1">Cargo Type:</div>
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                {cargoType}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
