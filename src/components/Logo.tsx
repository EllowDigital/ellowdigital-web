
import { useEffect, useRef } from 'react';

const Logo = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logoElement = logoRef.current;
    if (!logoElement) return;

    const spans = logoElement.querySelectorAll('span.animate-letter');
    
    spans.forEach((span, index) => {
      (span as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="flex items-center" ref={logoRef}>
      <div className="animated-logo text-xl md:text-2xl font-bold flex items-center">
        <span className="gradient-text relative">
          {'Ellow'.split('').map((letter, index) => (
            <span key={index} className="animate-letter inline-block" style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              transform: 'translateY(100%)',
              animation: 'logoReveal 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0)'
            }}>
              {letter}
            </span>
          ))}
        </span>
        <span className="text-foreground dark:text-brand-yellow relative">
          {'Digitals'.split('').map((letter, index) => (
            <span key={index} className="animate-letter inline-block" style={{
              animationDelay: `${(index + 5) * 0.1}s`,
              opacity: 0,
              transform: 'translateY(100%)',
              animation: 'logoReveal 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0)'
            }}>
              {letter}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Logo;
