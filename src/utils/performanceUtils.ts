/**
 * Performance optimization utilities for React applications
 * This module provides functions to optimize the performance of React applications
 * by implementing best practices for rendering, network requests, and memory management.
 */

// Import utilities from focused modules
import { isElementInViewport, batchDomOperations, optimizeMediaLoading } from './performance/domUtils';
import { optimizeNetworkRequests } from './performance/networkUtils';
import { optimizeScrollPerformance } from './performance/scrollUtils';
import { monitorMemoryUsage } from './performance/memoryUtils';
import { useRenderCount, useDeferredCalculation, useThrottledValue } from './performance/reactPerformanceHooks';

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

// Re-export all utilities for backward compatibility
export {
  isElementInViewport,
  batchDomOperations,
  // DOM utils
  optimizeMediaLoading,
  // Network utils
  optimizeNetworkRequests,
  // Scroll utils
  optimizeScrollPerformance,
  // Memory utils
  monitorMemoryUsage,
  // React hooks
  useRenderCount,
  useDeferredCalculation,
  useThrottledValue
};
