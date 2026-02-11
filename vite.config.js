import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        beginner: resolve(__dirname, 'courses/beginner.html'),
        'pre-intermediate': resolve(__dirname, 'courses/pre-intermediate.html'),
        intermediate: resolve(__dirname, 'courses/intermediate.html'),
        'upper-intermediate': resolve(__dirname, 'courses/upper-intermediate.html'),
        'business-english': resolve(__dirname, 'courses/business-english.html'),
        'exam-preparation': resolve(__dirname, 'courses/exam-preparation.html'),
      }
    }
  }
})

