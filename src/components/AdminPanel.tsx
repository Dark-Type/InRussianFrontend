import {useCallback, useEffect, useState} from 'react';
import {useAuth} from "../context/auth/UseAuth.ts";
import {useTheme} from "../context/theme/UseTheme.tsx";
import {UserList} from './admin/UserList';
import {UserEditModal} from './admin/UserEditModal';
import {AdminStatistics} from "./admin/AdminStatistics.tsx";
import type {User} from "../api";
import {useProfile} from '../context/profile/UseProfile';
import {mediaService} from '../services/MediaService';
import {CommonHeader} from './shared/CommonHeader';

type Section = 'users' | 'statistics';

export const AdminPanel = () => {
    const {user, logout} = useAuth();
    const {theme, toggle} = useTheme();
    const {getAvatarIdByUserId, getStaffProfileById} = useProfile();

    const [activeSection, setActiveSection] = useState<Section>('users');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string>('/public/assets/images/default-avatar.svg');
    const [displayName, setDisplayName] = useState('Гость');
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const loadUserData = useCallback(async () => {
        if (!user?.id) {
            setAvatarUrl('/public/assets/images/default-avatar.svg');
            setDisplayName('Гость');
            return;
        }

        try {
            const profile = await getStaffProfileById(user.id);
            const fullName = [profile.surname, profile.name, profile.patronymic]
                .filter(Boolean)
                .join(' ');
            setDisplayName(fullName || user.email || 'Пользователь');

            const avatarId = await getAvatarIdByUserId(user.id);
            if (avatarId) {
                const blob = await mediaService.getMediaById(avatarId);
                const objectUrl = URL.createObjectURL(blob);
                setAvatarUrl(objectUrl);
            }
        } catch (error) {
            // console.error('Ошибка загрузки данных пользователя:', error);
            setAvatarUrl('/public/assets/images/default-avatar.svg');
            setDisplayName(user?.email || 'Пользователь');
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
            }
        } catch (error) {
            setAvatarUrl('/public/assets/images/default-avatar.svg');
            // console.error('Ошибка загрузки аватара:', error);
        }
    }, [user, getAvatarIdByUserId]);

    useEffect(() => {
        loadUserData();
        return () => {
            if (avatarUrl && avatarUrl.startsWith('blob:')) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [loadUserData]);

    const handleEditUser = (userToEdit: User) => {
        setEditingUser(userToEdit);
    };

    const handleCloseEditModal = () => {
        setEditingUser(null);
    };

    const handleSaveUser = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const renderUsersSection = () => (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h2 style={{margin: 0}}>Управление пользователями</h2>
                <input
                    type="text"
                    placeholder="Поиск по email или телефону..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        background: 'var(--color-card)',
                        color: 'var(--color-text)',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-border)',
                        width: '300px'
                    }}
                />
            </div>
            <UserList
                searchTerm={searchTerm}
                onEditUser={handleEditUser}
                key={refreshTrigger}
                excludedUserId={user?.id ?? ''}
            />
        </div>
    );

    const renderStatisticsSection = () => <AdminStatistics/>;

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
                logout={logout}
                displayName={displayName}
                avatarUrl={avatarUrl}
                profilePopoverOpen={profilePopoverOpen}
                setProfilePopoverOpen={setProfilePopoverOpen}
                onAvatarUpdate={reloadAvatar}
                theme={theme}
                toggleTheme={toggle}
                panelName="Администратор"
            />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
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
                        onClick={() => setActiveSection('users')}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '6px',
                            background: activeSection === 'users' ? 'var(--color-primary)' : 'var(--color-card)',
                            color: activeSection === 'users' ? 'white' : 'var(--color-text)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500'
                        }}
                    >
                        Пользователи
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
                        Статистика
                    </button>
                </nav>

                <main style={{
                    flex: 1,
                    background: 'var(--color-bg)'
                }}>
                    {activeSection === 'users' && renderUsersSection()}
                    {activeSection === 'statistics' && renderStatisticsSection()}
                </main>
            </div>

            {editingUser && (
                <UserEditModal
                    user={editingUser}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveUser}
                />
            )}
        </div>
    );
};