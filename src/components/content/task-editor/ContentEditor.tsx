import React, { useState, useRef } from 'react';
import type {TaskContent, ContentType} from '../../../context/ContentContext.tsx';

interface ContentEditorProps {
    contents: TaskContent[];
    onContentsChange: (contents: TaskContent[]) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
                                                                contents,
                                                                onContentsChange
                                                            }) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const addContent = (type: ContentType) => {
        const newContent: TaskContent = {
            id: `content_${Date.now()}`,
            contentType: type,
            orderNum: contents.length,
            description: '',
            text: type === 'TEXT' ? '' : undefined
        };

        if (type !== 'TEXT') {
            fileInputRef.current?.click();
            fileInputRef.current!.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                    newContent.file = file;
                    newContent.url = URL.createObjectURL(file);
                    onContentsChange([...contents, newContent]);
                }
            };
        } else {
            onContentsChange([...contents, newContent]);
        }
    };

    const updateContent = (id: string, updates: Partial<TaskContent>) => {
        onContentsChange(contents.map(content =>
            content.id === id ? { ...content, ...updates } : content
        ));
    };

    const removeContent = (id: string) => {
        const filtered = contents.filter(c => c.id !== id);
        const reordered = filtered.map((c, index) => ({ ...c, orderNum: index }));
        onContentsChange(reordered);
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null) return;

        const newContents = [...contents];
        const [draggedItem] = newContents.splice(draggedIndex, 1);
        newContents.splice(dropIndex, 0, draggedItem);

        const reordered = newContents.map((c, index) => ({ ...c, orderNum: index }));
        onContentsChange(reordered);
        setDraggedIndex(null);
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
            }}>
                <h3 style={{ margin: 0, fontWeight: 600 }}>Содержимое задачи</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        type="button"
                        onClick={() => addContent('TEXT')}
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
                        📝 Текст
                    </button>
                    <button
                        type="button"
                        onClick={() => addContent('AUDIO')}
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
                        🎵 Аудио
                    </button>
                    <button
                        type="button"
                        onClick={() => addContent('IMAGE')}
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
                        🖼️ Изображение
                    </button>
                    <button
                        type="button"
                        onClick={() => addContent('VIDEO')}
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
                        🎬 Видео
                    </button>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                accept="audio/*,image/*,video/*"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {contents
                    .sort((a, b) => a.orderNum - b.orderNum)
                    .map((content, index) => (
                        <div
                            key={content.id}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            style={{
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                padding: '16px',
                                background: 'var(--color-bg)',
                                cursor: 'move'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '12px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>⋮⋮</span>
                                    <span style={{ fontWeight: 600 }}>
                                    {content.contentType === 'TEXT' ? '📝' :
                                        content.contentType === 'AUDIO' ? '🎵' :
                                            content.contentType === 'IMAGE' ? '🖼️' : '🎬'}
                                        {' '}{content.contentType}
                                </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeContent(content.id)}
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
                            </div>

                            {content.contentType === 'TEXT' ? (
                                <textarea
                                    value={content.text || ''}
                                    onChange={(e) => updateContent(content.id, { text: e.target.value })}
                                    placeholder="Введите текст..."
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '8px 10px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        fontSize: '0.95rem',
                                        resize: 'vertical',
                                        boxSizing: 'border-box',
                                        marginBottom: '12px'
                                    }}
                                />
                            ) : (
                                <div style={{ marginBottom: '12px' }}>
                                    {content.url && (
                                        <div style={{ marginBottom: '8px' }}>
                                            {content.contentType === 'AUDIO' && (
                                                <audio controls style={{ width: '100%' }}>
                                                    <source src={content.url} />
                                                </audio>
                                            )}
                                            {content.contentType === 'IMAGE' && (
                                                <img
                                                    src={content.url}
                                                    alt="Preview"
                                                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                                                />
                                            )}
                                            {content.contentType === 'VIDEO' && (
                                                <video controls style={{ maxWidth: '300px', maxHeight: '200px' }}>
                                                    <source src={content.url} />
                                                </video>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.9rem' }}>
                                        Описание
                                    </label>
                                    <input
                                        type="text"
                                        value={content.description || ''}
                                        onChange={(e) => updateContent(content.id, { description: e.target.value })}
                                        placeholder="Описание контента"
                                        style={{
                                            width: '100%',
                                            padding: '6px 8px',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '4px',
                                            fontSize: '0.9rem',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.9rem' }}>
                                        Транскрипция
                                    </label>
                                    <input
                                        type="text"
                                        value={content.transcription || ''}
                                        onChange={(e) => updateContent(content.id, { transcription: e.target.value })}
                                        placeholder="Транскрипция"
                                        style={{
                                            width: '100%',
                                            padding: '6px 8px',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '4px',
                                            fontSize: '0.9rem',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.9rem' }}>
                                        Перевод
                                    </label>
                                    <input
                                        type="text"
                                        value={content.translation || ''}
                                        onChange={(e) => updateContent(content.id, { translation: e.target.value })}
                                        placeholder="Перевод"
                                        style={{
                                            width: '100%',
                                            padding: '6px 8px',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '4px',
                                            fontSize: '0.9rem',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {contents.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '32px',
                    color: 'var(--color-text-secondary)',
                    border: '2px dashed var(--color-border)',
                    borderRadius: '8px'
                }}>
                    Добавьте содержимое для задачи
                </div>
            )}
        </div>
    );
};