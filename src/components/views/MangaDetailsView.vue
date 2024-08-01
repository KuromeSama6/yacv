<script setup lang="ts">
import type { MangaDescriptor, MangaGroupData } from "@/data/Manga";
import { Chapters, type IManga } from "@/structures/Manga";
import axios from "axios";
import { ref } from "vue";
import LoadingIndicator from "../LoadingIndicator.vue";

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
        details = (
            await axios.get(`https://api.mangacopy.com/api/v3/comic2/${props.mangaId}`, {
                headers: {
                    platform: 1
                },
                params: {
                    platform: 1,
                    _update: true
                }
            })
        ).data.results;
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
            const res = (
                await axios.get(`https://api.mangacopy.com/api/v3/comic/${props.mangaId}/group/${group.path_word}/chapters`, {
                    headers: {
                        platform: 1
                    },
                    params: {
                        limit: group.count,
                        offset: 0,
                        _update: true
                    }
                })
            ).data.results;

            console.log(res.list);
            ret.chapters.AddGroup(group, res.list);
        } catch (err: any) {
            loading.value = false;
            console.error(err);
            loadError.value = `Search error: ${err}: ${err.stack}`;
            return;
        }
    }

    console.log(ret);
}
Load();
</script>

<template>
    <div>
        <!-- <MangaDetailsCard v-for="manga in mangaStore.currentList" :key="manga.id" :manga="manga" /> -->
        <LoadingIndicator :visible="loading" :content="loadContent" :error="loadError" />
    </div>
</template>
