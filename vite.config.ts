// Di dalam vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Ubah dari '/invitation/' menjadi './'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
