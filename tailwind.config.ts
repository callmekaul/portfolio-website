import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      keyframes: {
        auroraFlowToFro: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
      animation: {
        auroraFlowToFro15s: "auroraFlowToFro 15s ease-in-out infinite",
        auroraFlowToFro18s: "auroraFlowToFro 18s ease-in-out infinite",
        auroraFlowToFro20s: "auroraFlowToFro 20s ease-in-out infinite",
        auroraFlowToFro12s: "auroraFlowToFro 12s ease-in-out infinite",
        auroraFlowToFro25s: "auroraFlowToFro 25s ease-in-out infinite",
        auroraFlowToFro17s: "auroraFlowToFro 17s ease-in-out infinite",
        auroraFlowToFro22s: "auroraFlowToFro 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
