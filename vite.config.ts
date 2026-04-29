build: {
      outDir: 'dist',
      sourcemap: false,
      // Tambahkan ini untuk mengoptimalkan pemecahan file JS/CSS
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'motion'],
          },
        },
      },
    },
