import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from 'pinia';
import i18n from "@/core/plugins/i18n/i18n.ts";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
const pinia = createPinia();

// 設定預設語言
if (document.documentElement) {
    // 主題色彩設定
    var themeColor = localStorage.getItem("theme_color");
    if (!themeColor) {
        themeColor = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

app.mount("#app");
