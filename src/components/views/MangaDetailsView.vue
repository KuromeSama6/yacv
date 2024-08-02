<script setup lang="ts">
import type { MangaDescriptor, MangaGroupData } from "@/data/Manga";
import { Chapters, type IManga } from "@/structures/Manga";
import axios from "axios";
import { ref } from "vue";
import LoadingIndicator from "../LoadingIndicator.vue";
import MangaDetailsCard from "../manga/MangaDetailsCard.vue";
import { CopyMangaAPI } from "@/api";

const props = defineProps({
    mangaId: String
});

const loading = ref(true);
const loadContent = ref("Loading details...");
const loadError = ref<string | null>(null);
const manga = ref<IManga | null>(null);

console.log(`Loading manga: ${props.mangaId}`);

async function Load() {
    var details;
    try {
        details = await CopyMangaAPI.GetMangaDetails(props.mangaId || "");
    } catch (err: any) {
        loading.value = false;
        console.error(err);
        loadError.value = `Search error: ${err}: ${err.stack}`;
        return;
    }
    const descriptor: MangaDescriptor = details.comic;
    console.log(details);

    const ret: IManga = {
        descriptor: descriptor,
        chapters: new Chapters()
    };

    // chapters
    for (const key in details.groups) {
        const group: MangaGroupData = details.groups[key];
        loadContent.value = `Loading group ${group.path_word}`;

        try {
            const res = await CopyMangaAPI.GetMangaChapters(
                props.mangaId || "",
                group.path_word,
                group.count
            );

            console.log(res);
            ret.chapters.AddGroup(group, res);
        } catch (err: any) {
            loading.value = false;
            console.error(err);
            loadError.value = `Search error: ${err}: ${err.stack}`;
            return;
        }
    }

    manga.value = ret;
    console.log(ret);
    loading.value = false;
}
Load();
</script>

<template>
    <div>
        <LoadingIndicator :visible="loading" :content="loadContent" :error="loadError" />
        <MangaDetailsCard v-if="manga" :manga="manga" />
    </div>
</template>
