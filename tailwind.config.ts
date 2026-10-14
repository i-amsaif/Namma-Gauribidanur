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
        civic: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#062B17',
        },
        saffron: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        karnataka: {
          yellow: '#FFCC00',
          red: '#D9222A',
        },
        warm: {
          50: '#FCFCF9',
          100: '#F7F7F2',
          200: '#EFEFE6',
          300: '#E2E2D5',
          400: '#C7C7B5',
          500: '#A3A392',
          600: '#737365',
          700: '#525247',
          800: '#383831',
          900: '#21211C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Kannada', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        kannada: ['Noto Sans Kannada', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
