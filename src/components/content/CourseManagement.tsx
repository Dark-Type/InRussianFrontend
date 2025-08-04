import React, { useState, useEffect } from 'react';
import { useContent, type Task } from '../../context/content/UseContent.ts';
import { CreateEditModal } from './CreateEditModal';
import { TaskEditor } from './TaskEditor';

export const CoursesManagement: React.FC = () => {
    const {
        courses,
        sections,
        themes,
        tasks,
        loadCourses,
        loadSections,
        loadThemes,
        loadTasks,
        createCourse,
        createSection,
        createTheme,
        updateCourse,
        updateSection,
        updateTheme,
        deleteCourse,
        deleteSection,
        deleteTheme,
        deleteTask
    } = useContent();

    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [expandedTheme, setExpandedTheme] = useState<string | null>(null);
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        type: 'course' | 'section' | 'theme';
        parentId?: string;
        editItem?: any;
    }>({
        isOpen: false,
        type: 'course'
    });
    const [taskEditorState, setTaskEditorState] = useState<{
        isOpen: boolean;
        themeId?: string;
        themeName?: string;
        task?: Task;
    }>({
        isOpen: false
    });
    const openTaskEditor = (themeId: string, themeName: string, task?: Task) => {
        setTaskEditorState({
            isOpen: true,
            themeId,
            themeName,
            task
        });
    };
    const closeTaskEditor = () => {
        setTaskEditorState({ isOpen: false });
    };

    const handleTaskSave = async (taskData: Omit<Task, 'id' | 'themeId'>) => {
        if (!taskEditorState.themeId) return;

        // Здесь будет вызов API для создания/обновления задачи
        console.log('Saving task:', taskData, 'for theme:', taskEditorState.themeId);

        // Для мока просто закрываем редактор
        closeTaskEditor();
    };


    useEffect(() => {
        loadCourses();
    }, []);

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

    const openModal = (type: 'course' | 'section' | 'theme', parentId?: string, editItem?: any) => {
        setModalState({
            isOpen: true,
            type,
            parentId,
            editItem
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            type: 'course'
        });
    };

    const handleModalSave = async (name: string, description?: string) => {
        const { type, parentId, editItem } = modalState;

        if (editItem) {
            // Редактирование
            switch (type) {
                case 'course':
                    await updateCourse(editItem.id, name, description);
                    break;
                case 'section':
                    await updateSection(editItem.id, name, description);
                    break;
                case 'theme':
                    await updateTheme(editItem.id, name, description);
                    break;
            }
        } else {
            // Создание
            switch (type) {
                case 'course':
                    await createCourse(name, description);
                    break;
                case 'section':
                    if (parentId) await createSection(parentId, name, description);
                    break;
                case 'theme':
                    if (parentId) await createTheme(parentId, name, description);
                    break;
            }
        }
    };
    const handleDelete = async (type: 'course' | 'section' | 'theme', item: any) => {
        switch (type) {
            case 'course':
                await deleteCourse(item.id);
                if (expandedCourse === item.id) {
                    setExpandedCourse(null);
                    setExpandedSection(null);
                    setExpandedTheme(null);
                }
                break;
            case 'section':
                await deleteSection(item.id);
                if (expandedSection === item.id) {
                    setExpandedSection(null);
                    setExpandedTheme(null);
                }
                break;
            case 'theme':
                await deleteTheme(item.id);
                if (expandedTheme === item.id) {
                    setExpandedTheme(null);
                }
                break;
        }
    };
    const getDeleteWarning = (type: 'course' | 'section' | 'theme', item: any): string => {
        switch (type) {
            case 'course':
                return `Это приведет к удалению всех секций (${item.sectionsCount}), тем (${item.themesCount}) и задач (${item.tasksCount}) в этом курсе.`;
            case 'section':
                return `Это приведет к удалению всех тем (${item.themesCount}) и задач (${item.tasksCount}) в этой секции.`;
            case 'theme':
                return `Это приведет к удалению всех задач (${item.tasksCount}) в этой теме.`;
            default:
                return '';
        }
    };

    const getModalTitle = () => {
        const { type, editItem } = modalState;
        const action = editItem ? 'Редактировать' : 'Создать';
        const typeNames = {
            course: 'курс',
            section: 'секцию',
            theme: 'тему'
        };
        return `${action} ${typeNames[type]}`;
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>
                    Управление курсами
                </h2>
                <button
                    onClick={() => openModal('course')}
                    style={{
                        padding: '10px 20px',
                        background: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                >
                    + Создать курс
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {courses.map(course => (
                    <div key={course.id} style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        background: 'var(--color-card)',
                        overflow: 'hidden'
                    }}>
                        {/* Course Header */}
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
                                    Секций: {course.sectionsCount} | Тем: {course.themesCount} | Задач: {course.tasksCount}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal('section', undefined, sections);
                                    }}
                                    style={{
                                        padding: '4px 8px',
                                        background: 'var(--color-border)',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    ✏️
                                </button>
                                <span style={{ fontSize: '1.2rem' }}>
                                    {expandedCourse === course.id ? '▼' : '▶'}
                                </span>
                            </div>
                        </div>

                        {/* Sections */}
                        {expandedCourse === course.id && (
                            <div style={{ padding: '0 20px 16px 40px' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px'
                                }}>
                                    <h4 style={{ margin: 0, fontWeight: 600 }}>Секции</h4>
                                    <button
                                        onClick={() => openModal('section', course.id)}
                                        style={{
                                            padding: '6px 12px',
                                            background: 'var(--color-primary)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        + Добавить секцию
                                    </button>
                                </div>

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
                                            <div style={{ flex: 1 }}>
                                                <strong>{section.name}</strong>
                                                {section.description && (
                                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                                        {section.description}
                                                    </p>
                                                )}
                                                <div style={{ marginTop: '4px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                                    Тем: {section.themesCount} | Задач: {section.tasksCount}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openModal('section', undefined, section);
                                                    }}
                                                    style={{
                                                        padding: '4px 8px',
                                                        background: 'var(--color-border)',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.8rem'
                                                    }}
                                                >
                                                    ✏️
                                                </button>
                                                <span>{expandedSection === section.id ? '▼' : '▶'}</span>
                                            </div>
                                        </div>

                                        {/* Themes */}
                                        {expandedSection === section.id && (
                                            <div style={{ marginTop: '12px', paddingLeft: '20px' }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '8px'
                                                }}>
                                                    <h5 style={{ margin: 0, fontWeight: 600 }}>Темы</h5>
                                                    <button
                                                        onClick={() => openModal('theme', section.id)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            background: 'var(--color-primary)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        + Добавить тему
                                                    </button>
                                                </div>

                                                {themes[section.id]?.map(theme => (
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
                                                                    Задач: {theme.tasksCount}
                                                                </div>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        openModal('theme', undefined, theme);
                                                                    }}
                                                                    style={{
                                                                        padding: '4px 8px',
                                                                        background: 'var(--color-border)',
                                                                        border: 'none',
                                                                        borderRadius: '4px',
                                                                        cursor: 'pointer',
                                                                        fontSize: '0.8rem'
                                                                    }}
                                                                >
                                                                    ✏️
                                                                </button>
                                                                <span>{expandedTheme === theme.id ? '▼' : '▶'}</span>
                                                            </div>
                                                        </div>

                                                        {/* Tasks */}
                                                        {expandedTheme === theme.id && (
                                                            <div style={{ marginTop: '8px', paddingLeft: '20px' }}>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    marginBottom: '8px'
                                                                }}>
                                                                    <h6 style={{ margin: 0, fontWeight: 600 }}>Задачи</h6>
                                                                    <button
                                                                        onClick={() => openTaskEditor(theme.id, theme.name)}
                                                                        style={{
                                                                            padding: '4px 8px',
                                                                            background: 'var(--color-primary)',
                                                                            color: 'white',
                                                                            border: 'none',
                                                                            borderRadius: '4px',
                                                                            cursor: 'pointer',
                                                                            fontSize: '0.8rem'
                                                                        }}
                                                                    >
                                                                        + Создать задачу
                                                                    </button>
                                                                </div>

                                                                {tasks[theme.id]?.map(task => (
                                                                    <div
                                                                        key={task.id}
                                                                        onClick={() => openTaskEditor(theme.id, theme.name, task)}
                                                                        style={{
                                                                            padding: '8px 12px',
                                                                            background: 'var(--color-bg)',
                                                                            border: '1px solid var(--color-border)',
                                                                            borderRadius: '4px',
                                                                            cursor: 'pointer',
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'center'
                                                                        }}
                                                                    >
                                                                        <div>
                                                                            <span>{task.name}</span>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                }}
                                                                                style={{
                                                                                    background: '#dc3545',
                                                                                    color: 'white',
                                                                                    border: 'none',
                                                                                    borderRadius: '4px',
                                                                                    padding: '4px 8px',
                                                                                    cursor: 'pointer',
                                                                                    fontSize: '0.8rem'
                                                                                }}
                                                                            >
                                                                                🗑️
                                                                            </button>
                                                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                                                                {task.taskType} {task.isTraining && '(Тренировка)'}
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                                            <button
                                                                                onClick={() => openTaskEditor(theme.id, theme.name, task)}
                                                                                style={{
                                                                                    padding: '2px 6px',
                                                                                    background: 'var(--color-border)',
                                                                                    border: 'none',
                                                                                    borderRadius: '2px',
                                                                                    cursor: 'pointer',
                                                                                    fontSize: '0.7rem'
                                                                                }}
                                                                            >
                                                                                ✏️
                                                                            </button>
                                                                            <button
                                                                                onClick={() => deleteTask(task.id)}
                                                                                style={{
                                                                                    padding: '2px 6px',
                                                                                    background: '#dc3545',
                                                                                    color: 'white',
                                                                                    border: 'none',
                                                                                    borderRadius: '2px',
                                                                                    cursor: 'pointer',
                                                                                    fontSize: '0.7rem'
                                                                                }}
                                                                            >
                                                                                🗑️
                                                                            </button>
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
                        )}
                    </div>
                ))}
            </div>

            <CreateEditModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                onSave={handleModalSave}
                onDelete={modalState.editItem ? () => handleDelete(modalState.type, modalState.editItem) : undefined}
                title={getModalTitle()}
                initialName={modalState.editItem?.name || ''}
                initialDescription={modalState.editItem?.description || ''}
                isEdit={!!modalState.editItem}
                deleteWarning={modalState.editItem ? getDeleteWarning(modalState.type, modalState.editItem) : undefined}
            />

            <TaskEditor
                isOpen={taskEditorState.isOpen}
                onClose={closeTaskEditor}
                onSave={handleTaskSave}
                task={taskEditorState.task}
                themeId={taskEditorState.themeId || ''}
                themeName={taskEditorState.themeName || ''}
            />
        </div>

    );
};