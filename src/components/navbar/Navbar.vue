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
                <BNavItemDropdown text="Language" right>
                    <BDropdownItem @click="SetLanguage('en')">EN</BDropdownItem>
                    <BDropdownItem @click="SetLanguage('zh')">中文</BDropdownItem>
                </BNavItemDropdown>
                <BNavItemDropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>User</em>
                    </template>
                    <BDropdownItem href="javascript:;">Profile</BDropdownItem>
                    <BDropdownItem href="javascript:;">Sign Out</BDropdownItem>
                </BNavItemDropdown>
                <BNavItem href="javascript:;">Options</BNavItem>
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
import { useRoute } from "vue-router";
const { locale } = useI18n();

const route = useRoute();

function SetLanguage(lang: string) {
    console.log(`Requesting language change to ${lang}`);
    locale.value = lang;
    Cookies.set("language", lang);
}
</script>
