import { useState, useEffect } from 'react';
import { ConfigurationService } from '../../services/ConfigurationService';
import type { RetrySwitchStatusDto } from '../../api/custom-types';

interface RetrySwitchProps {
    className?: string;
    onError?: (error: string) => void;
    onStatusChange?: (status: RetrySwitchStatusDto) => void;
}

export const RetrySwitch = ({ className, onError, onStatusChange }: RetrySwitchProps) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Load initial configuration
    useEffect(() => {
        const loadConfiguration = async () => {
            try {
                setIsInitialLoading(true);
                const config = await ConfigurationService.getConfiguration();
                setIsEnabled(config.retryEnabled);
                onStatusChange?.(config);
            } catch (error) {
                const errorMessage = 'Ошибка загрузки конфигурации повторов';
                console.error(errorMessage, error);
                onError?.(errorMessage);
            } finally {
                setIsInitialLoading(false);
            }
        };

        loadConfiguration();
    }, [onError, onStatusChange]);

    const handleToggle = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);
            const newStatus = !isEnabled;
            const updatedConfig = await ConfigurationService.updateConfiguration({
                retryEnabled: newStatus,
                lastUpdated: new Date().toISOString()
            });
            
            setIsEnabled(newStatus);
            onStatusChange?.(updatedConfig);
        } catch (error) {
            const errorMessage = 'Ошибка обновления конфигурации повторов';
            console.error(errorMessage, error);
            onError?.(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (isInitialLoading) {
        return (
            <div className={className} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 0'
            }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Загрузка...</span>
            </div>
        );
    }

    return (
        <div className={className} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 0'
        }}>
            <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--color-text)',
                userSelect: 'none'
            }}>
                Режим повторов:
            </label>
            
            <label
                style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: 60,
                    height: 32,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.6 : 1,
                }}
                aria-label="Переключить режим повторов"
            >
                <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={handleToggle}
                    disabled={isLoading}
                    style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: isEnabled ? 'var(--color-primary)' : 'var(--color-border)',
                        borderRadius: 32,
                        transition: 'background-color 0.3s',
                    }}
                />
                <span
                    style={{
                        position: 'absolute',
                        top: 2,
                        left: isEnabled ? 30 : 2,
                        width: 28,
                        height: 28,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: 'left 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: isEnabled ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        userSelect: 'none',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                >
                    {isEnabled ? '✓' : '✕'}
                </span>
            </label>
            
            <span style={{
                fontSize: '12px',
                color: isEnabled ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: '500',
                minWidth: '80px'
            }}>
                {isEnabled ? 'Включено' : 'Отключено'}
            </span>
        </div>
    );
};