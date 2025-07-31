import { useState, useEffect } from 'react';

interface Report {
    id: string;
    description: string;
    taskId: string;
    reporterId: string;
    createdAt: string;
}


export const Reports = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            setIsLoading(true);
            // Здесь должен быть вызов API для получения отчётов
            // const response = await reportsApi.getReports();
            // setReports(response.data || []);

            // Временные данные для демонстрации
            setReports([
                {
                    id: '1',
                    description: 'Обнаружена ошибка в тексте задачи',
                    taskId: 'task-1',
                    reporterId: 'user-1',
                    createdAt: '2024-01-15T10:30:00Z'
                },
                {
                    id: '2',
                    description: 'Неправильный ответ в задаче на грамматику',
                    taskId: 'task-2',
                    reporterId: 'user-2',
                    createdAt: '2024-01-14T15:45:00Z'
                }
            ]);
        } catch (error) {
            console.error('Ошибка загрузки отчётов:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteReport = async (reportId: string) => {
        try {
            // await reportsApi.deleteReport(reportId);
            setReports(prev => prev.filter(report => report.id !== reportId));
            setShowDeleteConfirm(null);
        } catch (error) {
            console.error('Ошибка удаления отчёта:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ru-RU');
    };

    if (isLoading) {
        return <div>Загружаем отчёты...</div>;
    }

    return (
        <div>
            <h2 style={{ margin: '0 0 24px 0', fontWeight: 700, fontSize: '1.5rem' }}>
                Отчёты ({reports.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reports.map(report => (
                    <div key={report.id} style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        background: 'var(--color-card)',
                        padding: '16px 20px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: '0 0 8px 0', fontSize: '1rem', lineHeight: '1.5' }}>
                                    {report.description}
                                </p>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-secondary)',
                                    display: 'flex',
                                    gap: '16px'
                                }}>
                                    <span>ID задачи: {report.taskId}</span>
                                    <span>Отправлено: {formatDate(report.createdAt)}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                                <button
                                    onClick={() => setSelectedReport(report)}
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
                                    Просмотреть
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(report.id)}
                                    style={{
                                        padding: '6px 12px',
                                        background: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Модальное окно просмотра отчёта */}
            {selectedReport && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--color-card)',
                        padding: '24px',
                        borderRadius: '8px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                        <h3 style={{ margin: '0 0 16px 0' }}>Детали отчёта</h3>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Описание:</strong>
                            <p style={{ margin: '8px 0', lineHeight: '1.5' }}>{selectedReport.description}</p>
                        </div>
                        <div style={{ marginBottom: '16px', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                            <div><strong>ID задачи:</strong> {selectedReport.taskId}</div>
                            <div><strong>ID отправителя:</strong> {selectedReport.reporterId}</div>
                            <div><strong>Дата создания:</strong> {formatDate(selectedReport.createdAt)}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button
                                onClick={() => setSelectedReport(null)}
                                style={{
                                    padding: '8px 16px',
                                    background: 'var(--color-border)',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно подтверждения удаления */}
            {showDeleteConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--color-card)',
                        padding: '24px',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        width: '90%'
                    }}>
                        <h3 style={{ margin: '0 0 16px 0' }}>Подтвердите удаление</h3>
                        <p style={{ margin: '0 0 20px 0' }}>
                            Вы уверены, что хотите удалить этот отчёт? Это действие нельзя отменить.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                style={{
                                    padding: '8px 16px',
                                    background: 'var(--color-border)',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Отмена
                            </button>
                            <button
                                onClick={() => handleDeleteReport(showDeleteConfirm)}
                                style={{
                                    padding: '8px 16px',
                                    background: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};