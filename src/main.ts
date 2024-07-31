import "./assets/main.css";
import "./assets/base.css";
import "./assets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createBootstrap } from "bootstrap-vue-next";
import { useColorMode } from "bootstrap-vue-next";
import router from "./router";
import { createPinia } from "pinia";
import i18n from "./i18n";

const app = createApp(App);
const colorMode = useColorMode();
colorMode.value = "dark";

app.use(router);
app.use(i18n);
app.use(createPinia());
app.use(createBootstrap());

app.mount("#app");
