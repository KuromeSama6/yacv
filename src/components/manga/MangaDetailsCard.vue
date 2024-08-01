<script setup lang="ts">
import { useMangaStore } from "@/store";
import { MangaChapters, type IChapter, type IManga } from "@/structures/Manga";
import { Util } from "@/util";
import {
    BCard,
    BCardImg,
    BCardText,
    BContainer,
    BButtonGroup,
    BButton,
    BRow,
    BNav,
    BNavItem,
    BPagination
} from "bootstrap-vue-next";
import { reactive, ref } from "vue";
const props = defineProps({
    manga: Object as () => IManga
});

const PAGE_TOTAL = 50;

const manga = props.manga;
const mangaData = reactive(manga?.chapters as MangaChapters);

const activeGroupTab = ref("default");
const currentSection = ref(0);

function GetActiveChapters(): IChapter[] {
    return manga?.chapters.groups[activeGroupTab.value].chapters || [];
}

function GetVisibleChapters(): IChapter[] {
    return GetActiveChapters().slice(
        currentSection.value * PAGE_TOTAL,
        currentSection.value * PAGE_TOTAL + PAGE_TOTAL
    );
}

function OpenManga(id: string) {}
</script>

<template>
    <body>
        <BContainer>
            <BCard :title="manga?.title" style="max-width: 90vw">
                <BCardImg :src="manga?.coverLink" style="max-height: 20rem; width: auto" />
                <BContainer>
                    <BRow>
                        <ul>
                            <li>Author: {{ manga?.author }}</li>
                            <li>Latest Update: {{ manga?.lastUpdated }}</li>
                            <li>Status: {{ manga?.status }}</li>
                        </ul>
                    </BRow>
                </BContainer>
                <BCardText>{{ manga?.description }}</BCardText>
                <BContainer>
                    <BRow>
                        <BNav tabs>
                            <BNavItem
                                v-for="group in mangaData.groups"
                                :key="group.id"
                                :active="activeGroupTab == group.id"
                                @click="activeGroupTab = group.id"
                                href="javascript:;"
                            >
                                {{ group.name }}
                            </BNavItem>
                        </BNav>
                    </BRow>
                    <BRow>
                        <BNav tabs>
                            <BNavItem
                                v-for="i in Util.SRange(
                                    Math.ceil(GetActiveChapters().length / PAGE_TOTAL)
                                )"
                                :key="i"
                                :active="currentSection == i"
                                @click="currentSection = i"
                                href="javascript:;"
                            >
                                {{ `${i * PAGE_TOTAL + 1}~${i * PAGE_TOTAL + PAGE_TOTAL}` }}
                            </BNavItem>
                        </BNav>
                    </BRow>
                    <BRow>
                        <BNav>
                            <BNavItem
                                v-for="chapter in GetVisibleChapters()"
                                :key="chapter.id"
                                @click="OpenManga(chapter.id)"
                                href="javascript:;"
                            >
                                {{ chapter.name }}
                            </BNavItem>
                        </BNav>
                    </BRow>
                </BContainer>
            </BCard>
        </BContainer>
    </body>
</template>
