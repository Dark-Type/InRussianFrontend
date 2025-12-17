import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import UserCreateModal from './UserCreateModal';
import type { UserProfile } from '../../api';
import { AdminService } from '../../services/AdminService';
import { UserCard } from './UserCard';
import type { User, StaffProfile, UserRoleEnum } from '../../api';
import { useProfile } from '../../context/profile/UseProfile';
import { mediaService } from '../../services/MediaService';

interface UserListProps {
    searchTerm: string;
    onEditUser: (user: User) => void;
    excludedUserId: string;
}

interface UserWithProfile extends User {
    staffProfile?: StaffProfile;
    userProfile?: UserProfile;
    languageSkills?: UserLanguageSkill[];
    avatarUrl?: string;
}

interface UserLanguageSkill {
    id?: string;
    language: string;
    understands: boolean;
    speaks: boolean;
    reads: boolean;
    writes: boolean;
}

const getRoleInfo = (role: UserRoleEnum) => {
    switch (role) {
        case 'ADMIN': return { color: '#ff6b6b', label: 'Администратор' };
        case 'EXPERT': return { color: '#4ecdc4', label: 'Преподаватель' };
        case 'CONTENT_MODERATOR': return { color: '#ffa726', label: 'Модератор контента' };
        case 'STUDENT': return { color: '#45b7d1', label: 'Студент' };
        default: return { color: '#6c757d', label: 'Неизвестно' };
    }
};

