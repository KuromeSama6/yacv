<script setup lang="ts">
import i18n from "@/i18n";
import { BAlert } from "bootstrap-vue-next";
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps<{
    errorMessage: string | null;
}>();
</script>

<template>
    <div v-if="props.errorMessage">
        <BAlert :model-value="true" variant="danger">
            {{ props.errorMessage }}
            <br />

            <small>{{ t("errorbox.hint.check_console") }}</small>
        </BAlert>
    </div>
</template>
