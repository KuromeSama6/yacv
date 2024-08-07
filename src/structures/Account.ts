import { CopyMangaAPI } from "@/api";
import type { AccountInfo, FavouriteManga, FavouritesQueryResponse } from "@/data/Account";
import { BookshelfQueryOrder } from "@/enums/Account";
import i18n from "@/i18n";
import { useAlertsManager } from "@/store";
import axios from "axios";
import Cookies from "js-cookie";
import { useI18n } from "vue-i18n";

export interface IAccountCredentials {
    username?: String;
    password?: String;
}

export class Account {
    info?: AccountInfo;
    token?: string;
    loginPending: boolean = false;

    bookshelfCache: FavouriteManga[] = [];

    public IsLoggedIn(): boolean {
        return this.token != undefined;
    }

    public async Login(credentials: IAccountCredentials) {
        this.loginPending = true;
        const res = await CopyMangaAPI.AccountLogin(credentials);
        this.token = res.token;
        this.info = await CopyMangaAPI.GetAccountInfo(this.token || "");
        this.loginPending = false;

        this.UpdateBookshelfCache();
    }

    public async UpdateBookshelfCache() {
        this.bookshelfCache = (
            await CopyMangaAPI.GetAccountBookshelf(
                this.token || "",
                200,
                BookshelfQueryOrder.TIME_UPDATED,
                0
            )
        ).list;
    }

    public async Logout() {
        const token = this.token;

        this.token = undefined;
        this.loginPending = false;
        this.info = undefined;
        Cookies.remove("token");
        await axios.post(
            `https://api.mangacopy.com/api/v3/member/info`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        );

        useAlertsManager().Add({
            variant: "success",
            message: i18n.global.t("account.hint.manual_logged_out")
        });
    }
}
