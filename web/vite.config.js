import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use env from GitHub Actions (falls back to "/" for local/dev)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})