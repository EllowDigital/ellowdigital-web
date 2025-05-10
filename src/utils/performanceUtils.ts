
/**
 * Performance optimization utilities for React applications
 * This module provides functions to optimize the performance of React applications
 * by implementing best practices for rendering, network requests, and memory management.
 */

import { useEffect, useState, useCallback } from 'react';

/**
 * Initialize all performance optimizations
 * @returns {Function} Cleanup function to remove all listeners and optimizations
 */
export const initPerformanceOptimizations = () => {
  // Apply all optimizations
  const cleanupFns: Array<() => void> = [
    optimizeMediaLoading(),
    optimizeNetworkRequests(),
    optimizeScrollPerformance(),
    monitorMemoryUsage(),
  ];

  // Return a combined cleanup function
  return () => {
    cleanupFns.forEach(cleanup => cleanup());
  };
};

/**
 * Optimize media loading with lazy loading and priority hints
 * @returns {Function} Cleanup function
 */
const optimizeMediaLoading = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Handle images
        if (element.tagName === 'IMG') {
          const img = element as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
        }
        
        // Handle videos
        if (element.tagName === 'VIDEO') {
          const video = element as HTMLVideoElement;
          if (video.dataset.src) {
            video.src = video.dataset.src;
            video.load();
            video.removeAttribute('data-src');
          }
        }
        
        observer.unobserve(element);
      }
    });
  }, {
    rootMargin: '200px', // Start loading when within 200px of viewport
  });

  // Find all media with data-src attribute
  const lazyElements = document.querySelectorAll('img[data-src], video[data-src]');
  lazyElements.forEach(element => {
    observer.observe(element);
  });

  // Apply priority hints to critical above-the-fold images
  document.querySelectorAll('img.priority').forEach(img => {
    (img as HTMLImageElement).fetchPriority = 'high';
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
};

/**
 * Optimize network requests with connection-aware adjustments
 * @returns {Function} Cleanup function
 */
const optimizeNetworkRequests = () => {
  const connectionHandler = () => {
    // Safely check for navigator.connection
    const connection = 'connection' in navigator ? 
      (navigator as any).connection : null;
    
    if (connection) {
      // Adjust content quality based on connection type
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        document.body.classList.add('low-data-mode');
        
        // Use lower quality images
        document.querySelectorAll('img[data-low-src]').forEach(img => {
          const image = img as HTMLImageElement;
          if (image.dataset.lowSrc) {
            image.src = image.dataset.lowSrc;
          }
        });
      }
    }
  };

  // Run immediately
  connectionHandler();
  
  // Add listener for connection changes if available
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    connection.addEventListener('change', connectionHandler);
    
    // Return cleanup function
    return () => {
      connection.removeEventListener('change', connectionHandler);
    };
  }
  
  return () => {}; // No-op if connection API not available
};

/**
 * Optimize scroll performance with passive listeners and throttling
 * @returns {Function} Cleanup function
 */
