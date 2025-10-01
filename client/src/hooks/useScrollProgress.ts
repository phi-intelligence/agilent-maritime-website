import { useState, useEffect, useRef } from 'react';

interface UseScrollProgressOptions {
  targetElement?: HTMLElement | null;
  offset?: number;
  throttle?: number;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { targetElement, offset = 0, throttle = 16 } = options;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(targetElement);

  // Update ref when targetElement changes
  useEffect(() => {
    targetRef.current = targetElement;
  }, [targetElement]);

  useEffect(() => {
    let ticking = false;

    const calculateScrollProgress = () => {
      if (!targetRef.current) {
        setScrollProgress(0);
        setIsVisible(false);
        return;
      }

      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calculate visibility
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isInViewport);

      if (!isInViewport) {
        setScrollProgress(0);
        return;
      }

      // Calculate progress (0 to 1)
      const startOffset = rect.top + offset;
      const endOffset = rect.bottom - windowHeight - offset;
      const totalDistance = elementHeight + windowHeight;
      
      let progress = 0;
      
      if (startOffset > 0) {
        // Element is below viewport
        progress = 0;
      } else if (endOffset < 0) {
        // Element is above viewport
        progress = 1;
      } else {
        // Element is in viewport
        const scrolledDistance = Math.abs(startOffset);
        progress = Math.min(Math.max(scrolledDistance / totalDistance, 0), 1);
      }

      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(calculateScrollProgress);
        ticking = true;
      }
    };

    // Initial calculation
    calculateScrollProgress();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [targetElement, offset]);

  return { scrollProgress, isVisible };
}
