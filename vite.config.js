import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // The service worker updates automatically in the background.
      registerType: 'autoUpdate',
      // Extra public assets that should be part of the offline cache.
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'logo/cdm-logo.png'],
      manifest: {
        name: 'GCAS — Guidance Counseling and Appointment System',
        short_name: 'GCAS',
        description:
          'Promotional website for the Guidance Counseling and Appointment System of Colegio de Montalban, part of the CDM OneServe portal.',
        id: '/',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        lang: 'en',
        dir: 'ltr',
        categories: ['education'],
        background_color: '#FFFFFF',
        theme_color: '#106A2E',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the built public website assets (JS, CSS, HTML, images, fonts)
        // so the site works offline. Only same-origin public assets are cached:
        // cross-origin requests (e.g. the official portal at
        // portal.cdmconnect.online) are never cached by this service worker.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        navigateFallback: 'index.html',
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
  build: {
    target: 'es2020',
  },
})
