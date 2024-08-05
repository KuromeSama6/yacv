<script setup lang="ts">
import { useAccountStore, useLocalHistoryStore, useSettingsStore } from "@/store";
import { BContainer, BRow } from "bootstrap-vue-next";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
const router = useRouter();
const account = useAccountStore();
</script>

<template>
    <div v-if="!account.IsLoggedIn()" class="text-center">
        <small class="text-muted"
            ><RouterLink to="/account">Log in</RouterLink> to CopyManga to see account
            history.</small
        >
    </div>
    <BContainer v-if="account.IsLoggedIn()"> </BContainer>
</template>
