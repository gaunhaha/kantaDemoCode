import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// Vercel 會在建置時設定 VERCEL=1。
// 兩個部署目標的需求不同，這裡依環境切換，兩邊都能正常產出：
//   Vercel       → 服務於網域根目錄，輸出必須在專案內的 dist
//   GitHub Pages → 服務於 /kantaDemo/ 子路徑，沿用既有的外部輸出目錄
const isVercel = !!process.env.VERCEL

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: isVercel ? '/' : '/kantaDemo/',
  build: {
    outDir: isVercel ? 'dist' : '../kantaDemo_dist/dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
})
