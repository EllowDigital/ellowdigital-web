
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { logoImgLight, logoImgDark } from "./Logo";

const LOGO_ALT = "EllowDigitals Logo";

// Custom preloader: logo with animated pulse/fade and smooth exit
const Preloader = () => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false); // For fade-out animation
  const [imgError, setImgError] = useState(false);

  // If page is loaded (DOMContentLoaded + images), remove loader with fade
  useEffect(() => {
    const handleReady = () => {
      setHide(true);
      setTimeout(() => setVisible(false), 600); // Matches fade-out animation duration
    };

    // Wait until main content has rendered, smooth UX, no forced delay
    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }
    return () => {
      window.removeEventListener("load", handleReady);
    };
  }, []);

  // Choose correct image per theme
  const logoSrc = theme === "dark" ? logoImgDark : logoImgLight;

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-black/[0.97] dark:bg-black/[0.97]
        transition-opacity duration-600
        ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
      aria-label="Loading"
      role="status"
      style={{
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className="
            w-44 h-14 flex items-center justify-center
            rounded-xl overflow-visible
            shadow-lg
            bg-gradient-to-br from-[rgba(255,223,0,0.08)] to-transparent
          "
        >
          {!imgError ? (
            // LOGO PULSE/ROTATE (based on user's theme, fallback to text)
            <img
              src={logoSrc}
              alt={LOGO_ALT}
              width={180}
              height={48}
              className={`
                h-14 w-auto object-contain
                animate-ellow-pulse
                ${theme === "dark"
                  ? "filter drop-shadow-[0_4px_18px_rgba(255,223,0,0.12)]"
                  : "filter drop-shadow-[0_4px_15px_rgba(40,40,40,0.18)]"}
                will-change-transform
              `}
              style={{
                animation:
                  "ellow-pulse 1.3s cubic-bezier(.4,0,.6,1) infinite, ellow-spin 2.4s linear infinite",
              }}
              onError={() => setImgError(true)}
              draggable={false}
            />
          ) : (
            <span className="text-3xl font-extrabold gradient-text drop-shadow animate-ellow-pulse select-none">
              Ellow<span className="text-white">Digitals</span>
            </span>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          {/* Minimal brand yellow loader dots */}
          <span className="block h-2 w-2 rounded-full bg-[--brand-yellow] mx-1 animate-ellow-dot"></span>
          <span className="block h-2 w-2 rounded-full bg-[--brand-yellow] mx-1 animate-ellow-dot delay-[150ms]"></span>
          <span className="block h-2 w-2 rounded-full bg-white mx-1 animate-ellow-dot delay-[300ms]"></span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
