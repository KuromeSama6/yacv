import { createI18n } from "vue-i18n";

import en from "./locales/en_US/translations.json";
import zh from "./locales/zh_CN/translations.json";
import Cookies from "js-cookie";

const i18n = createI18n({
    locale: Cookies.get("language") || "en",
    fallbackLocale: "en",
    messages: {
        en,
        zh
    }
});

export default i18n;
