import type { Manga, MangaChapter, MangaDescriptor } from "./Manga";

export interface AccountInfo {
    token?: string;
    user_id: string;
    username: string;
    nickname: string;
    avatar: string;
    is_authenticated: boolean;
    datetime_created: string;
    b_verify_email: boolean;
    email: string;
    mobile: any;
    mobile_region: any;
    point: number;
    ticket: number;
    reward_ticket: number;
    comic_vip: number;
    comic_vip_end: any;
    comic_vip_start: any;
    cartoon_vip: number;
    cartoon_vip_end: any;
    cartoon_vip_start: any;
    ads_vip_end: any;
    close_report: boolean;
    downloads: number;
    vip_downloads: number;
    reward_downloads: number;
    invite_code: any;
    invited: any;
    b_sstv: boolean;
    scy_answer: boolean;
}

export interface BrowseChapterHistory {
    last_browse_id: string;
    last_browse_name: string;
}

export interface FavouriteManga {
    uuid: number;
    name: any;
    b_folder: boolean;
    folder_id: any;
    last_browse: BrowseChapterHistory;
    comic: MangaDescriptor;
}

export interface FavouritesQueryResponse {
    list: FavouriteManga[];
    total: number;
    limit: number;
    offset: number;
}

export interface AccountHistoryEntry {
    id: number;
    last_chapter_id: string;
    last_chapter_name: string;
    comic: MangaDescriptor;
}

export interface AccountHistoryQueryResponse {
    list: AccountHistoryEntry[];
    total: number;
    limit: number;
    offset: number;
}
