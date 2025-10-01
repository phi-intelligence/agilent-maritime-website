import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useLanguageRouting } from "@/hooks/useLanguageRouting";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Ghana from "@/pages/Ghana";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

// Language-specific route component
function LanguageRoute({ params }: { params: { lang: string } }) {
  const { getLanguageFromPath, currentLanguage } = useLanguageRouting();
  
  // This component will be used to wrap routes that need language support
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* English routes (default) */}
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/ghana" component={Ghana} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        
        {/* Language-specific routes */}
        <Route path="/:lang" component={LanguageRoute}>
          <Switch>
            <Route path="/:lang" component={Home} />
            <Route path="/:lang/home" component={Home} />
            <Route path="/:lang/services" component={Services} />
            <Route path="/:lang/portfolio" component={Portfolio} />
            <Route path="/:lang/ghana" component={Ghana} />
            <Route path="/:lang/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Route>
        
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="dark" storageKey="agilent-ui-theme">
          <LanguageProvider>
            <Toaster />
            <Router />
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
