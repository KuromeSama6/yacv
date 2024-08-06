<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import Navbar from "./components/navbar/Navbar.vue";
import { useAccountStore, useAlertsManager, useLocalHistoryStore, useSettingsStore } from "./store";
import Cookies from "js-cookie";
import { CopyMangaAPI } from "./api";
import { useToast } from "bootstrap-vue-next";
import AlertsStack from "./components/AlertsStack.vue";

const settings = useSettingsStore();
const localHistory = useLocalHistoryStore();
const router = useRouter();
const account = useAccountStore();
const toast = useToast();
const alerts = useAlertsManager();

settings.Read();
localHistory.Read();

router.beforeEach((to, from, next) => {
    Cookies.set("_lastRoute", to.fullPath);
    alerts.alerts = [];
    next();
});

const lastRoute = Cookies.get("_lastRoute") || "/";
router
    .replace(settings.autoSavePath || /\/read\/*/.test(lastRoute) ? lastRoute : "/")
    .catch(() => {});

// handle login
async function TryTokenLogin() {
    const token = Cookies.get("token");
    if (token) {
        try {
            account.loginPending = true;
            const data = await CopyMangaAPI.GetAccountInfo(token);
            account.token = token;
            account.info = data;
            console.log("Token login success");
            console.log(data);
        } catch (err) {
            console.warn("account token expired or invalid!");
            alerts.NotifyTokenExpired();
            Cookies.remove("token");
        }

        account.loginPending = false;
    }
}

TryTokenLogin();
</script>

<template>
    <header>
        <title>YACV</title>
    </header>

    <main>
        <AlertsStack />
        <Navbar />
        <br />
        <RouterView />
    </main>
</template>
