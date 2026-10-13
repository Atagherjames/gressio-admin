/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gressio: {
          DEFAULT: '#563CF9',
          50: '#EEF0FF',
          100: '#E0E3FF',
          200: '#C5C6FF',
          300: '#BFC3FF',
          400: '#7D53DE',
          500: '#563CF9',
          600: '#482FE0',
          700: '#3A22C4',
          800: '#2A179E',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