const optimizeScrollPerformance = () => {
  let ticking = false;
  const scrollElements: HTMLElement[] = [];
  
  // Find all elements that react to scroll
  document.querySelectorAll('[data-scroll-effect]').forEach(el => {
    scrollElements.push(el as HTMLElement);
  });

  const scrollHandler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Apply effects to elements based on scroll position
        scrollElements.forEach(el => {
          const effect = el.dataset.scrollEffect;
          const offsetTop = el.offsetTop;
          const viewportHeight = window.innerHeight;
          
          if (effect === 'parallax') {
            const speed = parseFloat(el.dataset.parallaxSpeed || '0.5');
            const yPos = -(scrollY * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
          }
          
          if (effect === 'fade-in') {
            if (scrollY + viewportHeight > offsetTop) {
              el.classList.add('visible');
            }
          }
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  };

  // Add passive scroll listener for better performance
  window.addEventListener('scroll', scrollHandler, { passive: true });
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', scrollHandler);
  };
};

/**
 * Monitor memory usage and optimize DOM when necessary
 * @returns {Function} Cleanup function
 */
const monitorMemoryUsage = () => {
  const MEMORY_CHECK_INTERVAL = 30000; // 30 seconds
  
  const checkMemory = () => {
    // Use performance memory API if available (Chrome only)
    const performance = window.performance as any;
    if (performance && performance.memory) {
      const { usedJSHeapSize, jsHeapSizeLimit } = performance.memory;
      const memoryUsageRatio = usedJSHeapSize / jsHeapSizeLimit;
      
      // If memory usage is high
      if (memoryUsageRatio > 0.7) {
        console.warn('High memory usage detected. Optimizing...');
        
        // Remove offscreen elements from DOM temporarily
        purgeOffscreenElements();
      }
    }
  };
  
  const intervalId = setInterval(checkMemory, MEMORY_CHECK_INTERVAL);
  
  // Return cleanup function
  return () => {
    clearInterval(intervalId);
  };
};

/**
 * Temporarily remove offscreen elements to reduce memory usage
 */
const purgeOffscreenElements = () => {
  const viewport = {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
    buffer: 1000, // 1000px buffer zone
  };
  
  // Find elements that can be purged
  document.querySelectorAll('[data-purgeable]').forEach(el => {
    const element = el as HTMLElement;
    const rect = element.getBoundingClientRect();
    const elemTop = rect.top + window.scrollY;
    const elemBottom = rect.bottom + window.scrollY;
    
    // If element is far from viewport
    if (elemBottom < viewport.top - viewport.buffer || 
        elemTop > viewport.bottom + viewport.buffer) {
      
      // Store original content and replace with placeholder
      if (!element.dataset.purged) {
        element.dataset.purgedContent = element.innerHTML;
        element.dataset.purged = 'true';
        element.innerHTML = '';
        element.style.minHeight = `${rect.height}px`;
      }
    } else {
      // Restore content if element is near viewport
      if (element.dataset.purged) {
        if (element.dataset.purgedContent) {
          element.innerHTML = element.dataset.purgedContent;
        }
        element.removeAttribute('data-purged');
        element.removeAttribute('data-purged-content');
        element.style.minHeight = '';
      }
    }
  });
};

/**
 * Custom hook to track component render count during development
 * @param {string} componentName - Name of the component to track
 * @returns {void}
 */
export const useRenderCount = (componentName: string): void => {
  const [renderCount, setRenderCount] = useState(0);
  
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render count: ${renderCount}`);
    }
  }, [renderCount, componentName]);
};

/**
 * Custom hook to defer expensive calculations until after paint
 * @param {Function} callback - The expensive calculation to perform
 * @param {Array<any>} dependencies - Dependencies array for the calculation
 * @returns {any} The result of the calculation
 */
export const useDeferredCalculation = <T>(callback: () => T, dependencies: Array<any>): T | null => {
  const [result, setResult] = useState<T | null>(null);
  
  useEffect(() => {
    // Use requestIdleCallback if available, otherwise use setTimeout
    const executeInIdle = window.requestIdleCallback || 
      ((cb) => setTimeout(cb, 1));
    
    const handle = executeInIdle(() => {
      const calculationResult = callback();
      setResult(calculationResult);
    });
    
    return () => {
      if (window.requestIdleCallback) {
        window.cancelIdleCallback(handle as any);
      } else {
        clearTimeout(handle);
      }
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
  
  return result;
};

/**
 * Custom hook to throttle expensive rendering operations
 * @param {Function} value - The value or function that might change rapidly
 * @param {number} limit - Throttle limit in milliseconds
 * @returns {any} Throttled value
 */
export const useThrottledValue = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdate = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    const now = Date.now();
    const timeUntilUpdate = lastUpdate.current + limit - now;
    
    if (timeUntilUpdate <= 0) {
      // Update immediately if enough time has passed
      lastUpdate.current = now;
      setThrottledValue(value);
    } else if (timeoutRef.current === null) {
      // Schedule update if not already scheduled
      timeoutRef.current = window.setTimeout(() => {
        lastUpdate.current = Date.now();
        setThrottledValue(value);
        timeoutRef.current = null;
      }, timeUntilUpdate);
    }
    
    // Clean up timeout
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, limit]);
  
  return throttledValue;
};

// Missing import/declaration for useRef
import { useRef } from 'react';
