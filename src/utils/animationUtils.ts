
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

  window.addEventListener('scroll', handleParallax);
  
  return () => {
    window.removeEventListener('scroll', handleParallax);
    elementsToAnimate.forEach(element => {
      observer.unobserve(element);
    });
  };
};

// Initialize 3D tilt effect on elements
export const init3DTiltEffect = () => {
  const tiltElements = document.querySelectorAll('.tilt-effect');
  
  const handleMouseMove = (e: MouseEvent, element: Element) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const tiltX = (y - 0.5) * 15; // Enhanced tilt up to 15 degrees on X axis
    const tiltY = (x - 0.5) * -15; // Enhanced tilt up to 15 degrees on Y axis
    const glarePosition = `${x * 100}% ${y * 100}%`;
    
    element.setAttribute(
      'style', 
      `transform: perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02);
       transition: transform 0.1s ease`
    );
    
    // Add glare effect
    const glareElement = element.querySelector('.glare');
    if (glareElement) {
      glareElement.setAttribute('style', `background-position: ${glarePosition}`);
    }
  };
  
  const handleMouseLeave = (element: Element) => {
    element.setAttribute(
      'style',
      'transform: perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1); transition: transform 0.5s ease'
    );
    
    // Reset glare
    const glareElement = element.querySelector('.glare');
    if (glareElement) {
      glareElement.setAttribute('style', 'opacity: 0');
    }
  };
  
  tiltElements.forEach(element => {
    // Add glare element if it doesn't exist
    if (!element.querySelector('.glare')) {
      const glare = document.createElement('div');
      glare.classList.add('glare');
      glare.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%); z-index: 1; opacity: 0; transition: opacity 0.3s; pointer-events: none; background-size: 200% 200%;');
      element.appendChild(glare);
    }
    
    element.addEventListener('mousemove', (e) => {
      if (e instanceof MouseEvent) {
        handleMouseMove(e, element);
        // Show glare
        const glareElement = element.querySelector('.glare');
        if (glareElement) {
          glareElement.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%); z-index: 1; opacity: 1; transition: opacity 0.3s; pointer-events: none; background-size: 200% 200%;');
        }
      }
    });
    element.addEventListener('mouseleave', () => handleMouseLeave(element));
  });
  
  return () => {
    tiltElements.forEach(element => {
      element.removeEventListener('mousemove', (e) => {
        if (e instanceof MouseEvent) {
          handleMouseMove(e, element);
        }
      });
      element.removeEventListener('mouseleave', () => handleMouseLeave(element));
    });
  };
};

// Initialize custom cursor
export const initCustomCursor = () => {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  cursor.innerHTML = `
    <div class="cursor-dot"></div>
    <div class="cursor-outline"></div>
  `;
  document.body.appendChild(cursor);
  
  const cursorDot = cursor.querySelector('.cursor-dot') as HTMLElement;
  const cursorOutline = cursor.querySelector('.cursor-outline') as HTMLElement;
  
  const handleMouseMove = (e: MouseEvent) => {
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    // Add slight delay to outline for effect
    setTimeout(() => {
      cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, 100);
  };
  
  const handleMouseDown = () => {
    cursorDot.classList.add('cursor-active');
    cursorOutline.classList.add('cursor-active');
  };
  
  const handleMouseUp = () => {
    cursorDot.classList.remove('cursor-active');
    cursorOutline.classList.remove('cursor-active');
  };
  
  const handleMouseEnterLink = () => {
    cursorDot.classList.add('cursor-link');
    cursorOutline.classList.add('cursor-link');
  };
  
  const handleMouseLeaveLink = () => {
    cursorDot.classList.remove('cursor-link');
    cursorOutline.classList.remove('cursor-link');
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mouseup', handleMouseUp);
  
  // Add hover effect for links and buttons
  const links = document.querySelectorAll('a, button');
  links.forEach(link => {
    link.addEventListener('mouseenter', handleMouseEnterLink);
    link.addEventListener('mouseleave', handleMouseLeaveLink);
  });
  
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
    
    links.forEach(link => {
      link.removeEventListener('mouseenter', handleMouseEnterLink);
      link.removeEventListener('mouseleave', handleMouseLeaveLink);
    });
    
    if (cursor.parentNode) {
      cursor.parentNode.removeChild(cursor);
    }
  };
};
