import axios from "axios";
import type { IMangaSearchResult } from "./structures/MangaSearch";
import type { MangaChapter, MangaDescriptor } from "./data/Manga";
import type { IMangaChapter, IMangaDetails } from "./structures/Manga";

export module CopyMangaAPI {
    export async function SearchForTitle(
        q: string,
        perPage: number = 20,
        offset: number = 0
    ): Promise<IMangaSearchResult> {
        const res = (
            await axios.get("https://api.mangacopy.com/api/v3/search/comic", {
                headers: {
                    platform: 1
                },
                params: {
                    platform: 1,
                    q: q,
                    limit: perPage,
                    offset: offset,
                    q_type: "",
                    _update: true
                }
            })
        ).data;

        return res.results;
    }

    export async function GetMangaDetails(mangaId: string): Promise<IMangaDetails> {
        return (
            await axios.get(`https://api.mangacopy.com/api/v3/comic2/${mangaId}`, {
                headers: {
                    platform: 1
                },
                params: {
                    platform: 1,
                    _update: true
                }
            })
        ).data.results;
    }

    export async function GetMangaChapters(
        mangaId: string,
        groupId: string,
        limit: number = 500
    ): Promise<MangaChapter[]> {
        return (
            await axios.get(
                `https://api.mangacopy.com/api/v3/comic/${mangaId}/group/${groupId}/chapters`,
                {
                    headers: {
                        platform: 1
                    },
                    params: {
                        limit: limit,
                        offset: 0,
                        _update: true
                    }
                }
            )
        ).data.results.list;
    }

    export async function GetMangaChapterData(
        mangaId: string,
        chapterId: string
    ): Promise<IMangaChapter> {
        const res = (
            await axios.get(
                `https://api.mangacopy.com/api/v3/comic/${mangaId}/chapter2/${chapterId}`,
                {
                    headers: {
                        platform: 1
                    },
                    params: {
                        platform: 1,
                        _update: true
                    }
                }
            )
        ).data.results;

        return {
            chapter: res.chapter,
            manga: res.comic
        };
    }

    export async function GetChapterImageLinks(
        mangaId: string,
        chapterId: string
    ): Promise<string[]> {
        const res = (
            await axios.get("/api/getPageLinks", {
                headers: {
                    manga: mangaId,
                    chapter: chapterId
                }
            })
        ).data;

        const ret: string[] = [];
        for (const key in res) {
            const page = res[key];
            ret.push(page.url);
        }

        return ret;
    }
}
