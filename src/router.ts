import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./components/views/HomeView.vue";
import MangaDetailsView from "./components/views/MangaDetailsView.vue";
import MangaReader from "./components/views/MangaReader.vue";
import Cookies from "js-cookie";
import OptionsView from "./components/views/OptionsView.vue";
import HistoryView from "./components/views/HistoryView.vue";
import AccountView from "./components/views/AccountView.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: "/options", component: OptionsView },
    { path: "/history", component: HistoryView },
    { path: "/account", component: AccountView },
    {
        path: "/details/:mangaId",
        component: MangaDetailsView,
        props: true
    },
    {
        path: "/read/:mangaId/:chapterId",
        component: MangaReader,
        props: true
    }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export default router;