const getStatusInfo = (status: string) => {
    switch (status) {
        case 'ACTIVE': return { color: '#28a745', label: 'Активен' };
        case 'SUSPENDED': return { color: '#6c757d', label: 'Неактивен' };
        case 'DEACTIVATED': return { color: '#dc3545', label: 'Заблокирован' };
        case 'PENDING_VERIFICATION': return { color: '#ffa726', label: 'Ожидает подтверждения' };
        default: return { color: '#6c757d', label: 'Неизвестно' };
    }
};

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${alpha})`;
};

const statuses = ['ACTIVE', 'SUSPENDED', 'DEACTIVATED', 'PENDING_VERIFICATION'] as const;
const roles = ['ADMIN', 'EXPERT', 'CONTENT_MODERATOR', 'STUDENT'] as const;

interface FiltersProps {
    selectedStatuses: string[];
    selectedRoles: UserRoleEnum[];
    toggleStatus: (status: string) => void;
    toggleRole: (role: UserRoleEnum) => void;
}

const Filters = React.memo(({ selectedStatuses, selectedRoles, toggleStatus, toggleRole }: FiltersProps) => (
    <div style={{ marginBottom: 16 }}>
        <div>
            <strong>Фильтр по статусам:</strong>
            {statuses.map(status => {
                const { color, label } = getStatusInfo(status);
                const checked = selectedStatuses.includes(status);
                return (
                    <label
                        key={status}
                        style={{
                            marginLeft: 12,
                            cursor: 'pointer',
                            userSelect: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: `2px solid ${color}`,
                            borderRadius: 8,
                            padding: '4px 10px',
                            backgroundColor: checked ? hexToRgba(color, 0.3) : 'transparent',
                            transition: 'background-color 0.3s ease',
                            color,
                            fontWeight: 500,
                            fontSize: '0.9rem',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleStatus(status)}
                            style={{ display: 'none' }}
                        />
                        {label}
                    </label>
                );
            })}
        </div>
        <div style={{ marginTop: 12 }}>
            <strong>Фильтр по ролям:</strong>
            {roles.map(role => {
                const { color, label } = getRoleInfo(role);
                const checked = selectedRoles.includes(role);
                return (
                    <label
                        key={role}
                        style={{
                            marginLeft: 12,
                            cursor: 'pointer',
                            userSelect: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: `2px solid ${color}`,
                            borderRadius: 8,
                            padding: '4px 10px',
                            backgroundColor: checked ? hexToRgba(color, 0.3) : 'transparent',
                            transition: 'background-color 0.3s ease',
                            color,
                            fontWeight: 500,
                            fontSize: '0.9rem',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleRole(role)}
                            style={{ display: 'none' }}
                        />
                        {label}
                    </label>
                );
            })}
        </div>
    </div>
));

export const UserList = ({ searchTerm, onEditUser, excludedUserId }: UserListProps) => {
    const [allUsers, setAllUsers] = useState<UserWithProfile[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { getStaffProfileById, getAvatarIdByUserId } = useProfile();

    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
        'ACTIVE', 'SUSPENDED', 'DEACTIVATED', 'PENDING_VERIFICATION'
    ]);
    const [selectedRoles, setSelectedRoles] = useState<UserRoleEnum[]>([
        'ADMIN', 'EXPERT', 'CONTENT_MODERATOR', 'STUDENT'
    ]);

    const toggleStatus = useCallback((status: string) => {
        setSelectedStatuses(prev => 
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
        setPage(1);
    }, []);

    const toggleRole = useCallback((role: UserRoleEnum) => {
        setSelectedRoles(prev => 
            prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
        );
        setPage(1);
    }, []);

    const enrichUsersWithProfiles = useCallback(async (userList: User[]): Promise<UserWithProfile[]> => {
        return Promise.all(userList.map(async user => {
            const enrichedUser: UserWithProfile = { ...user };
            try {
                if(user.role === 'STUDENT') {
                    const [userProfile, languageSkills] = await Promise.all([
                        AdminService.getStudentProfile(user.id).catch(() => null),
                        AdminService.getStudentLanguageSkills(user.id).catch(() => []),
                    ]);
                    enrichedUser.userProfile = userProfile;
                    enrichedUser.languageSkills = languageSkills;
                } else {
                    enrichedUser.staffProfile = await getStaffProfileById(user.id);
                }
                const avatarId = await getAvatarIdByUserId(user.id);
                if(avatarId) {
                    const blob = await mediaService.getMediaById(avatarId);
                    enrichedUser.avatarUrl = URL.createObjectURL(blob);
                } else {
                    enrichedUser.avatarUrl = '/assets/images/default-avatar.svg';
                }
            } catch {

            }
            return enrichedUser;
        }));
    }, [getStaffProfileById, getAvatarIdByUserId]);

    const loadUsers = useCallback(async (pageNum: number) => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await AdminService.getUsers(pageNum, 20, undefined, 'createdAt', 'desc');
            let newUsers = (response.data || []).filter(user => String(user.id) !== String(excludedUserId));
            if(newUsers.length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }
            const enrichedUsers = await enrichUsersWithProfiles(newUsers);
            setAllUsers(prev => {
                const ids = new Set(prev.map(u => u.id));
                const filteredNew = enrichedUsers.filter(u => !ids.has(u.id));
                return [...prev, ...filteredNew];
            });
            setHasMore(newUsers.length === 20);
        } catch (e) {
            console.error('Ошибка загрузки пользователей:', e);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, excludedUserId, enrichUsersWithProfiles]);

    const searchUsers = useCallback(async (search: string) => {
        if (!search.trim()) {
            setPage(1);
            setHasMore(true);
            setSearchLoading(false);
            return;
        }
        setSearchLoading(true);
        try {
            const response = await AdminService.getUsers(1, 200);
            let users = (response.data || []).filter(user => String(user.id) !== String(excludedUserId));
            const enrichedUsers = await enrichUsersWithProfiles(users);
            setAllUsers(enrichedUsers);
            setHasMore(false);
        } catch (e) {
            console.error('Ошибка поиска:', e);
        } finally {
            setSearchLoading(false);
        }
    }, [excludedUserId, enrichUsersWithProfiles]);

    useEffect(() => {
        if (!searchTerm) {
            loadUsers(page);
        }
    }, [page, searchTerm, loadUsers]);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm) {
                searchUsers(searchTerm);
            } else {
                setAllUsers([]);
                setPage(1);
                setHasMore(true);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [searchTerm, searchUsers]);

    useEffect(() => {
        return () => {
            allUsers.forEach(user => {
                if(user.avatarUrl && user.avatarUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(user.avatarUrl);
                }
            });
        };
    }, [allUsers]);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastUserCallback = useCallback((node: HTMLDivElement) => {
        if (loading || searchTerm || !hasMore) return;
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observerRef.current.observe(node);
    }, [loading, hasMore, searchTerm]);

    const filteredUsers = useMemo(() => {
        return allUsers.filter(user => 
            selectedStatuses.includes(user.status) &&
            selectedRoles.includes(user.role) &&
            (
                !searchTerm || 
                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [allUsers, selectedStatuses, selectedRoles, searchTerm]);

    const userCards = useMemo(() => filteredUsers.map((user, index) => {
        if (index === filteredUsers.length - 1 && hasMore && !searchTerm) {
            return <div key={user.id} ref={lastUserCallback}><UserCard user={user} onEdit={onEditUser} /></div>;
        }
        return <UserCard key={user.id} user={user} onEdit={onEditUser} />;
    }), [filteredUsers, hasMore, searchTerm, onEditUser, lastUserCallback]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Пользователи</h3>
                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    style={{
                        padding: '8px 14px',
                        background: 'var(--color-primary)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                    }}
                >
                    + Новый
                </button>
            </div>
            <Filters
                selectedStatuses={selectedStatuses}
                selectedRoles={selectedRoles}
                toggleStatus={toggleStatus}
                toggleRole={toggleRole}
            />

            {filteredUsers.length === 0 && !loading && !searchLoading ? (
                <div style={{ textAlign: 'center', padding: 40, color: 'var(--color-text-secondary)' }}>
                    {searchTerm ? 'Пользователи не найдены' : 'Нет пользователей'}
                </div>
            ) : (
                <>
                    {userCards}

                    {(loading || searchLoading) && (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
                            <div style={{
                                width: 20,
                                height: 20,
                                border: '2px solid var(--color-border)',
                                borderTop: '2px solid var(--color-primary)',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                            }}/>
                        </div>
                    )}

                    {!hasMore && !searchTerm && filteredUsers.length > 0 && (
                        <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            Загружено {filteredUsers.length} пользователей
                        </div>
                    )}
                </>
            )}
            <UserCreateModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreated={() => {
                    // Refresh list: reset state and reload first page
                    setAllUsers([]);
                    setPage(1);
                    setHasMore(true);
                    setShowCreateModal(false);
                    // proactively load first page
                    loadUsers(1);
                }}
            />
        </div>
    );
};
