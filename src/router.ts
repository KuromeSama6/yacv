import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./components/views/HomeView.vue";
import MangaDetailsView from "./components/views/MangaDetailsView.vue";

const routes = [
    { path: "/", component: HomeView },
    {
        path: "/details",
        component: MangaDetailsView,
        props: true
    }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export default router;
