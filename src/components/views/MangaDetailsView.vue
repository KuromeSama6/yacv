<script setup lang="ts">
import { useMangaStore } from "@/store";
import MangaDetailsCard from "../manga/MangaDetailsCard.vue";
const mangaStore = useMangaStore();
</script>

<template>
    <div>
        <MangaDetailsCard v-for="manga in mangaStore.currentList" :key="manga.id" :manga="manga" />
    </div>
</template>
