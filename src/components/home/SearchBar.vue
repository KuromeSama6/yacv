<template>
    <BContainer>
        <BRow>
            <BInputGroup class="mt-3">
                <BFormInput
                    :placeholder="t('home.manga_url_prompt')"
                    v-model="inputText"
                    @keydown.enter="HandleSearch(1, true)"
                />
                <BButton variant="primary" @click="HandleSearch(1, true)">Search</BButton>
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
    <BContainer v-if="searchResult?.list.length">
        <BRow>
            <BListGroup>
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

    <p v-if="searchResult && !searchResult.list.length">No titles found.</p>
</template>

<script setup lang="ts">
import type { IMangaSearchResult } from "@/structures/MangaSearch";
import axios from "axios";
import {
    BContainer,
    BInputGroup,
    BListGroup,
    BPagination,
    BRow,
    BvEvent
} from "bootstrap-vue-next";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import ErrorBox from "../ErrorBox.vue";
import MangaSearchPreview from "../manga/MangaSearchPreview.vue";
import { useRouter } from "vue-router";
import { CopyMangaAPI } from "@/api";

const { t } = useI18n();
const router = useRouter();

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

async function HandleSearch(page: number = 1, clearValue: boolean = false) {
    currentPage.value = page;
    if (clearValue) searchResult.value = null;
    error.value = null;
    loading.value = true;
    currentStep.value = "Searching...";

    var res;

    try {
        res = await CopyMangaAPI.SearchForTitle(
            inputText,
            ENTRIES_PER_PAGE,
            (currentPage.value - 1) * ENTRIES_PER_PAGE
        );
    } catch (err: any) {
        loading.value = false;
        console.error(err);
        error.value = `Search error: ${err}: ${err.stack}`;
        return;
    }

    loading.value = false;
    if (!res) {
        error.value = "Search error: empty result";
        return;
    }

    searchResult.value = res;
    console.log(searchResult.value);
}

async function ShowMangaDetails(id: string) {
    router.push(`/details/${id}`);
}
</script>
