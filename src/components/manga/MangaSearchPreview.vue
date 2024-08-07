<script setup lang="ts">
import type { IMangaPreview } from "@/structures/MangaSearch";
import { BCard, BContainer, BCardText } from "bootstrap-vue-next";
import { useI18n } from "vue-i18n";

const props = defineProps({
    manga: Object as () => IMangaPreview,
    searchHandler: Function
});
const { t } = useI18n();

const manga = props.manga;

function ShowMangaDetails() {
    // console.log(props.manga?.path_word);
    props.searchHandler?.call(null, props.manga?.path_word);
}
</script>

<template>
    <BListGroupItem class="d-flex align-items-start" href="javascript:;" @click="ShowMangaDetails">
        <div class="ms-2 me-auto">
            <div class="fw-bold">{{ manga?.name }}</div>
            {{ manga?.author[0].name }}
        </div>
        <BBadge variant="warning">{{
            t("home.search_results.popularity_badge", [manga?.popular])
        }}</BBadge>
    </BListGroupItem>
</template>
