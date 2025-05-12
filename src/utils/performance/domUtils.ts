
/**
 * DOM-related performance optimization utilities
 */
import { useEffect, useRef, useState } from 'react';

/**
 * Check if an element is currently in the viewport
 * @param {HTMLElement} element - The DOM element to check
 * @returns {boolean} - True if the element is in the viewport
 */
export const isElementInViewport = (element: HTMLElement | null): boolean => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
};

/**
 * Batch DOM operations for better performance
 * @param {Function} checkFn - Function that returns a value to be checked
 * @param {Function} callback - Callback to be executed with the check result
 */
export const batchDomOperations = <T>(
  checkFn: () => T,
  callback: (result: T) => void
): void => {
  // Use requestAnimationFrame to batch operations in the next frame
  requestAnimationFrame(() => {
    const result = checkFn();
    callback(result);
  });
};

/**
 * Optimize media loading with lazy loading and priority hints
 * @returns {Function} Cleanup function
 */
export const optimizeMediaLoading = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Handle images
        if (element.tagName === 'IMG') {
          const img = element as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
        }
        
        // Handle videos
        if (element.tagName === 'VIDEO') {
          const video = element as HTMLVideoElement;
          if (video.dataset.src) {
            video.src = video.dataset.src;
            video.load();
            video.removeAttribute('data-src');
          }
        }
        
        observer.unobserve(element);
      }
    });
  }, {
    rootMargin: '200px', // Start loading when within 200px of viewport
  });

  // Find all media with data-src attribute
  const lazyElements = document.querySelectorAll('img[data-src], video[data-src]');
  lazyElements.forEach(element => {
    observer.observe(element);
  });

  // Apply priority hints to critical above-the-fold images
  document.querySelectorAll('img.priority').forEach(img => {
    (img as HTMLImageElement).fetchPriority = 'high';
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
};

/**
 * Temporarily remove offscreen elements to reduce memory usage
 */
export const purgeOffscreenElements = () => {
  const viewport = {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
    buffer: 1000, // 1000px buffer zone
  };
  
  // Find elements that can be purged
  document.querySelectorAll('[data-purgeable]').forEach(el => {
    const element = el as HTMLElement;
    const rect = element.getBoundingClientRect();
    const elemTop = rect.top + window.scrollY;
    const elemBottom = rect.bottom + window.scrollY;
    
    // If element is far from viewport
    if (elemBottom < viewport.top - viewport.buffer || 
        elemTop > viewport.bottom + viewport.buffer) {
      
      // Store original content and replace with placeholder
      if (!element.dataset.purged) {
        element.dataset.purgedContent = element.innerHTML;
        element.dataset.purged = 'true';
        element.innerHTML = '';
        element.style.minHeight = `${rect.height}px`;
      }
    } else {
      // Restore content if element is near viewport
      if (element.dataset.purged) {
        if (element.dataset.purgedContent) {
          element.innerHTML = element.dataset.purgedContent;
        }
        element.removeAttribute('data-purged');
        element.removeAttribute('data-purged-content');
        element.style.minHeight = '';
      }
    }
  });
};
