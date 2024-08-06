<script setup lang="ts">
import { useAlertsManager } from "@/store";
import { BAlert, BToast } from "bootstrap-vue-next";
import { ref } from "vue";

const alerts = useAlertsManager();
</script>

<template>
    <div class="overlay" :style="`pointer-events: ${alerts.alerts.length > 0 ? '' : 'none'};`">
        <BAlert
            v-for="alert of alerts.alerts"
            :key="alert.message"
            v-model="alert.visible"
            @closed="alerts.alerts.splice(alerts.alerts.indexOf(alert), 1)"
            dismissible
            fade
            :variant="alert.variant"
        >
            {{ alert.message }}
        </BAlert>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    bottom: 0;
    width: 100%;
    color: white;
    padding: 20px;
    z-index: 1000; /* Ensure it's on top */
}
</style>
