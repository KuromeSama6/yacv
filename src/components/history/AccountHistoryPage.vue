<script setup lang="ts">
import { CopyMangaAPI } from "@/api";
import { type AccountHistoryEntry } from "@/data/Account";
import { useAccountStore, useLocalHistoryStore, useSettingsStore } from "@/store";
import { BContainer, BRow } from "bootstrap-vue-next";
import { it } from "node:test";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
const router = useRouter();
const account = useAccountStore();
const settings = useSettingsStore();

const history = ref<AccountHistoryEntry[]>([]);
const totalHistory = ref(0);
const ENTRIES_PER_LOAD = 200;
const initialLoad = ref(false);
const loading = ref(false);

async function LoadHistory() {
    if (!account.IsLoggedIn()) return;

    if (totalHistory.value == 0 || history.value.length < totalHistory.value) {
        loading.value = true;
        const res = await CopyMangaAPI.GetAccountHistory(
            account.token || "",
            ENTRIES_PER_LOAD,
            history.value.length
        );
        initialLoad.value = true;
        loading.value = false;

        totalHistory.value = res.total;
        for (const entry of res.list) {
            history.value.push(entry);
        }
    }
}
LoadHistory();
</script>

<template>
    <div v-if="!account.IsLoggedIn()" class="text-center">
        <small class="text-muted"
            ><RouterLink to="/account">Log in</RouterLink> to CopyManga to see account
            history.</small
        >
    </div>
    <BContainer v-if="account.IsLoggedIn()">
        <BRow>
            <h3>CopyManga History</h3>
            <small class="text-muted" v-if="totalHistory > 0"
                >Total {{ totalHistory }} entries in history.</small
            >
            <small class="text-muted" v-if="totalHistory == 0 && initialLoad"
                >Nothing in history.</small
            >
        </BRow>
        <BRow>
            <BListGroup>
                <BListGroupItem
                    v-for="item in history"
                    :key="item.last_chapter_id"
                    href="javascript:;"
                    class="flex-column align-items-start"
                    @click="router.push(`/read/${item.comic.path_word}/${item.last_chapter_id}`)"
                >
                    <div class="d-flex w-100 justify-content-between">
                        <div>
                            <h5 class="mb-1">
                                {{ item.comic.name }}
                                <BBadge
                                    variant="success"
                                    v-if="
                                        item.last_chapter_id == item.comic.last_chapter_id &&
                                        settings.displayCaughtUpBadge
                                    "
                                    >Caught Up</BBadge
                                ><BBadge
                                    variant="danger"
                                    v-if="item.last_chapter_id != item.comic.last_chapter_id"
                                    >New</BBadge
                                >
                            </h5>
                        </div>
                        <small class="text-body-secondary"
                            >Latest: {{ item.comic.last_chapter_name }}</small
                        >
                    </div>

                    <p class="mb-1">
                        {{ item.last_chapter_name }}
                    </p>

                    <!-- <small class="text-body-secondary">Click to continue reading.</small> -->
                </BListGroupItem>
            </BListGroup>
        </BRow>
        <BRow style="margin-top: 1rem">
            <BButton
                block
                variant="primary"
                v-if="history.length < totalHistory && !loading"
                @click="LoadHistory"
                >Load More ({{ totalHistory - history.length }} to go)</BButton
            >
        </BRow>
    </BContainer>
</template>
