import { Link } from "wouter";
import { Ship, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "RoRo Operations", href: "/services#roro" },
      { label: "Container Handling", href: "/services#container" },
      { label: "Heavy Lift Cargo", href: "/services#heavy-lift" },
      { label: "Ship Agency", href: "/services#agency" },
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Portfolio", href: "/portfolio" },
      { label: "Ghana Operations", href: "/ghana" },
      { label: "Reports", href: "/reports" },
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Safety & Quality", href: "/safety" },
      { label: "Careers", href: "/careers" },
      { label: "Emergency Response", href: "/emergency" },
    ]
  }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} clicked`);
    // TODO: Open social media links
  };

  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Ship className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">Agilent</span>
                <span className="text-xs text-muted-foreground -mt-1">Maritime</span>
              </div>
            </Link>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Leading Roll-on/Roll-off specialist at Tema Port, Ghana. Professional maritime 
              logistics solutions with over 15 years of experience in West Africa.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Tema Port, Greater Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+233-30-202-1234</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@agilentmaritime.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-muted-foreground text-sm">
              © {currentYear} Agilent Maritime Services Limited. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {['LinkedIn', 'Twitter', 'Facebook'].map((platform) => (
                <Button
                  key={platform}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick(platform)}
                  className="text-muted-foreground hover:text-primary"
                  data-testid={`social-${platform.toLowerCase()}`}
                >
                  {platform}
                </Button>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link 
                href="/privacy" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-terms"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Agilent Maritime",
              "legalName": "Agilent Maritime Services Limited",
              "description": "Premier Roll-on/Roll-off (RoRo) specialist in West Africa, handling 400,000+ vehicles annually at Tema Port, Ghana",
              "url": "https://agilentmaritime.com",
              "logo": "https://agilentmaritime.com/images/agilent-maritime-logo.png",
              "foundingDate": "2010",
              "numberOfEmployees": "500-1000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Tema Port",
                "addressLocality": "Tema",
                "addressRegion": "Greater Accra",
                "postalCode": "00233",
                "addressCountry": "Ghana"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 5.6667,
                "longitude": 0.0167
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+233-30-202-1234",
                "email": "info@agilentmaritime.com",
                "contactType": "customer service"
              }
            })
          }}
        />
      </div>
    </footer>
  );
}