import { useState, useEffect, useCallback, useRef } from 'react';
import expertService from '../../services/ExpertService';
import { useProfile } from '../../context/profile/UseProfile';
import type { User, UserProfile } from '../../api';

interface UserLanguageSkill {
    language: string;
    understands: boolean;
    speaks: boolean;
    reads: boolean;
    writes: boolean;
}

interface StudentWithProfile extends User {
    profile?: UserProfile;
    languageSkills?: UserLanguageSkill[];
    avatarUrl?: string;
}

export const StudentsSection = () => {
    const [students, setStudents] = useState<StudentWithProfile[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [totalLoaded, setTotalLoaded] = useState(0);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const { getAvatarIdByUserId } = useProfile();

    const loadStudents = useCallback(async (pageNum: number, reset = false) => {
        if (loading || (!hasMore && !reset)) return;

        setLoading(true);
        try {
            const studentsWithProfiles = await expertService.getStudentsWithProfiles(pageNum, 20);

            if (reset) {
                students.forEach(student => {
                    if (student.avatarUrl && student.avatarUrl.startsWith('blob:')) {
                        URL.revokeObjectURL(student.avatarUrl);
                    }
                });
                setStudents(studentsWithProfiles);
                setTotalLoaded(studentsWithProfiles.length);
            } else {
                setStudents(prev => [...prev, ...studentsWithProfiles]);
                setTotalLoaded(prev => prev + studentsWithProfiles.length);
            }

            setHasMore(studentsWithProfiles.length === 20 && totalLoaded + studentsWithProfiles.length < 1000);
        } catch (error) {
            console.error('Ошибка загрузки студентов:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, totalLoaded, students]);

    const searchStudents = useCallback(async (search: string) => {
        if (!search.trim()) {
            setPage(0);
            setTotalLoaded(0);
            setHasMore(true);
            loadStudents(0, true);
            return;
        }

        setSearchLoading(true);
        try {
            const studentsWithProfiles = await expertService.getStudentsWithProfiles(0, 200);

            const filtered = studentsWithProfiles.filter(student =>
                student.email?.toLowerCase().includes(search.toLowerCase()) ||
                student.profile?.name?.toLowerCase().includes(search.toLowerCase()) ||
                student.profile?.surname?.toLowerCase().includes(search.toLowerCase())
            );

            students.forEach(student => {
                if (student.avatarUrl && student.avatarUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(student.avatarUrl);
                }
            });

            setStudents(filtered);
            setHasMore(false);
        } catch (error) {
            console.error('Ошибка поиска студентов:', error);
        } finally {
            setSearchLoading(false);
        }
    }, [loadStudents, students]);

    const exportToExcel = useCallback(() => {
        try {
            // Подготовка данных для экспорта
            const exportData = students.map(student => ({
                'Email': student.email || '',
                'Имя': student.profile?.name || '',
                'Фамилия': student.profile?.surname || '',
                'Отчество': student.profile?.patronymic || '',
                'Статус': student.status || '',
                'Дата рождения': student.profile?.dateOfBirth || '',
                'Пол': student.profile?.gender || '',
                'Гражданство': student.profile?.citizenship || '',
                'Национальность': student.profile?.nationality || '',
                'Страна проживания': student.profile?.countryOfResidence || '',
                'Город проживания': student.profile?.cityOfResidence || '',
                'Образование': student.profile?.education || '',
                'Цель регистрации': student.profile?.purposeOfRegister || '',
                'Дата регистрации': new Date(student.createdAt).toLocaleDateString('ru-RU'),
                'Языковые навыки': student.languageSkills?.map(skill =>
                    `${skill.language} (${[
                        skill.understands ? 'понимает' : '',
                        skill.speaks ? 'говорит' : '',
                        skill.reads ? 'читает' : '',
                        skill.writes ? 'пишет' : ''
                    ].filter(Boolean).join(', ')})`
                ).join('; ') || ''
            }));

            // Создание CSV контента
            const headers = Object.keys(exportData[0] || {});
            const csvContent = [
                headers.join(','),
                ...exportData.map(row =>
                    headers.map(header => `"${(row as any)[header]}"`).join(',')
                )
            ].join('\n');

            // Создание и скачивание файла
            const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Ошибка экспорта:', error);
        }
    }, [students]);

    useEffect(() => {
        loadStudents(0, true);
    }, []);

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchTerm) {
                searchStudents(searchTerm);
            } else {
                setPage(0);
                setTotalLoaded(0);
                setHasMore(true);
                loadStudents(0, true);
            }
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [searchTerm]);

    useEffect(() => {
        if (!searchTerm && page > 0) {
            loadStudents(page);
        }
    }, [page, searchTerm]);

    useEffect(() => {
        return () => {
            students.forEach(student => {
                if (student.avatarUrl && student.avatarUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(student.avatarUrl);
                }
            });
        };
    }, []);

    const lastStudentCallback = useCallback((node: HTMLDivElement) => {
        if (loading || searchTerm || !hasMore) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observerRef.current.observe(node);
    }, [loading, hasMore, searchTerm]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ru-RU');
    };

    const renderStudentCard = (student: StudentWithProfile, index: number) => {
        const isLast = index === students.length - 1 && hasMore && !searchTerm;

        return (
            <div
                key={student.id}
                ref={isLast ? lastStudentCallback : undefined}
                style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '12px'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>
                            {student.profile?.surname || student.profile?.name ?
                                `${student.profile.surname || ''} ${student.profile.name || ''} ${student.profile.patronymic || ''}`.trim() :
                                student.email
                            }
                        </h4>
                        <p style={{ margin: '4px 0', color: 'var(--color-text-secondary)' }}>
                            Email: {student.email}
                        </p>
                        <p style={{ margin: '4px 0', color: 'var(--color-text-secondary)' }}>
                            Статус: {student.status}
                        </p>
                        <p style={{ margin: '4px 0', color: 'var(--color-text-secondary)' }}>
                            Дата регистрации: {formatDate(student.createdAt)}
                        </p>
                        {student.profile && (
                            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                                <span style={{ fontSize: '0.9rem' }}>
                                    Пол: {student.profile.gender || 'Не указан'}
                                </span>
                                <span style={{ fontSize: '0.9rem' }}>
                                    Образование: {student.profile.education || 'Не указано'}
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setSelectedStudentId(selectedStudentId === student.id ? null : student.id)}
                        style={{
                            padding: '8px 16px',
                            background: 'var(--color-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {selectedStudentId === student.id ? 'Скрыть' : 'Подробнее'}
                    </button>
                </div>

                {selectedStudentId === student.id && (
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
                                <p>Дата рождения: {student.profile?.dateOfBirth || 'Не указана'}</p>
                                <p>Гражданство: {student.profile?.citizenship || 'Не указано'}</p>
                                <p>Национальность: {student.profile?.nationality || 'Не указано'}</p>
                                <p>Страна проживания: {student.profile?.countryOfResidence || 'Не указано'}</p>
                                <p>Город проживания: {student.profile?.cityOfResidence || 'Не указано'}</p>
                                <p>Образование: {student.profile?.education || 'Не указано'}</p>
                                <p>Цель регистрации: {student.profile?.purposeOfRegister || 'Не указана'}</p>
                            </div>
                            <div>
                                <strong>Языковые навыки:</strong>
                                {student.languageSkills && student.languageSkills.length > 0 ? (
                                    <div style={{ marginTop: '8px' }}>
                                        {student.languageSkills.map((skill, index) => (
                                            <div key={index} style={{
                                                marginBottom: '12px',
                                                padding: '8px',
                                                background: 'var(--color-card)',
                                                borderRadius: '4px',
                                                border: '1px solid var(--color-border)'
                                            }}>
                                                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                                    {skill.language}
                                                </div>
                                                <div style={{ fontSize: '0.9rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                                    <span>Понимает: {skill.understands ? '✓' : '✗'}</span>
                                                    <span>Говорит: {skill.speaks ? '✓' : '✗'}</span>
                                                    <span>Читает: {skill.reads ? '✓' : '✗'}</span>
                                                    <span>Пишет: {skill.writes ? '✓' : '✗'}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ marginTop: '8px', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                                        Языковые навыки не указаны
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    if (students.length === 0 && !loading && !searchLoading) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px',
                color: 'var(--color-text-secondary)'
            }}>
                {searchTerm ? 'Студенты не найдены' : 'Нет студентов'}
            </div>
        );
    }

    return (
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
                <button
                    onClick={exportToExcel}
                    disabled={students.length === 0}
                    style={{
                        padding: '12px 16px',
                        background: students.length > 0 ? 'var(--color-success)' : 'var(--color-border)',
                        color: students.length > 0 ? 'white' : 'var(--color-text-secondary)',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: students.length > 0 ? 'pointer' : 'not-allowed',
                        fontSize: '1rem',
                        fontWeight: '500'
                    }}
                >
                    📊 Экспорт в Excel
                </button>
            </div>

            <div>
                {students.map((student, index) => renderStudentCard(student, index))}
            </div>

            {(loading || searchLoading) && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid var(--color-border)',
                        borderTop: '2px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                </div>
            )}

            {!hasMore && !searchTerm && students.length > 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem'
                }}>
                    Загружено {students.length} студентов
                </div>
            )}
        </div>
    );
};