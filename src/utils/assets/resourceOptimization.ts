
/**
 * Resource optimization utilities to improve page load performance
 */

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
