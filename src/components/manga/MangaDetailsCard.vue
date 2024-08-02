<script setup lang="ts">
import type { MangaChapter } from "@/data/Manga";
import { useMangaStore } from "@/store";
import { type IManga } from "@/structures/Manga";
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
import { useRouter } from "vue-router";
const props = defineProps({
    manga: Object as () => IManga
});
const router = useRouter();

const PAGE_TOTAL = 50;

const manga = props.manga;

const activeGroupTab = ref("default");
const currentSection = ref(0);

function GetActiveChapters(): MangaChapter[] {
    if (!manga?.chapters.groups[activeGroupTab.value]) return [];
    return manga?.chapters.groups[activeGroupTab.value]?.chapters || [];
}

function GetVisibleChapters(): MangaChapter[] {
    return GetActiveChapters().slice(
        currentSection.value * PAGE_TOTAL,
        currentSection.value * PAGE_TOTAL + PAGE_TOTAL
    );
}

function OpenManga(id: string) {
    router.push(`/read/${manga?.descriptor.path_word}/${id}`);
}
</script>

<template>
    <body>
        <BContainer>
            <BCard :title="manga?.descriptor.name" style="max-width: 90vw">
                <BCardImg :src="manga?.descriptor.cover" style="max-height: 20rem; width: auto" />
                <BContainer>
                    <BRow>
                        <ul>
                            <li>Author: {{ manga?.descriptor.author[0].name }}</li>
                            <li>Latest Update: {{ manga?.descriptor.datetime_updated }}</li>
                            <li>Status: {{ manga?.descriptor.status.display }}</li>
                        </ul>
                    </BRow>
                </BContainer>
                <BCardText>{{ manga?.descriptor.brief }}</BCardText>
                <BContainer v-if="manga?.chapters.groups['default']">
                    <BRow>
                        <BNav tabs>
                            <BNavItem
                                v-for="group in manga?.chapters.groups"
                                :key="group.group.path_word"
                                :active="activeGroupTab == group.group.path_word"
                                @click="activeGroupTab = group.group.path_word"
                                href="javascript:;"
                            >
                                {{ group.group.name }}
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
                                :key="chapter.uuid"
                                @click="OpenManga(chapter.uuid)"
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
