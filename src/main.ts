import "bootstrap/dist/css/bootstrap.min.css";
import "lazysizes";
// import "./assets/base.css";
import "./assets/main.css";
// import "./assets/styles.css";

import { createBootstrap, useColorMode } from "bootstrap-vue-next";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";
import Cookies from "js-cookie";
import { useSettingsStore } from "./store";

const app = createApp(App);
const colorMode = useColorMode();

colorMode.value = "dark";

app.use(router);
app.use(i18n);
app.use(createPinia());
app.use(createBootstrap());

app.mount("#app");
