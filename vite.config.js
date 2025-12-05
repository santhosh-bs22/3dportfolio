import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
    exclude: ['@react-three/postprocessing']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['gsap', 'framer-motion'],
          'ui-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true
  }
})