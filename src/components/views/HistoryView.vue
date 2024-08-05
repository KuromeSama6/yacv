<script setup lang="ts">
import { BContainer, BRow } from "bootstrap-vue-next";
import { ref } from "vue";
import LocalHistoryPage from "../history/LocalHistoryPage.vue";
import AccountHistoryPage from "../history/AccountHistoryPage.vue";

const showAccountHistory = ref(false);
</script>

<template>
    <BContainer>
        <BRow>
            <h2 class="">Reading History</h2>
            <BNav pills fill>
                <BNavItem :active="!showAccountHistory" @click="showAccountHistory = false"
                    >Local History</BNavItem
                >
                <BNavItem :active="showAccountHistory" @click="showAccountHistory = true"
                    >CopyManga Account History</BNavItem
                >
            </BNav>
        </BRow>
        <br />
        <BRow>
            <LocalHistoryPage v-if="!showAccountHistory" />
            <AccountHistoryPage v-if="showAccountHistory" />
        </BRow>
    </BContainer>
</template>
