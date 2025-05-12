
/**
 * Performance monitoring and optimization utilities
 */

import { useEffect, useRef, useState } from 'react';

// Constants for performance thresholds
const RENDER_THRESHOLD_MS = 16; // ~60fps
const LONG_TASK_THRESHOLD_MS = 50;

/**
 * Initialize performance monitoring for the application
 */
export const initializePerformanceMonitoring = () => {
  // Only run in production
  if (process.env.NODE_ENV !== 'production') return;

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log tasks that take more than our threshold
          if (entry.duration > LONG_TASK_THRESHOLD_MS) {
            console.warn('Long task detected:', {
              duration: `${Math.round(entry.duration)}ms`,
              name: entry.name,
              startTime: entry.startTime
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('Performance observer not supported', e);
    }
  }

  // Monitor page load metrics
  window.addEventListener('load', () => {
    // Use setTimeout to ensure this runs after the load event completes
    setTimeout(() => {
      if ('performance' in window) {
        const pageNavigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (pageNavigation) {
          // Log key performance metrics
          console.info('Page load performance:', {
            loadTime: `${Math.round(pageNavigation.loadEventEnd - pageNavigation.startTime)}ms`,
            domContentLoaded: `${Math.round(pageNavigation.domContentLoadedEventEnd - pageNavigation.startTime)}ms`,
            firstPaint: `${Math.round(performance.getEntriesByName('first-paint')[0]?.startTime || 0)}ms`,
            firstContentfulPaint: `${Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0)}ms`
          });
        }
      }
    }, 0);
  });
};

/**
 * Custom hook to track component render performance
 * @param componentName Name of the component being monitored
 */
export const useRenderPerformance = (componentName: string) => {
  const renderStart = useRef<number>();
  
  if (process.env.NODE_ENV === 'development') {
    renderStart.current = performance.now();
    
    // Use layout effect to measure render time
    useEffect(() => {
      if (renderStart.current) {
        const renderTime = performance.now() - renderStart.current;
        if (renderTime > RENDER_THRESHOLD_MS) {
          console.warn(`Slow render detected in ${componentName}: ${Math.round(renderTime)}ms`);
        }
      }
    });
  }
};

/**
 * Custom hook to defer expensive operations until after main render
 * @param callback Function to be executed
 * @param deps Dependency array for the effect
 */
export const useDeferredEffect = (callback: () => void | (() => void), deps: React.DependencyList = []) => {
  useEffect(() => {
    // Use requestIdleCallback to run during browser idle time
    const handle = requestIdleCallback(() => {
      return callback();
    });

    return () => cancelIdleCallback(handle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

/**
 * Custom hook to lazy load components or data when they become visible
 * @param options Intersection observer options
 */
export const useInView = (options = {}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '100px',
      ...options
    });

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isInView] as const;
};

/**
 * Function to optimize image loading
 * @param imageElement Image element to optimize
 * @param src Source URL of the image
 * @param placeholder Placeholder image URL
 */
export const optimizeImage = (
  imageElement: HTMLImageElement,
  src: string,
  placeholder: string = '/placeholder.svg'
) => {
  // Set placeholder immediately
  imageElement.src = placeholder;
  
  // Create new image object to preload
  const img = new Image();
  
  // When image loads, swap it in
  img.onload = () => {
    imageElement.src = src;
    imageElement.classList.add('loaded');
  };
  
  // Handle errors
  img.onerror = () => {
    console.error(`Failed to load image: ${src}`);
    imageElement.src = placeholder;
  };
  
  // Start loading the real image
  img.src = src;
};

/**
 * Register the performance utility in the window object for debugging
 */
if (typeof window !== 'undefined') {
  (window as any).__PERFORMANCE_MONITOR__ = {
    getMetrics: () => {
      if ('performance' in window) {
        return {
          memory: (performance as any).memory ? {
            usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
            totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
            jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
          } : 'Not available',
          navigation: performance.getEntriesByType('navigation'),
          resources: performance.getEntriesByType('resource')
        };
      }
      return 'Performance API not available';
    },
    clearMarks: () => performance.clearMarks()
  };
}
