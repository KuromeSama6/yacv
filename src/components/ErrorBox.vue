<script setup lang="ts">
import { BAlert } from "bootstrap-vue-next";
import { defineProps } from "vue";

const props = defineProps<{
    errorMessage: string | null;
}>();
</script>

<template>
    <div v-if="props.errorMessage">
        <BAlert :model-value="true" variant="danger">
            {{ props.errorMessage }}
            <br />

            <small>Check console for thrown errors.</small>
        </BAlert>
    </div>
</template>
