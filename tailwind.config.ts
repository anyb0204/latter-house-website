import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: "#7C9A7E",
        "sage-light": "#9BB89D",
        mint: "#A8C5A0",
        gold: "#C9A84C",
        champagne: "#D4B896",
        "champagne-light": "#E8D5B7",
        cream: "#F5F0E8",
        "cream-dark": "#EDE6DA",
        forest: "#4A6741",
        "forest-dark": "#3A5234",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-lg": ["2.25rem", { lineHeight: "1.25" }],
        "heading-md": ["1.75rem", { lineHeight: "1.3" }],
        "heading-sm": ["1.375rem", { lineHeight: "1.35" }],
        "body-lg": ["1.25rem", { lineHeight: "1.7" }],
        "body-base": ["1.125rem", { lineHeight: "1.75" }],
        "body-sm": ["1rem", { lineHeight: "1.6" }],
      },
      animation: {
        "room-enter": "roomEnter 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "gentle-float": "gentleFloat 6s ease-in-out infinite",
      },
      keyframes: {
        roomEnter: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "gradient-peaceful": "linear-gradient(135deg, #F5F0E8 0%, #EDE6DA 50%, #E8D5B7 100%)",
        "gradient-sage": "linear-gradient(135deg, #7C9A7E 0%, #4A6741 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
