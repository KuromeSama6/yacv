<script setup lang="ts">
import { useAccountStore } from "@/store";
import { BContainer, BForm, BRow } from "bootstrap-vue-next";
import { ref } from "vue";
import LoadingIndicator from "../LoadingIndicator.vue";
import type { IAccountCredentials } from "@/structures/Account";
import type i18n from "@/i18n";
import { useI18n } from "vue-i18n";
const account = useAccountStore();
const { t } = useI18n();

const loading = ref(false);
const loadContent = ref("");
const loadError = ref<string | null>();

const usernameInput = ref<string>();
const passwordInput = ref<string>();

async function Login() {
    // console.log(usernameInput.value, passwordInput.value);
    if (!usernameInput.value || !passwordInput.value) return;

    loading.value = true;
    loadContent.value = t("account.login.logging_in");
    loadError.value = null;

    const creds: IAccountCredentials = {
        username: usernameInput.value,
        password: passwordInput.value
    };

    try {
        await account.Login(creds);
        console.log(account.$state);
    } catch (err: any) {
        console.error(err);
        loading.value = false;
        loadError.value = `Request error: ${err}: ${err.stack}`;
    }
}
</script>

<template>
    <!-- Login form -->
    <BContainer>
        <BRow>
            <h2 class="text-center">{{ t("account.login.form_title") }}</h2>
            <BAlert :model-value="true" variant="warning">{{
                t("account.login.disclaimer")
            }}</BAlert>
            <BRow>
                <LoadingIndicator :visible="loading" :content="loadContent" :error="loadError" />
            </BRow>
            <BForm>
                <BFormFloatingLabel
                    :label="t('account.login.username_hint')"
                    label-for="floatingEmail"
                    class="my-2"
                >
                    <BFormInput
                        id="floatingEmail"
                        type="text"
                        :laceholder="t('account.login.username_hint')"
                        v-model="usernameInput"
                    />
                </BFormFloatingLabel>
                <BFormFloatingLabel
                    :label="t('account.login.password_hint')"
                    label-for="floatingPassword"
                    class="my-2"
                >
                    <BFormInput
                        id="floatingPassword"
                        type="password"
                        :placeholder="t('account.login.password_hint')"
                        v-model="passwordInput"
                        @keydown.enter="Login"
                    />
                </BFormFloatingLabel>
            </BForm>
            <BButton variant="primary" :disabled="loading" @click="Login">{{
                t("account.login.login_button")
            }}</BButton>
        </BRow>
        <br />
        <BRow class="text-center">
            <p>
                {{ t("account.login.register_hint") }}
                <a href="https://mangacopy.com" target="_blank">CopyManga</a>
            </p>

            <small class="text-muted">{{ t("account.login.data_handling_hint") }}</small>
        </BRow>
    </BContainer>
</template>
