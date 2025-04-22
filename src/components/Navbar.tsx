
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Tech Stack", href: "#techstack" },
  { name: "Why Us", href: "#why-us" },
  { name: "Offers", href: "#offers" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  
  // Handle scroll and section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Simple section detection
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    // Initial call to set the active section
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
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

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 shadow-lg backdrop-blur-md border-b border-brand-yellow/10"
          : "bg-black/80 backdrop-blur-lg"
      }`}
      style={{ 
        WebkitBackdropFilter: "blur(8px)", 
        backdropFilter: "blur(8px)",
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
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-base font-semibold transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-yellow/70 relative group ${
                  activeSection === link.href.substring(1) 
                    ? "text-brand-yellow" 
                    : "text-white hover:text-brand-yellow"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className={`absolute left-0 bottom-0 h-0.5 bg-brand-yellow transition-all duration-300 ${
                  activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-6 py-2 font-bold rounded-full bg-gradient-to-r from-brand-gold to-brand-yellow text-black shadow-md hover:scale-105 transition-all duration-200 border-2 border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              {/* 3D hover effect for CTA button */}
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center px-3 py-2 rounded text-brand-yellow hover:bg-brand-yellow/10 transition"
            onClick={() => setIsMobileMenuOpen((m) => !m)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              width={28}
              height={28}
              viewBox="0 0 32 32"
              fill="none"
              className="stroke-current transition-transform duration-300"
              style={{ 
                transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              {isMobileMenuOpen ? (
                <path
                  d="M8 8L24 24M24 8L8 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M5 10h22M5 16h22M5 22h22"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 pt-3 pb-6 border-t border-brand-yellow/10 animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-5 py-3 text-base font-semibold w-full text-center rounded transition-colors duration-200 ${
                  activeSection === link.href.substring(1)
                    ? "text-brand-yellow bg-brand-yellow/10" 
                    : "text-white hover:bg-brand-yellow/10 hover:text-brand-yellow"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 px-7 py-3 font-bold rounded-full bg-gradient-to-r from-brand-gold to-brand-yellow text-black shadow hover:scale-105 transition w-3/4 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
