import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-up': 'bounce-up 0.5s ease-in-out',
      },
      colors: {
        background: '#ffffff',
        foreground: '#171717',
        primary: '#3e7eff',
        secondary: '#70818f',
        'primary-accent': '#699aff',
        'foreground-accent': '#454545',
        'hero-background': '#F3F3F5',
      },
      fontFamily: {
        manrope: ['Manrope', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
