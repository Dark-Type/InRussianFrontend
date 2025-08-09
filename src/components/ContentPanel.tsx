import React, {useCallback, useEffect, useState} from 'react';
import {useAuth} from "../context/auth/UseAuth";
import {useTheme} from "../context/theme/UseTheme.tsx";
import {Statistics} from './content/ContentStatistics.tsx'
import { useProfile } from '../context/profile/UseProfile';
import { mediaService } from '../services/MediaService';
import {Reports} from './content/Reports.tsx';
import {CommonHeader} from './shared/CommonHeader';
import {useUserDisplayName} from './shared/useUserDisplayName';
import {CoursesManagement} from "./content/CourseManagement.tsx";

type Section = 'courses' | 'statistics' | 'reports';

export const ContentPanel = () => {
    const {user, logout} = useAuth();
    const {theme, toggle} = useTheme();
    const [activeSection, setActiveSection] = useState<Section>('courses');
    const [avatarUrl, setAvatarUrl] = useState<string>('/public/assets/images/default-avatar.svg');
    const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);

    const displayName = useUserDisplayName();
    const { getAvatarIdByUserId } = useProfile();

    const loadAvatar = useCallback(async () => {
        if (!user?.id) {
            setAvatarUrl('/public/assets/images/default-avatar.svg');
            return;
        }
        try {
            const avatarId = await getAvatarIdByUserId(user.id);
            if (avatarId) {
                const blob = await mediaService.getMediaById(avatarId);
                const objectUrl = URL.createObjectURL(blob);
                setAvatarUrl(objectUrl);
            }
        } catch (error) {
            console.error('Ошибка загрузки аватара:', error);
        }
    }, [user, getAvatarIdByUserId]);

    useEffect(() => {
        loadAvatar();
    }, [loadAvatar]);

    useEffect(() => {
        return () => {
            if (avatarUrl && avatarUrl.startsWith('blob:')) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [avatarUrl]);

    const renderContent = () => {
        switch (activeSection) {
            case 'courses':
                return <CoursesManagement />;
            case 'statistics':
                return <Statistics/>;
            case 'reports':
                return <Reports/>;
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box'
        }}>
            <CommonHeader
                user={user}
                logout={logout}
                displayName={displayName}
                avatarUrl={avatarUrl}
                profilePopoverOpen={profilePopoverOpen}
                setProfilePopoverOpen={setProfilePopoverOpen}
                onAvatarUpdate={loadAvatar}
                theme={theme}
                toggleTheme={toggle}
                panelName="Менеджер"
            />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
                padding: '0 24px'
            }}>
                <nav style={{
                    display: 'flex',
                    gap: '8px',
                    padding: '24px 0 16px 0',
                    borderBottom: '1px solid var(--color-border)',
                    marginBottom: '24px'
                }}>
                    <button
                        onClick={() => setActiveSection('courses')}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '6px',
                            background: activeSection === 'courses' ? 'var(--color-primary)' : 'var(--color-card)',
                            color: activeSection === 'courses' ? 'white' : 'var(--color-text)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500'
                        }}
                    >
                        📚 Курсы
                    </button>
                    <button
                        onClick={() => setActiveSection('statistics')}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '6px',
                            background: activeSection === 'statistics' ? 'var(--color-primary)' : 'var(--color-card)',
                            color: activeSection === 'statistics' ? 'white' : 'var(--color-text)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500'
                        }}
                    >
                        📊 Статистика
                    </button>
                    <button
                        onClick={() => setActiveSection('reports')}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '6px',
                            background: activeSection === 'reports' ? 'var(--color-primary)' : 'var(--color-card)',
                            color: activeSection === 'reports' ? 'white' : 'var(--color-text)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500'
                        }}
                    >
                        📋 Отчеты
                    </button>
                </nav>

                <main style={{
                    flex: 1,
                    background: 'var(--color-bg)'
                }}>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};