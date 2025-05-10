
import { useEffect, useState } from 'react';

// Breakpoint values to detect screen sizes (same as Tailwind's)
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Hook to track current breakpoint
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(window.innerWidth));
  
  useEffect(() => {
    // Throttle resize event for performance
    let resizeTimer: NodeJS.Timeout;
    
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setBreakpoint(getBreakpoint(window.innerWidth));
      }, 100);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return breakpoint;
}

// Get current breakpoint from width
function getBreakpoint(width: number) {
  if (width < BREAKPOINTS.sm) return 'xs';
  if (width < BREAKPOINTS.md) return 'sm';
  if (width < BREAKPOINTS.lg) return 'md';
  if (width < BREAKPOINTS.xl) return 'lg';
  if (width < BREAKPOINTS['2xl']) return 'xl';
  return '2xl';
}

// Hook to detect touch device
export function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    const detectTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };
    
    detectTouch();
  }, []);
  
  return isTouch;
}

// Function to generate responsive font sizes using clamp
export function responsiveFontSize(
  minFontSize: number, // px
  maxFontSize: number, // px
  minScreenWidth: number = BREAKPOINTS.xs, // px
  maxScreenWidth: number = BREAKPOINTS.xl // px
) {
  // Convert to rem for better accessibility
  const minFontRem = minFontSize / 16;
  const maxFontRem = maxFontSize / 16;
  
  // Calculate the slope and intercept for the linear equation
  const slope = (maxFontRem - minFontRem) / (maxScreenWidth - minScreenWidth);
  const intercept = minFontRem - slope * minScreenWidth;
  
  // Generate the clamp function
  return `clamp(${minFontRem}rem, ${intercept.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontRem}rem)`;
}

// Function to check if an element is in viewport
export function isElementInViewport(
  element: HTMLElement | null, 
  offset: number = 0
) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top - offset <= window.innerHeight &&
    rect.bottom + offset >= 0
  );
}

// Function to optimize DOM batch operations for better performance
export function batchDomOperations<T>(
  calculateFn: () => T, 
  updateFn: (result: T) => void
) {
  requestAnimationFrame(() => {
    const result = calculateFn();
    requestAnimationFrame(() => {
      updateFn(result);
    });
  });
}

// Function to generate CSS aspect ratio
export function getAspectRatio(width: number, height: number) {
  return { paddingBottom: `${(height / width) * 100}%` };
}

// Media query helpers for conditional rendering
export const mediaQueries = {
  xs: '(max-width: 474px)',
  sm: '(min-width: 475px) and (max-width: 639px)',
  md: '(min-width: 640px) and (max-width: 767px)',
  lg: '(min-width: 768px) and (max-width: 1023px)',
  xl: '(min-width: 1024px) and (max-width: 1279px)',
  '2xl': '(min-width: 1280px)',
};
