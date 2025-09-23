import { Navigation } from '../Navigation';
import { ThemeProvider } from '../ThemeProvider';

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 p-8">
          <h1 className="text-2xl font-bold">Navigation Component Example</h1>
          <p className="text-muted-foreground">This shows the navigation with glass-morphism effects and language switcher.</p>
        </div>
      </div>
    </ThemeProvider>
  );
}