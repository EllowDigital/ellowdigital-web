/**
 * Performance utility functions for optimizing application loading and runtime
 */

/**
 * Lazy loads images as they come into the viewport with customizable thresholds and root margins.
 * Supports higher performance via IntersectionObserver.
 * @param targetSelector - CSS selector for images to lazy load.
 * @param rootMargin - Margin around the root.
 * @returns A cleanup function to disconnect the observer.
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

  return () => observer.disconnect();
};

/**
 * Defers non-critical JavaScript execution, optimizing for low-priority tasks.
 * @param callback - Function to execute after defer.
 * @param timeout - Time to defer in milliseconds.
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
 * Prevents layout thrashing by batching DOM read/write operations, ensuring better performance.
 * @param readCallback - Function that reads from the DOM.
 * @param writeCallback - Function that writes to the DOM.
 */
export const batchDomOperations = <T>(
  readCallback: () => T,
  writeCallback: (data: T) => void
): void => {
  const data = readCallback();
  requestAnimationFrame(() => writeCallback(data));
};

/**
 * Initializes performance monitoring tools such as long task and largest contentful paint monitoring.
 * @returns Monitoring cleanup function.
 */
export const initPerformanceMonitoring = (): (() => void) => {
  const longTaskObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.warn(`Long task detected: ${entry.duration}ms`);
    });
  });

  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log(`LCP: ${lastEntry.startTime}ms`);
  });

  try {
    longTaskObserver.observe({ entryTypes: ["longtask"] });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
  } catch (e) {
    console.warn("PerformanceObserver for long tasks or LCP not supported");
  }

  return () => {
    longTaskObserver.disconnect();
    lcpObserver.disconnect();
  };
};

/**
 * Optimizes animations by checking if the element is in the viewport and using requestAnimationFrame.
 * @param animationCallback - Animation function to run.
 * @param element - DOM element to check for visibility.
 * @returns Animation ID to cancel the animation if needed.
 */
export const optimizedAnimation = (
  animationCallback: (timestamp: number) => void,
  element?: HTMLElement
): number => {
  let animationId: number;

  const animate = (timestamp: number) => {
    if (!element || isElementInViewport(element)) {
      animationCallback(timestamp);
    }

    animationId = requestAnimationFrame(animate);
  };

  animationId = requestAnimationFrame(animate);
  return animationId;
};

/**
 * Checks if an element is currently visible in the viewport to trigger animations or other actions.
 * @param element - Element to check.
 * @returns Boolean indicating if element is in viewport.
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
 * Initializes all performance optimizations in a batch for a smoother user experience.
 * This includes lazy loading, performance monitoring, and deferred operations.
 * @returns Cleanup function to remove all optimizations.
 */
export const initPerformanceOptimizations = (): (() => void) => {
  const cleanupLazyLoading = setupLazyLoading();
  const cleanupPerformanceMonitoring = initPerformanceMonitoring();

  // Add additional optimizations or non-critical tasks here
  deferNonCritical(() => {
    console.log("Deferred non-critical operations executed");
    // Example: Load external resources or secondary features
  });

  return () => {
    cleanupLazyLoading();
    cleanupPerformanceMonitoring();
    console.log("All performance optimizations cleaned up.");
  };
};

/**
 * Improved network performance with adaptive image resolution
 * Loads lower resolution images based on connection type and screen size
 * @param targetSelector - CSS selector for responsive images
 * @param smallResolutionSize - Max width for small resolution
 */
export const setupAdaptiveImages = (
  targetSelector = "img[data-srcset]",
  smallResolutionSize = 600
): (() => void) => {
  const images = document.querySelectorAll(targetSelector);

  const isLowBandwidth =
    navigator.connection?.effectiveType === "2g" ||
    navigator.connection?.effectiveType === "3g";
  const isSmallScreen = window.innerWidth <= smallResolutionSize;

  images.forEach((img: HTMLImageElement) => {
    const srcset = img.dataset.srcset;
    if (srcset) {
      const resolutions = srcset
        .split(",")
        .map((resolution) => resolution.trim());
      const bestResolution = resolutions.find((res) => {
        const [src, width] = res.split(" ");
        return isLowBandwidth
          ? parseInt(width) <= 600
          : isSmallScreen
          ? parseInt(width) <= 800
          : true;
      });

      if (bestResolution) {
        img.srcset = bestResolution.split(" ")[0];
      }
    }
  });

  return () => {};
};

/**
 * Preloads important fonts or assets to optimize rendering performance.
 * @param fontUrl - URL to the font file.
 * @param fontFamily - Font family name.
 * @param fontWeight - Optional font weight (default is "normal").
 */
export const preloadFont = (
  fontUrl: string,
  fontFamily: string,
  fontWeight: string = "normal"
): void => {
  const fontFace = new FontFace(fontFamily, `url(${fontUrl})`, {
    weight: fontWeight,
  });
  document.fonts.add(fontFace);
  fontFace
    .load()
    .then(() => {
      console.log(`${fontFamily} font preloaded successfully.`);
    })
    .catch(() => {
      console.warn(`Failed to preload ${fontFamily} font.`);
    });
};

// Function to optimize network connection if available
const optimizeNetworkConnection = (): void => {
  // Check if the Navigator API and connection property are available
  const nav = navigator as Navigator & { 
    connection?: {
      saveData: boolean;
      effectiveType: string;
    }
  };
  
  if (nav.connection) {
    // Log network connection information for debugging
    console.info(`Network Connection: ${nav.connection.effectiveType}`);
    console.info(`Data Saver Mode: ${nav.connection.saveData ? 'On' : 'Off'}`);
  }
};
