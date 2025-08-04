import  { useState, useEffect } from 'react';
import { AdminService } from "../../services/AdminService.ts";

export const AdminStatistics = () => {
    const [overallStats, setOverallStats] = useState<any>(null);
    const [courseStats, setCourseStats] = useState<any>(null);
    const [studentsOverallStats, setStudentsOverallStats] = useState<any>(null);
    const [courseStudentsStats, setCourseStudentsStats] = useState<any>(null);
    const [usersCount, setUsersCount] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [startDate, setStartDate] = useState('2025-01-01');
    const [endDate, setEndDate] = useState('2025-12-31');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAllStatistics();
    }, []);

    const loadAllStatistics = async () => {
        setLoading(true);
        setError(null);
        try {
            const overallResponse = await AdminService.getOverallStatistics();
            setOverallStats(overallResponse.data);

            const studentsOverallResponse = await AdminService.getOverallStudentsStatistics();
            setStudentsOverallStats(studentsOverallResponse.data);

            await loadUsersCount();
        } catch (error) {
            console.error('Ошибка загрузки статистики:', error);
            setError('Ошибка загрузки статистики');
        } finally {
            setLoading(false);
        }
    };

    const loadUsersCount = async () => {
        try {
            const countResponse = await AdminService.getUsersCount(
                selectedRole || undefined,
                startDate || undefined,
                endDate || undefined
            );
            setUsersCount(countResponse.data);
        } catch (error) {
            console.error('Ошибка загрузки количества пользователей:', error);
        }
    };

    const loadCourseStatistics = async () => {
        if (!selectedCourse) return;

        setLoading(true);
        try {
            const courseStatsResponse = await AdminService.getCourseStatistics(selectedCourse);
            setCourseStats(courseStatsResponse.data);

            const courseStudentsResponse = await AdminService.getCourseStudentsStatistics(selectedCourse);
            setCourseStudentsStats(courseStudentsResponse.data);
        } catch (error) {
            console.error('Ошибка загрузки статистики курса:', error);
            setError('Ошибка загрузки статистики курса');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsersCount();
    }, [selectedRole, startDate, endDate]);

    useEffect(() => {
        if (selectedCourse) {
            loadCourseStatistics();
        }
    }, [selectedCourse]);

    const formatTime = (seconds: number | null) => {
        if (seconds === null || seconds === undefined) return 'Нет данных';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}ч ${minutes}м`;
        }
        return `${minutes}м`;
    };

    const formatPercentage = (percentage: number | null) => {
        if (percentage === null || percentage === undefined) return 'Нет данных';
        return `${percentage.toFixed(1)}%`;
    };

    const StatCard = ({ title, value, subtitle, icon, color }: {
        title: string;
        value: string | number;
        subtitle?: string;
        icon?: string;
        color: string;
    }) => (
        <div style={{
            background: 'var(--color-card)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'default'
        }}
             onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-2px)';
                 e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
             }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
            }}>
                <h4 style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: 'var(--color-text-secondary)',
                    fontWeight: '500'
                }}>
                    {title}
                </h4>
                {icon && (
                    <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                )}
            </div>
            <p style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color,
                margin: '8px 0 4px 0',
                lineHeight: '1'
            }}>
                {value}
            </p>
            {subtitle && (
                <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    margin: 0
                }}>
                    {subtitle}
                </p>
            )}
        </div>
    );

    const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
        <div style={{ marginBottom: '24px' }}>
            <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                margin: '0 0 8px 0',
                color: 'var(--color-text)'
            }}>
                {title}
            </h3>
            {description && (
                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text-secondary)',
                    margin: 0
                }}>
                    {description}
                </p>
            )}
        </div>
    );

    if (loading && !overallStats) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 20px',
                flexDirection: 'column'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid var(--color-border)',
                    borderTop: '4px solid var(--color-primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{
                    marginTop: '16px',
                    color: 'var(--color-text-secondary)'
                }}>
                    Загрузка статистики...
                </p>
            </div>
        );
    }

    return (
        <div>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>

            <SectionHeader
                title="Статистика платформы"
                description="Аналитика пользователей, курсов и активности студентов"
            />

            {error && (
                <div style={{
                    background: 'linear-gradient(135deg, #fee, #fdd)',
                    color: '#c33',
                    padding: '16px 20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    border: '1px solid #fbb',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>⚠️</span>
                    {error}
                </div>
            )}

            {/* Фильтры */}
            <div style={{
                background: 'var(--color-card)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                marginBottom: '32px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                <SectionHeader title="Фильтры" description="Настройте параметры для детального анализа" />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            color: 'var(--color-text)'
                        }}>
                            Роль пользователя
                        </label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                background: 'var(--color-bg)',
                                color: 'var(--color-text)'
                            }}
                        >
                            <option value="">Все роли</option>
                            <option value="STUDENT">Студенты</option>
                            <option value="EXPERT">Преподаватели</option>
                            <option value="CONTENT_MODERATOR">Модераторы контента</option>
                            <option value="ADMIN">Администраторы</option>
                        </select>
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            color: 'var(--color-text)'
                        }}>
                            Дата от
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                background: 'var(--color-bg)',
                                color: 'var(--color-text)'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            color: 'var(--color-text)'
                        }}>
                            Дата до
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                background: 'var(--color-bg)',
                                color: 'var(--color-text)'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            color: 'var(--color-text)'
                        }}>
                            ID курса для детального анализа
                        </label>
                        <input
                            type="text"
                            placeholder="Введите ID курса"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                background: 'var(--color-bg)',
                                color: 'var(--color-text)'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Основные метрики */}
            <div style={{ marginBottom: '32px' }}>
                <SectionHeader title="Основные метрики" />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px'
                }}>
                    {usersCount && (
                        <StatCard
                            title="Общее количество пользователей"
                            value={usersCount.count || 0}
                            subtitle="По выбранным фильтрам"
                            icon="👥"
                            color="#3b82f6"
                        />
                    )}

                    {studentsOverallStats && (
                        <StatCard
                            title="Всего студентов"
                            value={studentsOverallStats.totalStudents || 0}
                            subtitle="Активных студентов в системе"
                            icon="🎓"
                            color="#10b981"
                        />
                    )}

                    {overallStats && (
                        <>
                            <StatCard
                                title="Среднее время обучения"
                                value={formatTime(overallStats.averageTimeSpentSeconds)}
                                subtitle="На одного студента"
                                icon="⏱️"
                                color="#f59e0b"
                            />

                            <StatCard
                                title="Средний прогресс"
                                value={formatPercentage(overallStats.averageProgressPercentage)}
                                subtitle="Завершенность курсов"
                                icon="📊"
                                color="#8b5cf6"
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Детальная статистика курса */}
            {courseStats && (
                <div style={{ marginBottom: '32px' }}>
                    <SectionHeader
                        title={`Статистика курса ${selectedCourse}`}
                        description="Детальная аналитика по выбранному курсу"
                    />
                    <div style={{
                        background: 'var(--color-card)',
                        padding: '24px',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            fontSize: '0.9rem',
                            margin: 0,
                            color: 'var(--color-text)',
                            background: 'var(--color-bg)',
                            padding: '16px',
                            borderRadius: '8px',
                            overflow: 'auto'
                        }}>
                            {JSON.stringify(courseStats, null, 2)}
                        </pre>
                    </div>
                </div>
            )}

            {/* Статистика студентов по курсу */}
            {courseStudentsStats && (
                <div style={{ marginBottom: '32px' }}>
                    <SectionHeader
                        title={`Статистика студентов курса ${selectedCourse}`}
                        description="Успеваемость и активность студентов"
                    />
                    <div style={{
                        background: 'var(--color-card)',
                        padding: '24px',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            fontSize: '0.9rem',
                            margin: 0,
                            color: 'var(--color-text)',
                            background: 'var(--color-bg)',
                            padding: '16px',
                            borderRadius: '8px',
                            overflow: 'auto'
                        }}>
                            {JSON.stringify(courseStudentsStats, null, 2)}
                        </pre>
                    </div>
                </div>
            )}

            {loading && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 20px'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        border: '3px solid var(--color-border)',
                        borderTop: '3px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{ marginLeft: '12px', color: 'var(--color-text-secondary)' }}>
                        Загрузка данных...
                    </span>
                </div>
            )}
        </div>
    );
};