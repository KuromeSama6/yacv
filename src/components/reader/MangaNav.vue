<script setup lang="ts">
import { CopyMangaAPI } from "@/api";
import type { MangaChapter, MangaDescriptor } from "@/data/Manga";
import { useAccountStore } from "@/store";
import type { IMangaChapter } from "@/structures/Manga";
import { BSpinner, BContainer } from "bootstrap-vue-next";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const props = defineProps<{
    manga?: IMangaChapter;
    loadedImages: HTMLImageElement[];
}>();
const router = useRouter();
const account = useAccountStore();

const starred = ref<boolean>(
    account.IsLoggedIn() &&
        account.bookshelfCache.find((c) => c.comic.uuid == props.manga?.manga.uuid) != null
);

async function Star() {
    const newState = !starred.value;
    await CopyMangaAPI.SetTitleStarred(
        account.token || "",
        props.manga?.manga.uuid || "",
        newState
    );
    starred.value = newState;
    account.UpdateBookshelfCache();
}
</script>

<template>
    <div class="main">
        <BContainer>
            <BRow>
                <div class="d-flex">
                    <h6>{{ manga?.manga.name }}</h6>
                    <small class="ms-auto text-muted">{{ manga?.chapter.name }}</small>
                </div>
                <small v-if="!account.IsLoggedIn()" class="text-muted">
                    <RouterLink to="/account">{{ t("reader.nav.hint_login") }}</RouterLink>
                    {{ t("reader.nav.hint_login_2") }}
                </small>
            </BRow>
            <!-- <BNav pills size="sm" class="nav">
                <BNavItem active>Active</BNavItem>
                <BNavItem>Link</BNavItem>
                <BNavItem>Another Link</BNavItem>
                <BNavItem variant="danger">Disabled</BNavItem>
            </BNav> -->
            <BButtonGroup class="nav">
                <BButton
                    v-if="manga?.chapter.prev"
                    variant="outline-secondary"
                    @click="router.push(`/read/${manga?.manga.path_word}/${manga.chapter.prev}`)"
                >
                    {{ t("reader.nav.button.prev") }}
                </BButton>
                <BButton variant="outline-secondary" @click="router.go(-1)">{{
                    t("reader.nav.button.back")
                }}</BButton>
                <BButton
                    variant="outline-secondary"
                    @click="router.push(`/details/${manga?.manga.path_word}`)"
                    >{{ t("reader.nav.button.details") }}</BButton
                >
                <BButton
                    v-if="account.IsLoggedIn() && !starred"
                    variant="outline-warning"
                    @click="Star"
                    >{{ t("reader.nav.button.star") }}</BButton
                >
                <BButton v-if="account.IsLoggedIn() && starred" variant="warning" @click="Star">{{
                    t("reader.nav.button.unstar")
                }}</BButton>
                <BButton
                    v-if="manga?.chapter.next"
                    variant="outline-primary"
                    @click="
                        router.push(
                            `/read/${props.manga?.manga.path_word}/${props.manga?.chapter.next}`
                        )
                    "
                >
                    {{ t("reader.nav.button.next") }}
                </BButton>
            </BButtonGroup>
        </BContainer>
    </div>
</template>

<style scoped>
.main {
    padding-bottom: 0.25rem;
    padding-top: 0.25rem;
    /* background-color: var(--bs-secondary-bg); */
}

.nav {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
}
</style>
