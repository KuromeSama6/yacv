<script setup lang="ts">
import { EventEmitter } from "stream";
import { defineComponent, onMounted, onUpdated, ref, type PropType } from "vue";

const props = defineProps<{
    links: string[];
    modelValue: HTMLImageElement[];
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: HTMLImageElement[]): void;
}>();

const imgList = ref<HTMLImageElement[]>(props.modelValue);

function GetLoadedImages(): HTMLImageElement[] {
    const allImgs = document.querySelectorAll(".manga-image");
    return Array.from(allImgs).filter(
        (img: Element) => (img as HTMLImageElement).src
    ) as HTMLImageElement[];
}

function UpdateLoadedImages() {
    imgList.value = GetLoadedImages();
    emit("update:modelValue", imgList.value);
}

document.addEventListener("scroll", UpdateLoadedImages);
</script>
<template>
    <div>
        <img
            v-for="link in links"
            :key="link"
            :data-src="link"
            class="lazyload manga-image"
            ref="images"
        />
    </div>
</template>

<style>
.manga-image {
    width: 100vw;
}
</style>
