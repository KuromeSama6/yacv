<script setup lang="ts">
import axios from "axios";
import { BContainer, BRow } from "bootstrap-vue-next";
import { load } from "cheerio";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const manga_url_prompt = ref(t("HomeView.manga_url_prompt"));
</script>

<template>
    <BContainer style="text-align: center">
        <BRow>
            <h1>Yet Another CopyManga Viewer</h1>
            <p></p>
        </BRow>
        <BRow>
            <BInputGroup class="mt-3">
                <BFormInput :placeholder="manga_url_prompt" />
                <BInputGroupText>
                    <BButton variant="primary" @click="HandleUrlInput">Go</BButton>
                </BInputGroupText>
            </BInputGroup>
        </BRow>
        <BRow class="mt-3">
            <!-- Display loading progress -->
            <p v-if="loading">{{ progress }}% - {{ currentStep }}</p>
            <!-- Display error message -->
            <p v-if="error" class="text-danger">Error: {{ error }}</p>
            <!-- Display result -->
            <div v-if="result">
                <h3>Result:</h3>
                <p>Title: {{ result.title }}</p>
                <!-- Display other result details as needed -->
            </div>
        </BRow>
    </BContainer>
</template>

<script lang="ts">
import router from "@/router";
import { useMangaStore } from "@/store";
import type { MangaDetails } from "@/structures/MangaDetails";
import { ref } from "vue";

const loading = ref(false);
const progress = ref(0); // Progress percentage
const currentStep = ref(""); // Current step in the request process
const result = ref<{ title: string } | null>(null);
const error = ref<string | null>(null);

async function HandleUrlInput(): Promise<void> {
    loading.value = true;
    progress.value = 0;
    currentStep.value = "Loading...";
    error.value = null;
    result.value = null;

    const res = await axios.get("https://copymanga.site/comic/dianjuren", {
        onDownloadProgress: (e) => {
            if (e.lengthComputable) {
                progress.value = Math.round((e.loaded * 100) / (e.total || 1));
                currentStep.value = `Downloading: ${progress.value}%`;
            }
        }
    });

    progress.value = 100;
    currentStep.value = "Processing...";

    const $ = load(res.data);
    const mangaStore = useMangaStore();

    const data: MangaDetails = {
        title: $("title").text()
    };
    console.log(data);

    mangaStore.setDetails(data);
    router.push("/details");
}
</script>
