
/**
 * Memory performance optimization utilities
 */
import { purgeOffscreenElements } from './domUtils';

/**
 * Monitor memory usage and optimize DOM when necessary
 * @returns {Function} Cleanup function
 */
export const monitorMemoryUsage = () => {
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
