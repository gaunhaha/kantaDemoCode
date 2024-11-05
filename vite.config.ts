import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/kantaDemo/',
  build: {
    outDir: '../kantaDemo_dist/dist',
    emptyOutDir: true, // also necessary
  }
})
