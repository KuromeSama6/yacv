<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import Navbar from "./components/navbar/Navbar.vue";
import { useAccountStore, useLocalHistoryStore, useSettingsStore } from "./store";
import Cookies from "js-cookie";
import { CopyMangaAPI } from "./api";

const settings = useSettingsStore();
const localHistory = useLocalHistoryStore();
const router = useRouter();
const account = useAccountStore();

settings.Read();
localHistory.Read();

router.beforeEach((to, from, next) => {
    if (settings.autoSavePath) Cookies.set("_lastRoute", to.fullPath);
    next();
});

const lastRoute = settings.autoSavePath ? Cookies.get("_lastRoute") || "/" : "/";
router.replace(lastRoute).catch(() => {});

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
        <Navbar />
        <br />
        <RouterView />
    </main>
</template>
