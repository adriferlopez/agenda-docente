import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'firebase', test: /node_modules\/firebase/ },
            { name: 'pdf', test: /node_modules\/(@react-pdf|react-pdf)/ },
            { name: 'xlsx', test: /node_modules\/xlsx/ },
          ],
        },
      },
    },
  },
})
