<script setup lang="ts">
import axios from "axios";
import { BButtonGroup, BContainer, BRow, BSpinner } from "bootstrap-vue-next";
import { load } from "cheerio";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <BContainer style="text-align: center">
        <BRow>
            <h1>Yet Another CopyManga Viewer</h1>
            <p></p>
        </BRow>
        <SearchBar />
    </BContainer>
</template>

<script lang="ts">
import router from "@/router";
import { useMangaStore } from "@/store";
import { MangaChapters, type IManga } from "@/structures/Manga";
import { ref } from "vue";
import ErrorBox from "../ErrorBox.vue";
import { Util } from "@/util";
import SearchBar from "../home/SearchBar.vue";
</script>
