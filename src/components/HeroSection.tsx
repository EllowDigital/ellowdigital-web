
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Sequential fade-in for hero texts
    setTimeout(() => headlineRef.current?.classList.add("opacity-100", "translate-y-0"), 150);
    setTimeout(() => taglineRef.current?.classList.add("opacity-100", "translate-y-0"), 400);
    setTimeout(() => ctaRef.current?.classList.add("opacity-100", "scale-100"), 700);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-black overflow-hidden pt-24"
      style={{ zIndex: 1 }}
    >
      {/* Animated 3D/Blob SVG Background */}
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
            {/* Animated Glow */}
            <span className="absolute -z-10 inset-0 rounded-full blur-xl opacity-40 bg-brand-yellow bg-opacity-60 animate-cta-glow" />
          </a>
        </div>
        {/* RIGHT: illustration or showcase */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center">
          <div className="relative flex flex-col items-center select-none pointer-events-none">
            {/* Placeholder illustration - relevant to coding/design */}
            <svg
              width={320}
              height={260}
              viewBox="0 0 340 260"
              fill="none"
              className="drop-shadow-2xl"
            >
              <rect x="18" y="37" width="304" height="180" rx="22" fill="#232323" stroke="#FFD700" strokeWidth="2" />
              <rect x="35" y="60" width="268" height="80" rx="8" fill="#191919" />
              <rect x="60" y="98" width="110" height="12" rx="6" fill="#FFD700" />
              <rect x="60" y="118" width="80" height="9" rx="4.5" fill="#fff" />
              <rect x="60" y="136" width="70" height="7" rx="3.5" fill="#bbbaac" />
              <rect x="170" y="98" width="90" height="12" rx="6" fill="#FFD700" opacity="0.4" />
              <rect x="210" y="118" width="60" height="9" rx="4.5" fill="#fff" opacity="0.7"/>
              <rect x="190" y="136" width="80" height="7" rx="3.5" fill="#bbbaac" opacity="0.65"/>
              {/* Code brackets */}
              <path d="M46 90l12 16-12 16" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M290 90l-12 16 12 16" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" fill="none"/>
              {/* Line at bottom */}
              <rect x="60" y="162" width="170" height="7" rx="3.5" fill="#FFD700" opacity="0.1"/>
            </svg>
            <span className="mt-6 text-xs text-white/30 tracking-widest">built for innovators</span>
          </div>
        </div>
      </div>
      {/* Scroll down indicator */}
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
