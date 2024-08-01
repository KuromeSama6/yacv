<script setup lang="ts">
import type { IMangaPreview } from "@/structures/MangaSearch";
import { BCard, BContainer, BCardText } from "bootstrap-vue-next";

const props = defineProps({
    manga: Object as () => IMangaPreview,
    searchHandler: Function
});

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
        <BBadge variant="warning">热度 {{ manga?.popular }}</BBadge>
    </BListGroupItem>
</template>
