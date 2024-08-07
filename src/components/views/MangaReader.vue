<script setup lang="ts">
import type { MangaDescriptor, MangaChapter } from "@/data/Manga";
import axios from "axios";
import LoadingIndicator from "../LoadingIndicator.vue";
import { ref } from "vue";
import MangaImageScroll from "../reader/MangaImageScroll.vue";
import MangaTopNav from "../reader/MangaNav.vue";
import { CopyMangaAPI } from "@/api";
import type { IMangaChapter } from "@/structures/Manga";
import { onBeforeRouteUpdate } from "vue-router";
import { useAccountStore, useLocalHistoryStore } from "@/store";
import { useI18n } from "vue-i18n";
var props = defineProps<{
    mangaId: string;
    chapterId: string;
}>();
const { t } = useI18n();

const loading = ref(true);
const loadContent = ref("");
const loadError = ref<string | null>();

const links = ref<string[]>([]);
const loadFinished = ref(false);

const manga = ref<IMangaChapter>();
const loadedImages = ref<HTMLImageElement[]>([]);

const localHistory = useLocalHistoryStore();
const account = useAccountStore();

async function Load() {
    loading.value = true;
    loadError.value = null;
    links.value = [];
    loadFinished.value = false;
    manga.value = undefined;
    loadedImages.value = [];

    console.log(`Loading reader: ${props.mangaId}/${props.chapterId}`);

    let res;
    try {
        loadContent.value = t("reader.loading.requesting_details");
        const chapter = await CopyMangaAPI.GetMangaChapterData(
            props.mangaId,
            props.chapterId,
            account.token
        );
        manga.value = chapter;

        // push to history
        localHistory.PushEntry({
            chapter: chapter,
            date: new Date()
        });

        loadContent.value = t("reader.loading.requesting_images");
        res = await CopyMangaAPI.GetChapterImageLinks(props.mangaId, props.chapterId);
    } catch (err: any) {
        loading.value = false;
        console.error(err);
        loadError.value = `Backend request error: ${err}: ${err.stack}`;
        return;
    }

    loadContent.value = t("reader.loading.processing_pages");
    links.value = res;
    loading.value = false;
    loadFinished.value = true;
}

Load();

onBeforeRouteUpdate((to, from, next) => {
    props = to.params as any;

    Load();
    next();
});
</script>

<template>
    <!-- Manga Main -->
    <MangaTopNav v-if="manga" :manga="manga" :loadedImages="loadedImages" />

    <LoadingIndicator :visible="loading" :content="loadContent" :error="loadError" />
    <div v-if="loadFinished">
        <MangaImageScroll :links="links" v-model="loadedImages" />
        <LoadingIndicator
            :visible="loadedImages.length < links.length"
            :content="t('reader.loading.more_images')"
        />
        <MangaTopNav :manga="manga" :loadedImages="loadedImages" />
    </div>
</template>
