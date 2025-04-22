
// Utility to handle scroll reveal animations with improved performance
export const initScrollRevealAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Add custom animation class based on data attribute
        const animationType = entry.target.getAttribute('data-animation');
        if (animationType) {
          entry.target.classList.add(animationType);
        }
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, observerOptions);
  
  // Observe all elements with the 'reveal-animate' class
  const elementsToAnimate = document.querySelectorAll('.reveal-animate');
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });

  // Add parallax effect for background elements
  const parallaxElements = document.querySelectorAll('.parallax');
  
  const handleParallax = () => {
    const scrollTop = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || '0.5';
      const yPos = -(scrollTop * parseFloat(speed));
      element.setAttribute('style', `transform: translate3d(0, ${yPos}px, 0)`);
    });
  };

  // Add morphing shapes animation with unique delays
  const morphElements = document.querySelectorAll('.morph-shape');
  
  morphElements.forEach(element => {
    const randomDelay = Math.random() * 10;
    const randomDuration = 20 + Math.random() * 10;
    element.setAttribute('style', `animation-delay: ${randomDelay}s; animation-duration: ${randomDuration}s`);
  });

  // Optimize scroll handler with requestAnimationFrame for better performance
  let ticking = false;
  const optimizedHandleParallax = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', optimizedHandleParallax, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', optimizedHandleParallax);
    elementsToAnimate.forEach(element => {
      observer.unobserve(element);
    });
  };
};

// Enhanced 3D tilt effect on elements with better mouse tracking
export const init3DTiltEffect = () => {
  const tiltElements = document.querySelectorAll('.tilt-effect');
  
  const handleMouseMove = (e: MouseEvent, element: Element) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Enhanced tilt effect with performance optimizations
    const tiltX = (y - 0.5) * 10; // Reduced to 10 degrees for subtler effect
    const tiltY = (x - 0.5) * -10; // Reduced to 10 degrees for subtler effect
    const glarePosition = `${x * 100}% ${y * 100}%`;
    
    // Use transform3d for hardware acceleration and add subtle scale
    element.setAttribute(
      'style', 
      `transform: perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01) translateZ(0);
       transition: transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
       will-change: transform;`
    );
    
    // Enhanced glare effect
    const glareElement = element.querySelector('.glare');
    if (glareElement) {
      glareElement.setAttribute(
        'style', 
        `position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
         background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%); 
         z-index: 1; opacity: 0.6; transition: opacity 0.3s ease-out, transform 0.2s ease-out; pointer-events: none; 
         background-size: 200% 200%; background-position: ${glarePosition};
         transform: rotate(${tiltY * 0.5}deg);
         will-change: background-position, transform, opacity;`
      );
    }
  };
  
  const handleMouseLeave = (element: Element) => {
    // Smoother transition back to original position
    element.setAttribute(
      'style',
      'transform: perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0); transition: transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);'
    );
    
    // Reset glare with fade out
    const glareElement = element.querySelector('.glare');
    if (glareElement) {
      glareElement.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease-out;');
    }
  };
  
  // Optimize performance with passive event listeners
  const attachEvents = (element: Element) => {
    // Add glare element if it doesn't exist
    if (!element.querySelector('.glare')) {
      const glare = document.createElement('div');
      glare.classList.add('glare');
      glare.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%); z-index: 1; opacity: 0; transition: opacity 0.3s ease-out; pointer-events: none; background-size: 200% 200%;');
      element.appendChild(glare);
    }
    
    // Using event delegation for better performance
    const mouseMoveHandler = (e: Event) => {
      if (e instanceof MouseEvent) {
        handleMouseMove(e, element);
      }
    };
    
    const mouseLeaveHandler = () => handleMouseLeave(element);
    
    element.addEventListener('mousemove', mouseMoveHandler, { passive: true });
    element.addEventListener('mouseleave', mouseLeaveHandler, { passive: true });
    
    // Return cleanup function
    return () => {
      element.removeEventListener('mousemove', mouseMoveHandler);
      element.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  };
  
  // Store all cleanup functions
  const cleanupFunctions: Array<() => void> = [];
  
  tiltElements.forEach(element => {
    cleanupFunctions.push(attachEvents(element));
  });
  
  // Return function to clean up all event listeners
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
};

