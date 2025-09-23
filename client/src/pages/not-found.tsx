import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ship, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-not-found">
      <Navigation />
      
      <main className="pt-20 pb-16 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <Card className="backdrop-blur-sm bg-card/80 border-border/50">
            <CardContent className="p-12">
              {/* 404 Icon */}
              <div className="mx-auto mb-8 p-6 rounded-full bg-primary/10 w-fit">
                <Ship className="h-16 w-16 text-primary" />
              </div>

              {/* Error Message */}
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The page you're looking for seems to have sailed away. 
                Let's get you back to safe harbor with our maritime services.
              </p>

              {/* Navigation Options */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" className="gap-2" data-testid="button-go-home">
                    <Home className="h-5 w-5" />
                    Go Home
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => window.history.back()}
                  data-testid="button-go-back"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Go Back
                </Button>
              </div>

              {/* Quick Links */}
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Or navigate to one of these sections:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { href: "/services", label: "Services" },
                    { href: "/portfolio", label: "Portfolio" },
                    { href: "/ghana", label: "Ghana" },
                    { href: "/reports", label: "Reports" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href}>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        data-testid={`quick-link-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
