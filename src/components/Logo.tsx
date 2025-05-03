import { useState, useEffect } from "react";

const LOGO_IMG_DARK = "/logo.webp";
const LOGO_ALT = "EllowDigitals Logo";

const Logo = () => {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const logoSrc = LOGO_IMG_DARK;

  return (
    <a href="/" aria-label="Go to homepage" className="block outline-none focus:ring-2 focus:ring-brand-yellow rounded transition-shadow">
      <div
        className={`inline-flex items-center select-none overflow-hidden ${mounted ? "animate-fade-in" : "opacity-0"}`}
        style={{ minHeight: 48 }}
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt={LOGO_ALT}
            width={160}
            height={48}
            className="h-12 w-auto object-contain transition duration-500 drop-shadow"
            style={{
              filter: "drop-shadow(0px 2px 8px rgba(255, 255, 70, 0.12))",
            }}
            loading="eager"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-brand-gold to-brand-yellow bg-clip-text text-transparent tracking-wider">
            Ellow<span className="text-foreground">Digital</span>
          </span>
        )}
      </div>
    </a>
  );
};

export default Logo;
