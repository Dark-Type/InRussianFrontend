import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AdminService } from '../../services/AdminService';
import { UserCard } from './UserCard';
import type { User, StaffProfile, UserProfile } from '../../api'
import { useProfile } from '../../context/profile/UseProfile';
import { mediaService } from '../../services/MediaService';

interface UserListProps {
    searchTerm: string;
    onEditUser: (user: User) => void;
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
export const UserList: React.FC<UserListProps> = ({ searchTerm, onEditUser }) => {
    const [users, setUsers] = useState<UserWithProfile[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [searchLoading, setSearchLoading] = useState(false);
    const [totalLoaded, setTotalLoaded] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const { getStaffProfileById, getAvatarIdByUserId } = useProfile();

    const enrichUsersWithProfiles = async (userList: User[]): Promise<UserWithProfile[]> => {
        const enrichedUsers = await Promise.all(
            userList.map(async (user) => {
                const enrichedUser: UserWithProfile = { ...user };

                try {
                    if (user.role === 'STUDENT') {
                        // Загружаем профиль и языковые навыки для студентов
                        const [userProfile, languageSkills] = await Promise.all([
                            AdminService.getStudentProfile(user.id).catch(() => null),
                            AdminService.getStudentLanguageSkills(user.id).catch(() => [])
                        ]);

                        enrichedUser.userProfile = userProfile;
                        enrichedUser.languageSkills = languageSkills;
                    } else {
                        enrichedUser.staffProfile = await getStaffProfileById(user.id);
                    }

                    const avatarId = await getAvatarIdByUserId(user.id);
                    if (avatarId) {
                        const blob = await mediaService.getMediaById(avatarId);
                        enrichedUser.avatarUrl = URL.createObjectURL(blob);
                    }
                } catch (error) {
                    console.error(`Ошибка загрузки данных для пользователя ${user.id}:`, error);
                }

                return enrichedUser;
            })
        );

        return enrichedUsers;
    };

    const loadUsers = useCallback(async (pageNum: number, reset = false) => {
        if (loading || (!hasMore && !reset)) return;

        setLoading(true);
        try {
            const response = await AdminService.getUsers(
                pageNum,
                20,
                undefined,
                'createdAt',
                'desc'
            );

            const newUsers = response.data || [];
            const enrichedUsers = await enrichUsersWithProfiles(newUsers);

            if (reset) {
                users.forEach(user => {
                    if (user.avatarUrl && user.avatarUrl.startsWith('blob:')) {
                        URL.revokeObjectURL(user.avatarUrl);
                    }
                });
                setUsers(enrichedUsers);
                setTotalLoaded(enrichedUsers.length);
            } else {
                setUsers(prev => [...prev, ...enrichedUsers]);
                setTotalLoaded(prev => prev + enrichedUsers.length);
            }

            setHasMore(newUsers.length === 20 && totalLoaded + newUsers.length < 1000);
        } catch (error) {
            console.error('Ошибка загрузки пользователей:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, totalLoaded, users, getStaffProfileById, getAvatarIdByUserId]);

    const searchUsers = useCallback(async (search: string) => {
        if (!search.trim()) {
            setPage(0);
            setTotalLoaded(0);
            setHasMore(true);
            loadUsers(0, true);
            return;
        }

        setSearchLoading(true);
        try {
            const response = await AdminService.getUsers(0, 200);
            const allUsers = response.data || [];

            const filtered = allUsers.filter(user =>
                user.email?.toLowerCase().includes(search.toLowerCase()) ||
                user.phone?.toLowerCase().includes(search.toLowerCase())
            );

            const enrichedUsers = await enrichUsersWithProfiles(filtered);

            users.forEach(user => {
                if (user.avatarUrl && user.avatarUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(user.avatarUrl);
                }
            });

            setUsers(enrichedUsers);
            setHasMore(false);
        } catch (error) {
            console.error('Ошибка поиска:', error);
        } finally {
            setSearchLoading(false);
        }
    }, [loadUsers, users, getStaffProfileById, getAvatarIdByUserId]);

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchTerm) {
                searchUsers(searchTerm);
            } else {
                setPage(0);
                setTotalLoaded(0);
                setHasMore(true);
                loadUsers(0, true);
            }
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [searchTerm]);

    useEffect(() => {
        if (!searchTerm && page > 0) {
            loadUsers(page);
        }
    }, [page, searchTerm]);

    useEffect(() => {
        return () => {
            users.forEach(user => {
                if (user.avatarUrl && user.avatarUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(user.avatarUrl);
                }
            });
        };
    }, []);

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

    if (users.length === 0 && !loading && !searchLoading) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px',
                color: 'var(--color-text-secondary)'
            }}>
                {searchTerm ? 'Пользователи не найдены' : 'Нет пользователей'}
            </div>
        );
    }

    return (
        <div>
            {users.map((user, index) => {
                if (index === users.length - 1 && hasMore && !searchTerm) {
                    return (
                        <div key={user.id} ref={lastUserCallback}>
                            <UserCard user={user} onEdit={onEditUser} />
                        </div>
                    );
                }
                return <UserCard key={user.id} user={user} onEdit={onEditUser} />;
            })}

            {(loading || searchLoading) && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid var(--color-border)',
                        borderTop: '2px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                </div>
            )}

            {!hasMore && !searchTerm && users.length > 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem'
                }}>
                    Загружено {users.length} пользователей
                </div>
            )}
        </div>
    );
};