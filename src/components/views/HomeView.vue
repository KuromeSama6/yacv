<script setup lang="ts">
import { BContainer, BRow } from "bootstrap-vue-next";
</script>

<template>
    <BContainer style="text-align: center">
        <BRow>
            <h1>Yet Another CopyManga Viewer</h1>
            <p></p>
        </BRow>
        <BRow>
            <BInputGroup class="mt-3">
                <BFormInput placeholder="Paste Manga or Chapter URL" />
                <BInputGroupText>
                    <BButton variant="primary">Go</BButton>
                </BInputGroupText>
            </BInputGroup>
        </BRow>
    </BContainer>
</template>
