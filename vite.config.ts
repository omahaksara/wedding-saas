import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Pastikan plugin ini terinstall
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/invitation/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
