/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Puzzle Profis',
        short_name: 'PuzzleProfis',
        description: 'Puzzle game for kids aged 3-5 years',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/puzzle-profis/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/puzzle-profis/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg}']
      }
    })
  ],
  build: {
    assetsInlineLimit: 0, // Verhindert Inlining von Assets
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  base: '/puzzle-profis/', // GitHub Pages base path
})
