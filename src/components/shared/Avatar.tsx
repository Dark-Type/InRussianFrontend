import React, { useState } from 'react';
import { getDefaultAvatarUrl, handleImageError } from '../../utils/imageUtils';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: number;
    userRole?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const Avatar = ({
                                                  src,
                                                  alt = 'Аватар пользователя',
                                                  size = 60,
                                                  userRole,
                                                  className,
                                                  style
                                              }: AvatarProps) => {
    const [imgSrc, setImgSrc] = useState(src || getDefaultAvatarUrl(userRole));
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(getDefaultAvatarUrl(userRole));
        }
    };

    return (
        <div
            className={className}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--color-border)',
                flexShrink: 0,
                background: 'var(--color-bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }}
        >
            <img
                src={imgSrc}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
                onError={handleError}
            />
        </div>
    );
};