// Enhanced 3D floating code editor animation with more realistic movement
export const init3DCodeAnimation = () => {
  const codeElement = document.querySelector('.floating-code-3d');
  if (!codeElement) return () => {}; // Return empty cleanup if element doesn't exist
  
  // Create a more natural floating animation effect
  const animate = () => {
    const time = Date.now() * 0.001; // time in seconds
    
    // Create subtle floating motion with multiple frequency components
    const translateY = Math.sin(time * 0.5) * 8 + Math.sin(time * 0.32) * 3; // Combined frequencies
    const rotateY = Math.sin(time * 0.3) * 2; // Subtle rotation
    const rotateX = Math.cos(time * 0.4) * 1.5; // Additional axis rotation for more realism
    
    codeElement.setAttribute(
      'style',
      `transform: translateY(${translateY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(0);
       transition: transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1);
       will-change: transform;`
    );
    
    requestAnimationFrame(animate);
  };
  
  // Start animation
  const animationFrame = requestAnimationFrame(animate);
  
  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationFrame);
  };
};

// Enhanced typing animation for code elements with more realistic behavior
export const initTypingAnimation = () => {
  const typingElements = document.querySelectorAll('[data-typing]');
  
  typingElements.forEach(element => {
    const text = element.getAttribute('data-typing') || '';
    const delay = parseInt(element.getAttribute('data-typing-delay') || '0');
    const speed = parseInt(element.getAttribute('data-typing-speed') || '100');
    
    let currentText = '';
    let charIndex = 0;
    
    // Clear any existing content
    element.textContent = '';
    
    // Start typing after specified delay
    setTimeout(() => {
      // Add randomization to typing speed for more natural effect
      const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          // Add random variation to typing speed (±30% variation)
          const randomFactor = 0.7 + Math.random() * 0.6;
          
          currentText += text.charAt(charIndex);
          element.textContent = currentText;
          charIndex++;
          
          // Dynamically adjust interval for next character for more human-like typing
          if (charIndex < text.length) {
            clearInterval(typingInterval);
            
            // Slight pause for punctuation
            const nextChar = text.charAt(charIndex);
            const isPunctuation = ['.', ',', ';', ':', '!', '?'].includes(nextChar);
            
            const nextDelay = isPunctuation ? 
              speed * 3 * randomFactor : // Longer pause for punctuation
              speed * randomFactor;     // Regular typing with randomness
            
            setTimeout(() => {
              // Recursively call with new interval
              const newTypingInterval = setInterval(() => {
                if (charIndex < text.length) {
                  currentText += text.charAt(charIndex);
                  element.textContent = currentText;
                  charIndex++;
                } else {
                  clearInterval(newTypingInterval);
                  
                  // Add blinking cursor at the end if specified
                  if (element.hasAttribute('data-typing-cursor')) {
                    const cursor = document.createElement('span');
                    cursor.className = 'typing-cursor';
                    cursor.textContent = '|';
                    element.appendChild(cursor);
                    
                    // Make cursor blink with slight randomness
                    setInterval(() => {
                      cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                    }, 530);
                  }
                }
              }, speed * randomFactor);
            }, nextDelay);
          }
        } else {
          clearInterval(typingInterval);
          
          // Add blinking cursor at the end if specified
          if (element.hasAttribute('data-typing-cursor')) {
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            element.appendChild(cursor);
            
            // Make cursor blink
            setInterval(() => {
              cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 530);
          }
        }
      }, speed);
    }, delay);
  });
  
  // No cleanup needed as typing is a one-time animation
  return () => {};
};

// Add new function for scroll progress indicator
export const initScrollProgress = () => {
  const scrollProgress = document.querySelector('.scroll-progress');
  if (!scrollProgress) return () => {};
  
  const updateScrollProgress = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.setAttribute('style', `width: ${progress}%`);
  };
  
  // Optimize with passive listener
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  
  // Initial call
  updateScrollProgress();
  
  return () => {
    window.removeEventListener('scroll', updateScrollProgress);
  };
};
