export const dynamic = "force-dynamic";
import axios from "axios";
import * as cheerio from "cheerio";
import CryptoJS from "crypto-js";

const enc = CryptoJS.enc;
function Utf8ToHex(str) {
    return enc.Utf8.parse(str).toString(enc.Hex);
}

const COPYMANGA_AES_KEY = enc.Hex.parse(Utf8ToHex("xxxmanga.woo.key"));

/**
 * Great thanks to https://blog.skyju.cc/post/copymanga-chapter-reverse-engineering/ for figuring out how to decrypt the response!
 */
function DecryptResult(str) {
    const ivHex = Utf8ToHex(str.substring(0, 16));
    const body = str.substring(16);

    const iv = enc.Hex.parse(ivHex);
    const encryptedBase64 = enc.Base64.stringify(enc.Hex.parse(body));

    return new Promise((resolve, reject) => {
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

export async function GET(req) {
    const headers = new Headers(req.headers);

    const mangaId = headers.get("manga");
    const chapterId = headers.get("chapter");

    let page;
    try {
        page = await axios.get(`https://www.mangacopy.com/comic/${mangaId}/chapter/${chapterId}`);
    } catch (err) {
        return new Response("");
    }
    const $ = cheerio.load(page.data);
    const imageData = $(".imageData").prop("contentkey");

    const json = await DecryptResult(imageData);

    return new Response(JSON.stringify(json));
}
