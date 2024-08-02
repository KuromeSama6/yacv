import axios from "axios";
import * as cheerio from "cheerio";
import CryptoJS from "crypto-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

function SRange(range: number): number[] {
    return Range(0, range);
}

function Range(start: number, end: number): number[] {
    const ret: number[] = [];
    for (let i = start; i < end; i++) ret.push(i);
    return ret;
}

const enc = CryptoJS.enc;
function Utf8ToHex(str: string): string {
    return enc.Utf8.parse(str).toString(enc.Hex);
}

const COPYMANGA_AES_KEY = enc.Hex.parse(Utf8ToHex("xxxmanga.woo.key"));

/**
 * Great thanks to https://blog.skyju.cc/post/copymanga-chapter-reverse-engineering/ for figuring out how to decrypt the response!
 */
function DecryptResult(str: string): Promise<JSON> {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const mangaId = req.headers["manga"] || "";
    const chapterId = req.headers["chapter"] || "";

    let page;
    try {
        page = await axios.get(`https://www.mangacopy.com/comic/${mangaId}/chapter/${chapterId}`);
    } catch (err: any) {
        return new Response(err, { status: 400 });
    }
    const $ = cheerio.load(page.data);
    const imageData = $(".imageData").prop("contentkey");

    const json = await DecryptResult(imageData);

    res.send(JSON.stringify(json));
}
