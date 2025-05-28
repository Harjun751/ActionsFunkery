import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

const backendEndpoint = process.env.BACKEND_ENDPOINT || 'http://127.0.0.1:3001'


export default defineConfig({
  plugins: [
      react(),
  ],
  server: {
    proxy: {
      '/questions': `${backendEndpoint}`,
    },
  },
})
