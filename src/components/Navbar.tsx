
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Why Us", href: "#why-us" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  // Handle scroll, section detection, and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state
      setIsScrolled(window.scrollY > 10);

      // Update scroll progress for indicator
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Simple section detection with improved performance
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      // Use a for loop for potentially better performance than forEach on large DOM
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          if (activeSection !== sectionId) {
            setActiveSection(sectionId);
          }
          break;
        }
      }
    };

    // Optimize scroll handler with passive flag
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call to set the active section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking a navigation link
  const handleNavLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll progress indicator */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? "bg-black/90 shadow-lg backdrop-blur-lg border-b border-brand-yellow/10"
            : "bg-black/80 backdrop-blur-md"
          }`}
        style={{
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "blur(8px)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(8px)",
          transform: "translate3d(0,0,0)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-20">
            <a
              href="/"
              className="flex items-center outline-none group perspective"
              style={{ perspective: "1000px" }}
            >
              <div className="transform transition-transform group-hover:scale-105 duration-300">
                <Logo />
              </div>
            </a>

            {/* Desktop Nav with enhanced styles */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-base font-semibold transition-all duration-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-yellow/70 relative group overflow-hidden ${activeSection === link.href.substring(1)
                      ? "text-brand-yellow"
                      : "text-white hover:text-brand-yellow"
                    }`}
                  onClick={handleNavLinkClick}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className={`absolute left-0 bottom-0 h-0.5 bg-brand-yellow transition-all duration-500 rounded-full ${activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  {/* Subtle hover effect */}
                  <span className="absolute inset-0 bg-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                </a>
              ))}
              <a
                href="#contact"
                className="ml-2 px-6 py-2.5 font-bold rounded-full bg-gradient-to-r from-brand-gold to-brand-yellow text-black shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow relative overflow-hidden group"
                onClick={handleNavLinkClick}
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </span>
                {/* Enhanced 3D hover effect for CTA button */}
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -inset-1 blur-md bg-brand-yellow/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              </a>
            </div>

            {/* Mobile Menu Button with enhanced interaction */}
            <button
              className="md:hidden flex items-center px-3 py-2 rounded text-brand-yellow hover:bg-brand-yellow/10 transition-colors active:bg-brand-yellow/20"
              onClick={() => setIsMobileMenuOpen((m) => !m)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-7 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-brand-yellow transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
                <span className={`w-full h-0.5 bg-brand-yellow transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`w-full h-0.5 bg-brand-yellow transition-all duration-300 rounded-full ${isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Nav panel with animations */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 pt-3 pb-6 border-t border-brand-yellow/10 animate-fade-in max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col items-center gap-2 p-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block px-5 py-3 text-base font-semibold w-full text-center rounded-lg transition-all duration-300 ${activeSection === link.href.substring(1)
                      ? "text-brand-yellow bg-brand-yellow/10 shadow-inner"
                      : "text-white hover:bg-brand-yellow/5 hover:text-brand-yellow"
                    }`}
                  onClick={handleNavLinkClick}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-4 px-7 py-3.5 font-bold rounded-xl bg-gradient-to-r from-brand-gold to-brand-yellow text-black shadow hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-5/6 text-center"
                onClick={handleNavLinkClick}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
