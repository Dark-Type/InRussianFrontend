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

type Section = 'students' | 'courses' | 'statistics';

export const ExpertPanel = () => {
    const { user, logout } = useAuth();
    const { theme, toggle } = useTheme();
    const { loadCourses, loadStudentProgress } = useExpert();
    const { getAvatarIdByUserId, getStaffProfileById } = useProfile();

    const [activeSection, setActiveSection] = useState<Section>('students');
    const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string>('/default-avatar.png');
    const [displayName, setDisplayName] = useState('Гость');

    const loadUserData = useCallback(async () => {
        if (!user?.id) {
            setAvatarUrl('/default-avatar.png');
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
                setAvatarUrl('/default-avatar.png');
            }
        } catch (error) {
            console.error('Ошибка загрузки данных пользователя:', error);
            setAvatarUrl('/default-avatar.png');
            setDisplayName(user.email || 'Пользователь');
        }
    }, [user?.id, getAvatarIdByUserId, getStaffProfileById]);

    const reloadAvatar = useCallback(async () => {
        if (!user?.id) {
            setAvatarUrl('/default-avatar.png');
            return;
        }
        try {
            const avatarId = await getAvatarIdByUserId(user.id);
            if (avatarId) {
                const blob = await mediaService.getMediaById(avatarId);
                const objectUrl = URL.createObjectURL(blob);
                setAvatarUrl(objectUrl);
            } else {
                setAvatarUrl('/default-avatar.png');
            }
        } catch (error) {
            console.error('Ошибка загрузки аватара:', error);
            setAvatarUrl('/default-avatar.png');
        }
    }, [user?.id, getAvatarIdByUserId]);

    // Загрузка данных только один раз при монтировании
    useEffect(() => {
        loadCourses();
        loadStudentProgress();
    }, []); // Пустой массив зависимостей

    // Загрузка пользовательских данных при изменении user.id
    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    // Очистка blob URL при размонтировании
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
                panelName="Панель эксперта"
                displayName={displayName}
                theme={theme}
                toggleTheme={toggle}
                logout={logout}
                profilePopoverOpen={profilePopoverOpen}
                setProfilePopoverOpen={setProfilePopoverOpen}
                avatarUrl={avatarUrl}
            />

            <nav style={{
                width: '100%',
                padding: '0 32px',
                background: 'var(--color-card)',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    marginTop: '16px',
                    marginBottom: '16px'
                }}>
                    {[
                        { key: 'students' as Section, label: 'Студенты' },
                        { key: 'courses' as Section, label: 'Курсы' },
                        { key: 'statistics' as Section, label: 'Статистика' }
                    ].map(({ key, label }, idx, arr) => (
                        <button
                            key={key}
                            onClick={() => setActiveSection(key)}
                            style={{
                                flex: 1,
                                padding: '12px 24px',
                                border: 'none',
                                background: activeSection === key ? 'var(--color-primary)' : 'var(--color-card)',
                                color: activeSection === key ? 'white' : 'var(--color-text)',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: activeSection === key ? 'bold' : 'normal',
                                borderRight: idx < arr.length - 1 ? '1px solid var(--color-border)' : 'none'
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </nav>

            <main style={{
                flex: 1,
                padding: '32px',
                maxWidth: '100%',
                boxSizing: 'border-box'
            }}>
                {renderContent()}
            </main>
        </div>
    );
};