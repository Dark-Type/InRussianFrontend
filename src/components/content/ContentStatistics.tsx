import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/content/UseContent.ts';
import type { ThemeTreeNode } from '../../context/content/ContentProvider';
import { axiosInstance } from '../../instances/axiosInstance';

interface SystemStats {
    coursesCount: number;
    themesCount: number;
    tasksCount: number;
}

export const Statistics: React.FC = () => {
    const {
        courses,
        themeTree,
        loadCourses,
        loadThemeTree,
        getContentStats,
        isLoadingCourses
    } = useContent();

    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const [expandedThemes, setExpandedThemes] = useState<string[]>([]);
    const [taskCounts, setTaskCounts] = useState<{ [id: string]: number }>({});
    const [systemStats, setSystemStats] = useState<SystemStats | null>(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            await loadCourses();
            await loadGeneralStats();
        } catch (error) {
            console.error('Ошибка загрузки начальных данных:', error);
        }
    };

    const loadGeneralStats = async () => {
        try {
            const stats = await getContentStats() as SystemStats;
            setSystemStats(stats);
        } catch (error) {
            console.error('Ошибка загрузки общей статистики:', error);
        }
    };

    const loadTaskCountForCourse = async (courseId: string) => {
        try {
            const response = await axiosInstance.get(`/content/stats/course/${courseId}/tasks-count`);
            // Sum all values in the returned map
            const taskCountMap = response.data as Record<string, number>;
            const totalTasks = Object.values(taskCountMap).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0);
            setTaskCounts(prev => ({ ...prev, [`course-${courseId}`]: totalTasks }));
        } catch (error) {
            console.error('Ошибка загрузки количества задач курса:', error);
        }
    };

    const loadTaskCountForTheme = async (themeId: string) => {
        try {
            const response = await axiosInstance.get(`/content/stats/theme/${themeId}/tasks-count`);
            // Sum all values in the returned map
            const taskCountMap = response.data as Record<string, number>;
            const totalTasks = Object.values(taskCountMap).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0);
            setTaskCounts(prev => ({ ...prev, [`theme-${themeId}`]: totalTasks }));
        } catch (error) {
            console.error('Ошибка загрузки количества задач темы:', error);
        }
    };

    const handleCourseClick = async (courseId: string) => {
        if (expandedCourse === courseId) {
            setExpandedCourse(null);
        } else {
            setExpandedCourse(courseId);
            await loadThemeTree(courseId, "course");
            await loadTaskCountForCourse(courseId);

            // Load task counts for all themes in the course
            const courseThemes = themeTree[courseId] || [];
            await loadTaskCountsForThemeTree(courseThemes);
        }
    };

    const loadTaskCountsForThemeTree = async (nodes: ThemeTreeNode[]) => {
        for (const node of nodes) {
            await loadTaskCountForTheme(node.theme.id);
            if (node.children && node.children.length > 0) {
                await loadTaskCountsForThemeTree(node.children);
            }
        }
    };

    const handleThemeClick = (themeId: string) => {
        setExpandedThemes(prev =>
            prev.includes(themeId)
                ? prev.filter(tid => tid !== themeId)
                : [...prev, themeId]
        );
    };

    const getTotalThemeCount = (courseId: string): number => {
        if (!themeTree[courseId]) return 0;
        
        const countThemes = (nodes: ThemeTreeNode[]): number => {
            let count = 0;
            for (const node of nodes) {
                count += 1; // Count this theme
                if (node.children && node.children.length > 0) {
                    count += countThemes(node.children); // Count children recursively
                }
            }
            return count;
        };
        
        return countThemes(themeTree[courseId]);
    };

    // Helper component to render theme tree recursively
    const renderThemeTree = (nodes: ThemeTreeNode[], level: number = 0) => {
        return nodes.map(node => (
            <div key={node.theme.id} className={`mb-4 last:mb-0 pl-${level * 4}`}>
                <div
                    className="cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors border-l-4 border-blue-300"
                    onClick={() => handleThemeClick(node.theme.id)}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="font-medium text-gray-800">{node.theme.name}</h5>
                            {node.theme.description && (
                                <p className="text-gray-600 text-sm">{node.theme.description}</p>
                            )}
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex space-x-2 text-sm">
                                {node.children && node.children.length > 0 && (
                                    <p className="text-sm font-medium text-gray-900">Подтемы: {node.children.length}</p>
                                )}
                                <p className="text-sm font-medium text-gray-900">Задачи: {taskCounts[`theme-${node.theme.id}`] ?? 0}</p>
                            </div>
                            {(node.children && node.children.length > 0) && (
                                <div className={`text-gray-400 transition-transform ${expandedThemes.includes(node.theme.id) ? 'rotate-90' : ''}`}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {expandedThemes.includes(node.theme.id) && node.children && node.children.length > 0 && (
                    <div className="ml-6 mt-3">
                        {renderThemeTree(node.children, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    if (isLoadingCourses) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Загрузка статистики...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-6 max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Статистика контента</h1>
                    <p className="text-gray-600">Обзор всего контента в системе</p>
                </div>

                {/* Основная статистика */}
                {systemStats && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Курсы</p>
                                    <p className="text-3xl font-bold text-gray-900">{systemStats.coursesCount}</p>
                                </div>
                                <div className="bg-gray-200 bg-opacity-30 p-3 rounded-lg flex">
                                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Темы</p>
                                    <p className="text-3xl font-bold text-gray-900">{systemStats.themesCount}</p>
                                </div>
                                <div className="bg-gray-200 bg-opacity-30 p-3 rounded-lg flex">
                                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L3 7.347V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.734.99A.996.996 0 0118 6v2a1 1 0 11-2 0v-.653l-1.254.521a1 1 0 11-.992-1.736L14.984 6l-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.653V12a1 1 0 11-2 0v-1.347l-1.246-.785a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.347l1.254.716a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.347V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Задачи</p>
                                    <p className="text-3xl font-bold text-gray-900">{systemStats.tasksCount}</p>
                                </div>
                                <div className="bg-gray-200 bg-opacity-30 p-3 rounded-lg flex">
                                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Детальная статистика по курсам */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Детальная статистика</h2>

                    <div className="space-y-4">
                        {courses.map(course => (
                            <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                <div
                                    className="bg-gray-50 p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => handleCourseClick(course.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-xl text-gray-900 mb-1">{course.name}</h3>
                                            {course.description && (
                                                <p className="text-gray-600">{course.description}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <div className="flex space-x-3 text-sm">
                                                <p className="text-1 font-m text-gray-900">Темы: {getTotalThemeCount(course.id)}</p>
                                                <p className="text-1 font-m text-gray-900">Задачи: {taskCounts[`course-${course.id}`] ?? 0}</p>
                                            </div>
                                            <div className={`text-gray-400 transition-transform ${expandedCourse === course.id ? 'rotate-90' : ''}`}>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {expandedCourse === course.id && (
                                    <div className="p-6 bg-white border-t border-gray-200">
                                        {themeTree[course.id] && themeTree[course.id].length > 0 ? (
                                            <div className="space-y-2">
                                                {renderThemeTree(themeTree[course.id])}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic">Темы не найдены</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};