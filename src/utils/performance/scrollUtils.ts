
/**
 * Scroll performance optimization utilities
 */

/**
 * Optimize scroll performance with passive listeners and throttling
 * @returns {Function} Cleanup function
 */
export const optimizeScrollPerformance = () => {
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
