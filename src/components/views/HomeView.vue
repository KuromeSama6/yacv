<script setup lang="ts">
import { BContainer, BRow, BModal } from "bootstrap-vue-next";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ref } from "vue";
import MangaSearchBar from "../home/MangaSearchBar.vue";
import { useAccountStore } from "@/store";
const { t } = useI18n();
const router = useRouter();
const account = useAccountStore();

const modal = ref(false);

// router.push(`/read/dianjuren/dc312a94-f526-11e8-a7d3-00163e0ca5bd`);
</script>

<template>
    <BContainer style="text-align: center">
        <BRow>
            <h1>{{ t("home.title") }}</h1>
            <p></p>
        </BRow>
        <MangaSearchBar />
    </BContainer>
    <BContainer>
        <BCard class="card" v-if="!account.IsLoggedIn()" :title="t('home.not_logged_in_hint')">
            <BCardText>
                {{ t("home.not_logged_in_rationale") }}
            </BCardText>
            <BButton variant="outline-primary" @click="router.push('/account')">{{
                t("home.log_in_button")
            }}</BButton>
            <template #footer> {{ t("home.affiliation_disclaimer") }} </template>
        </BCard>

        <BCard
            class="card"
            v-if="account.IsLoggedIn()"
            border-variant="primary"
            :title="t('home.account_card.lets_get_reading', [account.info?.username])"
        >
            <div class=""></div>
            <BButton
                class="operation-btn"
                variant="outline-primary"
                @click="router.push('/account')"
                >{{ t("home.account_card.button.bookshelf") }}</BButton
            >
            <BButton
                class="operation-btn"
                variant="outline-primary"
                @click="router.push('/history')"
                >{{ t("home.account_card.button.history") }}</BButton
            >
        </BCard>
        <BCard
            class="card"
            border-variant="info"
            align="start"
            :title="t('home.updates_card.title')"
            footer-border-variant="info"
        >
            <h6>Manga reader navbar rework</h6>
            <BCardText>
                The navbar in the manga reader has been reworked. An option to star (add a title to
                your account bookshelf) has been added.
            </BCardText>
            <template #footer>
                {{ t("home.updates_card.check_github") }}
                <a href="https://github.com/KuromeSama6/yacv" target="_blank">Github</a>.
            </template>
        </BCard>
    </BContainer>
</template>

<style scoped>
.card {
    margin-bottom: 1rem;
}

.operation-btn {
    margin-right: 0.5rem;
}
</style>
