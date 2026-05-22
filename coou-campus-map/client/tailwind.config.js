/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Enable dark mode via class strategy
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // COOU brand colors (green and gold/yellow)
        primary: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        campus: {
          dark:    '#0f172a',
          darker:  '#020617',
          surface: '#1e293b',
          border:  '#334155',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in':      'fadeIn 0.4s ease-out',
        'slide-up':     'slideUp 0.35s ease-out',
        'slide-right':  'slideRight 0.35s ease-out',
        'pulse-marker': 'pulseMarker 2s infinite',
      },
      keyframes: {
        fadeIn:      { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp:     { '0%': { transform: 'translateY(20px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        slideRight:  { '0%': { transform: 'translateX(-20px)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } },
        pulseMarker: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.2)' } },
      },
    },
  },
  plugins: [],
};
