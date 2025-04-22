/**
 * Performance utility functions for optimizing application loading and runtime
 */

/**
 * Lazy loads images as they come into viewport
 * @param targetSelector - CSS selector for images to lazy load
 * @param rootMargin - Margin around the root
 * @returns A cleanup function to disconnect the observer
 */
export const setupLazyLoading = (
  targetSelector = "img[data-src]",
  rootMargin = "200px 0px"
): (() => void) => {
  if (!window.IntersectionObserver) {
    console.warn("IntersectionObserver not supported in this browser");
    return () => {};
  }

  const targets = document.querySelectorAll(targetSelector);

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;

        if (src) {
          img.src = src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, {
    rootMargin,
    threshold: 0.1,
  });

  targets.forEach((target) => observer.observe(target));

  return () => {
    if (observer) {
      observer.disconnect();
    }
  };
};

/**
 * Defers non-critical JavaScript execution
 * @param callback - Function to execute after defer
 * @param timeout - Time to defer in milliseconds
 */
export const deferNonCritical = (
  callback: () => void,
  timeout = 1000
): void => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => callback());
  } else {
    setTimeout(callback, timeout);
  }
};

/**
 * Prevents layout thrashing by batching DOM read/write operations
 * @param readCallback - Function that reads from the DOM
 * @param writeCallback - Function that writes to the DOM
 */
export const batchDomOperations = <T>(
  readCallback: () => T,
  writeCallback: (data: T) => void
): void => {
  // Read from the DOM first
  const data = readCallback();

  // Then write in the next animation frame to avoid layout thrashing
  requestAnimationFrame(() => {
    writeCallback(data);
  });
};

/**
 * Initializes performance monitoring
 * @returns Monitoring cleanup function
 */
export const initPerformanceMonitoring = (): (() => void) => {
  // Monitor long tasks
  const longTaskObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.warn(`Long task detected: ${entry.duration}ms`);
    });
  });

  try {
    longTaskObserver.observe({ entryTypes: ["longtask"] });
  } catch (e) {
    console.warn("PerformanceObserver for long tasks not supported");
  }

  // Monitor largest contentful paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log(`LCP: ${lastEntry.startTime}ms`);
  });

  try {
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
  } catch (e) {
    console.warn("PerformanceObserver for LCP not supported");
  }

  return () => {
    try {
      longTaskObserver.disconnect();
      lcpObserver.disconnect();
    } catch (e) {
      // Silent catch in case observers weren't properly initialized
    }
  };
};

/**
 * Optimizes animations by using requestAnimationFrame and checking if the element is in viewport
 * @param animationCallback - Animation function to run
 * @param element - DOM element to check for visibility
 * @returns Animation ID that can be used to cancel the animation
 */
export const optimizedAnimation = (
  animationCallback: (timestamp: number) => void,
  element?: HTMLElement
): number => {
  let animationId: number;

  const animate = (timestamp: number) => {
    // Only run animation if element is in viewport or if no element is provided
    if (!element || isElementInViewport(element)) {
      animationCallback(timestamp);
    }

    animationId = requestAnimationFrame(animate);
  };

  animationId = requestAnimationFrame(animate);
  return animationId;
};

/**
 * Checks if an element is currently visible in the viewport
 * @param element - Element to check
 * @returns Boolean indicating if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();

  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom >= 0 &&
    rect.right >= 0
  );
};

/**
 * Initializes all performance optimizations
 * @returns Cleanup function to remove all optimizations
 */
export const initPerformanceOptimizations = (): (() => void) => {
  const cleanupLazyLoading = setupLazyLoading();
  const cleanupPerformanceMonitoring = initPerformanceMonitoring();

  // Initialize other optimizations as needed
  deferNonCritical(() => {
    console.log("Non-critical operations executed");
    // Add non-critical operations here
  });

  return () => {
    cleanupLazyLoading();
    cleanupPerformanceMonitoring();
  };
};
