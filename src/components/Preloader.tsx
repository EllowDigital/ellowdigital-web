import { useEffect, useState } from "react";
import { logoImgDark } from "./Logo";

const LOGO_ALT = "EllowDigitals Logo";

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleReady = () => {
      setHide(true);
      setTimeout(() => setVisible(false), 600);
    };

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }
    return () => {
      window.removeEventListener("load", handleReady);
    };
  }, []);

  const logoSrc = logoImgDark;

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-black/[0.97]
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
            <img
              src={logoSrc}
              alt={LOGO_ALT}
              width={180}
              height={48}
              className={`
                h-14 w-auto object-contain
                animate-ellow-pulse
                filter drop-shadow-[0_4px_18px_rgba(255,223,0,0.12)]
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
          <span className="block h-2 w-2 rounded-full bg-[--brand-yellow] mx-1 animate-ellow-dot"></span>
          <span className="block h-2 w-2 rounded-full bg-[--brand-yellow] mx-1 animate-ellow-dot delay-[150ms]"></span>
          <span className="block h-2 w-2 rounded-full bg-white mx-1 animate-ellow-dot delay-[300ms]"></span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
