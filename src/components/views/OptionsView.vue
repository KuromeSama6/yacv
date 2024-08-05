<script setup lang="ts">
import { useSettingsStore } from "@/store";
import { BCol, BContainer, BForm, BFormCheckbox, BRow } from "bootstrap-vue-next";
import { ref } from "vue";
import SettingsOptionToggle from "../options/SettingsOptionToggle.vue";
import { set } from "mongoose";
import SettingsOptionNumericInput from "../options/SettingsOptionNumericInput.vue";

const settings = useSettingsStore();

function SettingsChanged() {
    settings.Save();
}

async function ExportSettings() {
    const data = btoa(JSON.stringify(settings.$state));
    await navigator.clipboard.writeText(data);
    alert("Copied to clipboard");
}
</script>

<template>
    <div class="text-bg-dark" style="padding: 0.5rem">
        <BContainer>
            <BRow>
                <BCol>
                    <h2>Options</h2>
                    <p>
                        Your settings and options are saved to your browser's cookies for this site.
                        They will persist across browsing sessions and site reloads until you
                        manually wipe your browser cookies/cache.
                    </p>
                    <p>
                        You may also export your settings by copying it to your system clipboard,
                        and then import it by pasting from clipboard. Use the buttons below to do
                        that.
                    </p>
                    <small class="text-muted">Changes saved automatically.<br /></small>
                </BCol>
            </BRow>
            <BRow>
                <BCol style="text-align: right">
                    <BButton
                        class="operation-button"
                        variant="outline-light"
                        @click="ExportSettings"
                    >
                        Export and Copy
                    </BButton>
                    <BButton
                        class="operation-button"
                        variant="outline-light"
                        @click="settings.Save()"
                    >
                        Import from Clipboard
                    </BButton>
                    <BButton
                        class="operation-button"
                        variant="outline-danger"
                        @click="settings.Reset()"
                    >
                        Reset to Default
                    </BButton>
                </BCol>
            </BRow>
        </BContainer>
    </div>
    <BContainer>
        <BForm @change="SettingsChanged">
            <h3>General Settings</h3>
            <BRow>
                <SettingsOptionToggle v-model="settings.autoSavePath" t-key="autosave_path" />
                <SettingsOptionNumericInput
                    v-model="settings.localHistorySize"
                    t-key="local_history_size"
                    :min="10"
                    :max="200"
                />
            </BRow>
        </BForm>
    </BContainer>
</template>

<style>
.operation-button {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
}
</style>
