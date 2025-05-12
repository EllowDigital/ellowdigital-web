
/**
 * Application initialization utility
 * Handles all setup tasks that need to run when the app starts
 */

import { initPerformanceOptimizations } from './performanceUtils';
import { initializePerformanceMonitoring } from './performanceMonitor';
import { initPerformanceMonitoring as initWebVitalsMonitoring } from './performanceMonitoring';
import { toast } from 'sonner';

/**
 * Initialize all application services and optimizations
 */
export const initializeApplication = () => {
  // Set up error handling for uncaught errors
  setupGlobalErrorHandling();
  
  // Initialize performance optimizations
  const cleanupPerformance = initPerformanceOptimizations();
  
  // Set up performance monitoring
  initializePerformanceMonitoring();
  initWebVitalsMonitoring();
  
  // Optimize image loading
  optimizeImageLoading();
  
  // Apply responsive optimizations
  applyResponsiveOptimizations();
  
  // Return cleanup function
  return () => {
    cleanupPerformance();
  };
};

/**
 * Set up global error handling
 */
const setupGlobalErrorHandling = () => {
  if (typeof window !== 'undefined') {
    // Original error handler
    const originalOnError = window.onerror;
    
    // Global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error caught:', { message, source, lineno, colno, error });
      
      // Show user-friendly toast
      toast.error('Something went wrong', {
        description: 'The application encountered an error',
        duration: 5000,
      });
      
      // Call original handler if exists
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      
      // Return false to allow default browser error handling
      return false;
    };
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      toast.error('Background operation failed', {
        duration: 4000,
      });
    });
  }
};

/**
 * Optimize image loading across the site
 */
const optimizeImageLoading = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    // Create observer for lazy loading
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            if (image.dataset.src) {
              // Replace src with data-src when visible
              image.src = image.dataset.src;
              image.removeAttribute('data-src');
              imageObserver.unobserve(image);
            }
          }
        });
      },
      {
        rootMargin: '200px 0px', // Start loading before visible
        threshold: 0.01, // Trigger when just 1% visible
      }
    );
    
    // Find all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
    
    // Handle native lazy loading for browsers that support it
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img.lazy:not([data-src])');
      images.forEach((img) => {
        (img as HTMLImageElement).loading = 'lazy';
      });
    }
  }
};

/**
 * Apply responsive optimizations based on device capabilities
 */
const applyResponsiveOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Check for touch capabilities
    const isTouch = 'ontouchstart' in window || 
                    navigator.maxTouchPoints > 0 || 
                    (navigator as any).msMaxTouchPoints > 0;
    
    // Add appropriate class to body
    if (isTouch) {
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.add('no-touch');
    }
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.body.classList.add('reduced-motion');
    }
    
    // Check connection type for data saving mode
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.saveData) {
        document.body.classList.add('data-saver');
      }
    }
    
    // Apply responsive font size based on viewport
    updateResponsiveFontSize();
    window.addEventListener('resize', updateResponsiveFontSize);
  }
};

/**
 * Update root font size based on viewport width for better responsiveness
 */
const updateResponsiveFontSize = () => {
  // Base font size calculation
  const minWidth = 320; // Minimum viewport width to consider
  const maxWidth = 1920; // Maximum viewport width to consider
  const minFontSize = 14; // Minimum font size in px
  const maxFontSize = 18; // Maximum font size in px
  
  const width = window.innerWidth;
  
  // Calculate font size based on viewport width
  let fontSize;
  if (width <= minWidth) {
    fontSize = minFontSize;
  } else if (width >= maxWidth) {
    fontSize = maxFontSize;
  } else {
    // Linear interpolation between min and max font sizes
    const fontRange = maxFontSize - minFontSize;
    const widthRange = maxWidth - minWidth;
    fontSize = minFontSize + fontRange * ((width - minWidth) / widthRange);
  }
  
  // Apply font size to html element (affects rem units)
  document.documentElement.style.fontSize = `${fontSize}px`;
};
