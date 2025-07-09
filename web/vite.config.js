import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// FIRST-PARTY TAILWIND PLUGIN FOR VITE:
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← this replaces PostCSS + @tailwindcss/postcss
  ],
});
