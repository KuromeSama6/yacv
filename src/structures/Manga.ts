import type { Manga, MangaChapter, MangaDescriptor, MangaGroupData } from "@/data/Manga";

export enum ChapterType {
    REGULAR = 1,
    OTHERS = 3
}

export interface IManga {
    descriptor: MangaDescriptor;
    chapters: Chapters;
}

export interface IMangaDetails {
    comic: MangaDescriptor;
    groups: MangaGroupData[];
}

export interface IMangaChapter {
    chapter: MangaChapter;
    manga: Manga;
}

export interface IChapterGroup {
    group: MangaGroupData;
    chapters: MangaChapter[];
}

export class Chapters {
    public groups: { [key: string]: IChapterGroup } = {};

    public AddGroup(group: MangaGroupData, chapters: MangaChapter[]) {
        this.groups[group.path_word] = {
            group: group,
            chapters: chapters
        };
    }
}
