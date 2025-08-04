export const DEFAULT_AVATAR_URL = '/assets/images/default-avatar.svg';

export const getDefaultAvatarUrl = (userRole?: string) => {
    switch (userRole) {
        case 'ADMIN':
            return '/assets/images/default-avatar.svg';
        case 'EXPERT':
            return '/assets/images/default-avatar.svg';
        case 'CONTENT_MODERATOR':
            return '/assets/images/default-avatar.svg';
        case 'STUDENT':
            return '/assets/images/default-avatar.svg';
        default:
            return DEFAULT_AVATAR_URL;
    }
};

export const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>,
    fallbackUrl?: string
) => {
    const img = event.currentTarget;
    if (img.src !== (fallbackUrl || DEFAULT_AVATAR_URL)) {
        img.src = fallbackUrl || DEFAULT_AVATAR_URL;
    }
};