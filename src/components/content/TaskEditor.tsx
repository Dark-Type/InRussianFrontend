import React, {useState, useEffect} from 'react';
import type {Task, TaskType, TaskContent, TaskAnswer, AnswerType} from '../../context/content/ContentContext.tsx';
import {ContentEditor} from './task-editor/ContentEditor';
import {AnswerEditor} from './task-editor/AnswerEditor';
import {useContent} from '../../context/content/UseContent.ts';

interface TaskEditorProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task;
    themeId: string;
    themeName: string;
}

export const TaskEditor: React.FC<TaskEditorProps> = ({
                                                          isOpen,
                                                          onClose,
                                                          task,
                                                          themeId,
                                                          themeName
                                                      }) => {
    const {createTask, updateTask} = useContent();
    const [formData, setFormData] = useState({
        name: '',
        taskType: 'LISTEN_AND_CHOOSE' as TaskType,
        question: '',
        instructions: '',
        isTraining: false,
        contents: [] as TaskContent[],
        answer: {
            answerType: 'SINGLE_CHOICE' as AnswerType,
            correctAnswer: null,
            options: [],
            matchPairs: []
        } as TaskAnswer
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (task && isOpen) {
            setFormData({
                name: task.name || '',
                taskType: task.taskType,
                question: task.question || '',
                instructions: task.instructions || '',
                isTraining: task.isTraining,
                contents: task.contents || [],
                answer: task.answer
            });
        } else if (isOpen) {
            // Сброс формы для новой задачи
            setFormData({
                name: '',
                taskType: 'LISTEN_AND_CHOOSE',
                question: '',
                instructions: '',
                isTraining: false,
                contents: [],
                answer: {
                    answerType: 'SINGLE_CHOICE',
                    correctAnswer: null,
                    options: [],
                    matchPairs: []
                }
            });
        }
    }, [task, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name?.trim() || !formData.question?.trim()) return;

        try {
            setIsLoading(true);

            if (task) {
                await updateTask(task.id, formData);
            } else {
                await createTask(themeId, formData);
            }

            onClose();
        } catch (error) {
            console.error('Ошибка сохранения задачи:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof typeof formData, value: any) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '20px',
            zIndex: 1000,
            overflowY: 'auto'
        }}>
            <div style={{
                background: 'var(--color-bg)',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
                <form onSubmit={handleSubmit}>
                    {/* Заголовок */}
                    <div style={{
                        padding: '24px 24px 16px',
                        borderBottom: '1px solid var(--color-border)',
                        position: 'sticky',
                        top: 0,
                        background: 'var(--color-bg)',
                        zIndex: 1
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h2 style={{margin: '0 0 4px 0', fontSize: '1.5rem', fontWeight: 600}}>
                                    {task ? 'Редактировать задачу' : 'Создать задачу'}
                                </h2>
                                <p style={{margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem'}}>
                                    Тема: {themeName}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    color: 'var(--color-text-secondary)'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Основная форма */}
                    <div style={{padding: '24px'}}>
                        {/* Основные поля */}
                        <div style={{marginBottom: '32px'}}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr',
                                gap: '16px',
                                marginBottom: '16px'
                            }}>
                                <div>
                                    <label style={{display: 'block', marginBottom: '6px', fontWeight: 500}}>
                                        Название задачи *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '4px',
                                            fontSize: '0.95rem',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{display: 'block', marginBottom: '6px', fontWeight: 500}}>
                                        Тип задачи
                                    </label>
                                    <select
                                        value={formData.taskType}
                                        onChange={(e) => handleInputChange('taskType', e.target.value as TaskType)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '4px',
                                            fontSize: '0.95rem',
                                            background: 'var(--color-bg)'
                                        }}
                                    >
                                        <option value="LISTEN_AND_CHOOSE">Слушать и выбирать</option>
                                        <option value="READ_AND_CHOOSE">Читать и выбирать</option>
                                        <option value="LOOK_AND_CHOOSE">Смотреть и выбирать</option>
                                        <option value="MATCH_AUDIO_TEXT">Сопоставить аудио-текст</option>
                                        <option value="MATCH_TEXT_TEXT">Сопоставить текст-текст</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{marginBottom: '16px'}}>
                                <label style={{display: 'block', marginBottom: '6px', fontWeight: 500}}>
                                    Вопрос задачи *
                                </label>
                                <textarea
                                    value={formData.question}
                                    onChange={(e) => handleInputChange('question', e.target.value)}
                                    required
                                    rows={2}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        fontSize: '0.95rem',
                                        resize: 'vertical',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{marginBottom: '16px'}}>
                                <label style={{display: 'block', marginBottom: '6px', fontWeight: 500}}>
                                    Инструкции (необязательно)
                                </label>
                                <textarea
                                    value={formData.instructions}
                                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                                    rows={2}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        fontSize: '0.95rem',
                                        resize: 'vertical',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isTraining}
                                        onChange={(e) => handleInputChange('isTraining', e.target.checked)}
                                    />
                                    <span style={{fontWeight: 500}}>Тренировочная задача</span>
                                </label>
                            </div>
                        </div>

                        {/* Редактор контента */}
                        <div style={{marginBottom: '32px'}}>
                            <ContentEditor
                                contents={formData.contents}
                                onContentsChange={(contents) => handleInputChange('contents', contents)}
                            />
                        </div>

                        {/* Редактор ответов */}
                        <div style={{marginBottom: '32px'}}>
                            <AnswerEditor
                                answer={formData.answer}
                                onAnswerChange={(answer) => handleInputChange('answer', answer)}
                            />
                        </div>
                    </div>

                    {/* Нижняя панель с кнопками */}
                    <div style={{
                        padding: '16px 24px',
                        borderTop: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '12px',
                        position: 'sticky',
                        bottom: 0,
                        background: 'var(--color-bg)'
                    }}>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            style={{
                                padding: '10px 20px',
                                background: 'var(--color-border)',
                                color: 'var(--color-text)',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                fontSize: '0.95rem'
                            }}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !formData.name?.trim() || !formData.question?.trim()}
                            style={{
                                padding: '10px 20px',
                                background: isLoading ? 'var(--color-border)' : 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                fontSize: '0.95rem'
                            }}
                        >
                            {isLoading ? 'Сохранение...' : (task ? 'Обновить' : 'Создать')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};