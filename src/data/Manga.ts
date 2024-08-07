export interface MangaDescriptor {
    uuid: string;
    b_404: boolean;
    b_hidden: boolean;
    ban: number;
    name: string;
    alias: string;
    path_word: string;
    close_comment: boolean;
    close_roast: boolean;
    free_type: FreeType;
    restrict: Restrict;
    reclass: Reclass;
    females: any[];
    males: any[];
    clubs: any[];
    img_type: number;
    seo_baidu: string;
    region: Region;
    status: Status;
    author: Author[];
    theme: Theme[];
    parodies: any[];
    brief: string;
    datetime_updated: string;
    cover: string;
    last_chapter: LastChapter;
    popular: number;

    last_chapter_id?: string;
    last_chapter_name?: string;
}

export interface FreeType {
    display: string;
    value: number;
}

export interface Restrict {
    value: number;
    display: string;
}

export interface Reclass {
    value: number;
    display: string;
}

export interface Region {
    value: number;
    display: string;
}

export interface Status {
    value: number;
    display: string;
}

export interface Author {
    name: string;
    path_word: string;
}

export interface Theme {
    name: string;
    path_word: string;
}

export interface LastChapter {
    uuid: string;
    name: string;
}

export interface MangaGroupData {
    path_word: string;
    count: number;
    name: string;
}

export interface MangaChapter {
    index: number;
    uuid: string;
    count: number;
    ordered: number;
    size: number;
    name: string;
    comic_id: string;
    comic_path_word: string;
    group_id: string;
    group_path_word: string;
    type: number;
    img_type: number;
    news: string;
    datetime_created: string;
    prev?: string;
    next?: string;
}

export interface Manga {
    name: string;
    path_word: string;
    uuid: string;
}
