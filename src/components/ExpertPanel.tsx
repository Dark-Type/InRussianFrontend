import  { useState, useEffect, useCallback } from 'react';
import { useAuth } from "../context/auth/UseAuth.ts";
import { useTheme } from '../context/theme/UseTheme';
import { useExpert } from '../context/expert/UseExpert';
import { useProfile } from '../context/profile/UseProfile';
import { mediaService } from '../services/MediaService';
import { CommonHeader } from "./shared/CommonHeader.tsx";
import { StudentsSection } from './expert/StudentsSection';
import { CoursesSection } from './expert/CoursesSection';
import { StatisticsSection } from './expert/StatisticsSection';
import type { User } from '../api/api.ts';

type Section = 'students' | 'courses' | 'statistics';

export const ExpertPanel = () => {
    const { user, logout } = useAuth();
    const { theme, toggle } = useTheme();
    const { loadCourses, loadStudentProgress } = useExpert();
    const { getAvatarIdByUserId, getStaffProfileById } = useProfile();

    const [activeSection, setActiveSection] = useState<Section>('students');
    const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string>('/public/assets/images/default-avatar.svg');
    const [displayName, setDisplayName] = useState('Гость');

    const loadUserData = useCallback(async () => {
        if (!user?.id) {
            setAvatarUrl('/public/assets/images/default-avatar.svg');
            setDisplayName('Гость');
            return;
        }

        try {
            const profile = await getStaffProfileById(user.id);
            const fullName = `${profile.surname} ${profile.name}`.trim();
            setDisplayName(fullName || user.email || 'Пользователь');

            const avatarId = await getAvatarIdByUserId(user.id);
            if (avatarId) {
                const blob = await mediaService.getMediaById(avatarId);
                const objectUrl = URL.createObjectURL(blob);
                setAvatarUrl(objectUrl);
            } else {
                setAvatarUrl('/public/assets/images/default-avatar.svg');
            }
        } catch (error) {
            console.error('Ошибка загрузки данных пользователя:', error);
            setAvatarUrl('/public/assets/images/default-avatar.svg');
            setDisplayName(user.email || 'Пользователь');
        }
    }, [user, getAvatarIdByUserId, getStaffProfileById]);

    const reloadAvatar = useCallback(async () => {
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
            } else {
                setAvatarUrl('/public/assets/images/default-avatar.svg');
            }
        } catch (error) {
            console.error('Ошибка загрузки аватара:', error);
            setAvatarUrl('/public/assets/images/default-avatar.svg');
        }
    }, [user?.id, getAvatarIdByUserId]);

    useEffect(() => {
        loadCourses();
        loadStudentProgress();
    }, []);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    useEffect(() => {
        return () => {
            if (avatarUrl && avatarUrl.startsWith('blob:')) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [avatarUrl]);

    const renderContent = () => {
        switch (activeSection) {
            case 'students':
                return <StudentsSection />;
            case 'courses':
                return <CoursesSection />;
            case 'statistics':
                return <StatisticsSection />;
            default:
                return <StudentsSection />;
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
                user={user as User | null}
                panelName="Эксперт"
                displayName={displayName}
                theme={theme}
                toggleTheme={toggle}
                logout={logout}
                profilePopoverOpen={profilePopoverOpen}
                onAvatarUpdate={reloadAvatar}
                setProfilePopoverOpen={setProfilePopoverOpen}
                avatarUrl={avatarUrl}
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
                        onClick={() => setActiveSection('students')}
                        style={{
                            flex: 1,
                            padding: '12px 24px',
                            border: 'none',
                            outline: 'none',
                            borderRadius: '6px',
                            background: activeSection === 'students' ? 'var(--color-primary)' : 'var(--color-card)',
                            color: activeSection === 'students' ? 'white' : 'var(--color-text)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500'
                        }}
                    >
                        Студенты
                    </button>
                    <button
                        onClick={() => setActiveSection('courses')}
                        style={{
                            flex: 1,
                            padding: '12px 24px',
                            border: 'none',
                            outline: 'none',
                            borderRadius: '6px',
                            background: activeSection === 'courses' ? 'var(--color-primary)' : 'var(--color-card)',
                            color: activeSection === 'courses' ? 'white' : 'var(--color-text)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500'
                        }}
                    >
                        Курсы
                    </button>
                    <button
                        onClick={() => setActiveSection('statistics')}
                        style={{
                            flex: 1,
                            padding: '12px 24px',
                            border: 'none',
                            outline: 'none',
                            borderRadius: '6px',
                            background: activeSection === 'statistics' ? 'var(--color-primary)' : 'var(--color-card)',
                            color: activeSection === 'statistics' ? 'white' : 'var(--color-text)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500'
                        }}
                    >
                        Статистика
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