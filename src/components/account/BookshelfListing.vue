<script setup lang="ts">
import { CopyMangaAPI } from "@/api";
import { type FavouriteManga } from "@/data/Account";
import { BookshelfQueryOrder } from "@/enums/Account";
import { useAccountStore, useSettingsStore } from "@/store";
import { BCol, BContainer, BRow } from "bootstrap-vue-next";
import { tify } from "chinese-conv";
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBar from "../SearchBar.vue";

const router = useRouter();
const account = useAccountStore();
const settings = useSettingsStore();

const ITEMS_PER_ROW = 3;
const ENTRIES_PER_LOAD = 200;

const bookshelf = ref<FavouriteManga[]>([]);
const total = ref(0);
const initialLoad = ref(false);
const loading = ref(false);
const searchKeyword = ref("");

async function Loadbookshelf() {
    if (!account.IsLoggedIn()) return;

    if (total.value == 0 || bookshelf.value.length < total.value) {
        loading.value = true;
        const res = await CopyMangaAPI.GetAccountBookshelf(account.token || "", ENTRIES_PER_LOAD, BookshelfQueryOrder.TIME_UPDATED, bookshelf.value.length);
        initialLoad.value = true;
        loading.value = false;

        total.value = res.total;
        for (const entry of res.list) {
            bookshelf.value.push(entry);
        }
    }
}
Loadbookshelf();

function GetFilteredResults() {
    if (!searchKeyword.value) return bookshelf.value;
    const res = bookshelf.value.filter((c) => c.comic.name.includes(tify(searchKeyword.value)));
    return res;
}
</script>

<template>
    <BContainer style="margin-top: 1rem">
        <BRow>
            <h3>CopyManga bookshelf</h3>
        </BRow>
        <BRow>
            <SearchBar v-model="searchKeyword" placeholder="Search for a title..." />
        </BRow>
        <BRow style="margin-top: 1rem">
            <small class="text-muted" v-if="total > 0">Total {{ total }} entries in bookshelf.</small>
            <small class="text-muted" v-if="total == 0 && initialLoad">Nothing in bookshelf.</small>
            <BListGroup>
                <BListGroupItem v-for="item in GetFilteredResults()" :key="item.uuid" href="javascript:;" class="flex-column align-items-start" @click="router.push(item.last_browse ? `/read/${item.comic.path_word}/${item.last_browse.last_browse_id}` : `/details/${item.comic.path_word}`)">
                    <BRow>
                        <BCol sm="2">
                            <img class="manga-thumb" :src="item.comic.cover" />
                        </BCol>
                        <BCol sm="10">
                            <div class="d-flex w-100 justify-content-between">
                                <div>
                                    <h5 class="mb-1">
                                        {{ item.comic.name }}
                                        <BBadge variant="success" v-if="item.last_browse?.last_browse_id == item.comic.last_chapter_id && settings.displayCaughtUpBadge">Caught Up</BBadge><BBadge variant="danger" v-if="item.last_browse?.last_browse_id != item.comic.last_chapter_id">New</BBadge>
                                    </h5>
                                </div>
                                <small class="text-body-secondary">Latest: {{ item.comic.last_chapter_name }}</small>
                            </div>

                            <p class="mb-1">
                                {{ item.last_browse?.last_browse_name }}
                            </p>
                        </BCol>
                    </BRow>

                    <!-- <small class="text-body-secondary">Click to continue reading.</small> -->
                </BListGroupItem>
            </BListGroup>
        </BRow>
        <BRow style="margin-top: 1rem">
            <BButton block variant="primary" v-if="bookshelf.length < total && !loading" @click="Loadbookshelf">Load More ({{ total - bookshelf.length }} to go)</BButton>
        </BRow>
    </BContainer>
</template>

<style>
.manga-thumb {
    max-width: 100%;
}
</style>
