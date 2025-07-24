import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(),VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true, // Enable PWA in development mode
    },
    manifest: {
      name: 'KiaanIOT',
      short_name: 'KiaanIOT',
      description: 'KiaanIOT',
      theme_color: '#ffffff', // Set the theme color here
      background_color: '#ffffff', // Set the background color here
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      start_url: '/',
      display: 'standalone',
      orientation: 'portrait',
    },
    workbox: {
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
    },
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
