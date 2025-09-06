import { useState, useEffect } from 'react';
import { AdminService } from "../../services/AdminService.ts";
import ContentService from '../../services/ContentService.ts';

export const AdminStatistics = () => {
    const [overallStats, setOverallStats] = useState<any>(null);
    const [platformStats, setPlatformStats] = useState<any>(null);
    const [contentStats, setContentStats] = useState<any>(null);
    const [courseStats, setCourseStats] = useState<any>(null);
    const [courseDetailedStats, setCourseDetailedStats] = useState<any>(null);
    const [courseTasksCount, setCourseTasksCount] = useState<number | null>(null);
    const [studentsOverallStats, setStudentsOverallStats] = useState<any>(null);
    const [courseStudentsStats, setCourseStudentsStats] = useState<any>(null);
    const [usersCount, setUsersCount] = useState<any>(null);
    const [courses, setCourses] = useState<any[]>([]);

    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [startDate, setStartDate] = useState('2025-01-01');
    const [endDate, setEndDate] = useState('2025-12-31');
    const [loading, setLoading] = useState(false);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [courseFilter, setCourseFilter] = useState('');

    useEffect(() => {
        // initial load
        loadAllStatistics();
        loadCourses();
    }, []);

    const loadAllStatistics = async () => {
        setLoading(true);
        setError(null);
        try {
            const overallResponse = await AdminService.getOverallStatistics();
            setOverallStats(overallResponse.data);

            // Платформенная агрегированная статистика
            try {
                const platformResp = await AdminService.getPlatformStats();
                console.log(platformResp.data)
                setPlatformStats(platformResp.data);
            } catch (e) {
                console.warn('Не удалось загрузить платформенную статистику /platform/stats', e);
            }

            // Content statistics (tasks, courses, themes count)
            try {
                const contentResp = await AdminService.getContentStats();
                setContentStats(contentResp.data);
            } catch (e) {
                console.warn('Не удалось загрузить статистику контента /content/stats', e);
            }

            const studentsOverallResponse = await AdminService.getOverallStudentsStatistics();
            setStudentsOverallStats(studentsOverallResponse.data);

            await loadUsersCount();
        } catch (err) {
            console.error('Ошибка загрузки статистики:', err);
            setError('Ошибка загрузки статистики');
        } finally {
            setLoading(false);
        }
    };

    const loadCourses = async () => {
        setCoursesLoading(true);
        try {
            const apiCourses = await ContentService.getAllCourses();
            // Ожидаем, что res.data — массив курсов с полями id и title/name
            const normalized = Array.isArray(apiCourses)
            ? apiCourses.map(c => ({
                id: c.id,
                title: c.name ?? String(c.id),
                raw: c
            }))
            : [];

        setCourses(normalized);
        } catch (err) {
            console.error('Ошибка загрузки списка курсов:', err);
            setError('Не удалось загрузить список курсов');
        } finally {
            setCoursesLoading(false);
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
        } catch (err) {
            console.error('Ошибка загрузки количества пользователей:', err);
        }
    };

    const loadCourseStatistics = async (courseId?: string) => {
        if (!courseId) {
            setCourseStats(null);
            setCourseStudentsStats(null);
            setCourseDetailedStats(null);
            setCourseTasksCount(null);
            return;
        }

        setLoading(true);
        try {
            // Load existing course stats
            const courseStatsResponse = await AdminService.getCourseStatistics(courseId);
            setCourseStats(courseStatsResponse.data);

            const courseStudentsResponse = await AdminService.getCourseStudentsStatistics(courseId);
            setCourseStudentsStats(courseStudentsResponse.data);

            // Load enhanced course stats with theme-level details
            try {
                const detailedStatsResponse = await AdminService.getCourseAverageStats(courseId);
                setCourseDetailedStats(detailedStatsResponse.data);
            } catch (e) {
                console.warn(`Не удалось загрузить детальную статистику курса ${courseId}`, e);
            }

            // Load tasks count for the course
            try {
                const tasksCountResponse = await AdminService.getTasksCountByCourse(courseId);
                const taskCountMap = tasksCountResponse.data as Record<string, number>;
                const totalTasks = Object.values(taskCountMap).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0);
                setCourseTasksCount(totalTasks);
            } catch (e) {
                console.warn(`Не удалось загрузить количество задач курса ${courseId}`, e);
            }
        } catch (err) {
            console.error('Ошибка загрузки статистики курса:', err);
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
            loadCourseStatistics(selectedCourse);
        } else {
            setCourseStats(null);
            setCourseStudentsStats(null);
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

    const filteredCourses = courseFilter
        ? courses.filter(c => {
            const title = (c.title || c.name || c.id || '').toString().toLowerCase();
            return title.includes(courseFilter.toLowerCase());
        })
        : courses;

    const selectedCourseTitle = courses.find(c => c.id === selectedCourse)?.title || selectedCourse;

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
                    gap: '12px'
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
                                width: '77%',
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
                            Аналитика по курсу
                        </label>
                        <div>
                            {coursesLoading ? (
                                <div style={{ color: 'var(--color-text-secondary)' }}>Загрузка курсов...</div>
                            ) : (
                                <select
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                    style={{
                                        width: '70%',
                                        padding: '12px 16px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '8px',
                                        fontSize: '0.95rem',
                                        background: 'var(--color-bg)',
                                        color: 'var(--color-text)'
                                    }}
                                >
                                    <option value="">Выберите курс</option>
                                    {filteredCourses.map((c) => (
                                        <option key={c.id} value={c.id}>{c.title || c.name || c.id}</option>
                                    ))}
                                </select>
                            )}
                        </div>
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
                                width: '70%',
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
                                width: '70%',
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
                    {platformStats && (
                        <StatCard
                            title="Курсов всего"
                            value={platformStats.totalCourses ?? contentStats?.coursesCount ?? 0}
                            subtitle={`Обновлено ${platformStats.generatedAt ? new Date(platformStats.generatedAt).toLocaleString() : ''}`}
                            color="#2563eb"
                        />
                    )}
                    {(contentStats || platformStats) && (
                        <StatCard
                            title="Всего задач"
                            value={platformStats?.totalTasks ?? contentStats?.tasksCount ?? 0}
                            subtitle="Задач в системе"
                            color="#dc2626"
                        />
                    )}
                    {contentStats && (
                        <StatCard
                            title="Всего тем"
                            value={contentStats.themesCount ?? 0}
                            subtitle="Тем в курсах"
                            color="#059669"
                        />
                    )}
                    {platformStats?.totalUsersWithProgress !== undefined && (
                        <StatCard
                            title="Пользователи с прогрессом"
                            value={platformStats.totalUsersWithProgress}
                            subtitle="Имеют хотя бы 1 решённое задание"
                            color="#0d9488"
                        />
                    )}
                    {platformStats?.sectionLevelAverage && (
                        <StatCard
                            title="Средний прогресс (секция)"
                            value={`${platformStats.sectionLevelAverage.percentAvg?.toFixed?.(1) ?? 0}%`}
                            subtitle={`Участников: ${platformStats.sectionLevelAverage.participants}`}
                            color="#7c3aed"
                        />
                    )}
                    {usersCount && (
                        <StatCard
                            title="Общее количество пользователей"
                            value={usersCount.count || 0}
                            subtitle="По выбранным фильтрам"
                            color="#3b82f6"
                        />
                    )}

                    {studentsOverallStats && (
                        <StatCard
                            title="Всего студентов"
                            value={studentsOverallStats.totalStudents || 0}
                            subtitle="Активных студентов в системе"
                            color="#10b981"
                        />
                    )}

                    {overallStats && (
                        <>
                            <StatCard
                                title="Среднее время обучения"
                                value={
                                    platformStats?.courseLevelAverage && platformStats.courseLevelAverage.averageTimeMsAvg !== undefined
                                        ? `${(platformStats.courseLevelAverage.averageTimeMsAvg / 3600000).toFixed(1)}ч`
                                        : formatTime(overallStats.averageTimeSpentSeconds)
                                }
                                subtitle={
                                    platformStats?.courseLevelAverage && platformStats.courseLevelAverage.averageTimeMsAvg !== undefined
                                        ? "Среднее время по курсам (из platform stats)"
                                        : "На одного студента"
                                }
                                color="#f59e0b"
                            />

                            <StatCard
                                title="Средний прогресс"
                                value={`${platformStats?.courseLevelAverage?.percentAvg?.toFixed?.(1) ?? overallStats.averageProgressPercentage?.toFixed?.(1) ?? 0}%`}
                                subtitle="Завершенность курсов"
                                color="#8b5cf6"
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Платформенная агрегированная статистика */}
            {platformStats && (
                <div style={{ marginBottom: '32px' }}>
                    <SectionHeader
                        title="Агрегированная статистика платформы"
                        description="Консолидированные метрики прогресса по курсам и секциям"
                    />
                    <div style={{
                        background: 'var(--color-card)',
                        padding: '24px',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                        <ol style={{ margin: 0, paddingLeft: 20, fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: 8 }}>
                                <strong style={{ width: 240, display: 'inline-block', color: 'var(--color-text-secondary)' }}>Всего курсов:</strong>
                                <span>{platformStats.totalCourses}</span>
                            </li>
                            <li style={{ marginBottom: 8 }}>
                                <strong style={{ width: 240, display: 'inline-block', color: 'var(--color-text-secondary)' }}>Пользователи с прогрессом:</strong>
                                <span>{platformStats.totalUsersWithProgress}</span>
                            </li>
                            <li style={{ marginBottom: 12 }}>
                                <strong style={{ width: 240, display: 'inline-block', color: 'var(--color-text-secondary)' }}>Сгенерировано:</strong>
                                <span>{platformStats.generatedAt ? new Date(platformStats.generatedAt).toLocaleString() : '—'}</span>
                            </li>
                            {platformStats.courseLevelAverage && (
                                <li style={{ marginBottom: 16 }}>
                                    <details open>
                                        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Средние показатели по курсам</summary>
                                        <ul style={{ listStyle: 'disc', paddingLeft: 20, marginTop: 8 }}>
                                            <li>Среднее решённых задач: {platformStats.courseLevelAverage.solvedTasksAvg?.toFixed?.(2) ?? 0}</li>
                                            <li>Среднее всего задач: {platformStats.courseLevelAverage.totalTasksAvg?.toFixed?.(2) ?? 0}</li>
                                            <li>Средний процент: {platformStats.courseLevelAverage.percentAvg?.toFixed?.(1) ?? 0}%</li>
                                            <li>Среднее время (мс): {platformStats.courseLevelAverage.averageTimeMsAvg?.toFixed?.(0) ?? 0}</li>
                                            <li>Участников: {platformStats.courseLevelAverage.participants}</li>
                                            <li>Обновлено: {platformStats.courseLevelAverage.lastUpdatedAt ? new Date(platformStats.courseLevelAverage.lastUpdatedAt).toLocaleString() : '—'}</li>
                                        </ul>
                                    </details>
                                </li>
                            )}
                            {platformStats.sectionLevelAverage && (
                                <li style={{ marginBottom: 8 }}>
                                    <details>
                                        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Средние показатели по секциям</summary>
                                        <ul style={{ listStyle: 'disc', paddingLeft: 20, marginTop: 8 }}>
                                            <li>Среднее решённых задач: {platformStats.sectionLevelAverage.solvedTasksAvg?.toFixed?.(2) ?? 0}</li>
                                            <li>Среднее всего задач: {platformStats.sectionLevelAverage.totalTasksAvg?.toFixed?.(2) ?? 0}</li>
                                            <li>Средний процент: {platformStats.sectionLevelAverage.percentAvg?.toFixed?.(1) ?? 0}%</li>
                                            <li>Среднее время (мс): {platformStats.sectionLevelAverage.averageTimeMsAvg?.toFixed?.(0) ?? 0}</li>
                                            <li>Участников: {platformStats.sectionLevelAverage.participants}</li>
                                            <li>Обновлено: {platformStats.sectionLevelAverage.lastUpdatedAt ? new Date(platformStats.sectionLevelAverage.lastUpdatedAt).toLocaleString() : '—'}</li>
                                        </ul>
                                    </details>
                                </li>
                            )}
                        </ol>
                    </div>
                </div>
            )}

            {/* Детальная статистика курса */}
            {courseStats && (
                <div style={{ marginBottom: '32px' }}>
                    <SectionHeader
                        title={`Статистика курса ${selectedCourseTitle}`}
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
                            <ol style={{ margin: 0, paddingLeft: '18px' }}>
                            {(() => {
                                const elements: any[] = [];

                                const known: { k: string; label: string; fmt?: (v: any) => any }[] = [
                                    { k: 'studentsCount', label: 'Количество студентов', fmt: (v: any) => (v === null || v === undefined ? '0' : v) },
                                    { k: 'averageTimeSpentSeconds', label: 'Среднее время', fmt: (v: any) => (v === null || v === undefined ? '0ч 0м' : formatTime(v)) },
                                    { k: 'averageProgressPercentage', label: 'Средний прогресс', fmt: (v: any) => (v === null || v === undefined ? '0%' : formatPercentage(v)) },
                                ];

                                const usedKeys = new Set<string>();

                                known.forEach(f => {
                                    usedKeys.add(f.k);
                                    elements.push(
                                        <li key={f.k} style={{ marginBottom: 8 }}>
                                            <strong style={{ display: 'inline-block', width: 200, color: 'var(--color-text-secondary)' }}>{f.label}:</strong>
                                            <span>{f.fmt ? f.fmt(courseStats[f.k]) : (courseStats[f.k] ?? 'Нет данных')}</span>
                                        </li>
                                    );
                                });

                                Object.keys(courseStats || {}).forEach(k => {
                                    if (usedKeys.has(k)) return;
                                    const val = courseStats[k];
                                    let display = 'Нет данных';
                                    if (val !== null && val !== undefined) {
                                        if (Array.isArray(val)) display = `${val.length} элементов`;
                                        else if (typeof val === 'object') {
                                            try { display = JSON.stringify(val); } catch { display = String(val); }
                                        } else display = String(val);
                                    }
                                    elements.push(
                                        <li key={k} style={{ marginBottom: 8 }}>
                                            <strong style={{ display: 'inline-block', width: 200, color: 'var(--color-text-secondary)' }}>{k}:</strong>
                                            <span>{display}</span>
                                        </li>
                                    );
                                });

                                return elements;
                            })()}
                        </ol>
                        </pre>
                    </div>
                </div>
            )}

            {/* Enhanced Course Statistics */}
            {courseDetailedStats && (
                <div style={{ marginBottom: '32px' }}>
                    <SectionHeader
                        title={`Расширенная статистика курса ${selectedCourseTitle}`}
                        description="Детальная аналитика по темам и метрикам курса"
                    />
                    
                    {/* Course Summary Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        {courseDetailedStats.courseAverage && (
                            <>
                                <StatCard
                                    title="Средний прогресс"
                                    value={`${courseDetailedStats.courseAverage.percentAvg?.toFixed(1) ?? 0}%`}
                                    subtitle={`${courseDetailedStats.courseAverage.participants} участников`}
                                    color="#10b981"
                                />
                                <StatCard
                                    title="Решённые задачи"
                                    value={`${courseDetailedStats.courseAverage.solvedTasksAvg?.toFixed(1) ?? 0}/${courseDetailedStats.courseAverage.totalTasksAvg?.toFixed(1) ?? 0}`}
                                    subtitle="В среднем на студента"
                                    color="#3b82f6"
                                />
                                <StatCard
                                    title="Среднее время"
                                    value={formatTime(Math.round((courseDetailedStats.courseAverage.averageTimeMsAvg || 0) / 1000))}
                                    subtitle="На курс"
                                    color="#f59e0b"
                                />
                            </>
                        )}
                        {courseTasksCount !== null && (
                            <StatCard
                                title="Всего задач в курсе"
                                value={courseTasksCount}
                                subtitle="Задач доступно"
                                color="#8b5cf6"
                            />
                        )}
                    </div>

                    {/* Theme-level Statistics */}
                    {courseDetailedStats.themesAverage && courseDetailedStats.themesAverage.length > 0 && (
                        <div>
                            <h4 style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                margin: '0 0 16px 0',
                                color: 'var(--color-text)'
                            }}>
                                Статистика по темам ({courseDetailedStats.themesAverage.length} тем)
                            </h4>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '16px'
                            }}>
                                {courseDetailedStats.themesAverage.map((theme: any, index: number) => (
                                    <div key={theme.themeId || index} style={{
                                        background: 'var(--color-card)',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--color-border)',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                    }}>
                                        <div style={{ marginBottom: 12 }}>
                                            <h5 style={{
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                margin: '0 0 4px 0',
                                                color: 'var(--color-text)'
                                            }}>
                                                Тема {index + 1}
                                            </h5>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: 'var(--color-text-secondary)',
                                                fontFamily: 'monospace'
                                            }}>
                                                ID: {theme.themeId}
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gap: '8px', fontSize: '0.9rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Прогресс:</span>
                                                <span style={{ fontWeight: '600' }}>{theme.percentAvg?.toFixed(1) ?? 0}%</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Время:</span>
                                                <span style={{ fontWeight: '600' }}>
                                                    {formatTime(Math.round((theme.averageTimeMsAvg || 0) / 1000))}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Участники:</span>
                                                <span style={{ fontWeight: '600' }}>{theme.participants || 0}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Решено задач:</span>
                                                <span style={{ fontWeight: '600' }}>
                                                    {theme.solvedTasksAvg?.toFixed(1) ?? 0}/{theme.totalTasksAvg?.toFixed(1) ?? 0}
                                                </span>
                                            </div>
                                            {theme.lastUpdatedAt && (
                                                <div style={{ 
                                                    fontSize: '0.75rem', 
                                                    color: 'var(--color-text-secondary)',
                                                    borderTop: '1px solid var(--color-border)',
                                                    paddingTop: '8px',
                                                    marginTop: '8px'
                                                }}>
                                                    Обновлено: {new Date(theme.lastUpdatedAt).toLocaleString('ru-RU')}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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

export default AdminStatistics;
