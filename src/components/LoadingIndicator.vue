<script setup lang="ts">
import { BContainer, BRow, BSpinner } from "bootstrap-vue-next";

const props = defineProps({
    visible: Boolean,
    content: String,
    error: Object as () => string | null
});
</script>

<template>
    <BContainer v-if="visible">
        <BRow class="mt-3" v-if="!error">
            <div class="d-flex align-items-center">
                <strong>{{ content }}</strong>
                <BSpinner class="ms-auto" />
            </div>
        </BRow>
        <BRow v-if="error">
            <ErrorBox :errorMessage="error" />
        </BRow>
    </BContainer>
</template>
