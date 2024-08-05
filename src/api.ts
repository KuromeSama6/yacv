import axios, { AxiosError } from "axios";
import type { IMangaSearchResult } from "./structures/MangaSearch";
import type { MangaChapter, MangaDescriptor } from "./data/Manga";
import type { IMangaChapter, IMangaDetails } from "./structures/Manga";
import type { AccountInfo } from "./data/Account";
import type { IAccountCredentials } from "./structures/Account";
import QueryString from "qs";

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

    export async function AccountLogin(creds: IAccountCredentials): Promise<AccountInfo> {
        // Theory: any 4-digit salt works
        // This is not a real 'salt' algorithm.
        const salt = Math.round(1000 + Math.random() * 8000);
        const password = btoa(`${creds.password}-${salt}`);
        const data = {
            username: creds.username,
            password: password,
            salt: salt,
            source: "freeSite", // Field functionally unknown
            version: "2024.01.08", // Field functionally unknown
            platform: 1
        };

        const res = await axios.post(
            `https://api.mangacopy.com/api/v3/login`,
            QueryString.stringify(data),
            {
                headers: {
                    platform: 1
                }
            }
        );

        if (res.status == 210) {
            throw `Bad Login: ${res.data.message}`;
        } else if (res.status != 200) {
            throw `Request error: Error from CopyManga: ${JSON.stringify(res.data)}`;
        }

        return res.data.results;
    }

    export async function GetAccountInfo(token?: string): Promise<AccountInfo> {
        const res = await axios.get(`https://api.mangacopy.com/api/v3/member/info`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });

        return res.data.results;
    }
}
