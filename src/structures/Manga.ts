import type { Cheerio, Element } from "cheerio";

export enum ChapterType {
    REGULAR = 1,
    OTHERS = 3
}

export interface IManga {
    id: string;
    title: string;
    coverLink: string;
    description: string;
    author: string;
    lastUpdated: string;
    status: string;
    chapters: MangaChapters;
}

export interface IChapter {
    id: string;
    name: string;
    type: ChapterType;
}

export class SimpleChapter implements IChapter {
    id: string;
    name: string;
    type: ChapterType;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
    }
}

export class LatestChapter implements IChapter {
    id: string;
    name: string;
    type: ChapterType;
    constructor(data: any) {
        this.id = data.comic_id;
        this.name = data.name;
        this.type = data.type;
    }
}

export interface IChapterGroup {
    id: string;
    name: string;
    total: number;
    latest: IChapter;
    chapters: IChapter[];
}

export class MangaChapters {
    public groups: { [key: string]: IChapterGroup } = {};

    constructor(data: any) {
        for (const key in data.groups) {
            const group = data.groups[key];
            const chapterGroup: IChapterGroup = {
                id: key,
                name: group.name,
                total: group.count,
                latest: new LatestChapter(group.last_chapter),
                chapters: []
            };

            for (const chapter of group.chapters) {
                chapterGroup.chapters.push(new SimpleChapter(chapter));
            }

            this.groups[key] = chapterGroup;
        }
    }
}
