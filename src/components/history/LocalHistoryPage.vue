<script setup lang="ts">
import { useLocalHistoryStore, useSettingsStore } from "@/store";
import { BContainer, BRow } from "bootstrap-vue-next";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";

const history = useLocalHistoryStore();
const router = useRouter();
const settings = useSettingsStore();
</script>

<template>
    <BContainer>
        <BRow>
            <h3>Local History</h3>
            <small class="text-muted"
                >Local history is limited to {{ settings.localHistorySize }} entries, configurable
                in <RouterLink to="/options">Options</RouterLink>.</small
            >
        </BRow>
        <BListGroup>
            <BListGroupItem
                v-for="item in [...history.reads].reverse()"
                :key="item.date"
                href="javascript:;"
                class="flex-column align-items-start"
                @click="
                    router.push(
                        `/read/${item.chapter.manga.path_word}/${item.chapter.chapter.uuid}`
                    )
                "
            >
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ item.chapter.manga.name }}</h5>
                    <small class="text-body-secondary">{{
                        new Date(item.date).toLocaleString()
                    }}</small>
                </div>

                <p class="mb-1">
                    {{ item.chapter.chapter.name }}
                </p>

                <!-- <small class="text-body-secondary">Click to continue reading.</small> -->
            </BListGroupItem>
        </BListGroup>
        <small class="text-muted" v-if="history.reads.length == 0">No local reads found.</small>
    </BContainer>
</template>
