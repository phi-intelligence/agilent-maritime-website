import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string;
  capabilities?: string[];
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, details, capabilities, className = "" }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      className={`group cursor-pointer hover-elevate transition-all duration-300 
        backdrop-blur-md bg-primary/90 border-primary/50 hover:border-primary hover:bg-primary text-primary-foreground ${className}`}
      onClick={handleCardClick}
      data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardHeader className="text-center pb-2 px-3 pt-3">
        <div className="mx-auto mb-2 p-2 rounded-full bg-primary-foreground/20 w-fit group-hover:bg-primary-foreground/30 transition-colors">
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
        <h3 className="text-base font-semibold text-primary-foreground">{title}</h3>
      </CardHeader>
      <CardContent className="text-center px-3 pb-3">
        <p className="text-sm text-primary-foreground/80 leading-relaxed mb-2">{description}</p>
        
        {isExpanded && details && (
          <div className="mt-2 p-2 bg-primary-foreground/10 rounded-lg">
            <p className="text-sm text-primary-foreground/90 leading-relaxed mb-2">{details}</p>
            
            {capabilities && capabilities.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-primary-foreground mb-1">Key Capabilities:</h4>
                <div className="flex flex-wrap gap-1">
                  {capabilities.map((capability, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-sm bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                    >
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-2">
          <span className="text-sm text-primary-foreground/60">
            {isExpanded ? 'Click to collapse' : 'Click for details'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}