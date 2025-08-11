import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: {
  //         50: '#fef7ff',
  //         100: '#fdeeff', 
  //         200: '#fcddff',
  //         300: '#f9bcff',
  //         400: '#f491ff',
  //         500: '#ed66ff',
  //         600: '#db3cff',
  //         700: '#c223ff',
  //         800: '#a11dd4',
  //         900: '#8719ab',
  //       },
  //       secondary: {
  //         50: '#fff7e6',
  //         100: '#ffeacc',
  //         200: '#ffd8a8',
  //         300: '#ffc285',
  //         400: '#ffad61',
  //         500: '#ff993d',
  //         600: '#e68035',
  //         700: '#cc6a2d',
  //         800: '#b35425',
  //         900: '#99401d',
  //       }
  //     },
  //     fontFamily: {
  //       'kid-friendly': ['Comic Sans MS', 'cursive', 'sans-serif'],
  //     }
  //  },
  // },
})
