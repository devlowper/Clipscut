import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        tight: ['"Inter Tight"', 'Inter', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',
        foreground: '#191c1f',
        'surface-1': '#ffffff',
        'surface-2': '#f4f4f4',
        'surface-3': '#FFFFFFE6',
        'accent-1': '#2a3ffb',
        'accent-2': '#d97757',
        'muted-1': '#505a63',
        'muted-2': '#2a3ffb',
        'card-dark': '#16181A',
        border: '#e2e2e7',
      },
      borderRadius: {
        pill: '9999px',
        card: '20px',
        panel: '22px',
        sm2: '8px',
        hero: '28px',
      },
      boxShadow: {
        deep: '0px 20px 40px 0px rgba(0, 0, 0, 0.4)',
        accent: '0px 16px 40px 0px rgba(42, 63, 251, 0.5)',
        subtle: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
        edge: '0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
        card: '0 10px 30px -10px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
      },
      maxWidth: {
        compact: '680px',
        content: '760px',
        display: '1440px',
      },
      keyframes: {
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sweep: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        caret: 'caret 1s steps(2, start) infinite',
        rise: 'rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        sweep: 'sweep 4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
