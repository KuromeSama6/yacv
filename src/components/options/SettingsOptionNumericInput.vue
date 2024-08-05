<script setup lang="ts">
import { BCol, BContainer, BRow } from "bootstrap-vue-next";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
    tKey: string;
    modelValue: number;
    min?: number;
    max?: number;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: number): void;
}>();

const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(value: number) {
        emit("update:modelValue", value);
    }
});
</script>

<template>
    <BContainer>
        <BRow>
            <BCol lg="10">
                <div>
                    <h6 class="p-2">{{ t(`options.option.${tKey}.name`) }}</h6>
                    <p class="text-muted">
                        {{ t(`options.option.${tKey}.desc`) }}
                    </p>
                </div>
            </BCol>
            <BCol lg="2">
                <BFormInput v-model="modelValue" type="number" :min="min" :max="max" />
            </BCol>
        </BRow>
    </BContainer>
</template>
