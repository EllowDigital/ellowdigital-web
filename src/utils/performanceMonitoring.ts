
/**
 * Performance monitoring utilities
 * Web Vitals tracking and reporting for production monitoring
 */

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV !== 'production') return;

  // Track CLS, FID, LCP, and other Core Web Vitals
  trackWebVitals();

  // Custom error tracking
  setupErrorTracking();
};

// Track Core Web Vitals metrics
const trackWebVitals = () => {
  if ('web-vitals' in window) {
    import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getLCP(sendToAnalytics);
      getFCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });
  }
};

// Report metrics to analytics
const sendToAnalytics = (metric: any) => {
  // Replace with your actual analytics service
  console.log(metric);

  // Example: Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value * 1000) / 1000,
      metric_id: metric.id,
      metric_name: metric.name,
      metric_value: metric.value,
    });
  }
};

// Track unhandled errors
const setupErrorTracking = () => {
  const originalOnError = window.onerror;
  
  window.onerror = (message, source, lineno, colno, error) => {
    // Log error to console for development
    console.error('Captured error:', {
      message,
      source,
      lineno,
      colno,
      error,
    });

    // Example: Send to error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'javascript_error', {
        error_message: message,
        error_source: source,
        error_lineno: lineno,
        error_colno: colno,
        error_stack: error && error.stack,
      });
    }

    // Call the original error handler if it exists
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    
    // Don't suppress the error
    return false;
  };

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
    
    // Example: Send to error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'unhandled_promise_rejection', {
        error_message: event.reason?.message || 'Unknown promise rejection',
        error_stack: event.reason?.stack,
      });
    }
  });
};
