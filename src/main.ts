import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from 'pinia';
import i18n from "@/core/plugins/i18n/i18n.ts";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { vReveal } from '@/directives/reveal';

const app = createApp(App);
const pinia = createPinia();

// 設定預設語言
if (document.documentElement) {
    // 主題色彩設定
    var themeColor = localStorage.getItem("theme_color");
    if (!themeColor) {
        // 設計以暗色為主，只有在使用者明確偏好亮色時才走亮色
        themeColor = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    document.documentElement.setAttribute("themeColor", themeColor);

    // 語言設定
    var language = localStorage.getItem("language");
    if (!language) {
        // 獲取瀏覽器語言設定
        const browserLang = navigator.language.toLowerCase();
        // 如果是英文就設定英文，其他語言預設中文
        language = browserLang.startsWith('en') ? 'en' : 'zh_tw';
        localStorage.setItem("language", language);
    }
    i18n.global.locale.value = language as "en" | "zh_tw";
    document.documentElement.setAttribute("lang", language);
}

app.use(pinia);
app.use(i18n);
app.use(router);
app.use(ElementPlus);
app.directive('reveal', vReveal);

app.mount("#app");
