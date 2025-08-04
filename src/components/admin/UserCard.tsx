import React, { useState, useRef, useEffect } from 'react';
import type { User, UserRoleEnum, StaffProfile, UserStatusEnum } from '../../api';
import { Avatar } from '../shared/Avatar';
import { AdminService } from '../../services/AdminService';

interface UserWithProfile extends User {
    staffProfile?: StaffProfile;
    avatarUrl?: string;
}

interface UserCardProps {
    user: UserWithProfile;
    onEdit: (user: User) => void;
    onStatusChanged?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onStatusChanged }) => {
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [changingStatus, setChangingStatus] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowStatusMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getRoleInfo = (role: UserRoleEnum) => {
        switch (role) {
            case 'ADMIN':
                return { color: '#ff6b6b', label: 'Администратор' };
            case 'EXPERT':
                return { color: '#4ecdc4', label: 'Преподаватель' };
            case 'CONTENT_MODERATOR':
                return { color: '#ffa726', label: 'Модератор контента' };
            case 'STUDENT':
                return { color: '#45b7d1', label: 'Студент' };
            default:
                return { color: '#6c757d', label: 'Неизвестно' };
        }
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return { color: '#28a745', label: 'Активен' };
            case 'INACTIVE':
                return { color: '#6c757d', label: 'Неактивен' };
            case 'BANNED':
                return { color: '#dc3545', label: 'Заблокирован' };
            case 'PENDING_VERIFICATION':
                return { color: '#ffa726', label: 'Ожидает подтверждения' };
            default:
                return { color: '#6c757d', label: 'Неизвестно' };
        }
    };

    const getDisplayName = () => {
        if (user.role === 'STUDENT') {
            return user.email;
        }

        if (user.staffProfile) {
            const fullName = [
                user.staffProfile.surname,
                user.staffProfile.name,
                user.staffProfile.patronymic
            ].filter(Boolean).join(' ');

            return fullName || user.email;
        }

        return user.email;
    };

    const handleStatusChange = async (newStatus: UserStatusEnum) => {
        setChangingStatus(true);
        try {
            await AdminService.changeUserStatus(user.id, newStatus);
            setShowStatusMenu(false);
            onStatusChanged?.();
        } catch (error) {
            console.error('Ошибка изменения статуса:', error);
        } finally {
            setChangingStatus(false);
        }
    };

    const getAvailableStatuses = (): { value: UserStatusEnum; label: string; color: string }[] => {
        const allStatuses = [
            { value: 'ACTIVE' as UserStatusEnum, label: 'Активировать', color: '#28a745' },
            { value: 'INACTIVE' as UserStatusEnum, label: 'Деактивировать', color: '#6c757d' },
            { value: 'BANNED' as UserStatusEnum, label: 'Заблокировать', color: '#dc3545' }
        ];

        return allStatuses.filter(status => status.value !== user.status);
    };

    const roleInfo = getRoleInfo(user.role);
    const statusInfo = getStatusInfo(user.status);

    return (
        <div style={{
            background: 'var(--color-card)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            padding: '20px',
            marginBottom: '16px',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}
             onMouseEnter={(e) => {
                 e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
             }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <Avatar
                    src={user.avatarUrl}
                    alt={getDisplayName()}
                    size={60}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h4 style={{
                            margin: 0,
                            fontSize: '1.1rem',
                            color: 'var(--color-text)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {getDisplayName()}
                        </h4>

                        <span style={{
                            backgroundColor: roleInfo.color + '20',
                            color: roleInfo.color,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}>
                            {roleInfo.label}
                        </span>

                        <span style={{
                            backgroundColor: statusInfo.color + '20',
                            color: statusInfo.color,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}>
                            {statusInfo.label}
                        </span>
                    </div>

                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>
                        Email: {user.email}
                    </div>

                    {user.phone && (
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>
                            Телефон: {user.phone}
                        </div>
                    )}

                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                        Дата создания: {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }} ref={menuRef}>
                        <button
                            onClick={() => setShowStatusMenu(!showStatusMenu)}
                            disabled={changingStatus}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '4px',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-card)',
                                color: 'var(--color-text)',
                                cursor: changingStatus ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem',
                                opacity: changingStatus ? 0.6 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            {changingStatus ? 'Изменение...' : 'Статус'}
                            {!changingStatus && <span>▼</span>}
                        </button>

                        {showStatusMenu && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                background: 'var(--color-card)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                zIndex: 100,
                                minWidth: '140px',
                                marginTop: '4px'
                            }}>
                                {getAvailableStatuses().map(status => (
                                    <button
                                        key={status.value}
                                        onClick={() => handleStatusChange(status.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px 12px',
                                            border: 'none',
                                            background: 'transparent',
                                            color: status.color,
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            textAlign: 'left',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'var(--color-border)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => onEdit(user)}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: '1px solid var(--color-primary)',
                            background: 'transparent',
                            color: 'var(--color-primary)',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}
                    >
                        Редактировать
                    </button>
                </div>
            </div>
        </div>
    );
};