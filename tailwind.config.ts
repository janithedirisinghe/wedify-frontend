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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#fdf4f5",
          100: "#fce8eb",
          200: "#f9d5da",
          300: "#f4b4bd",
          400: "#ed8896",
          500: "#e35d72",
          600: "#d04061",
          700: "#af2e4f",
          800: "#922949",
          900: "#7d2643",
          950: "#451121",
        },
        secondary: {
          50: "#f5f7fa",
          100: "#eaeef4",
          200: "#d0dbe6",
          300: "#a8bdcf",
          400: "#799ab4",
          500: "#587d9c",
          600: "#446382",
          700: "#38506a",
          800: "#314459",
          900: "#2d3b4c",
          950: "#1e2732",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        heading: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
