// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // any request to /api/** will be forwarded to localhost:8080
      '/api': {
        target: ''http://localhost:8080'',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ''), 
        // so /api/apod?date=... → http://localhost:8080/apod?date=...
      },
    },
  },
});
