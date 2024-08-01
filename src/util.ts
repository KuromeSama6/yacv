import CryptoJS, { enc } from "crypto-js";

export module Util {
    export function SRange(range: number): number[] {
        return Range(0, range);
    }

    export function Range(start: number, end: number): number[] {
        const ret: number[] = [];
        for (let i = start; i < end; i++) ret.push(i);
        return ret;
    }

    export function Utf8ToHex(str: string): string {
        return enc.Utf8.parse(str).toString(enc.Hex);
    }

    export const COPYMANGA_AES_KEY = enc.Hex.parse(Utf8ToHex("xxxmanga.woo.key"));

    /**
     * Great thanks to https://blog.skyju.cc/post/copymanga-chapter-reverse-engineering/ for figuring out how to decrypt the response!
     */
    export function DecryptResult(str: string): Promise<JSON> {
        const ivHex = Utf8ToHex(str.substring(0, 16));
        const body = str.substring(16);

        const iv = enc.Hex.parse(ivHex);
        const encryptedBase64 = enc.Base64.stringify(enc.Hex.parse(body));

        return new Promise<JSON>((resolve, reject) => {
            try {
                const decrypted = CryptoJS.AES.decrypt(encryptedBase64, COPYMANGA_AES_KEY, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC
                });

                resolve(JSON.parse(decrypted.toString(enc.Utf8)));
            } catch (err) {
                console.log("Decryption error:", err);
                reject(err);
            }
        });
    }

    export function GetUserAgent(): string {
        return navigator.userAgent.toString();
    }

    export function IsMobileDevice(): boolean {
        const userAgent = GetUserAgent().toLowerCase();
        return /android/.test(userAgent) || /iphone|ipad/.test(userAgent);
    }
}
