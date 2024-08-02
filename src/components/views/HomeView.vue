<script setup lang="ts">
import { BContainer, BRow } from "bootstrap-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();

// router.push(`/read/dianjuren/dc312a94-f526-11e8-a7d3-00163e0ca5bd`);
</script>

<template>
    <BContainer style="text-align: center">
        <BRow>
            <h1>Yet Another CopyManga Viewer</h1>
            <p></p>
        </BRow>
        <SearchBar />
    </BContainer>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import SearchBar from "../home/SearchBar.vue";
</script>
