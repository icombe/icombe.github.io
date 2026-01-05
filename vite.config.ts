import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'framer-motion'],
          'three': ['three'],
          'r3f': ['@react-three/fiber'],
          'drei': ['@react-three/drei'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  base: '/',
})
