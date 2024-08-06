<script setup lang="ts">
import { BContainer, BRow, BModal } from "bootstrap-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();

const modal = ref(false);

// router.push(`/read/dianjuren/dc312a94-f526-11e8-a7d3-00163e0ca5bd`);
</script>

<template>
    <BContainer style="text-align: center">
        <BRow>
            <h1>Yet Another CopyManga Viewer</h1>
            <p></p>
        </BRow>
        <MangaSearchBar />
        <BRow>
            <font-awesome-icon :icon="['fas', 'circle-check']" />
        </BRow>
    </BContainer>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import MangaSearchBar from "../home/MangaSearchBar.vue";
</script>
