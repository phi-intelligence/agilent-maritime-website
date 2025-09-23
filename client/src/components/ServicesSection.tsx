import { ServiceCard } from "./ServiceCard";
import { Ship, Truck, Container, Warehouse } from "lucide-react";

const services = [
  {
    icon: Ship,
    title: "Heavy Lift & Project Cargo",
    description: "Expert handling of oversized cargo, breakbulk, and project shipments with specialized equipment."
  },
  {
    icon: Truck,
    title: "RoRo Operations",
    description: "Specialized Roll-on/Roll-off services for vehicle import/export with dedicated terminals."
  },
  {
    icon: Container,
    title: "Container Handling",
    description: "Efficient container operations with modern equipment and experienced stevedoring teams."
  },
  {
    icon: Warehouse,
    title: "Cargo Storage & Logistics",
    description: "Climate-controlled warehousing, container stuffing/stripping, and inventory management."
  }
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-background" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Maritime Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional stevedoring and port services tailored to meet the demands of modern maritime commerce.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}