/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
        }
      }
    },
  },
  plugins: [],
}