
/**
 * Image optimization utilities to improve page load performance
 */

/**
 * Sets up lazy loading for images using IntersectionObserver
 */
export const optimizeImageLoading = () => {
  if (typeof window === 'undefined') return () => {};

  // Check if IntersectionObserver is available
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported in this browser');
    return () => {};
  }

  // Create an observer for lazy loading images
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Replace data-src with src when image comes into view
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: '200px 0px', // Start loading images 200px before they come into view
      threshold: 0.01, // Trigger when even a small part of the image is visible
    }
  );

  // Observe all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });

  // Add 'loading=lazy' attribute to all images that support it
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img:not([loading])').forEach((img) => {
      img.loading = 'lazy';
    });
  }

  // Return cleanup function
  return () => {
    if (lazyImages) {
      lazyImages.forEach((img) => {
        imageObserver.unobserve(img);
      });
    }
  };
};

/**
 * Handles broken image placeholders
 */
export const handleBrokenImages = () => {
  if (typeof window === 'undefined') return () => {};
  
  // Set fallback for broken images
  const handleError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const defaultImage = '/placeholder.svg';
    
    // Prevent infinite loop if fallback image also fails
    if (img.src !== defaultImage) {
      img.src = defaultImage;
      img.alt = 'Image not found';
      img.classList.add('broken-image');
    }
  };

  // Add error handler to all images
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', handleError);
  });
  
  // Add error handler to new images as they're added to the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          if (element.tagName === 'IMG') {
            element.addEventListener('error', handleError);
          }
          element.querySelectorAll('img').forEach((img) => {
            img.addEventListener('error', handleError);
          });
        }
      });
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Return cleanup function
  return () => {
    observer.disconnect();
    document.querySelectorAll('img').forEach((img) => {
      img.removeEventListener('error', handleError);
    });
  };
};
