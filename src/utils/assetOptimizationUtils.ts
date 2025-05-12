
/**
 * Asset optimization utilities to improve page load performance
 */

/**
 * Dynamically loads images based on viewport size and device capabilities
 */
export const optimizeImageLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return () => {}; // No-op for SSR or unsupported browsers
  }
  
  // Create observer for lazy loading
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          
          // Handle srcset for responsive images
          if (image.dataset.srcset) {
            image.srcset = image.dataset.srcset;
            image.removeAttribute('data-srcset');
          }
          
          // Handle regular src
          if (image.dataset.src) {
            // Use a tiny timeout to prevent layout shifts
            setTimeout(() => {
              image.src = image.dataset.src!;
              image.removeAttribute('data-src');
            }, 10);
          }
          
          // Handle background images
          if (image.dataset.bgSrc) {
            image.style.backgroundImage = `url(${image.dataset.bgSrc})`;
            image.removeAttribute('data-bg-src');
          }
          
          imageObserver.unobserve(image);
        }
      });
    },
    {
      rootMargin: '200px 0px', // Start loading before visible
      threshold: 0.01, // Trigger when just 1% visible
    }
  );
  
  // Set up observers
  const setupLazyLoading = () => {
    // Images with src
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
    
    // Images with srcset
    document.querySelectorAll('img[data-srcset]').forEach((img) => {
      imageObserver.observe(img);
    });
    
    // Elements with background images
    document.querySelectorAll('[data-bg-src]').forEach((el) => {
      imageObserver.observe(el);
    });
  };
  
  // Run initially and add a mutation observer to handle dynamically added content
  setupLazyLoading();
  
  // Set up mutation observer for dynamic content
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        setupLazyLoading();
      }
    });
  });
  
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
  
  // Return cleanup function
  return () => {
    imageObserver.disconnect();
    mutationObserver.disconnect();
  };
};

/**
 * Defers non-critical resources loading
 */
export const deferNonCriticalResources = () => {
  if (typeof window === 'undefined') return () => {};
  
  // Create a list of resource types to defer
  const resourcesToDefer = [
    { selector: 'link[rel="preconnect"]', delay: 1000 },
    { selector: 'link[rel="dns-prefetch"]', delay: 1000 },
  ];
  
  const timeout = setTimeout(() => {
    resourcesToDefer.forEach(({ selector, delay }) => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach((element, index) => {
        const clonedElement = element.cloneNode(true);
        const parentNode = element.parentNode;
        
        if (parentNode) {
          // Remove the original element to prevent immediate loading
          parentNode.removeChild(element);
          
          // Add back after specified delay to defer loading
          setTimeout(() => {
            parentNode.appendChild(clonedElement);
          }, delay + (index * 100)); // Stagger loading
        }
      });
    });
  }, 0);
  
  return () => clearTimeout(timeout);
};

/**
 * Check for broken images and replace with fallbacks
 */
export const handleBrokenImages = () => {
  if (typeof window === 'undefined') return () => {};
  
  const fallbackImageUrl = '/placeholder.svg';
  
  const errorHandler = (event: Event) => {
    const img = event.target as HTMLImageElement;
    
    // Only handle if not already using fallback
    if (img.src !== fallbackImageUrl && !img.classList.contains('no-fallback')) {
      console.warn(`Image failed to load: ${img.src}`);
      img.src = fallbackImageUrl;
      
      // Add class to indicate fallback was applied
      img.classList.add('image-fallback-applied');
      
      // Add title with original source for debugging
      img.title = `Original source: ${img.getAttribute('data-original-src') || 'Unknown'}`;
    }
  };
  
  // Store original sources for debugging and add error handlers
  document.querySelectorAll('img').forEach((img) => {
    // Store original source if not already stored
    if (!img.getAttribute('data-original-src') && img.src) {
      img.setAttribute('data-original-src', img.src);
    }
    
    // Add error handler
    img.addEventListener('error', errorHandler);
  });
  
  // Add a mutation observer to handle dynamically added images
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            
            if (element.tagName === 'IMG') {
              // Store original source
              const img = element as HTMLImageElement;
              if (!img.getAttribute('data-original-src') && img.src) {
                img.setAttribute('data-original-src', img.src);
              }
              
              // Add error handler
              img.addEventListener('error', errorHandler);
            }
            
            // Check for nested images
            element.querySelectorAll('img').forEach((img) => {
              if (!img.getAttribute('data-original-src') && img.src) {
                img.setAttribute('data-original-src', img.src);
              }
              
              img.addEventListener('error', errorHandler);
            });
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
  
  return () => {
    // Clean up by removing all error handlers
    document.querySelectorAll('img').forEach((img) => {
      img.removeEventListener('error', errorHandler);
    });
    
    observer.disconnect();
  };
};
