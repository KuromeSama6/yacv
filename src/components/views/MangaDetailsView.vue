<script setup lang="ts">
import { useMangaStore } from "@/store";

const mangaStore = useMangaStore();
</script>

<template>
    <body>
        {{ mangaStore.details?.title }}
    </body>
</template>
