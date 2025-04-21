
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
    
    const tiltX = (y - 0.5) * 10; // Tilt up to 10 degrees on X axis
    const tiltY = (x - 0.5) * -10; // Tilt up to 10 degrees on Y axis
    
    element.setAttribute(
      'style', 
      `transform: perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02);
       transition: transform 0.1s ease`
    );
  };
  
  const handleMouseLeave = (element: Element) => {
    element.setAttribute(
      'style',
      'transform: perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1); transition: transform 0.5s ease'
    );
  };
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      if (e instanceof MouseEvent) {
        handleMouseMove(e, element);
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
