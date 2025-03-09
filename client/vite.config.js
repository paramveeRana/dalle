import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8082,
    proxy: {
      '/api/v1': {
        target: process.env.VITE_SERVER_URL || 'http://server:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})
