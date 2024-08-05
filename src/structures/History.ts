import type { MangaChapter } from "@/data/Manga";
import type { IMangaChapter } from "./Manga";

export interface HistoryEntry {
    chapter: IMangaChapter;
    date: Date;
}

export class ReadingHistory {
    reads: HistoryEntry[] = [];
}
