import { mediaService } from "../services/MediaService";

const DEFAULT_AVATAR = "/public/assets/images/default-avatar.svg";

export async function resolveAvatarUrl(avatarId?: string, fallbackUrl?: string): Promise<string> {
    if (!avatarId) {
        return fallbackUrl || DEFAULT_AVATAR;
    }

    try {
        const blob = await mediaService.getMediaById(avatarId);
        return URL.createObjectURL(blob);
    } catch (err) {
        console.error("Ошибка при получении аватара:", err);
        return fallbackUrl || DEFAULT_AVATAR;
    }
}