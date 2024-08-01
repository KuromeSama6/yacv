export interface IMangaSearchResult {
    total: number;
    list: IMangaPreview[];
}

export interface IMangaPreview {
    name: string;
    coverLink: string;
    path_word: string;
    popular: string;
    author: IAuthorData[];
}

export interface IAuthorData {
    name: string;
    path_word: string;
}
