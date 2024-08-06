<script setup lang="ts">
import { BFormInput } from "bootstrap-vue-next";
import { computed, ref } from "vue";

const props = defineProps<{
    placeholder: string;
    modelValue: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const text = computed({
    get() {
        return props.modelValue;
    },
    set(value: string) {
        emit("update:modelValue", value);
    }
});
</script>

<template>
    <BFormInput v-model="text" :placeholder="placeholder" />
</template>
