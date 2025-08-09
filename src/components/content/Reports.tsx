import { useState, useEffect } from 'react';
import contentService from '../../services/ContentService.ts';
import type { Report } from '../../api';

export const Reports = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            setIsLoading(true);
            const reportsData = await contentService.getAllReports();
            setReports(reportsData);
        } catch (error) {
            console.error('Ошибка загрузки отчётов:', error);
            setReports([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteReport = async (reportId: string) => {
        try {
            setIsDeleting(true);
            await contentService.deleteReport(reportId);
            setReports(prev => prev.filter(report => report.id !== reportId));
            setShowDeleteConfirm(null);

            // Закрыть модальное окно, если удаляем просматриваемый отчёт
            if (selectedReport?.id === reportId) {
                setSelectedReport(null);
            }
        } catch (error) {
            console.error('Ошибка удаления отчёта:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Загружаем отчёты...</span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Отчёты о проблемах ({reports.length})
            </h2>

            {reports.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">Отчётов пока нет</div>
                    <div className="text-gray-500">Отчёты о проблемах появятся здесь</div>
                </div>
            ) : (
                <div className="space-y-4">
                    {reports.map(report => (
                        <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm text-gray-500">ID отчёта:</span>
                                        <span className="font-mono text-sm">{report.id}</span>
                                    </div>

                                    <p className="text-gray-900 mb-3">{report.description}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        {report.taskId && (
                                            <span>
                                                <strong>Задача:</strong> {report.taskId}
                                            </span>
                                        )}
                                        {report.reporterId && (
                                            <span>
                                                <strong>Пользователь:</strong> {report.reporterId}
                                            </span>
                                        )}
                                        <span>
                                            <strong>Дата:</strong> {formatDate(report.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => setSelectedReport(report)}
                                        className="px-3 py-1 text-sm bg-blue-200 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                    >
                                        Подробнее
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteConfirm(report.id)}
                                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Модальное окно просмотра отчёта */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Детали отчёта</h3>
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID отчёта</label>
                                    <div className="font-mono text-sm bg-gray-50 p-2 rounded">{selectedReport.id}</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Описание проблемы</label>
                                    <div className="bg-gray-50 p-3 rounded">{selectedReport.description}</div>
                                </div>

                                {selectedReport.taskId && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ID задачи</label>
                                        <div className="font-mono text-sm bg-gray-50 p-2 rounded">{selectedReport.taskId}</div>
                                    </div>
                                )}

                                {selectedReport.reporterId && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ID пользователя</label>
                                        <div className="font-mono text-sm bg-gray-50 p-2 rounded">{selectedReport.reporterId}</div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Дата создания</label>
                                    <div className="bg-gray-50 p-2 rounded">{formatDate(selectedReport.createdAt)}</div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowDeleteConfirm(selectedReport.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    Удалить отчёт
                                </button>
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно подтверждения удаления */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-md w-full mx-4">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Подтвердите удаление</h3>
                            <p className="text-gray-600 mb-6">
                                Вы уверены, что хотите удалить этот отчёт? Это действие нельзя отменить.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleDeleteReport(showDeleteConfirm)}
                                    disabled={isDeleting}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isDeleting ? 'Удаление...' : 'Удалить'}
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(null)}
                                    disabled={isDeleting}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 transition-colors"
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};