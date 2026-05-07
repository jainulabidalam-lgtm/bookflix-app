import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0f",
        secondary: "#14141c",
        accent: "#A47DAB",
        "text-primary": "#ffffff",
        "text-secondary": "#b3b3b3",
        "glow-red": "#b281c9ff",
      },
      fontFamily: {
        bierika: ["Bierika", "Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        "geo-pulse": "geoPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": {
            textShadow: "0 0 20px #A47DAB88, 0 0 40px #A47DAB44",
          },
          "50%": {
            textShadow: "0 0 40px #A47DABcc, 0 0 80px #A47DAB88, 0 0 120px #A47DAB44",
          },
        },
        geoPulse: {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
