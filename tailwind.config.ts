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
        floatOrb1: {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(40vw, 10vh) scale(1.1)' },
        },
        floatOrb2: {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(-20vw, 30vh) scale(1.05)' },
        },
        floatOrb3: {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(20vw, -20vh) scale(1.15)' },
        },
        floatOrb4: {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(-30vw, -15vh) scale(1.08)' },
        },
      },
      animation: {
        floatOrb1: 'floatOrb1 18s ease-in-out infinite alternate',
        floatOrb2: 'floatOrb2 22s ease-in-out infinite alternate',
        floatOrb3: 'floatOrb3 20s ease-in-out infinite alternate',
        floatOrb4: 'floatOrb4 26s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
export default config;
