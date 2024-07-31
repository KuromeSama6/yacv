import "./assets/main.css";
import "./assets/base.css";
import "./assets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createBootstrap } from "bootstrap-vue-next";
import { useColorMode } from "bootstrap-vue-next";
import router from "./router";

const app = createApp(App);
const colorMode = useColorMode();
colorMode.value = "dark";

app.use(router);
app.use(createBootstrap());

app.mount("#app");
