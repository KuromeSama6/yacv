<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/navbar/Navbar.vue";
</script>

<template>
    <header>
        <title>YACV</title>
    </header>

    <main>
        <Navbar />
        <br />
        <RouterView />
    </main>
</template>
