<script setup lang="ts">
import { BBreadcrumb, type BreadcrumbItem } from "bootstrap-vue-next";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const breadcrumbs = ref<BreadcrumbItem[]>([
    { text: "Admin", href: "https://getbootstrap.com/" },
    { text: "Manage", href: "#" },
    { text: "Library" }
]);
const route = useRoute();

breadcrumbs.value.push({
    text: route.name?.toString() || ""
});
</script>

<template>
    <BBreadcrumb :items="breadcrumbs" />
</template>
