import React, { useState } from 'react';
import { useAuth } from "../context/UseAuth.tsx";
import { useTheme } from "../context/UseTheme.tsx";
import { useAdmin, type UserProfile } from "../context/UseAdmin.tsx";

type Section = 'users' | 'statistics';

interface EditingUser extends UserProfile {
    isEditing: { [key: string]: boolean };
}

export const AdminPanel = () => {
    const { user, logout } = useAuth();
    const { theme, toggle } = useTheme();
    const {
        searchTerm,
        setSearchTerm,
        updateUser,
        getFilteredUsers,
        stats,
        getCourseUsers
    } = useAdmin();

    const [activeSection, setActiveSection] = useState<Section>('users');
    const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');
    const [selectedCourse, setSelectedCourse] = useState('');

    const getUserDisplayName = () => {
        if (user?.staffProfile) {
            const { name, patronymic } = user.staffProfile;
            return patronymic ? `${name} ${patronymic}` : name;
        }
        return user?.email || 'Администратор';
    };

    const openEditModal = (userToEdit: UserProfile) => {
        setEditingUser({
            ...userToEdit,
            isEditing: {}
        });
    };

    const closeEditModal = () => {
        setEditingUser(null);
    };

    const toggleFieldEditing = (field: string) => {
        if (!editingUser) return;
        setEditingUser({
            ...editingUser,
            isEditing: {
                ...editingUser.isEditing,
                [field]: !editingUser.isEditing[field]
            }
        });
    };

    const updateEditingUser = (field: string, value: string) => {
        if (!editingUser) return;
        setEditingUser({
            ...editingUser,
            [field]: value
        });
    };

    const saveUser = () => {
        if (!editingUser) return;
        const { isEditing, ...userToSave } = editingUser;
        updateUser(editingUser.id, userToSave);
        closeEditModal();
    };

    const renderUserCard = (user: UserProfile) => (
        <div key={user.id} style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>
                        {user.surname} {user.name} {user.patronymic}
                    </h4>
                    <p style={{ margin: '4px 0', color: 'var(--color-text-secondary)' }}>
                        Email: {user.email}
                    </p>
                    <div style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        background: user.role === 'admin' ? '#ff6b6b' :
                            user.role === 'staff' ? '#4ecdc4' : '#45b7d1',
                        color: 'white'
                    }}>
                        {user.role === 'admin' ? 'Администратор' :
                            user.role === 'staff' ? 'Преподаватель' : 'Студент'}
                    </div>
                </div>
                <button
                    onClick={() => openEditModal(user)}
                    style={{
                        padding: '8px 16px',
                        background: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Редактировать
                </button>
            </div>
        </div>
    );

    const renderEditField = (label: string, field: string, value: string, type: string = 'text') => (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontWeight: 'bold', marginRight: '8px' }}>{label}:</label>
                <button
                    onClick={() => toggleFieldEditing(field)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    {editingUser?.isEditing[field] ? '🔓' : '🔒'}
                </button>
            </div>
            <input
                type={type}
                value={value}
                onChange={(e) => updateEditingUser(field, e.target.value)}
                disabled={!editingUser?.isEditing[field]}
                style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    background: editingUser?.isEditing[field] ? 'white' : '#f5f5f5'
                }}
            />
        </div>
    );

    const renderUsersSection = () => (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <input
                    type="text"
                    placeholder="Поиск пользователей..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '6px',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div>
                {getFilteredUsers().map(renderUserCard)}
            </div>
        </div>
    );

    const renderStatisticsSection = () => (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: 'var(--color-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <h4>Всего пользователей</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{stats.totalUsers}</p>
                </div>
                <div style={{ background: 'var(--color-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <h4>Студенты</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#45b7d1' }}>{stats.usersByRole.students}</p>
                </div>
                <div style={{ background: 'var(--color-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <h4>Преподаватели</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ecdc4' }}>{stats.usersByRole.staff}</p>
                </div>
                <div style={{ background: 'var(--color-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <h4>Администраторы</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>{stats.usersByRole.admins}</p>
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <h3>Фильтр по периоду</h3>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                    />
                    <span>—</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                    />
                </div>
            </div>

            <div>
                <h3>Статистика по курсам</h3>
                {stats.courses.map(course => (
                    <div key={course.id} style={{
                        background: 'var(--color-card)',
                        padding: '16px',
                        marginBottom: '16px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)'
                    }}>
                        <h4>{course.name}</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                            <div>
                                <p><strong>Записано:</strong> {course.enrolledUsers}</p>
                                <p><strong>Завершили:</strong> {course.completedUsers}</p>
                            </div>
                            <div>
                                <p><strong>Средний прогресс:</strong> {course.averageProgress}%</p>
                                <p><strong>Среднее время:</strong> {course.averageTimeSpent} мин</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'users':
                return renderUsersSection();
            case 'statistics':
                return renderStatisticsSection();
            default:
                return renderUsersSection();
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
            {/* Header */}
            <header style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 32px',
                borderBottom: '1px solid var(--color-border)',
                background: 'var(--color-card)',
                boxSizing: 'border-box'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: '#ff6b6b',
                        borderRadius: '50%',
                        marginRight: '14px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}></div>
                    <h2 style={{ fontWeight: 700, fontSize: '1.6rem', margin: 0 }}>Админ-панель</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                        {getUserDisplayName()}
                    </span>
                    <button
                        type="button"
                        onClick={toggle}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-primary)',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            padding: '6px 12px',
                            borderRadius: '6px'
                        }}
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <button
                        onClick={logout}
                        style={{
                            padding: '8px 16px',
                            background: 'var(--color-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}
                    >
                        Выйти
                    </button>
                </div>
            </header>

            {/* Navigation */}
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
                        { key: 'users' as Section, label: 'Пользователи' },
                        { key: 'statistics' as Section, label: 'Статистика' }
                    ].map(({ key, label }, idx, arr) => (
                        <React.Fragment key={key}>
                            <button
                                onClick={() => setActiveSection(key)}
                                style={{
                                    flex: 1,
                                    padding: '12px 24px',
                                    background: activeSection === key ? 'var(--color-primary)' : 'transparent',
                                    color: activeSection === key ? '#fff' : 'var(--color-text)',
                                    border: 'none',
                                    borderRadius: idx === 0 ? '8px 0 0 8px' : '0 8px 8px 0',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {label}
                            </button>
                            {idx < arr.length - 1 && (
                                <div style={{
                                    width: '1px',
                                    background: 'var(--color-border)',
                                    alignSelf: 'stretch'
                                }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: '32px',
                maxWidth: '100%',
                boxSizing: 'border-box'
            }}>
                {renderContent()}
            </main>

            {/* Edit Modal */}
            {editingUser && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--color-card)',
                        padding: '24px',
                        borderRadius: '8px',
                        width: '90%',
                        maxWidth: '500px',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                        <h3>Редактировать пользователя</h3>

                        {renderEditField('Email', 'email', editingUser.email, 'email')}
                        {renderEditField('Имя', 'name', editingUser.name)}
                        {renderEditField('Фамилия', 'surname', editingUser.surname)}
                        {renderEditField('Отчество', 'patronymic', editingUser.patronymic || '')}
                        {renderEditField('Телефон', 'phone', editingUser.phone || '')}
                        {renderEditField('Дата рождения', 'birthDate', editingUser.birthDate || '', 'date')}

                        {editingUser.role === 'student' && (
                            <>
                                {renderEditField('ID студента', 'studentId', editingUser.studentId || '')}
                                {renderEditField('Группа', 'group', editingUser.group || '')}
                                {renderEditField('Курс', 'course', editingUser.course || '')}
                            </>
                        )}

                        {editingUser.role === 'staff' && (
                            <>
                                {renderEditField('Кафедра', 'department', editingUser.department || '')}
                                {renderEditField('Должность', 'position', editingUser.position || '')}
                            </>
                        )}

                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                            <button
                                onClick={saveUser}
                                style={{
                                    padding: '10px 20px',
                                    background: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Сохранить
                            </button>
                            <button
                                onClick={closeEditModal}
                                style={{
                                    padding: '10px 20px',
                                    background: '#ccc',
                                    color: 'black',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};