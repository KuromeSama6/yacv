<script setup lang="ts">
import type { MangaChapter, MangaDescriptor } from "@/data/Manga";
import type { IMangaChapter } from "@/structures/Manga";
import { BSpinner } from "bootstrap-vue-next";
import { useRouter } from "vue-router";

const props = defineProps<{
    manga?: IMangaChapter;
    loadedImages: HTMLImageElement[];
}>();
const router = useRouter();

function ScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function ScrollToBottom() {
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pageHeight, behavior: "smooth" });
}
</script>

<template>
    <nav class="navbar navbar-expand bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand">{{ manga?.manga.name }}</a>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active">{{ manga?.chapter.name }}</a>
                    </li>
                    <BButton
                        variant="outline-danger"
                        @click="router.push(`/details/${manga?.manga.path_word}`)"
                        >Exit</BButton
                    >
                </ul>
            </div>
            <div class="d-flex">
                <span class="navbar-text">
                    <BButtonGroup>
                        <!-- <BButton variant="outline" @click="ScrollToTop">Top</BButton>
                        <BButton variant="outline" @click="ScrollToBottom">Bottom</BButton> -->
                        <BButton
                            v-if="manga?.chapter.prev"
                            variant="outline"
                            @click="
                                router.push(`/read/${manga?.manga.path_word}/${manga.chapter.prev}`)
                            "
                            >Previous</BButton
                        >
                    </BButtonGroup>
                    <BButtonGroup>
                        <BButton
                            v-if="manga?.chapter.next"
                            variant="outline-primary"
                            @click="
                                router.push(
                                    `/read/${props.manga?.manga.path_word}/${props.manga?.chapter.next}`
                                )
                            "
                            >Next</BButton
                        >
                    </BButtonGroup>
                </span>
            </div>
        </div>
    </nav>
</template>
