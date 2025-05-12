
/**
 * Network-related performance optimization utilities
 */

/**
 * Optimize network requests with connection-aware adjustments
 * @returns {Function} Cleanup function
 */
export const optimizeNetworkRequests = () => {
  const connectionHandler = () => {
    // Safely check for navigator.connection
    const connection = 'connection' in navigator ? 
      (navigator as any).connection : null;
    
    if (connection) {
      // Adjust content quality based on connection type
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        document.body.classList.add('low-data-mode');
        
        // Use lower quality images
        document.querySelectorAll('img[data-low-src]').forEach(img => {
          const image = img as HTMLImageElement;
          if (image.dataset.lowSrc) {
            image.src = image.dataset.lowSrc;
          }
        });
      }
    }
  };

  // Run immediately
  connectionHandler();
  
  // Add listener for connection changes if available
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    connection.addEventListener('change', connectionHandler);
    
    // Return cleanup function
    return () => {
      connection.removeEventListener('change', connectionHandler);
    };
  }
  
  return () => {}; // No-op if connection API not available
};
