import type { BaseColorVariant } from "bootstrap-vue-next";

export interface IAlertData {
    message: string;
    variant: keyof BaseColorVariant;
    visible?: boolean;
}
