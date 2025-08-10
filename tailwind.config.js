import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ff',
          100: '#fdeeff', 
          200: '#fcddff',
          300: '#f9bcff',
          400: '#f491ff',
          500: '#ed66ff',
          600: '#db3cff',
          700: '#c223ff',
          800: '#a11dd4',
          900: '#8719ab',
        }
      },
      fontFamily: {
        'kid-friendly': ['Comic Sans MS', 'cursive', 'sans-serif'],
      }
    },
  },
})
