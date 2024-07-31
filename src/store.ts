import { defineStore } from "pinia";
import type { MangaDetails } from "./structures/MangaDetails";

export const useMangaStore = defineStore("currentMangaDetails", {
    state: (): {
        details: MangaDetails | null;
    } => ({
        details: null
    }),

    actions: {
        setDetails(data: MangaDetails) {
            this.details = data;
        }
    }
});
