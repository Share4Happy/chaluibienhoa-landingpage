import { defineConfig } from 'vite';

export default defineConfig({
  // Sử dụng custom domain chaluilachong.share4happy.com nên base là '/'
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});

