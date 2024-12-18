import { defineStore } from "pinia";
import type { IManga } from "./structures/Manga";
import { Settings } from "./structures/Settings";
import Cookies from "js-cookie";
import { ReadingHistory, type HistoryEntry } from "./structures/History";
import { Account, type IAccountCredentials } from "./structures/Account";
import type { IAlertData } from "./structures/General";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import i18n from "./i18n";

export const useGlobalVars = defineStore("globalVars", {
    state: (): {
        apiStatusChecked: boolean;
    } => ({
        apiStatusChecked: false
    })
});

export const useAlertsManager = defineStore("alerts", {
    state: (): {
        alerts: IAlertData[];
    } => ({
        alerts: []
    }),

    actions: {
        Add(alert: IAlertData) {
            this.alerts.push(alert);
            alert.visible = true;
        },

        NotifyTokenExpired() {
            this.Add({
                variant: "warning",
                message: i18n.global.t("account.hint.token_expired")
            });
            useAccountStore().Logout();
        }
    }
});

export const useSettingsStore = defineStore("settings", {
    state: (): Settings => new Settings(),
    actions: {
        Save() {
            Cookies.set("settings", JSON.stringify(this.$state as Settings));
        },

        Read() {
            const str = Cookies.get("settings");
            if (!str) {
                console.warn("No settings found");
                this.Save();
                return;
            }
            const data: Settings = JSON.parse(str);
            console.log("Read settings data");
            console.log(data);

            Object.assign(this.$state, data);
            this.Save();
        },

        Reset() {
            Object.assign(this.$state, new Settings());
            this.Save();
        }
    }
});

export const useLocalHistoryStore = defineStore("localReadingHistory", {
    state: (): ReadingHistory => new ReadingHistory(),
    actions: {
        Save() {
            this.Validate();
            localStorage.setItem("localHistory", JSON.stringify(this.$state));
        },

        Read() {
            const str = localStorage.getItem("localHistory");
            if (!str) {
                console.warn("No local history found");
                this.Save();
                return;
            }
            const data: Settings = JSON.parse(str);
            console.log("Read local history data");
            console.log(data);

            Object.assign(this.$state, data);
            this.Validate();
        },

        Validate() {
            const limit = useSettingsStore().localHistorySize;
            if (this.reads.length > limit) this.reads = this.reads.slice(limit);
        },

        PushEntry(entry: HistoryEntry) {
            // update if reading from the same manga
            {
                const index = this.reads.findIndex(
                    (c) => c.chapter.manga.path_word == entry.chapter.manga.path_word
                );
                if (index != -1) this.reads.splice(index, 1);
            }

            this.reads.push(entry);
            this.Save();
        },

        Clear() {
            this.reads = [];
            localStorage.removeItem("localHistory");
        }
    }
});

export const useAccountStore = defineStore("account", {
    state: (): Account => new Account(),
    actions: {
        IsLoggedIn() {
            return this.$state.IsLoggedIn();
        },
        async Login(creds: IAccountCredentials) {
            await this.$state.Login(creds);
            Cookies.set("token", this.token || "");
        },
        async Logout() {
            await this.$state.Logout();
        },
        async UpdateBookshelfCache() {
            await this.$state.UpdateBookshelfCache();
        }
    }
});
