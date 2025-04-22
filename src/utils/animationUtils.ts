
// Utility to handle scroll reveal animations
export const initScrollRevealAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
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

  // Add morphing shapes animation
  const morphElements = document.querySelectorAll('.morph-shape');
  
  morphElements.forEach(element => {
    const randomDelay = Math.random() * 5;
    element.setAttribute('style', `animation-delay: ${randomDelay}s`);
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

// Optimized 3D tilt effect on elements
export const init3DTiltEffect = () => {
  const tiltElements = document.querySelectorAll('.tilt-effect');
  
  const handleMouseMove = (e: MouseEvent, element: Element) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Enhanced tilt effect with performance optimizations
    const tiltX = (y - 0.5) * 15; // Up to 15 degrees on X axis
    const tiltY = (x - 0.5) * -15; // Up to 15 degrees on Y axis
    const glarePosition = `${x * 100}% ${y * 100}%`;
    
    // Use transform3d for hardware acceleration
    element.setAttribute(
      'style', 
      `transform: perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02) translateZ(0);
       transition: transform 0.1s ease;
       will-change: transform;`
    );
    
    // Add glare effect
    const glareElement = element.querySelector('.glare');
    if (glareElement) {
      glareElement.setAttribute(
        'style', 
        `position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
         background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%); 
         z-index: 1; opacity: 1; transition: opacity 0.3s; pointer-events: none; 
         background-size: 200% 200%; background-position: ${glarePosition};
         will-change: background-position;`
      );
    }
  };
  
  const handleMouseLeave = (element: Element) => {
    element.setAttribute(
      'style',
      'transform: perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0); transition: transform 0.5s ease;'
    );
    
    // Reset glare
    const glareElement = element.querySelector('.glare');
    if (glareElement) {
      glareElement.setAttribute('style', 'opacity: 0');
    }
  };
  
  // Optimize performance with passive event listeners
  const attachEvents = (element: Element) => {
    // Add glare element if it doesn't exist
    if (!element.querySelector('.glare')) {
      const glare = document.createElement('div');
      glare.classList.add('glare');
      glare.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%); z-index: 1; opacity: 0; transition: opacity 0.3s; pointer-events: none; background-size: 200% 200%;');
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

// Add a 3D floating code editor animation
export const init3DCodeAnimation = () => {
  const codeElement = document.querySelector('.floating-code-3d');
  if (!codeElement) return () => {}; // Return empty cleanup if element doesn't exist
  
  // Create a floating animation effect
  const animate = () => {
    const time = Date.now() * 0.001; // time in seconds
    
    // Create subtle floating motion
    const translateY = Math.sin(time) * 10; // 10px up and down
    const rotateY = Math.sin(time * 0.5) * 3; // subtle rotation
    
    codeElement.setAttribute(
      'style',
      `transform: translateY(${translateY}px) rotateY(${rotateY}deg) translateZ(0);
       transition: transform 0.05s ease-out;
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

// Initialize a typing animation for code elements
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
      const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          currentText += text.charAt(charIndex);
          element.textContent = currentText;
          charIndex++;
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
