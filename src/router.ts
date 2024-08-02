import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./components/views/HomeView.vue";
import MangaDetailsView from "./components/views/MangaDetailsView.vue";
import MangaReader from "./components/views/MangaReader.vue";

const routes = [
    { path: "/", component: HomeView },
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
