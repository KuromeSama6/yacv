<script setup lang="ts">
import { useAccountStore } from "@/store";
import { BContainer, BRow } from "bootstrap-vue-next";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import MangaSearchBar from "../home/MangaSearchBar.vue";
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
            <BButton variant="outline-primary" @click="router.push('/account')">{{ t("home.log_in_button") }}</BButton>
            <template #footer> {{ t("home.affiliation_disclaimer") }} </template>
        </BCard>

        <BCard class="card" v-if="account.IsLoggedIn()" border-variant="primary" :title="t('home.account_card.lets_get_reading', [account.info?.username])">
            <div class=""></div>
            <BButton class="operation-btn" variant="outline-primary" @click="router.push('/account')">{{ t("home.account_card.button.bookshelf") }}</BButton>
            <BButton class="operation-btn" variant="outline-primary" @click="router.push('/history')">{{ t("home.account_card.button.history") }}</BButton>
        </BCard>
        <BCard class="card" border-variant="danger" align="start" :title="t('home.updates_card.title')" footer-border-variant="info">
            <h6>CopyManga Downage & Rework In Progress</h6>
            <BCardText> It has been recently confirmed that CopyManga has removed most if not all of its titles due to possible copyright infringements and DMCA takedowns. I have realised that relying on a single source is not a viable solution. I am in the progress of reworking the app to support multiple sources, which will be released in a different Github repository. Stay tuned for more updates. This site will still be available before the new version is released, but the Github repository will be archived. Thank you for your support. </BCardText>
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
