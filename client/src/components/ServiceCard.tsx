import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, className = "" }: ServiceCardProps) {
  const handleCardClick = () => {
    console.log(`Service card clicked: ${title}`);
    // TODO: Navigate to specific service page or open modal
  };

  return (
    <Card 
      className={`group cursor-pointer hover-elevate transition-all duration-300 
        backdrop-blur-md bg-card/80 border-border/50 hover:border-primary/30 ${className}`}
      onClick={handleCardClick}
      data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}