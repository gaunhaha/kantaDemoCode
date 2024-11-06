import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
// import VueTailwindDatepicker from "vue-tailwind-datepicker";

const app = createApp(App);
// createApp(App).mount('#app')

app.use(router);
// app.use(VueTailwindDatepicker);
app.mount("#app");
