
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Why Us", href: "#why-us" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setScrollProgress(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );

      if (isHomePage) {
        const sections = document.querySelectorAll("section[id]");
        const offset = window.scrollY + 100;
        
        // Find active section
        let activeId = "";
        for (const section of sections) {
          const top = (section as HTMLElement).offsetTop;
          const height = (section as HTMLElement).offsetHeight;
          const id = section.getAttribute("id") || "";
          if (offset >= top && offset < top + height) {
            activeId = id;
            break;
          }
        }
        
        // Only update if different to prevent unnecessary renders
        if (activeId !== activeSection) {
          setActiveSection(activeId);
        }
      }
    };

    // Throttle scroll event for better performance
    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollThrottled, { passive: true });
    updateScroll();
    
    return () => window.removeEventListener("scroll", handleScrollThrottled);
  }, [isHomePage, activeSection]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    // Close mobile menu when route changes
    if (isMobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  // Handle navigation with smooth scroll
  const handleNavClick = (href: string) => {
    // Always close the mobile menu first
    setIsMobileOpen(false);

    if (href.startsWith("/")) {
      // If it's an internal page link (not a hash)
      navigate(href);
      return;
    }

    if (isHomePage) {
      // If on home page, scroll to the section
      const element = document.querySelector(href);
      if (element) {
        // Add a small delay to ensure mobile menu closing animation completes
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // If on another page, navigate to home and then to section
      navigate("/");
      // Add a small delay to allow the home page to load before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 }
  };

  return (
    <>
      {/* Scroll Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-brand-yellow z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ ease: "linear" }}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled
          ? "bg-black/90 shadow-md backdrop-blur-xl border-b border-brand-yellow/10"
          : "bg-black/70 backdrop-blur-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-yellow to-brand-gold text-transparent bg-clip-text">
              EllowDigital
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-colors ${
                  (isHomePage && activeSection === link.href.substring(1)) || 
                  (!isHomePage && location.pathname === link.href)
                    ? "text-brand-yellow"
                    : "text-white hover:text-brand-yellow"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-brand-yellow transition-all ${
                    (isHomePage && activeSection === link.href.substring(1)) || 
                    (!isHomePage && location.pathname === link.href) 
                      ? "w-full" 
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="px-5 py-2 bg-gradient-to-r from-brand-gold to-brand-yellow text-black font-bold rounded-full shadow hover:scale-105 transition-transform"
            >
              <span className="flex items-center gap-1">
                Get Started
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-brand-yellow p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Panel with AnimatePresence for smoother transitions */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="lg:hidden bg-black/95 border-t border-brand-yellow/10 py-2 px-2 space-y-1 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-center py-3 px-4 rounded-lg text-base font-medium transition-all ${
                    (isHomePage && activeSection === link.href.substring(1)) || 
                    (!isHomePage && location.pathname === link.href)
                      ? "bg-brand-yellow/10 text-brand-yellow"
                      : "text-white hover:bg-brand-yellow/5 hover:text-brand-yellow"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="block w-full text-center py-3 mt-2 bg-gradient-to-r from-brand-gold to-brand-yellow text-black font-bold rounded-lg shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
