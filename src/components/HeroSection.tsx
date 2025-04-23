import { useEffect, useRef, useState } from "react";
import {
  init3DCodeAnimation,
  initTypingAnimation,
} from "@/utils/animationUtils";
import { ArrowRight, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sequential fade-in for hero texts
    const delays = [150, 400, 700];
    setTimeout(
      () => headlineRef.current?.classList.add("opacity-100", "translate-y-0"),
      delays[0]
    );
    setTimeout(
      () => taglineRef.current?.classList.add("opacity-100", "translate-y-0"),
      delays[1]
    );
    setTimeout(() => {
      ctaRef.current?.classList.add(
        "opacity-100",
        "translate-y-0",
        "scale-100"
      );
      setIsLoaded(true); // Enable 3D animations after initial load
    }, delays[2]);
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
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-24 z-10"
    >
      {/* Abstract Coding Team Silhouettes as Animated Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full blur-[50px]"
        >
          <defs>
            {/* Black, white, yellow animated gradient */}
            <linearGradient
              id="grad-animated"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFD700">
                <animate
                  attributeName="stop-color"
                  values="#FFD700;#FFFFFF;#000000;#FFD700"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#000000">
                <animate
                  attributeName="stop-color"
                  values="#000000;#FFFFFF;#FFD700;#000000"
                  dur="14s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>

          <g>
            {/* Coder 1 */}
            <path fill="url(#grad-animated)" opacity="0.4">
              <animate
                attributeName="d"
                dur="16s"
                repeatCount="indefinite"
                values="
            M300,220 C330,190 370,190 400,220 C430,250 420,300 400,340 C380,380 320,380 300,340 C280,300 270,250 300,220 Z;
            M290,230 C320,200 380,210 410,240 C440,270 410,320 390,350 C360,380 310,370 290,340 C270,310 260,260 290,230 Z;
            M300,220 C330,190 370,190 400,220 C430,250 420,300 400,340 C380,380 320,380 300,340 C280,300 270,250 300,220 Z"
              />
            </path>

            {/* Coder 2 */}
            <path fill="url(#grad-animated)" opacity="0.35">
              <animate
                attributeName="d"
                dur="18s"
                repeatCount="indefinite"
                values="
            M600,280 C640,250 700,260 740,300 C780,340 750,440 700,490 C650,540 580,520 540,460 C500,400 540,310 600,280 Z;
            M590,290 C630,260 710,270 750,310 C790,350 760,430 710,480 C660,530 580,510 550,450 C520,390 530,320 590,290 Z;
            M600,280 C640,250 700,260 740,300 C780,340 750,440 700,490 C650,540 580,520 540,460 C500,400 540,310 600,280 Z"
              />
            </path>

            {/* Coder 3 (seated pose) */}
            <path fill="url(#grad-animated)" opacity="0.3">
              <animate
                attributeName="d"
                dur="20s"
                repeatCount="indefinite"
                values="
            M880,400 C920,370 980,370 1010,400 C1040,430 1040,500 990,550 C940,600 880,570 860,520 C840,470 840,430 880,400 Z;
            M870,410 C910,380 990,390 1020,420 C1050,450 1030,510 980,550 C930,590 870,560 850,510 C830,460 830,440 870,410 Z;
            M880,400 C920,370 980,370 1010,400 C1040,430 1040,500 990,550 C940,600 880,570 860,520 C840,470 840,430 880,400 Z"
              />
            </path>
          </g>
        </svg>
      </div>

      {/* Main Hero Content */}
      <div className="relative flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto px-6 py-12 md:py-0 z-10">
        {/* Left: Headline, tagline, CTA */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 items-start">
          <h1
            ref={headlineRef}
            className="opacity-0 translate-y-7 transition-all duration-700 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Crafting Bold{" "}
            <span className="gradient-text relative">Digital Solutions</span>{" "}
            for Visionaries
          </h1>
          <p
            ref={taglineRef}
            className="opacity-0 translate-y-6 transition-all duration-700 text-lg md:text-xl text-white/90 max-w-xl"
          >
            Elevate your ideas with intuitive design and robust technology.
            Future-proof, lightning-fast web/apps — all with personal,
            expert-crafted care.
          </p>
          <a
            ref={ctaRef}
            href="#contact"
            className="opacity-0 translate-y-4 scale-90 transition-all duration-700 inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-gold to-brand-yellow text-black font-bold rounded-full shadow-lg hover:scale-105"
          >
            <span className="relative z-10 flex items-center">
              Start Your Project <ArrowRight className="w-6 h-6 ml-2" />
            </span>
            <span className="absolute -z-10 inset-0 rounded-full blur-xl opacity-60 bg-brand-yellow animate-cta-glow"></span>
          </a>
        </div>

        {/* Right: 3D code animation */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center mt-12 md:mt-0">
          <div ref={codeRef} className="floating-code-3d relative perspective">
            {/* Laptop with screen */}
            <div className="relative w-[420px] h-[280px] transition-all duration-300">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] h-[18px] bg-gradient-to-r from-[#222] to-[#333] rounded-[6px] shadow-2xl"></div>
              <div className="absolute bottom-[17px] left-1/2 -translate-x-1/2 w-[350px] h-[8px] bg-[#1a1a1a] rounded-b-[10px]"></div>
              <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 w-[360px] h-[14px] bg-[#333] rounded-b-[10px]"></div>
              <div className="absolute bottom-[37px] left-1/2 -translate-x-1/2 w-[360px] h-[240px] bg-[#222] rounded-t-[10px] overflow-hidden border border-[#444] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <div className="w-full h-full bg-[#121212] p-[10px] flex flex-col">
                  <div className="flex items-center gap-2 mb-2 px-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF605C]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD44]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#00CA4E]"></div>
                    <div className="h-4 w-24 bg-[#252525] rounded-sm ml-auto"></div>
                    <div className="text-xs text-white/50 absolute right-4">
                      script.js
                    </div>
                  </div>
                  {/* Code editor content */}
                  <div className="flex-1 bg-[#1E1E1E] rounded text-xs p-3 text-left font-mono shadow-inner">
                    <div className="text-[#9CDCFE]">
                      <span className="text-[#C586C0]">const</span>{" "}
                      <span>createWebsite</span>{" "}
                      <span className="text-white">=</span>{" "}
                      <span className="text-[#DCDCAA]">(client)</span>{" "}
                      <span className="text-white">=&gt;</span>{" "}
                      <span className="text-[#DCDCAA]">{`{`}</span>
                    </div>
                    <div className="ml-4 text-[#6A9955]">
                      // Crafting amazing digital experiences
                    </div>
                    <div className="ml-4">
                      <span className="text-[#C586C0]">return</span>{" "}
                      <span className="text-[#DCDCAA]">new</span>{" "}
                      <span className="text-[#4EC9B0]">Promise</span>
                    </div>
                    <div className="ml-8">
                      <span
                        data-typing="const design = createDesign(client.needs);"
                        data-typing-delay="800"
                        data-typing-speed="35"
                      ></span>
                    </div>
                    <div className="ml-8">
                      <span
                        data-typing="const code = buildArchitecture(design);"
                        data-typing-delay="2000"
                        data-typing-speed="35"
                      ></span>
                    </div>
                    <div className="ml-8">
                      <span
                        data-typing="const website = deployOptimized(code);"
                        data-typing-delay="3200"
                        data-typing-speed="35"
                      ></span>
                    </div>
                    <div className="ml-8">
                      <span
                        data-typing="resolve(website); // Beautiful & Performant"
                        data-typing-delay="4400"
                        data-typing-speed="35"
                        data-typing-cursor
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Enhanced floating tech icons with better animations */}
            <div
              className="absolute -top-10 -right-6 w-14 h-14 bg-brand-yellow/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-brand-yellow animate-float shadow-lg border border-brand-yellow/30"
              style={{ animationDelay: "0.2s" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7"
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </div>
            <div
              className="absolute top-10 -left-8 w-14 h-14 bg-brand-gold/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-brand-gold animate-float shadow-lg border border-brand-gold/30"
              style={{ animationDelay: "1.5s" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div
              className="absolute bottom-10 -right-6 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white animate-float shadow-lg border border-white/20"
              style={{ animationDelay: "0.8s" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden sm:flex flex-col items-center animate-bounce">
        <span className="text-white/80 text-sm mb-2 font-medium">
          Scroll Down
        </span>
        <div className="w-8 h-8 rounded-full border-2 border-brand-yellow/50 flex items-center justify-center">
          <ChevronDown className="w-5 h-5 text-brand-yellow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
