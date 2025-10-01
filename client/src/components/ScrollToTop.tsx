import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
