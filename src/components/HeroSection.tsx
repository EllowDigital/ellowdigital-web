
import { useEffect, useRef, useState } from "react";
import { init3DCodeAnimation, initTypingAnimation } from "@/utils/animationUtils";
import { ArrowRight, ChevronDown } from "lucide-react";

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
      ctaRef.current?.classList.add("opacity-100", "translate-y-0", "scale-100");
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
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-24"
      style={{ zIndex: 1 }}
    >
      {/* Enhanced Animated Blob SVG Background with optimized performance */}
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
              <stop offset="0%" stopColor="#FFDF00" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g2" cx="20%" cy="90%" r="120%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFDF00" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g3" cx="60%" cy="70%" r="85%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
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
            <animate attributeName="ry" values="230;250;210;230" dur="10s" repeatCount="indefinite" />
          </ellipse>
          <ellipse
            cx="850"
            cy="550"
            rx="260"
            ry="180"
            fill="url(#g2)"
          >
            <animate attributeName="rx" values="260;320;230;260" dur="7.2s" repeatCount="indefinite" />
            <animate attributeName="ry" values="180;200;160;180" dur="9s" repeatCount="indefinite" />
          </ellipse>
          <ellipse
            cx="600"
            cy="400"
            rx="225"
            ry="105"
            fill="url(#g3)"
          >
            <animate attributeName="ry" values="105;125;95;105" dur="6.5s" repeatCount="indefinite" />
            <animate attributeName="rx" values="225;245;210;225" dur="8.5s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>

      {/* MAIN HERO ROW */}
      <div className="relative flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto px-6 z-10 py-12 md:py-0">
        {/* LEFT: Headline, tagline, CTA */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 items-start">
          <h1
            ref={headlineRef}
            className="opacity-0 translate-y-7 transition-all duration-700 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg"
          >
            Crafting Bold <span className="gradient-text relative">Digital Solutions
              <span className="absolute -z-10 bottom-0 left-0 w-full h-full opacity-20 blur-md bg-brand-yellow rounded-full"></span>
            </span> for Visionaries
          </h1>
          <p
            ref={taglineRef}
            className="opacity-0 translate-y-6 transition-all duration-700 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
          >
            Elevate your ideas with intuitive design and robust technology. Future-proof, lightning-fast web/apps — all with personal, expert-crafted care.
          </p>
          <a
            ref={ctaRef}
            href="#contact"
            className="opacity-0 translate-y-4 scale-90 transition-all duration-700 relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-gold to-brand-yellow hover:from-brand-yellow hover:to-brand-gold text-black font-bold rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md text-lg uppercase overflow-hidden group"
          >
            <span className="relative z-10 flex items-center transition-transform group-hover:translate-x-1">
              Start Your Project
              <ArrowRight className="w-6 h-6 ml-2 transition-transform" />
            </span>
            
            {/* Enhanced Animated Glow - optimized for performance */}
            <span className="absolute -z-10 inset-0 rounded-full blur-xl opacity-60 bg-brand-yellow bg-opacity-60 animate-cta-glow will-change-opacity"></span>
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-25 bg-white transition-opacity duration-300"></span>
          </a>
        </div>
        
        {/* RIGHT: 3D code animation */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center mt-12 md:mt-0">
          <div ref={codeRef} className="floating-code-3d select-none relative perspective">
            {/* Enhanced 3D Laptop with code editor */}
            <div className="relative w-[420px] h-[280px] transition-all duration-300">
              {/* Laptop base with enhanced shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] h-[18px] bg-gradient-to-r from-[#222] to-[#333] rounded-[6px] shadow-2xl"></div>
              <div className="absolute bottom-[17px] left-1/2 -translate-x-1/2 w-[350px] h-[8px] bg-[#1a1a1a] rounded-b-[10px]"></div>
              
              {/* Laptop body */}
              <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 w-[360px] h-[14px] bg-[#333] rounded-b-[10px]"></div>
              
              {/* Screen with enhanced lighting effects */}
              <div className="absolute bottom-[37px] left-1/2 -translate-x-1/2 w-[360px] h-[240px] bg-[#222] rounded-t-[10px] overflow-hidden perspective border border-[#444] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <div className="w-full h-full bg-[#121212] p-[10px] flex flex-col">
                  {/* Code editor header with improved styling */}
                  <div className="flex items-center gap-2 mb-2 px-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF605C]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD44]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#00CA4E]"></div>
                    <div className="h-4 w-24 bg-[#252525] rounded-sm ml-auto"></div>
                    <div className="text-xs text-white/50 absolute right-4">script.js</div>
                  </div>
                  
                  {/* Code editor body with typed text and syntax highlighting */}
                  <div className="flex-1 bg-[#1E1E1E] rounded text-xs p-3 text-left font-mono shadow-inner">
                    <div className="text-[#9CDCFE]">
                      <span className="text-[#C586C0]">const</span> <span>createWebsite</span> <span className="text-white">=</span> <span className="text-[#DCDCAA]">(</span><span className="text-[#9CDCFE]">client</span><span className="text-[#DCDCAA]">)</span> <span className="text-white">=&gt;</span> <span className="text-[#DCDCAA]">{`{`}</span>
                    </div>
                    <div className="ml-4 text-[#6A9955]">// Crafting amazing digital experiences</div>
                    <div className="ml-4">
                      <span className="text-[#C586C0]">return</span> <span className="text-[#DCDCAA]">new</span> <span className="text-[#4EC9B0]">Promise</span><span className="text-white">(</span><span className="text-[#DCDCAA]">resolve</span> <span className="text-white">=&gt;</span> <span className="text-[#DCDCAA]">{`{`}</span>
                    </div>
                    <div className="ml-8">
                      <span data-typing="const design = createDesign(client.needs);" data-typing-delay="800" data-typing-speed="35"></span>
                    </div>
                    <div className="ml-8">
                      <span data-typing="const code = buildArchitecture(design);" data-typing-delay="2000" data-typing-speed="35"></span>
                    </div>
                    <div className="ml-8">
                      <span data-typing="const website = deployOptimized(code);" data-typing-delay="3200" data-typing-speed="35"></span>
                    </div>
                    <div className="ml-8">
                      <span data-typing="resolve(website); // Beautiful & Performant" data-typing-delay="4400" data-typing-speed="35" data-typing-cursor></span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced screen lighting effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-[#000]/10 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Enhanced floating tech icons with better animations */}
            <div className="absolute -top-10 -right-6 w-14 h-14 bg-brand-yellow/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-brand-yellow animate-float shadow-lg border border-brand-yellow/30" style={{ animationDelay: '0.2s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </div>
            <div className="absolute top-10 -left-8 w-14 h-14 bg-brand-gold/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-brand-gold animate-float shadow-lg border border-brand-gold/30" style={{ animationDelay: '1.5s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div className="absolute bottom-10 -right-6 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white animate-float shadow-lg border border-white/20" style={{ animationDelay: '0.8s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll down indicator with animation */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden sm:flex flex-col items-center animate-bounce">
        <span className="text-white/80 text-sm mb-2 font-medium">Scroll Down</span>
        <div className="w-8 h-8 rounded-full border-2 border-brand-yellow/50 flex items-center justify-center">
          <ChevronDown className="w-5 h-5 text-brand-yellow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
