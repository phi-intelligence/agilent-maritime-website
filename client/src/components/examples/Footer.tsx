import { Footer } from '../Footer';
import { ThemeProvider } from '../ThemeProvider';

export default function FooterExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Page Content</h1>
          <p className="text-muted-foreground">This is example content above the footer.</p>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}