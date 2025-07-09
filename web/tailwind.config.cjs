/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: {
          50:  '#f2f8fc',
          100: '#d9eaf6',
          200: '#b3d4ec',
          300: '#8cbde2',
          400: '#669fda',
          500: '#347fcb', // your dark blue
          600: '#2e6fb7',
          700: '#26599a',
          800: '#1f447d',
          900: '#173059'
        },
        dark: {
          DEFAULT: '#121212', // near-black background
          100: '#1e1e1e',
          200: '#181818'
        },
      },
      backgroundImage: {
        'rainbow': 'linear-gradient(90deg, #f00, #0f0, #00f, #f0f)',
        },
        backgroundSize: {
          '200%': '200% 100%',
        },
        keyframes: {
          'wave': {
            '0%': { 'background-position': '0% 50%' },
            '100%': { 'background-position': '200% 50%' },
          },
        },
        animation: {
          'wave-text': 'wave 4s ease infinite',
        },
    },
  },
  plugins: [],
}