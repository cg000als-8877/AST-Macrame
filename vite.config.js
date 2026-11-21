import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 85 },
      jpeg: { quality: 80 },
      webp: { quality: 80, effort: 4 },
      avif: { quality: 75 },
    }),
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
  server: {
    host: true,
    port: 5173,
    watch: {
      ignored: ['**/public/**', '**/stuff/**']
    }
  }
})
