import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Use class-based dark mode

  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#222222",
        input: "#222222",
        ring: "#FFD700",
        background: "#121212",
        foreground: "#F6F6F6",
        primary: {
          DEFAULT: "#FFD700",
          foreground: "#121212",
        },
        secondary: {
          DEFAULT: "#222222",
          foreground: "#FFD700",
        },
        destructive: {
          DEFAULT: "#b91c1c",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#353535",
          foreground: "#BBBBBB",
        },
        accent: {
          DEFAULT: "#FFD700",
          foreground: "#121212",
        },
        popover: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFD700",
        },
        card: {
          DEFAULT: "#191919",
          foreground: "#FFD700",
        },
        sidebar: {
          DEFAULT: "#191919",
          foreground: "#FFD700",
          primary: "#FFD700",
          "primary-foreground": "#191919",
          accent: "#FFDF00",
          "accent-foreground": "#191919",
          border: "#353535",
          ring: "#FFD700",
        },
        brand: {
          gold: "#FFD700",
          yellow: "#FFDF00",
          softYellow: "#FFF8DC",
          black: "#121212",
          offBlack: "#1A1A1A",
          white: "#F8F8F8",
          offWhite: "#EBEBEB",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        tablet: { min: "640px", max: "1023px" },
        "tablet-portrait": { min: "640px", max: "767px" },
        "tablet-landscape": { min: "768px", max: "1023px" },
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-right": "fade-in-right 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        shimmer: "shimmer 2s infinite linear",
      },

      boxShadow: {
        elegant: "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 20px 30px -15px rgba(0, 0, 0, 0.2)",
        "button-3d":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 -2px 0 0 rgba(255, 255, 255, 0.1) inset, 0 2px 0 0 rgba(0, 0, 0, 0.1) inset",
        "button-3d-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 -2px 0 0 rgba(255, 255, 255, 0.15) inset, 0 2px 0 0 rgba(0, 0, 0, 0.1) inset",
      },

      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        width: "width",
        transform: "transform",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};

export default config;
