import { ServiceCard } from '../ServiceCard';
import { Ship } from 'lucide-react';
import { ThemeProvider } from '../ThemeProvider';

export default function ServiceCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background">
        <div className="max-w-sm">
          <ServiceCard
            icon={Ship}
            title="RoRo Operations"
            description="Specialized Roll-on/Roll-off services for vehicle import/export with dedicated terminals."
          />
        </div>
      </div>
    </ThemeProvider>
  );
}