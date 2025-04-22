
import { useEffect, useRef, useState } from "react";
import { init3DCodeAnimation, initTypingAnimation } from "@/utils/animationUtils";

const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sequential fade-in for hero texts
    setTimeout(() => headlineRef.current?.classList.add("opacity-100", "translate-y-0"), 150);
    setTimeout(() => taglineRef.current?.classList.add("opacity-100", "translate-y-0"), 400);
    setTimeout(() => {
      ctaRef.current?.classList.add("opacity-100", "scale-100");
      setIsLoaded(true); // Enable 3D animations after initial load
    }, 700);
  }, []);
  
  useEffect(() => {
    if (!isLoaded) return;
    
    // Initialize 3D animations after page load
    const cleanup3DCode = init3DCodeAnimation();
    const cleanupTyping = initTypingAnimation();
    
    return () => {
      cleanup3DCode();
      cleanupTyping();
    };
  }, [isLoaded]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-black overflow-hidden pt-24"
      style={{ zIndex: 1 }}
    >
      {/* Animated 3D/Blob SVG Background with optimized performance */}
      <div className="absolute inset-0 -z-10 animate-bg-blob">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1100 700"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="g1" cx="70%" cy="10%" r="100%" gradientTransform="rotate(15)">
              <stop offset="0%" stopColor="#FFDF00" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g2" cx="20%" cy="90%" r="120%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#FFDF00" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g3" cx="60%" cy="70%" r="85%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse
            cx="330"
            cy="120"
            rx="400"
            ry="230"
            fill="url(#g1)"
          >
            <animate attributeName="rx" values="400;430;380;400" dur="8s" repeatCount="indefinite" />
          </ellipse>
          <ellipse
            cx="850"
            cy="550"
            rx="260"
            ry="180"
            fill="url(#g2)"
          >
            <animate attributeName="rx" values="260;320;230;260" dur="7.2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse
            cx="600"
            cy="400"
            rx="225"
            ry="105"
            fill="url(#g3)"
          >
            <animate attributeName="ry" values="105;125;95;105" dur="6.5s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>

      {/* MAIN HERO ROW */}
      <div className="relative flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto px-5 z-10">
        {/* LEFT: Headline, tagline, CTA */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 items-start">
          <h1
            ref={headlineRef}
            className="opacity-0 translate-y-7 transition-all duration-700 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg"
          >
            Crafting Bold <span className="gradient-text">Digital Solutions</span> for Visionaries
          </h1>
          <p
            ref={taglineRef}
            className="opacity-0 translate-y-6 transition-all duration-700 text-lg md:text-xl text-white/80 max-w-xl"
          >
            Elevate your ideas with intuitive design and robust tech. Future-proof, lightning-fast web/apps — all with personal, expert-crafted care.
          </p>
          <a
            ref={ctaRef}
            href="#contact"
            className="opacity-0 scale-90 transition-all duration-700 relative inline-flex items-center px-7 py-3 bg-gradient-to-r from-brand-gold to-brand-yellow hover:from-brand-yellow hover:to-brand-gold text-black font-bold rounded-full shadow-lg hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-yellow/80 active:brightness-95 text-lg uppercase"
          >
            <span className="mr-3">Start Your Project</span>
            <svg
              className="w-6 h-6 -mr-1 transition-transform group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14"></path>
              <path d="M13 5l7 7-7 7"></path>
            </svg>
            {/* Animated Glow - optimized for performance */}
            <span className="absolute -z-10 inset-0 rounded-full blur-xl opacity-40 bg-brand-yellow bg-opacity-60 animate-cta-glow will-change-opacity" />
          </a>
        </div>
        
        {/* RIGHT: 3D code animation */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center">
          <div ref={codeRef} className="floating-code-3d select-none relative perspective mt-10 md:mt-0">
            {/* 3D Laptop with code editor */}
            <div className="relative w-[380px] h-[260px] transition-all duration-300">
              {/* Laptop base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[20px] bg-gradient-to-r from-[#222] to-[#333] rounded-[4px] shadow-xl"></div>
              
              {/* Laptop body */}
              <div className="absolute bottom-[19px] left-1/2 -translate-x-1/2 w-[340px] h-[14px] bg-[#333] rounded-b-[10px]"></div>
              
              {/* Screen */}
              <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 w-[340px] h-[220px] bg-[#222] rounded-t-[10px] overflow-hidden perspective">
                <div className="w-full h-full bg-[#121212] p-[10px] flex flex-col">
                  {/* Code editor header */}
                  <div className="flex items-center gap-2 mb-2 px-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF605C]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD44]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#00CA4E]"></div>
                    <div className="ml-auto text-xs text-white/50">script.js</div>
                  </div>
                  
                  {/* Code editor body with typed text */}
                  <div className="flex-1 bg-[#1E1E1E] rounded text-xs p-3 text-left font-mono">
                    <div className="text-[#9CDCFE]">
                      <span className="text-[#C586C0]">const</span> <span>createWebsite</span> <span className="text-white">=</span> <span className="text-[#DCDCAA]">(</span><span className="text-[#9CDCFE]">client</span><span className="text-[#DCDCAA]">)</span> <span className="text-white">=&gt;</span> <span className="text-[#DCDCAA]">{`{`}</span>
                    </div>
                    <div className="ml-4 text-[#6A9955]">// Crafting amazing digital experiences</div>
                    <div className="ml-4">
                      <span className="text-[#C586C0]">return</span> <span className="text-[#DCDCAA]">new</span> <span className="text-[#4EC9B0]">Promise</span><span className="text-white">(</span><span className="text-[#DCDCAA]">resolve</span> <span className="text-white">=&gt;</span> <span className="text-[#DCDCAA]">{`{`}</span>
                    </div>
                    <div className="ml-8">
                      <span data-typing="const design = createDesign(client.needs);" data-typing-delay="1200" data-typing-speed="40"></span>
                    </div>
                    <div className="ml-8">
                      <span data-typing="const code = buildArchitecture(design);" data-typing-delay="2500" data-typing-speed="40"></span>
                    </div>
                    <div className="ml-8">
                      <span data-typing="const website = deployOptimized(code);" data-typing-delay="3800" data-typing-speed="40"></span>
                    </div>
                    <div className="ml-8">
                      <span data-typing="resolve(website);" data-typing-delay="5000" data-typing-speed="40" data-typing-cursor></span>
                    </div>
                  </div>
                </div>
                
                {/* Screen reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              </div>
            </div>
            
            {/* Floating tech icons */}
            <div className="absolute -top-10 -right-6 w-12 h-12 bg-brand-yellow/10 rounded-lg flex items-center justify-center text-brand-yellow animate-float" style={{ animationDelay: '0.2s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </div>
            <div className="absolute top-10 -left-8 w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold animate-float" style={{ animationDelay: '1.5s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div className="absolute bottom-10 -right-6 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white animate-float" style={{ animationDelay: '0.8s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator - optimized for performance */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 hidden sm:flex flex-col items-center animate-bounce">
        <span className="text-white/70 text-xs mb-1">Scroll Down</span>
        <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
