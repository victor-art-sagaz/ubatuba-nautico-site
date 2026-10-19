/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', lg: '2.5rem' },
    },
    extend: {
      colors: {
        navy: {
          50: '#eef3f9',
          100: '#d6e2f0',
          200: '#adc5e0',
          300: '#7fa2c9',
          400: '#4f7aa9',
          500: '#2f5a88',
          600: '#1d4268',
          700: '#12304f',
          800: '#0b2340',
          900: '#071a30',
          950: '#04111f',
        },
        sea: {
          50: '#ecfdfb',
          100: '#cff8f2',
          200: '#a0efe5',
          300: '#66dfd2',
          400: '#2fc6ba',
          500: '#14aaa0',
          600: '#0c8a85',
          700: '#0e6e6c',
          800: '#105757',
          900: '#114948',
        },
        sand: {
          50: '#fbf8f3',
          100: '#f5eee1',
          200: '#ecdfc7',
          300: '#e0cba6',
          400: '#d2b283',
          500: '#c49a64',
          600: '#a97e4b',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(7, 26, 48, 0.25)',
        lift: '0 24px 48px -20px rgba(7, 26, 48, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-24px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        drift: 'drift 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
