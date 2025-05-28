import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/

const backendEndpoint = process.env.BACKEND_ENDPOINT || 'http://127.0.0.1:3001'

const serverHost = process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS;

export default defineConfig({
  plugins: [
      react(),
      ...(serverHost
          ? [
              basicSsl({
                  name: 'test',
                  domains: [process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS],
                  certDir: '/cert',
              })
          ]
          : []
      )
  ],
  server: {
    proxy: {
      '/questions': `${backendEndpoint}`,
    },
  },
})
