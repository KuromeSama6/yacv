import { CopyMangaAPI } from "@/api";
import type { AccountInfo } from "@/data/Account";
import axios from "axios";
import Cookies from "js-cookie";

export interface IAccountCredentials {
    username?: String;
    password?: String;
}

export class Account {
    info?: AccountInfo;
    token?: string;
    loginPending: boolean = false;

    public IsLoggedIn(): boolean {
        return this.token != undefined;
    }

    public async LogIn(credentials: IAccountCredentials) {
        this.loginPending = true;
        const res = await CopyMangaAPI.AccountLogin(credentials);
        this.token = res.token;
        this.info = await CopyMangaAPI.GetAccountInfo(this.token || "");
        this.loginPending = false;
    }

    public async LogOut() {
        await axios.post(
            `https://api.mangacopy.com/api/v3/member/info`,
            {},
            {
                headers: {
                    Authorization: `Token ${this.token}`
                }
            }
        );
        this.token = undefined;
        this.loginPending = false;
        this.info = undefined;
        Cookies.remove("token");
    }
}
