<template>
    <BContainer>
        <BRow>
            <BInputGroup class="mt-3">
                <BFormInput :placeholder="t('HomeView.manga_url_prompt')" v-model="inputText" />
                <BButton variant="primary" @click="HandleSearch(1)">Search</BButton>
            </BInputGroup>
        </BRow>
        <BRow class="mt-3" v-if="loading">
            <div class="d-flex align-items-center">
                <strong>{{ currentStep }}</strong>
                <BSpinner class="ms-auto" />
            </div>
        </BRow>
        <BRow>
            <ErrorBox :errorMessage="error" />
        </BRow>
    </BContainer>
    <br />
    <BContainer v-if="searchResult?.list">
        <BRow>
            <BListGroup v-if="searchResult?.list">
                <MangaSearchPreview
                    v-for="manga in searchResult.list"
                    :key="manga.path_word"
                    :manga="manga"
                    :searchHandler="ShowMangaDetails"
                />
            </BListGroup>
        </BRow>
        <BRow>
            <BPagination
                v-model="currentPage"
                :total-rows="searchResult.total"
                :per-page="ENTRIES_PER_PAGE"
                first-text="First"
                prev-text="Prev"
                next-text="Next"
                last-text="Last"
                @page-click="PaginationClicked"
            />
        </BRow>
    </BContainer>

    <p v-if="searchResult && !searchResult.list">No titles found.</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import {
    BCardGroup,
    BContainer,
    BInputGroup,
    BListGroup,
    BPagination,
    BRow,
    BvEvent
} from "bootstrap-vue-next";
import type { IMangaSearchResult } from "@/structures/MangaSearch";
import MangaSearchPreview from "../manga/MangaSearchPreview.vue";
import router from "@/router";
import { useMangaStore } from "@/store";
import ErrorBox from "../ErrorBox.vue";
import { Util } from "@/util";
import SearchBar from "../home/SearchBar.vue";
import { MangaChapters, type IManga } from "@/structures/Manga";
import { load } from "cheerio";

const { t } = useI18n();

const ENTRIES_PER_PAGE = 20;

const loading = ref(false);
const currentStep = ref(""); // Current step in the request process
const error = ref<string | null>(null);

const searchResult = ref<IMangaSearchResult | null>(null);

const currentPage = ref(1);

var inputText: string = "";

function PaginationClicked(event: BvEvent, page: number) {
    if (page == currentPage.value) {
        event.preventDefault();
        return;
    }

    HandleSearch(page);
}

async function HandleSearch(page: number = 1) {
    currentPage.value = page;
    error.value = null;
    loading.value = true;
    currentStep.value = "Searching...";

    var res;

    try {
        res = (
            await axios.get("https://copymanga.site/api/kb/web/searchb/comics", {
                params: {
                    platform: 2,
                    limit: ENTRIES_PER_PAGE,
                    offset: (currentPage.value - 1) * ENTRIES_PER_PAGE,
                    q: inputText,
                    q_type: ""
                }
            })
        ).data;
    } catch (err) {
        loading.value = false;
        error.value = `Search error: ${err}`;
        return;
    }

    loading.value = false;
    if (!res) {
        error.value = "Search error: empty result";
        return;
    } else if (res.code != 200) {
        error.value = `Search error: Error from CopyManga: ${res.message}`;
        return;
    }

    searchResult.value = res.results;
    console.log(searchResult.value);
}

async function ShowMangaDetails(id: string) {
    const mangaStore = useMangaStore();
    mangaStore.currentList = [];
    searchResult.value = null;

    loading.value = true;
    currentStep.value = "Requesting page...";
    error.value = null;

    var page;
    try {
        page = await axios.get(`https://copymanga.site/comic/${id}`, {
            onDownloadProgress: (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded * 100) / (e.total || 1));
                    currentStep.value = `Downloading: ${progress}%`;
                }
            }
        });
    } catch (err) {
        console.log(err);
        error.value = `Error while requesting page (step 1): ${err}`;
        loading.value = false;
        return;
    }

    const mangaId = id;
    console.log("Manga ID:", mangaId);

    currentStep.value = "Acquiring chapters...";

    // get the chapters
    var chapters: MangaChapters;
    try {
        const results = (await axios.get(`https://copymanga.site/comicdetail/${mangaId}/chapters`))
            .data.results;

        currentStep.value = "Decrypting chapters...";
        const decrypted = await Util.DecryptResult(results);
        console.log(decrypted);

        chapters = new MangaChapters(decrypted);
        console.log(chapters);
    } catch (err) {
        console.log(err);

        error.value = `Error getting chapters (step 2): ${err}`;
        loading.value = false;
        return;
    }

    currentStep.value = "Processing...";

    const $ = load(page.data);

    const data: IManga = {
        id: mangaId,
        title: "",
        coverLink: "",
        description: "",
        author: "",
        lastUpdated: "",
        status: "",
        chapters: chapters
    };

    // process framework
    {
        const titleBox = $(".container.comicParticulars-title");
        const detailsList = titleBox.find("ul").first();

        data.title = detailsList.find("li").eq(0).find("h6").text();
        data.author = detailsList.find("li").eq(2).find("a").text();
        data.lastUpdated = detailsList.find("li").eq(4).find(".comicParticulars-right-txt").text();
        data.status = detailsList.find("li").eq(5).find(".comicParticulars-right-txt").text();
    }

    {
        const coverBox = $(".comicParticulars-left-img.loadingIcon");
        const image = coverBox.find("img").first();
        data.coverLink = image.prop("data-src");
    }

    {
        const box = $(".container.comicParticulars-synopsis");
        data.description = box.find(".intro").first().text();
    }

    console.log(data);

    mangaStore.currentList.push(data);
    router.push("/details");

    loading.value = false;
}
</script>
