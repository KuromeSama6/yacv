<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
    tKey: string;
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const modelValue = computed({
    get() {
        return props.modelValue;
    },
    set(value: boolean) {
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
                <BFormCheckbox class="ml-auto p-2" v-model="modelValue" switch size="lg" />
            </BCol>
        </BRow>
    </BContainer>
</template>
