import React, { useState, useEffect } from 'react';
import {ContentApi, type Course, type Section} from '../../api';
const contentApi = new ContentApi();

export const Statistics: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const [sections, setSections] = useState<{ [courseId: string]: Section[] }>({});
    const [taskCounts, setTaskCounts] = useState<{ [id: string]: number }>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setIsLoading(true);
            const response = await contentApi.contentCoursesGet();
            setCourses(response.data || []);
        } catch (error) {
            console.error('Ошибка загрузки курсов:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadSections = async (courseId: string) => {
        try {
            const response = await contentApi.contentSectionsByCourseCourseIdGet(courseId);
            const sectionsData = response.data || [];
            setSections(prev => ({ ...prev, [courseId]: sectionsData }));

            // Загружаем количество задач для каждой секции
            for (const section of sectionsData) {
                loadTaskCountForSection(section.id);
            }
        } catch (error) {
            console.error('Ошибка загрузки секций:', error);
        }
    };

    const loadTaskCountForSection = async (sectionId: string) => {
        try {
            const response = await contentApi.contentStatsSectionSectionIdTasksCountGet(sectionId);
            setTaskCounts(prev => ({ ...prev, [sectionId]: response.data || 0 }));
        } catch (error) {
            console.error('Ошибка загрузки количества задач:', error);
        }
    };

    const loadTaskCountForCourse = async (courseId: string) => {
        try {
            const response = await contentApi.contentStatsCourseCourseIdTasksCountGet(courseId);
            setTaskCounts(prev => ({ ...prev, [courseId]: response.data || 0 }));
        } catch (error) {
            console.error('Ошибка загрузки количества задач для курса:', error);
        }
    };

    const handleCourseClick = async (courseId: string) => {
        if (expandedCourse === courseId) {
            setExpandedCourse(null);
        } else {
            setExpandedCourse(courseId);
            if (!sections[courseId]) {
                await loadSections(courseId);
            }
            await loadTaskCountForCourse(courseId);
        }
    };

    if (isLoading) {
        return <div>Загружаем статистику...</div>;
    }

    return (
        <div>
            <h2 style={{ margin: '0 0 24px 0', fontWeight: 700, fontSize: '1.5rem' }}>
                Статистика
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {courses.map(course => (
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
                            <div>
                                <h3 style={{ margin: '0 0 4px 0', fontWeight: 600 }}>{course.name}</h3>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                                    Всего задач: {taskCounts[course.id] !== undefined ? taskCounts[course.id] : '—'}
                                </p>
                            </div>
                            <span style={{ fontSize: '1.2rem' }}>
                                {expandedCourse === course.id ? '▼' : '▶'}
                            </span>
                        </div>

                        {expandedCourse === course.id && (
                            <div style={{ padding: '16px 20px' }}>
                                <h4 style={{ margin: '0 0 12px 0', fontWeight: 600 }}>Секции</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {sections[course.id]?.map(section => (
                                        <div key={section.id} style={{
                                            padding: '12px 16px',
                                            background: 'var(--color-bg)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <strong>{section.name}</strong>
                                                {section.description && (
                                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                                        {section.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div style={{
                                                padding: '4px 8px',
                                                background: 'var(--color-primary)',
                                                color: 'white',
                                                borderRadius: '4px',
                                                fontSize: '0.9rem',
                                                fontWeight: 600
                                            }}>
                                                {taskCounts[section.id] !== undefined ? taskCounts[section.id] : '—'} задач
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};