/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#38bdf8',
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        },
        accent: {
          light: '#818cf8',
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        dark: {
          lighter: '#1e293b',
          light: '#0f172a',
          DEFAULT: '#020617',
          deep: '#010314',
        }
      },
    },
  },
  plugins: [],
};