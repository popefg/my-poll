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
        background: "var(--background)",
        foreground: "var(--foreground)",
        cedar: {
          50: "#eafbf1",
          100: "#cdf3dc",
          200: "#9de6bd",
          300: "#63d199",
          400: "#33b578",
          500: "#169760",
          600: "#0c7a4d",
          700: "#0a5f3e",
          800: "#0b4a33",
          900: "#0a3d2b",
        },
        cherry: {
          50: "#fdf1f0",
          100: "#fbdcda",
          200: "#f6b6b1",
          300: "#ef8880",
          400: "#e4574c",
          500: "#d32f26",
          600: "#b31f1c",
          700: "#8f1a1a",
          800: "#771a1a",
          900: "#651a1b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
      },
      keyframes: {
        "pop-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "grow-bar": {
          "0%": { width: "0%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "crown-float": {
          "0%, 100%": { transform: "translateY(0) rotate(-4deg)" },
          "50%": { transform: "translateY(-3px) rotate(4deg)" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.25s ease-out",
        "grow-bar": "grow-bar 0.6s ease-out",
        shimmer: "shimmer 2.5s linear infinite",
        "crown-float": "crown-float 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
