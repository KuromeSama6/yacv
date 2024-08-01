import { defineStore } from "pinia";
import type { IManga } from "./structures/Manga";

export interface MangaDetailsState {
    currentList: IManga[];
}

export const useMangaStore = defineStore("currentMangaDetails", {
    state: (): MangaDetailsState => ({
        currentList: []
    })
});
