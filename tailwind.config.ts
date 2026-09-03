import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-instrument)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        ink: "#0f172a",
        muted: "hsl(215, 25%, 32%)",
        "video-fallback": "hsl(201, 100%, 13%)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;


