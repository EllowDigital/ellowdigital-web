
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 shadow-lg backdrop-blur-md border-b border-brand-yellow/10"
          : "bg-black/80 backdrop-blur-lg"
      }`}
      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center outline-none">
            <Logo />
          </a>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-base font-semibold text-white hover:text-brand-yellow transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-yellow/70 relative group"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-6 py-2 font-bold rounded-full bg-gradient-to-r from-brand-gold to-brand-yellow text-black shadow-md hover:scale-105 transition-transform duration-200 border-2 border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            >
              Get Started
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
              className="stroke-current"
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
        <div className="md:hidden bg-black/95 pt-3 pb-6">
          <div className="flex flex-col items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-5 py-3 text-base font-semibold text-white w-full text-center rounded hover:bg-brand-yellow/10 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 px-7 py-2 font-bold rounded-full bg-gradient-to-r from-brand-gold to-brand-yellow text-black shadow hover:scale-105 transition"
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

