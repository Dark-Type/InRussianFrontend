import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/UseAuth.tsx";
import { useTheme } from "../context/UseTheme.tsx";
import {  type StudentProgress } from "../context/UseExpert.tsx";
import { useExpert } from "../context/UseExpert.ts";
type Section = 'students' | 'courses' | 'statistics';

export const ExpertPanel = () => {
    const { user, logout } = useAuth();
    const { theme, toggle } = useTheme();
    const {
        courses,
        sections,
        themes,
        searchTerm,
        selectedCourse,
        setSearchTerm,
        setSelectedCourse,
        loadCourses,
        loadSections,
        loadThemes,
        loadStudentProgress,
        loadCourseStatistics,
        getFilteredStudentProgress,
        exportStudentProgressToExcel,
        exportCourseStatisticsToExcel,
        courseStatistics
    } = useExpert();

    const [activeSection, setActiveSection] = useState<Section>('students');
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

    useEffect(() => {
        loadCourses();
        loadStudentProgress();
    }, []);

    const getUserDisplayName = () => {
        if (user?.staffProfile) {
            const { name, patronymic } = user.staffProfile;
            return patronymic ? `${name} ${patronymic}` : name;
        }
        return user?.email || 'Эксперт';
    };

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}ч ${mins}м`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ru-RU');
    };

    const renderStudentCard = (student: StudentProgress) => (
        <div key={student.userId} style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>
                        {student.profile.surname} {student.profile.name} {student.profile.patronymic}
                    </h4>
                    <p style={{ margin: '4px 0', color: 'var(--color-text-secondary)' }}>
                        Email: {student.profile.email}
                    </p>
                    <p style={{ margin: '4px 0', color: 'var(--color-text-secondary)' }}>
                        Курс: {student.courseName}
                    </p>
                    <p style={{ margin: '4px 0', color: 'var(--color-text-secondary)' }}>
                        Последняя активность: {formatDate(student.lastActive)}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                        <span style={{ fontSize: '0.9rem' }}>
                            Время: {formatTime(student.totalTimeSpent)}
                        </span>
                        <span style={{ fontSize: '0.9rem' }}>
                            Прогресс: {student.overallProgress}%
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setSelectedStudentId(selectedStudentId === student.userId ? null : student.userId)}
                    style={{
                        padding: '8px 16px',
                        background: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {selectedStudentId === student.userId ? 'Скрыть' : 'Подробнее'}
                </button>
            </div>

            {selectedStudentId === student.userId && (
                <div style={{
                    marginTop: '16px',
                    padding: '16px',
                    background: 'var(--color-bg)',
                    borderRadius: '8px'
                }}>
                    <h5>Детальная информация</h5>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <strong>Личные данные:</strong>
                            <p>Дата рождения: {new Date(student.profile.dob).toLocaleDateString('ru-RU')}</p>
                            <p>Гражданство: {student.profile.citizenship || 'Не указано'}</p>
                            <p>Национальность: {student.profile.nationality || 'Не указано'}</p>
                            <p>Город проживания: {student.profile.cityOfResidence || 'Не указано'}</p>
                            <p>Образование: {student.profile.education || 'Не указано'}</p>
                        </div>
                        <div>
                            <strong>Языковые навыки:</strong>
                            {student.languageSkills.map((skill, idx) => (
                                <div key={idx} style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
                                    <div style={{ fontWeight: 'bold' }}>{skill.language}:</div>
                                    <div style={{ marginLeft: '8px', fontSize: '0.8rem' }}>
                                        Понимает: {skill.understands ? '✓' : '✗'} |
                                        Говорит: {skill.speaks ? '✓' : '✗'} |
                                        Читает: {skill.reads ? '✓' : '✗'} |
                                        Пишет: {skill.writes ? '✓' : '✗'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <strong>Прогресс по разделам:</strong>
                        {student.sectionProgress.map((section, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px',
                                background: 'var(--color-card)',
                                borderRadius: '4px',
                                marginTop: '4px'
                            }}>
                                <span>{section.sectionName}</span>
                                <div>
                                    <span style={{ marginRight: '12px' }}>
                                        Тестирование: {section.testingProgress}%
                                    </span>
                                    <span>Обучение: {section.learningProgress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderStudentsSection = () => (
        <div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Поиск студентов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        flex: 1,
                        maxWidth: '400px'
                    }}
                />
                <select
                    value={selectedCourse}
                    onChange={(e) => {
                        setSelectedCourse(e.target.value);
                        loadStudentProgress(e.target.value || undefined);
                    }}
                    style={{
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '6px',
                        fontSize: '1rem'
                    }}
                >
                    <option value="">Все курсы</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => exportStudentProgressToExcel(selectedCourse || undefined)}
                    style={{
                        padding: '12px 20px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                >
                    📊 Экспорт в Excel
                </button>
            </div>

            <div>
                {getFilteredStudentProgress().map(renderStudentCard)}
            </div>
        </div>
    );

    const handleCourseClick = async (courseId: string) => {
        if (expandedCourse === courseId) {
            setExpandedCourse(null);
            setExpandedSection(null);
        } else {
            setExpandedCourse(courseId);
            setExpandedSection(null);
            if (!sections[courseId]) {
                await loadSections(courseId);
            }
        }
    };

    const handleSectionClick = async (sectionId: string) => {
        if (expandedSection === sectionId) {
            setExpandedSection(null);
        } else {
            setExpandedSection(sectionId);
            if (!themes[sectionId]) {
                await loadThemes(sectionId);
            }
        }
    };

    const renderCoursesSection = () => (
        <div>
            <h2 style={{ marginBottom: '24px' }}>Обзор курсов</h2>

            {courses.map(course => (
                <div key={course.id} style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    background: 'var(--color-card)',
                    overflow: 'hidden',
                    marginBottom: '16px'
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
                            <h3 style={{ margin: '0 0 4px 0' }}>{course.name}</h3>
                            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                                {course.description}
                            </p>
                            <div style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                Студентов: {course.enrolledStudents} | Секций: {course.sectionsCount} |
                                Тем: {course.themesCount} | Задач: {course.tasksCount}
                            </div>
                        </div>
                        <span>{expandedCourse === course.id ? '▼' : '▶'}</span>
                    </div>

                    {expandedCourse === course.id && (
                        <div style={{ padding: '0 20px 16px 40px' }}>
                            <h4>Разделы</h4>
                            {sections[course.id]?.map(section => (
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
                                        <div>
                                            <strong>{section.name}</strong>
                                            {section.description && (
                                                <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                                    {section.description}
                                                </p>
                                            )}
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                                Тем: {section.themesCount} | Задач: {section.tasksCount} |
                                                Средний прогресс: {section.averageProgress}%
                                            </div>
                                        </div>
                                        <span>{expandedSection === section.id ? '▼' : '▶'}</span>
                                    </div>

                                    {expandedSection === section.id && (
                                        <div style={{ marginTop: '12px', paddingLeft: '20px' }}>
                                            <h5>Темы</h5>
                                            {themes[section.id]?.map(theme => (
                                                <div key={theme.id} style={{
                                                    padding: '10px 14px',
                                                    background: 'var(--color-card)',
                                                    border: '1px solid var(--color-border)',
                                                    borderRadius: '4px',
                                                    marginBottom: '8px'
                                                }}>
                                                    <strong>{theme.name}</strong>
                                                    {theme.description && (
                                                        <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                                            {theme.description}
                                                        </p>
                                                    )}
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                                        Задач: {theme.tasksCount} | Прогресс: {theme.averageProgress}% |
                                                        Время: {formatTime(theme.averageTimeSpent)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderStatisticsSection = () => (
        <div>
            <h2 style={{ marginBottom: '24px' }}>Статистика курсов</h2>

            <div style={{ marginBottom: '24px' }}>
                <select
                    onChange={(e) => {
                        if (e.target.value) {
                            loadCourseStatistics(e.target.value);
                        }
                    }}
                    style={{
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        marginRight: '16px'
                    }}
                >
                    <option value="">Выберите курс</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>

            {Object.values(courseStatistics).map(stats => (
                <div key={stats.courseId} style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3>{stats.courseName}</h3>
                        <button
                            onClick={() => exportCourseStatisticsToExcel(stats.courseId)}
                            style={{
                                padding: '8px 16px',
                                background: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            📊 Экспорт
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ background: 'var(--color-bg)', padding: '16px', borderRadius: '6px' }}>
                            <h4>Всего студентов</h4>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                {stats.totalStudents}
                            </p>
                        </div>
                        <div style={{ background: 'var(--color-bg)', padding: '16px', borderRadius: '6px' }}>
                            <h4>Активные студенты</h4>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
                                {stats.activeStudents}
                            </p>
                        </div>
                        <div style={{ background: 'var(--color-bg)', padding: '16px', borderRadius: '6px' }}>
                            <h4>Средний прогресс</h4>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8' }}>
                                {stats.averageProgress}%
                            </p>
                        </div>
                        <div style={{ background: 'var(--color-bg)', padding: '16px', borderRadius: '6px' }}>
                            <h4>Среднее время</h4>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffc107' }}>
                                {formatTime(stats.averageTimeSpent)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4>Статистика по разделам</h4>
                        {stats.sections.map(section => (
                            <div key={section.sectionId} style={{
                                background: 'var(--color-bg)',
                                padding: '16px',
                                borderRadius: '6px',
                                marginBottom: '12px'
                            }}>
                                <h5>{section.sectionName}</h5>
                                <p>Средний прогресс: {section.averageProgress}%</p>

                                <div style={{ marginTop: '12px' }}>
                                    <h6>Темы:</h6>
                                    {section.themes.map(theme => (
                                        <div key={theme.themeId} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '8px',
                                            background: 'var(--color-card)',
                                            borderRadius: '4px',
                                            marginBottom: '4px'
                                        }}>
                                            <span>{theme.themeName}</span>
                                            <div>
                                                <span style={{ marginRight: '12px' }}>
                                                    Прогресс: {theme.averageProgress}%
                                                </span>
                                                <span>Время: {formatTime(theme.averageTimeSpent)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'students':
                return renderStudentsSection();
            case 'courses':
                return renderCoursesSection();
            case 'statistics':
                return renderStatisticsSection();
            default:
                return renderStudentsSection();
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
                        background: '#17a2b8',
                        borderRadius: '50%',
                        marginRight: '14px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}></div>
                    <h2 style={{ fontWeight: 700, fontSize: '1.6rem', margin: 0 }}>Панель эксперта</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                        Добро пожаловать, {getUserDisplayName()}
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
                        { key: 'students' as Section, label: 'Студенты' },
                        { key: 'courses' as Section, label: 'Курсы' },
                        { key: 'statistics' as Section, label: 'Статистика' }
                    ].map(({ key, label }, idx, arr) => {
                        let borderRadius = '0';
                        if (idx === 0) borderRadius = '8px 0 0 8px';
                        if (idx === arr.length - 1) borderRadius = '0 8px 8px 0';

                        return (
                            <React.Fragment key={key}>
                                <button
                                    onClick={() => setActiveSection(key)}
                                    style={{
                                        flex: 1,
                                        padding: '12px 24px',
                                        background: activeSection === key ? 'var(--color-primary)' : 'transparent',
                                        color: activeSection === key ? '#fff' : 'var(--color-text)',
                                        border: 'none',
                                        borderRadius,
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
                        );
                    })}
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
        </div>
    );
};