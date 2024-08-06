<script setup lang="ts">
import { useAccountStore } from "@/store";
import LoginForm from "../account/LoginForm.vue";
import { BCol, BContainer, BRow } from "bootstrap-vue-next";
import BookshelfListing from "../account/BookshelfListing.vue";
const account = useAccountStore();
</script>

<template>
    <LoginForm v-if="!account.IsLoggedIn()" />
    <BContainer v-if="account.IsLoggedIn()">
        <BRow>
            <BCol sm="1">
                <img :src="account.info?.avatar" class="avatar" />
            </BCol>
            <BCol>
                <h2>{{ account.info?.username }}</h2>
                <p>
                    <code>{{ account.info?.user_id }}</code>
                </p>
            </BCol>
        </BRow>
        <hr />
        <BRow>
            <BNav tabs>
                <BNavItem active>Your Bookshelf</BNavItem>
            </BNav>
        </BRow>
        <BRow>
            <BookshelfListing />
        </BRow>
    </BContainer>
</template>

<style>
.avatar {
    max-height: 4rem;
}
</style>
