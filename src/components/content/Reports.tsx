import { useState, useEffect } from 'react';
import contentService from '../../services/ContentService.ts';
import type { Report } from '../../api';
import { ProfileApiFactory, ContentApiFactory, AdminApiFactory } from '../../api'; // генерированный API (api.ts)

export const Reports = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // дополнительные стейты для деталей
    const [reporterProfile, setReporterProfile] = useState<any | null>(null);
    const [taskDetails, setTaskDetails] = useState<any | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    // const profileApi = ProfileApiFactory(); // из api.ts
    const adminApi = AdminApiFactory();
    const contentApi = ContentApiFactory(); // из api.ts

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
            if (selectedReport?.id === reportId) {
                setSelectedReport(null);
            }
        } catch (error) {
            console.error('Ошибка удаления отчёта:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const openDetails = async (report: Report) => {
    setSelectedReport(report);
    setReporterProfile(null);
    setTaskDetails(null);
    setDetailsLoading(true);

    try {
        const promises = [];
        
        if (report.reporterId) {
            promises.push(
                adminApi.adminUsersUserIdGet(report.reporterId)
                    .then(response => {
                        if (response.data) {
                            return response.data || response.data;
                        }
                        return response;
                    })
                    .catch(err => {
                        console.error('Ошибка загрузки профиля:', err);
                        return null;
                    })
            );
        } else {
            promises.push(Promise.resolve(null));
        }

        if (report.taskId) {
            promises.push(
                contentApi.contentTasksTaskIdGet(report.taskId)
                    .then(response => {
                        if (response.data) {
                            return response.data;
                        }
                        return response;
                    })
                    .catch(err => {
                        console.error('Ошибка загрузки задачи:', err);
                        return null;
                    })
            );
        } else {
            promises.push(Promise.resolve(null));
        }

        const [profileData, taskData] = await Promise.all(promises);
        
        setReporterProfile(profileData);
        setTaskDetails(taskData);
    } catch (err) {
        console.error('Общая ошибка при загрузке деталей:', err);
    } finally {
        setDetailsLoading(false);
    }
};

    const closeDetails = () => {
        setSelectedReport(null);
        setReporterProfile(null);
        setTaskDetails(null);
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
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    {/* Только тема (description), id и дата; тема обрезается многоточием */}
                                    <div className="text-gray-900 font-medium mb-1 truncate max-w-full" title={report.description}>
                                        {report.description || 'Без темы'}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="font-mono text-xs text-gray-500">ID: {report.id}</div>
                                        <div>{formatDate(report.createdAt)}</div>
                                    </div>
                                </div>

                                <div className="flex gap-2 ml-4">
                                    {/* Кнопка подробнее — теперь с фоном */}
                                    <button
                                        onClick={() => openDetails(report)}
                                        aria-label={`Подробнее по отчёту ${report.id}`}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Подробнее
                                    </button>

                                    {/* Кнопка удалить — ярко-красная */}
                                    <button
                                        onClick={() => setShowDeleteConfirm(report.id)}
                                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                        aria-label={`Удалить отчёт ${report.id}`}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Модальное окно просмотра отчёта (детали + профиль + задача) */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Детали отчёта</h3>
                                <button
                                    onClick={closeDetails}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Тема / описание</label>
                                    <div className="bg-gray-50 p-3 rounded max-h-48 overflow-auto whitespace-pre-wrap">{selectedReport.description}</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Дата создания</label>
                                    <div className="bg-gray-50 p-2 rounded">{formatDate(selectedReport.createdAt)}</div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Пользователь</h4>
                                    {detailsLoading ? (
                                        <div className="text-sm text-gray-500">Загрузка профиля...</div>
                                    ) : reporterProfile ? (
                                        <div className="text-sm text-gray-700">
                                            <div><strong>Почта:</strong> {reporterProfile.email}</div>
                                            <div className="text-xs text-gray-500">ID: {reporterProfile.id}</div>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-500">Профиль не найден</div>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Задача</h4>
                                    {detailsLoading ? (
                                        <div className="text-sm text-gray-500">Загрузка задачи...</div>
                                    ) : taskDetails ? (
                                        <div className="text-sm text-gray-700">
                                            <div><strong>Название:</strong> {taskDetails.name}</div>
                                            <div className="text-xs text-gray-500">taskId: {taskDetails.id}</div>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-500">Задача не найдена</div>
                                    )}
                                </div>
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
                                Вы уверены, что хотите удалить этот отчёт?
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
