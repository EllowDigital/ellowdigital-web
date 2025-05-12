/**
 * Performance monitoring utilities
 * Web Vitals tracking and reporting for production monitoring
 */

import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  // Ensure monitoring is only active in production
  if (process.env.NODE_ENV !== 'production') return;

  // Track Core Web Vitals metrics
  trackWebVitals();

  // Set up custom error tracking
  setupErrorTracking();
};

// Track Core Web Vitals metrics and send data to analytics
const trackWebVitals = () => {
  if (window && 'web-vitals' in window) {
    [getCLS, getFID, getLCP, getFCP, getTTFB].forEach((metricFn) => {
      metricFn(sendToAnalytics);
    });
  }
};

// Report Web Vitals metrics to analytics
const sendToAnalytics = (metric) => {
  const { name, value, id } = metric;
  
  // Example: Send to analytics service (replace with actual service)
  console.log('Reporting metric:', { name, value, id });

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      value: Math.round(value * 1000) / 1000, // Round to 3 decimal places
      metric_id: id,
      metric_name: name,
      metric_value: value,
    });
  }
};

// Set up error tracking, including unhandled errors and promise rejections
const setupErrorTracking = () => {
  // Capture global JavaScript errors
  const originalOnError = window.onerror;

  window.onerror = (message, source, lineno, colno, error) => {
    // Log the error to the console for development purposes
    console.error('Captured error:', { message, source, lineno, colno, error });

    // Send error details to error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'javascript_error', {
        error_message: message,
        error_source: source,
        error_lineno: lineno,
        error_colno: colno,
        error_stack: error?.stack,
      });
    }

    // Call the original error handler (if any)
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }

    // Don't suppress the error (propagate it)
    return false;
  };

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const { reason } = event;
    console.error('Unhandled promise rejection:', reason);

    // Example: Send rejection details to error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'unhandled_promise_rejection', {
        error_message: reason?.message || 'Unknown promise rejection',
        error_stack: reason?.stack,
      });
    }
  });
};
