import { ServiceCard } from "./ServiceCard";
import { Ship, Truck, Container, Warehouse, Shield, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "./LanguageProvider";
import { CraneHarbour3D } from "./CraneHarbour3D";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";

// Icon mapping for services
const iconMap = {
  "Heavy Lift & Project Cargo": Ship,
  "Bulk & Break Bulk Operations": Container,
  "Ro/Ro & Vehicle Handling": Truck,
  "Safety & Quality Assurance": Shield,
  "Ship Agency & Documentation": FileText,
  "Cargo Storage & Logistics": Warehouse,
  // Chinese translations
  "重型起重与项目货物": Ship,
  "散货与杂货作业": Container,
  "滚装与车辆处理": Truck,
  "安全与质量保证": Shield,
  "船舶代理与文件": FileText,
  "货物储存与物流": Warehouse,
  // Arabic translations
  "الرفع الثقيل والشحن المشروع": Ship,
  "عمليات السائب والبضائع المتنوعة": Container,
  "مناولة الدحرجة والمركبات": Truck,
  "السلامة وضمان الجودة": Shield,
  "وكالة السفن والوثائق": FileText,
  "تخزين البضائع واللوجستيات": Warehouse,
};

export function ServicesSection() {
  const { content } = useLanguage();
  const [headerRef, isHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [cardsRef, isCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  
  // Image background - no video states needed

  return (
    <section 
      className="py-24 relative bg-background overflow-hidden" 
      data-testid="section-services"
      style={{
        backgroundImage: `url(${getAssetUrl(ASSET_PATHS.GENERATED.CONTAINER_HANDLING)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="w-full px-6 lg:px-8 relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 lg:gap-8 min-h-[600px]">
          
          {/* Left Container - Services Content */}
          <div className="lg:col-span-1 flex flex-col justify-start lg:justify-center">
            {/* Section Header */}
            <div 
              ref={headerRef}
              className={`text-center lg:text-left mb-8 animate-fade-in-up ${isHeaderVisible ? 'animate-visible' : ''}`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {content.services.title}
              </h2>
              <p className={`text-xl text-white/90 animate-fade-in-up-delayed ${isHeaderVisible ? 'animate-visible' : ''}`}>
                {content.services.subtitle}
              </p>
            </div>

            {/* Service Cards */}
            <div 
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300"
            >
              {content.services.items.map((service, index) => {
                const IconComponent = iconMap[service.title as keyof typeof iconMap] || Ship;
                return (
                  <div
                    key={index}
                    className={`animate-pop-up ${isCardsVisible ? 'animate-visible' : ''}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <ServiceCard
                      icon={IconComponent}
                      title={service.title}
                      description={service.description}
                      details={service.details}
                      capabilities={service.capabilities}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Container - Crane Animation with Glass Container */}
          <div className="lg:col-span-1 relative h-80 lg:h-auto lg:min-h-[600px] transition-all duration-500">
            <div className="absolute inset-0 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
              <CraneHarbour3D 
                className="z-5" 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%',
                  minHeight: '280px', // Ensure minimum height on mobile
                  maxHeight: '650px'  // Prevent excessive height on large screens
                }} 
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}