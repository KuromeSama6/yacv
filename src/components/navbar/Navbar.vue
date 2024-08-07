<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'">
        <RouterLink to="/">
            <BNavbarBrand>YACV</BNavbarBrand>
        </RouterLink>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
            <BNavbarNav>
                <!-- <NavBreadcrumbs /> -->
            </BNavbarNav>
            <!-- Right aligned nav items -->
            <BNavbarNav class="ms-auto mb-2 mb-lg-0">
                <BNavItem href="javascript:;" @click="router.push('/')">{{
                    t("navbar.option.home")
                }}</BNavItem>
                <BNavItemDropdown :text="t('navbar.option.language')" right>
                    <BDropdownItem @click="SetLanguage('en')">EN</BDropdownItem>
                    <BDropdownItem @click="SetLanguage('zh')">中文</BDropdownItem>
                </BNavItemDropdown>
                <BNavItem href="javascript:;" @click="router.push('/history')">{{
                    t("navbar.option.history")
                }}</BNavItem>
                <BNavItem href="javascript:;" @click="router.push('/options')">{{
                    t("navbar.option.options")
                }}</BNavItem>
                <BNavItemDropdown right v-if="account.IsLoggedIn()">
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>{{ account.info?.username }}</em>
                    </template>
                    <BDropdownItem href="javascript:;" @click="router.push('/account')">{{
                        t("navbar.option.profile")
                    }}</BDropdownItem>
                    <BDropdownItem href="javascript:;" variant="danger" @click="account.Logout()">{{
                        t("navbar.option.logout")
                    }}</BDropdownItem>
                </BNavItemDropdown>

                <BNavItem
                    v-if="!account.IsLoggedIn()"
                    href="javascript:;"
                    @click="router.push('/account')"
                    >{{ t("navbar.option.login") }}</BNavItem
                >
            </BNavbarNav>
            <!-- <BNavForm class="d-flex">
                <BFormInput class="me-2" placeholder="Search for a Manga" />
                <BButton type="submit" variant="primary">Go</BButton>
            </BNavForm> -->
        </BCollapse>
    </BNavbar>
</template>

<script setup lang="ts">
import Cookies from "js-cookie";
import { useI18n } from "vue-i18n";
import NavBreadcrumbs from "./NavBreadcrumbs.vue";
import { BNavItem } from "bootstrap-vue-next";
import { useRoute, useRouter } from "vue-router";
import { useAccountStore } from "@/store";
const { locale, t } = useI18n();

const router = useRouter();
const account = useAccountStore();

function SetLanguage(lang: string) {
    console.log(`Requesting language change to ${lang}`);
    locale.value = lang;
    Cookies.set("language", lang);
}
</script>
