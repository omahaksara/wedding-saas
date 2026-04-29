import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

/**
 * VITE CONFIGURATION FOR OMAH AKSARA
 * Sesuai untuk deployment ke GitHub Pages dengan sub-folder /invitation/
 */
export default defineConfig(({ mode }) => {
  // Memuat environment variables (seperti GEMINI_API_KEY) dari file .env
  const env = loadEnv(mode, process.cwd(), '');

  return {
    /**
     * base: '/invitation/' 
     * PENTING: Harus sama dengan nama repositori GitHub Anda.
     * Ini memastikan semua link foto dan JSON di folder 'public' tidak 404.
     */
    base: '/invitation/',

    plugins: [
      react(),
      tailwindcss(),
    ],

    resolve: {
      alias: {
        /**
         * Alias @ mengarah ke folder src.
         * Contoh penggunaan: import App from '@/App'
         */
        '@': path.resolve(__dirname, './src'),
      },
    },

    define: {
      /**
       * Menghubungkan variabel environment agar bisa diakses di frontend
       * via process.env.NAMA_VARIABLE
       */
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    server: {
      port: 3000,
      host: true,
      // Mengatur Hot Module Replacement agar tetap jalan di berbagai environment
      hmr: process.env.DISABLE_HMR !== 'true',
    },

    build: {
      // Folder hasil build (akan dibaca oleh GitHub Pages)
      outDir: 'dist',
      // Mematikan sourcemap untuk mempercepat proses build dan menghemat size
      sourcemap: false,
      // Optimasi pemecahan file agar loading lebih cepat
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-animation': ['motion'],
          },
        },
      },
    },
  };
});
