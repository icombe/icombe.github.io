import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set to your repo path when deploying to Pages; fallback to root for local/dev
export default defineConfig({
  base: process.env.VITE_BASE?.trim() || '/',
  plugins: [react()],
})
