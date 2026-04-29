import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Memuat env file dari root directory
  const env = loadEnv(mode, process.cwd(), '');

  return {
    /**
     * PENTING: Nama 'invitation' harus sama persis dengan nama 
     * repositori Anda di GitHub agar path file di folder public benar.
     */
    base: '/invitation/',

    plugins: [
      react(),
      tailwindcss(),
    ],

    define: {
      // Menyediakan env variable untuk aplikasi
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        // Memudahkan import dengan simbol @
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      // Konfigurasi HMR (Hot Module Replacement)
      hmr: process.env.DISABLE_HMR !== 'true',
      port: 3000,
      host: true,
    },

    build: {
      // Optimasi build untuk deployment
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
