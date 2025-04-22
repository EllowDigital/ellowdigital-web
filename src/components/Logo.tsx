
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

const LOGO_ALT = "EllowDigitals Logo";

export const logoImgLight = "/logo.png"; // Place a high-res logo with transparent bg in public/logo.png
export const logoImgDark = "/logo-dark.png"; // Place a high-res white/bright logo in public/logo-dark.png

const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Ensure animation only after mount to avoid SSR/react hydration issues
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Choose correct image per theme
  const logoSrc = theme === "dark" ? logoImgDark : logoImgLight;

  return (
    <a href="/" aria-label="Go to homepage" className="block outline-none focus:ring-2 focus:ring-brand-yellow rounded transition-shadow">
      <div
        className={`inline-flex items-center select-none overflow-hidden ${
          mounted ? "animate-fade-in" : "opacity-0"
        }`}
        style={{ minHeight: 48 }} // Height for layout stability
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt={LOGO_ALT}
            width={160}
            height={48}
            className="h-12 w-auto object-contain transition duration-500 drop-shadow"
            style={{
              // Subtle shadow for contrast on both themes
              filter: theme === "dark"
                ? "drop-shadow(0px 2px 8px rgba(255,255,70,0.12))"
                : "drop-shadow(0px 2px 10px rgba(40,40,40,0.13))",
            }}
            loading="eager"
            onError={() => setImgError(true)}
          />
        ) : (
          // Fallback to styled text if image fails
          <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-brand-gold to-brand-yellow bg-clip-text text-transparent tracking-wider">
            Ellow<span className="text-brand-purple">Digitals</span>
          </span>
        )}
      </div>
    </a>
  );
};

export default Logo;
