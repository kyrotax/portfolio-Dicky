import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Multi-page app
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        work: resolve(__dirname, 'work.html'),
        about: resolve(__dirname, 'about.html'),
      },
    },
  },
  css: {
    postcss: './postcss.config.cjs',
  },
})
