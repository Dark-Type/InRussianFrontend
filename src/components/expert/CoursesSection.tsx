import { useState, useEffect } from 'react';
import expertService from '../../services/ExpertService';
import type { Course, Section, Theme, TaskWithDetails, CountStats } from '../../api';

interface ExtendedCourse extends Course {
    sectionsCount?: number;
    themesCount?: number;
    tasksCount?: number;
    enrolledStudents?: number;
}

interface ExtendedSection extends Section {
    themesCount?: number;
    tasksCount?: number;
}

interface ExtendedTheme extends Theme {
    tasksCount?: number;
}

export const CoursesSection = () => {
    const [courses, setCourses] = useState<ExtendedCourse[]>([]);
    const [sections, setSections] = useState<{ [courseId: string]: ExtendedSection[] }>({});
    const [themes, setThemes] = useState<{ [sectionId: string]: ExtendedTheme[] }>({});
    const [tasks, setTasks] = useState<{ [themeId: string]: TaskWithDetails[] }>({});
    const [contentStats, setContentStats] = useState<CountStats | null>(null);
    const [loading, setLoading] = useState(false);

    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [expandedTheme, setExpandedTheme] = useState<string | null>(null);

    useEffect(() => {
        loadCourses();
        loadContentStats();
    }, []);

    const loadContentStats = async () => {
        try {
            const stats = await expertService.getContentStats();
            setContentStats(stats);
        } catch (error) {
            console.error('Ошибка загрузки статистики контента:', error);
        }
    };

    const loadCourses = async () => {
        setLoading(true);
        try {
            const coursesData = await expertService.getAllCourses();

            // Обогащаем курсы статистикой
            const enrichedCourses = await Promise.all(
                coursesData.map(async (course) => {
                    const enrichedCourse: ExtendedCourse = { ...course };

                    try {
                        // Загружаем количество заданий для курса
                        const tasksCount = await expertService.getCourseTasksCount(course.id);
                        enrichedCourse.tasksCount = tasksCount;

                        // Загружаем количество студентов на курсе
                        const studentsCount = await expertService.getStudentsCountByCourse(course.id);
                        enrichedCourse.enrolledStudents = studentsCount;
                    } catch (error) {
                        console.error(`Ошибка загрузки статистики для курса ${course.id}:`, error);
                        enrichedCourse.tasksCount = 0;
                        enrichedCourse.enrolledStudents = 0;
                    }

                    return enrichedCourse;
                })
            );

            setCourses(enrichedCourses);
        } catch (error) {
            console.error('Ошибка загрузки курсов:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadSections = async (courseId: string) => {
        try {
            const sectionsData = await expertService.getSectionsByCourse(courseId);

            // Обогащаем секции статистикой
            const enrichedSections = await Promise.all(
                sectionsData.map(async (section) => {
                    const enrichedSection: ExtendedSection = { ...section };

                    try {
                        const tasksCount = await expertService.getSectionTasksCount(section.id);
                        enrichedSection.tasksCount = tasksCount;
                    } catch (error) {
                        console.error(`Ошибка загрузки статистики для секции ${section.id}:`, error);
                        enrichedSection.tasksCount = 0;
                    }

                    return enrichedSection;
                })
            );

            setSections(prev => ({ ...prev, [courseId]: enrichedSections }));

            // Обновляем количество секций в курсе
            setCourses(prev => prev.map(course =>
                course.id === courseId
                    ? { ...course, sectionsCount: enrichedSections.length }
                    : course
            ));
        } catch (error) {
            console.error('Ошибка загрузки секций:', error);
        }
    };

    const loadThemes = async (sectionId: string) => {
        try {
            const themesData = await expertService.getThemesBySection(sectionId);

            // Обогащаем темы статистикой
            const enrichedThemes = await Promise.all(
                themesData.map(async (theme) => {
                    const enrichedTheme: ExtendedTheme = { ...theme };

                    try {
                        const tasksCount = await expertService.getThemeTasksCount(theme.id);
                        enrichedTheme.tasksCount = tasksCount;
                    } catch (error) {
                        console.error(`Ошибка загрузки статистики для темы ${theme.id}:`, error);
                        enrichedTheme.tasksCount = 0;
                    }

                    return enrichedTheme;
                })
            );

            setThemes(prev => ({ ...prev, [sectionId]: enrichedThemes }));

            // Обновляем количество тем в секции
            setSections(prev => {
                const updatedSections = { ...prev };
                Object.keys(updatedSections).forEach(courseId => {
                    updatedSections[courseId] = updatedSections[courseId].map(section =>
                        section.id === sectionId
                            ? { ...section, themesCount: enrichedThemes.length }
                            : section
                    );
                });
                return updatedSections;
            });
        } catch (error) {
            console.error('Ошибка загрузки тем:', error);
        }
    };

    const loadTasks = async (themeId: string) => {
        try {
            const tasksData = await expertService.getTasksByTheme(themeId);
            setTasks(prev => ({ ...prev, [themeId]: tasksData }));
        } catch (error) {
            console.error('Ошибка загрузки заданий:', error);
            setTasks(prev => ({ ...prev, [themeId]: [] }));
        }
    };

    const handleCourseClick = async (courseId: string) => {
        if (expandedCourse === courseId) {
            setExpandedCourse(null);
            setExpandedSection(null);
            setExpandedTheme(null);
        } else {
            setExpandedCourse(courseId);
            setExpandedSection(null);
            setExpandedTheme(null);
            if (!sections[courseId]) {
                await loadSections(courseId);
            }
        }
    };

    const handleSectionClick = async (sectionId: string) => {
        if (expandedSection === sectionId) {
            setExpandedSection(null);
            setExpandedTheme(null);
        } else {
            setExpandedSection(sectionId);
            setExpandedTheme(null);
            if (!themes[sectionId]) {
                await loadThemes(sectionId);
            }
        }
    };

    const handleThemeClick = async (themeId: string) => {
        if (expandedTheme === themeId) {
            setExpandedTheme(null);
        } else {
            setExpandedTheme(themeId);
            if (!tasks[themeId]) {
                await loadTasks(themeId);
            }
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid var(--color-border)',
                    borderTop: '2px solid var(--color-primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
            </div>
        );
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h2 style={{ margin: 0 }}>Управление курсами</h2>
                {contentStats && (
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <span>Курсов: {contentStats.coursesCount}</span>
                        <span>Секций: {contentStats.sectionsCount}</span>
                        <span>Тем: {contentStats.themesCount}</span>
                        <span>Заданий: {contentStats.tasksCount}</span>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            background: 'var(--color-card)',
                            overflow: 'hidden'
                        }}>
                            <div
                                onClick={() => handleCourseClick(course.id)}
                                style={{
                                    padding: '16px 20px',
                                    cursor: 'pointer',
                                    borderBottom: expandedCourse === course.id ? '1px solid var(--color-border)' : 'none',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: expandedCourse === course.id ? 'var(--color-bg)' : 'transparent'
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: '0 0 4px 0', fontWeight: 600 }}>{course.name}</h3>
                                    <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                                        {course.description}
                                    </p>
                                    <div style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                        Секций: {course.sectionsCount || 0} |
                                        Тем: {course.themesCount || 0} |
                                        Задач: {course.tasksCount || 0} |
                                        Студентов: {course.enrolledStudents || 0}
                                    </div>
                                </div>
                                <span style={{ fontSize: '1.2rem' }}>
                                    {expandedCourse === course.id ? '▼' : '▶'}
                                </span>
                            </div>

                            {expandedCourse === course.id && (
                                <div style={{ padding: '0 20px 16px 40px' }}>
                                    <h4 style={{ margin: '0 0 12px 0', fontWeight: 600 }}>Секции</h4>

                                    {sections[course.id] && sections[course.id].length > 0 ? (
                                        sections[course.id].map((section) => (
                                            <div key={section.id} style={{ marginBottom: '12px' }}>
                                                <div
                                                    onClick={() => handleSectionClick(section.id)}
                                                    style={{
                                                        padding: '12px 16px',
                                                        background: 'var(--color-bg)',
                                                        border: '1px solid var(--color-border)',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <div style={{ flex: 1 }}>
                                                        <strong>{section.name}</strong>
                                                        {section.description && (
                                                            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                                                {section.description}
                                                            </p>
                                                        )}
                                                        <div style={{ marginTop: '4px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                                            Тем: {section.themesCount || 0} | Задач: {section.tasksCount || 0}
                                                        </div>
                                                    </div>
                                                    <span>{expandedSection === section.id ? '▼' : '▶'}</span>
                                                </div>

                                                {expandedSection === section.id && (
                                                    <div style={{ marginTop: '12px', paddingLeft: '20px' }}>
                                                        <h5 style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Темы</h5>

                                                        {themes[section.id] && themes[section.id].length > 0 ? (
                                                            themes[section.id].map((theme) => (
                                                                <div key={theme.id} style={{ marginBottom: '8px' }}>
                                                                    <div
                                                                        onClick={() => handleThemeClick(theme.id)}
                                                                        style={{
                                                                            padding: '10px 14px',
                                                                            background: 'var(--color-card)',
                                                                            border: '1px solid var(--color-border)',
                                                                            borderRadius: '4px',
                                                                            cursor: 'pointer',
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'center'
                                                                        }}
                                                                    >
                                                                        <div style={{ flex: 1 }}>
                                                                            <strong>{theme.name}</strong>
                                                                            {theme.description && (
                                                                                <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                                                                    {theme.description}
                                                                                </p>
                                                                            )}
                                                                            <div style={{ marginTop: '2px', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                                                                Задач: {theme.tasksCount || 0}
                                                                            </div>
                                                                        </div>
                                                                        <span>{expandedTheme === theme.id ? '▼' : '▶'}</span>
                                                                    </div>

                                                                    {expandedTheme === theme.id && (
                                                                        <div style={{ marginTop: '8px', paddingLeft: '20px' }}>
                                                                            <h6 style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Задачи</h6>

                                                                            {tasks[theme.id] && tasks[theme.id].length > 0 ? (
                                                                                tasks[theme.id].map((task) => (
                                                                                    <div
                                                                                        key={task.id}
                                                                                        style={{
                                                                                            padding: '8px 12px',
                                                                                            background: 'var(--color-bg)',
                                                                                            border: '1px solid var(--color-border)',
                                                                                            borderRadius: '4px',
                                                                                            marginBottom: '4px',
                                                                                            display: 'flex',
                                                                                            justifyContent: 'space-between',
                                                                                            alignItems: 'center'
                                                                                        }}
                                                                                    >
                                                                                        <div>
                                                                                            <span>{task.name}</span>
                                                                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                                                                                {task.taskType} {task.isTraining && '(Тренировка)'}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                <div style={{
                                                                                    padding: '12px',
                                                                                    textAlign: 'center',
                                                                                    color: 'var(--color-text-secondary)',
                                                                                    fontSize: '0.9rem'
                                                                                }}>
                                                                                    Задачи не найдены
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div style={{
                                                                padding: '12px',
                                                                textAlign: 'center',
                                                                color: 'var(--color-text-secondary)',
                                                                fontSize: '0.9rem'
                                                            }}>
                                                                Темы не найдены
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{
                                            padding: '12px',
                                            textAlign: 'center',
                                            color: 'var(--color-text-secondary)',
                                            fontSize: '0.9rem'
                                        }}>
                                            Секции не найдены
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        color: 'var(--color-text-secondary)',
                        background: 'var(--color-card)',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)'
                    }}>
                        <p>Курсы не найдены</p>
                    </div>
                )}
            </div>
        </div>
    );
};