import {mediaService} from "../../../services/MediaService";

export const getMediaUrlById = async (id: string) => {
    try {
        const blob = await mediaService.getMediaById(id);
        return URL.createObjectURL(blob);
    } catch (err) {
        console.error("Ошибка загрузки медиа по id:", err);
        return null;
    }
};

export function isDataUrl(value: string): boolean {
    return typeof value === "string" && value.startsWith("data:");
}

export function isBareBase64(value: string): boolean {
    return typeof value === "string" && /^[A-Za-z0-9+/=]+$/.test(value) && value.length > 100;
}

function parseDataUrl(dataUrl: string): { mime: string; b64: string } | null {
    try {
        const [header, b64] = dataUrl.split(",", 2);
        const match = header.match(/^data:([^;]+);base64$/i);
        if (!match || !b64) return null;
        return {mime: match[1], b64};
    } catch {
        return null;
    }
}

function base64ToBlob(b64: string, mime = "application/octet-stream"): Blob {
    const binary = atob(b64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], {type: mime});
}

export function asDataUrl(b64: string, mime: string): string {
    const normalized = mime && mime.includes("/") ? mime : "application/octet-stream";
    return `data:${normalized};base64,${b64}`;
}

function mimeExt(mime: string): string {
    const map: Record<string, string> = {
        "audio/mpeg": "mp3",
        "audio/ogg": "ogg",
        "audio/wav": "wav",
        "audio/webm": "webm",
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "image/gif": "gif",
    };
    return map[mime] || "";
}

export async function uploadMediaString(input: string, kind: "audio" | "image"): Promise<string> {
    if (!isDataUrl(input) && !isBareBase64(input)) return input;

    let b64 = input;
    let mime = kind === "audio" ? "audio/mpeg" : "image/jpeg";

    if (isDataUrl(input)) {
        const parsed = parseDataUrl(input);
        if (parsed) {
            b64 = parsed.b64;
            mime = parsed.mime || mime;
        }
    }

    const blob = base64ToBlob(b64, mime);
    const filename = `${kind}-${Date.now()}.${mimeExt(mime) || "bin"}`;
    const file = new File([blob], filename, {type: mime});

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("mimeType", file.type);
    formData.append("fileSize", String(file.size));
    formData.append("fileType", kind === "audio" ? "AUDIO" : "IMAGE");

    const resp = await mediaService.uploadMediaWithMeta(formData);
    const mediaId = (resp as any).mediaId;
    if (!mediaId) {
        throw new Error("Не удалось загрузить медиа: отсутствует mediaId в ответе");
    }
    return mediaId;
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error);
        reader.onload = () => {
            const result = reader.result as string;
            const b64 = result.split(",")[1] ?? result;
            resolve(b64);
        };
        reader.readAsDataURL(file);
    });
}

