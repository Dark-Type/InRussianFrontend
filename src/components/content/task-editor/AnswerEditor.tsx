import type {TaskAnswer, AnswerType, AnswerOption, MatchPair} from '../../../context/ContentContext';

interface AnswerEditorProps {
    answer: TaskAnswer;
    onAnswerChange: (answer: TaskAnswer) => void;
}

export const AnswerEditor: React.FC<AnswerEditorProps> = ({
                                                              answer,
                                                              onAnswerChange
                                                          }) => {
    const handleAnswerTypeChange = (answerType: AnswerType) => {
        const newAnswer: TaskAnswer = {
            answerType,
            correctAnswer: null,
            options: answerType.includes('CHOICE') ? [] : undefined,
            matchPairs: answerType === 'MATCH_PAIRS' ? [] : undefined
        };
        onAnswerChange(newAnswer);
    };

    const addOption = () => {
        const newOption: AnswerOption = {
            id: `opt_${Date.now()}`,
            text: '',
            isCorrect: false,
            orderNum: answer.options?.length || 0
        };
        onAnswerChange({
            ...answer,
            options: [...(answer.options || []), newOption]
        });
    };

    const updateOption = (id: string, updates: Partial<AnswerOption>) => {
        onAnswerChange({
            ...answer,
            options: answer.options?.map(opt =>
                opt.id === id ? { ...opt, ...updates } : opt
            )
        });
    };

    const removeOption = (id: string) => {
        onAnswerChange({
            ...answer,
            options: answer.options?.filter(opt => opt.id !== id)
        });
    };

    const addMatchPair = () => {
        const newPair: MatchPair = {
            id: `pair_${Date.now()}`,
            leftItem: { type: 'TEXT', content: '' },
            rightItem: { type: 'TEXT', content: '' }
        };
        onAnswerChange({
            ...answer,
            matchPairs: [...(answer.matchPairs || []), newPair]
        });
    };

    const updateMatchPair = (id: string, updates: Partial<MatchPair>) => {
        onAnswerChange({
            ...answer,
            matchPairs: answer.matchPairs?.map(pair =>
                pair.id === id ? { ...pair, ...updates } : pair
            )
        });
    };

    const removeMatchPair = (id: string) => {
        onAnswerChange({
            ...answer,
            matchPairs: answer.matchPairs?.filter(pair => pair.id !== id)
        });
    };

    return (
        <div>
            <h3 style={{ margin: '0 0 16px 0', fontWeight: 600 }}>Варианты ответов</h3>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                    Тип ответа
                </label>
                <select
                    value={answer.answerType}
                    onChange={(e) => handleAnswerTypeChange(e.target.value as AnswerType)}
                    style={{
                        width: '100%',
                        maxWidth: '300px',
                        padding: '8px 10px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        fontSize: '0.95rem',
                        background: 'var(--color-bg)'
                    }}
                >
                    <option value="SINGLE_CHOICE">Один выбор из вариантов</option>
                    <option value="MULTI_CHOICE">Множественный выбор</option>
                    <option value="ORDER_WORDS">Упорядочить слова</option>
                    <option value="SELECT_WORDS">Выбрать правильные слова</option>
                    <option value="MATCH_PAIRS">Сопоставить пары</option>
                </select>
            </div>

            {/* Варианты выбора */}
            {(answer.answerType === 'SINGLE_CHOICE' || answer.answerType === 'MULTI_CHOICE') && (
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px'
                    }}>
                        <span style={{ fontWeight: 500 }}>Варианты ответов</span>
                        <button
                            type="button"
                            onClick={addOption}
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
                            + Добавить вариант
                        </button>
                    </div>

                    {answer.options?.map((option, index) => (
                        <div key={option.id} style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            marginBottom: '8px',
                            padding: '8px',
                            border: '1px solid var(--color-border)',
                            borderRadius: '4px',
                            background: 'var(--color-bg)'
                        }}>
                            <input
                                type={answer.answerType === 'SINGLE_CHOICE' ? 'radio' : 'checkbox'}
                                name="correct-answer"
                                checked={option.isCorrect}
                                onChange={(e) => {
                                    if (answer.answerType === 'SINGLE_CHOICE' && e.target.checked) {
                                        // Снимаем галочки с других вариантов
                                        answer.options?.forEach(opt => {
                                            updateOption(opt.id, { isCorrect: opt.id === option.id });
                                        });
                                    } else {
                                        updateOption(option.id, { isCorrect: e.target.checked });
                                    }
                                }}
                            />
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => updateOption(option.id, { text: e.target.value })}
                                placeholder={`Вариант ${index + 1}`}
                                style={{
                                    flex: 1,
                                    padding: '6px 8px',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem'
                                }}
                            />
                            {option.text.length > 30 && (
                                <span style={{ fontSize: '0.8rem', color: 'orange' }}>
                                    Длинная форма
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => removeOption(option.id)}
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
                    ))}
                </div>
            )}

            {/* Упорядочивание и выбор слов */}
            {(answer.answerType === 'ORDER_WORDS' || answer.answerType === 'SELECT_WORDS') && (
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px'
                    }}>
                        <span style={{ fontWeight: 500 }}>
                            {answer.answerType === 'ORDER_WORDS' ? 'Слова для упорядочивания' : 'Слова для выбора'}
                        </span>
                        <button
                            type="button"
                            onClick={addOption}
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
                            + Добавить слово
                        </button>
                    </div>

                    {answer.options?.map((option, index) => (
                        <div key={option.id} style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            {answer.answerType === 'SELECT_WORDS' && (
                                <input
                                    type="checkbox"
                                    checked={option.isCorrect}
                                    onChange={(e) => updateOption(option.id, { isCorrect: e.target.checked })}
                                />
                            )}
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => updateOption(option.id, { text: e.target.value })}
                                placeholder={answer.answerType === 'ORDER_WORDS' ? `Слово ${index + 1}` : 'Слово'}
                                style={{
                                    flex: 1,
                                    padding: '6px 8px',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem'
                                }}
                            />
                            {answer.answerType === 'ORDER_WORDS' && (
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                    Порядок: {index + 1}
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => removeOption(option.id)}
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
                    ))}
                </div>
            )}

            {/* Сопоставление пар */}
            {answer.answerType === 'MATCH_PAIRS' && (
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px'
                    }}>
                        <span style={{ fontWeight: 500 }}>Пары для сопоставления</span>
                        <button
                            type="button"
                            onClick={addMatchPair}
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
                            + Добавить пару
                        </button>
                    </div>

                    {answer.matchPairs?.map((pair, index) => (
                        <div key={pair.id} style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '12px',
                            background: 'var(--color-bg)'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '12px'
                            }}>
                                <span style={{ fontWeight: 500 }}>Пара {index + 1}</span>
                                <button
                                    type="button"
                                    onClick={() => removeMatchPair(pair.id)}
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

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr auto 1fr',
                                gap: '12px',
                                alignItems: 'center'
                            }}>
                                {/* Левый элемент */}
                                <div>
                                    <div style={{ marginBottom: '6px' }}>
                                        <select
                                            value={pair.leftItem.type}
                                            onChange={(e) => updateMatchPair(pair.id, {
                                                leftItem: { ...pair.leftItem, type: e.target.value as 'TEXT' | 'AUDIO' }
                                            })}
                                            style={{
                                                padding: '4px 6px',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                background: 'var(--color-bg)'
                                            }}
                                        >
                                            <option value="TEXT">Текст</option>
                                            <option value="AUDIO">Аудио</option>
                                        </select>
                                    </div>
                                    <input
                                        type="text"
                                        value={pair.leftItem.content}
                                        onChange={(e) => updateMatchPair(pair.id, {
                                            leftItem: { ...pair.leftItem, content: e.target.value }
                                        })}
                                        placeholder={pair.leftItem.type === 'TEXT' ? 'Текст' : 'Описание аудио'}
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

                                <div style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
                                    ↔
                                </div>

                                {/* Правый элемент */}
                                <div>
                                    <div style={{ marginBottom: '6px', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                        Текст
                                    </div>
                                    <input
                                        type="text"
                                        value={pair.rightItem.content}
                                        onChange={(e) => updateMatchPair(pair.id, {
                                            rightItem: { ...pair.rightItem, content: e.target.value }
                                        })}
                                        placeholder="Текст для сопоставления"
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
            )}
        </div>
    );
};