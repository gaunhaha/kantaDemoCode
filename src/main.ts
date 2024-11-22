import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from 'pinia';
import i18n from "@/core/plugins/i18n/i18n.ts";
const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.use(router);
app.mount("#app");

if (document.documentElement) {
    var themeColor = localStorage.getItem("theme_color");
    if (!themeColor) {
        themeColor = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("themeColor", themeColor);
}
