
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add staggered animation to hero elements
    if (titleRef.current) {
      titleRef.current.classList.add('revealed', 'fade-up');
    }
    
    setTimeout(() => {
      if (subTitleRef.current) {
        subTitleRef.current.classList.add('revealed', 'fade-up');
      }
    }, 400);
    
    setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.classList.add('revealed', 'fade-up');
      }
    }, 800);

    setTimeout(() => {
      if (visualRef.current) {
        visualRef.current.classList.add('revealed', 'fade-left');
      }
    }, 1000);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden snap-start"
    >
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 dark:bg-black/60 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/digital-abstract.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-blue/10 via-brand-purple/5 to-transparent"></div>
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-brand-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl"></div>
          </div>
        </video>
      </div>

      {/* Floating gradient blobs */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl morph-shape" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl morph-shape" style={{ animationDelay: '5s' }}></div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white reveal-animate"
            >
              Crafting Innovative
              <span className="gradient-text block">Digital Experiences</span>
              with Passion & Precision
            </h1>
            <p 
              ref={subTitleRef}
              className="text-lg md:text-xl text-white/80 reveal-animate"
            >
              Transforming bold ideas into intuitive, scalable, and future-proof solutions
              for businesses of all sizes.
            </p>
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 reveal-animate"
            >
              <Button asChild size="lg" className="glass-effect hover:bg-brand-yellow/70 hover:text-black text-white border-brand-yellow/50">
                <a href="#contact">
                  Start Your Journey With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="backdrop-blur-md bg-transparent border-white/20 text-white hover:bg-white/10">
                <a href="#services">Explore Our Services</a>
              </Button>
            </div>
          </div>

          <div 
            ref={visualRef}
            className="relative reveal-animate hidden lg:block"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-brand-yellow/10 rounded-2xl transform rotate-3"></div>
            <div className="relative glass-effect card-3d tilt-effect border shadow-lg p-6 rounded-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-yellow/20 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <div className="text-white text-xl font-bold">EllowDigitals</div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
                <div className="h-4 bg-white/10 rounded-full w-1/2"></div>
                <div className="h-4 bg-white/10 rounded-full w-5/6"></div>
                <div className="h-4 bg-white/10 rounded-full w-2/3"></div>
              </div>
              <div className="mt-6 flex justify-end">
                <div className="h-10 bg-brand-yellow/80 rounded-lg w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white text-sm mb-2">Scroll Down</span>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
