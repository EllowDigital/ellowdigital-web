import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Why Us", href: "#why-us" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setScrollProgress(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );

      const sections = document.querySelectorAll("section[id]");
      const offset = window.scrollY + 100;
      for (const section of sections) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id") || "";
        if (offset >= top && offset < top + height) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      {/* Scroll Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-brand-yellow z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled
          ? "bg-black/90 shadow-md backdrop-blur-xl border-b border-brand-yellow/10"
          : "bg-black/70 backdrop-blur-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-yellow to-brand-gold text-transparent bg-clip-text">
              EllowDigital
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${activeSection === link.href.substring(1)
                  ? "text-brand-yellow"
                  : "text-white hover:text-brand-yellow"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-brand-yellow transition-all ${activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2.5 bg-gradient-to-r from-brand-gold to-brand-yellow text-black font-bold rounded-full shadow hover:scale-105 transition-transform"
              onClick={closeMobileMenu}
            >
              <span className="flex items-center gap-1">
                Get Started
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-brand-yellow p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-6 bg-brand-yellow transform transition duration-300 ${isMobileOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-brand-yellow transition-opacity duration-300 ${isMobileOpen ? "opacity-0" : "opacity-100"
                  }`}
              />
              <span
                className={`block h-0.5 w-6 bg-brand-yellow transform transition duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileOpen && (
          <div className="lg:hidden bg-black/95 border-t border-brand-yellow/10 py-4 px-2 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block text-center py-3 rounded-lg text-base font-medium transition-all ${activeSection === link.href.substring(1)
                  ? "bg-brand-yellow/10 text-brand-yellow"
                  : "text-white hover:bg-brand-yellow/5 hover:text-brand-yellow"
                  }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="block w-full text-center py-3 mt-2 bg-gradient-to-r from-brand-gold to-brand-yellow text-black font-bold rounded-lg shadow hover:scale-[1.02] transition-transform"
              onClick={closeMobileMenu}
            >
              Get Started
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
