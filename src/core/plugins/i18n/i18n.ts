import { createI18n } from "vue-i18n";
import en from "@/core/plugins/i18n/en.json";
import zh_tw from "@/core/plugins/i18n/zh_tw.json";

const messages = {
  en: en,
  zh_tw: zh_tw,
};

const i18n = createI18n({
  legacy: false,
  locale: (localStorage.getItem("lang") as string) ?? "en",
  globalInjection: true,
  messages,
});

export default i18n;

