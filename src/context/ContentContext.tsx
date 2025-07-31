import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { taskApiService } from '../services/TaskApiService';
import contentService from '../services/ContentService';
import type {
    CreateTaskAnswerOptionRequest,
    CreateTaskAnswerRequest,
    CreateTaskContentRequest,
    CreateTaskRequest,
    UpdateTaskRequest,
    UpdateCourseRequest,
    UpdateSectionRequest,
    UpdateThemeRequest
} from '../api';

export interface Course {
    id: string;
    name: string;
    description?: string;
    sectionsCount: number;
    themesCount: number;
    tasksCount: number;
}

export interface Section {
    id: string;
    courseId: string;
    name: string;
    description?: string;
    themesCount: number;
    tasksCount: number;
}

export interface Theme {
    id: string;
    sectionId: string;
    name: string;
    description?: string;
    tasksCount: number;
}

export type TaskType =
    | 'LISTEN_AND_CHOOSE'
    | 'READ_AND_CHOOSE'
    | 'LOOK_AND_CHOOSE'
    | 'MATCH_AUDIO_TEXT'
    | 'MATCH_TEXT_TEXT';

export type ContentType = 'AUDIO' | 'IMAGE' | 'TEXT' | 'VIDEO';

export type AnswerType =
    | 'ORDER_WORDS'
    | 'SELECT_WORDS'
    | 'SINGLE_CHOICE'
    | 'MULTI_CHOICE'
    | 'MATCH_PAIRS';

export interface TaskContent {
    id: string;
    contentType: ContentType;
    contentId?: string;
    description?: string;
    transcription?: string;
    translation?: string;
    orderNum: number;
    file?: File;
    url?: string;
    text?: string;
}

export interface AnswerOption {
    id: string;
    text: string;
    audioId?: string;
    audioFile?: File;
    isCorrect: boolean;
    orderNum: number;
}

export interface MatchPair {
    id: string;
    leftItem: {
        type: 'TEXT' | 'AUDIO';
        content: string;
        audioId?: string;
    };
    rightItem: {
        type: 'TEXT';
        content: string;
    };
}

export interface TaskAnswer {
    answerType: AnswerType;
    correctAnswer: any;
    options?: AnswerOption[];
    matchPairs?: MatchPair[];
}

export interface Task {
    id: string;
    themeId: string;
    name: string;
    taskType: TaskType;
    question: string;
    instructions?: string;
    isTraining: boolean;
    orderNum: number;
    contents: TaskContent[];
    answer: TaskAnswer;
}

interface ContentContextType {
    courses: Course[];
    sections: { [courseId: string]: Section[] };
    themes: { [sectionId: string]: Theme[] };
    tasks: { [themeId: string]: Task[] };

    loadCourses: () => Promise<void>;
    loadSections: (courseId: string) => Promise<void>;
    loadThemes: (sectionId: string) => Promise<void>;
    loadTasks: (themeId: string) => Promise<void>;

    createCourse: (name: string, description?: string, authorUrl?: string, language?: string, isPublished?: boolean) => Promise<void>;
    createSection: (courseId: string, name: string, description?: string, orderNum?: number) => Promise<void>;
    createTheme: (sectionId: string, name: string, description?: string, orderNum?: number) => Promise<void>;

    updateCourse: (id: string, name: string, description?: string) => Promise<void>;
    updateSection: (id: string, name: string, description?: string) => Promise<void>;
    updateTheme: (id: string, name: string, description?: string) => Promise<void>;

    deleteCourse: (id: string) => Promise<void>;
    deleteSection: (id: string) => Promise<void>;
    deleteTheme: (id: string) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;

    createTask: (themeId: string, taskData: Omit<Task, 'id' | 'themeId'>) => Promise<Task>;
    updateTask: (taskId: string, taskData: Partial<Omit<Task, 'id' | 'themeId'>>) => Promise<Task>;
    uploadMediaFile: (file: File) => Promise<string>;

    getContentStats: () => Promise<unknown>;
    getTasksCountByCourse: (courseId: string) => Promise<number>;
    getTasksCountBySection: (sectionId: string) => Promise<number>;
    getTasksCountByTheme: (themeId: string) => Promise<number>;

    isLoadingTasks: boolean;
    isUploadingMedia: boolean;
    isLoadingCourses: boolean;
    isLoadingSections: boolean;
    isLoadingThemes: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const transformApiTaskToTask = (apiTask: any): Task => {
    return {
        id: apiTask.id,
        themeId: apiTask.themeId,
        name: apiTask.name,
        taskType: apiTask.taskType as TaskType,
        question: apiTask.question,
        instructions: apiTask.instructions,
        isTraining: apiTask.isTraining,
        orderNum: apiTask.orderNum,
        contents: apiTask.contents || [],
        answer: apiTask.answer || { answerType: 'SINGLE_CHOICE', correctAnswer: {}, options: [] }
    };
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [sections, setSections] = useState<{ [courseId: string]: Section[] }>({});
    const [themes, setThemes] = useState<{ [sectionId: string]: Theme[] }>({});
    const [tasks, setTasks] = useState<{ [themeId: string]: Task[] }>({});

    const [isLoadingTasks, setIsLoadingTasks] = useState(false);
    const [isUploadingMedia, setIsUploadingMedia] = useState(false);
    const [isLoadingCourses, setIsLoadingCourses] = useState(false);
    const [isLoadingSections, setIsLoadingSections] = useState(false);
    const [isLoadingThemes, setIsLoadingThemes] = useState(false);

    const loadCourses = async () => {
        setIsLoadingCourses(true);
        try {
            const apiCourses = await contentService.getAllCourses();
            setCourses(apiCourses);
        } catch (error) {
            console.error('Ошибка загрузки курсов:', error);
            setCourses([]);
        } finally {
            setIsLoadingCourses(false);
        }
    };

    const loadSections = async (courseId: string) => {
        setIsLoadingSections(true);
        try {
            const apiSections = await contentService.getSectionsByCourse(courseId);
            setSections(prev => ({ ...prev, [courseId]: apiSections }));
        } catch (error) {
            console.error('Ошибка загрузки секций:', error);
            setSections(prev => ({ ...prev, [courseId]: [] }));
        } finally {
            setIsLoadingSections(false);
        }
    };

    const loadThemes = async (sectionId: string) => {
        setIsLoadingThemes(true);
        try {
            const apiThemes = await contentService.getThemesBySection(sectionId);
            setThemes(prev => ({ ...prev, [sectionId]: apiThemes }));
        } catch (error) {
            console.error('Ошибка загрузки тем:', error);
            setThemes(prev => ({ ...prev, [sectionId]: [] }));
        } finally {
            setIsLoadingThemes(false);
        }
    };

    const loadTasks = async (themeId: string) => {
        setIsLoadingTasks(true);
        try {
            const apiTasks = await taskApiService.getTasksByTheme(themeId);
            const transformedTasks: Task[] = apiTasks.map(transformApiTaskToTask);
            setTasks(prev => ({ ...prev, [themeId]: transformedTasks }));
        } catch (error) {
            console.error('Ошибка загрузки задач:', error);
            setTasks(prev => ({ ...prev, [themeId]: [] }));
        } finally {
            setIsLoadingTasks(false);
        }
    };

    const createCourse = async (name: string, description?: string, authorUrl?: string, language?: string, isPublished?: boolean) => {
        try {
            const defaultAuthorUrl = authorUrl || localStorage.getItem('userId') || '0070ecd4-fa1f-4007-bde7-a5399b789fe1';

            const newCourse = await contentService.createCourse(
                name,
                description || '',
                defaultAuthorUrl,
                language || 'RUSSIAN',
                isPublished || false
            );
            setCourses(prev => [...prev, newCourse]);
        } catch (error) {
            console.error('Ошибка создания курса:', error);
            throw error;
        }
    };

    const createSection = async (courseId: string, name: string, description?: string, orderNum?: number) => {
        try {
            const newSection = await contentService.createSection(
                courseId,
                name,
                description || '',
            );
            setSections(prev => ({
                ...prev,
                [courseId]: [...(prev[courseId] || []), newSection]
            }));
        } catch (error) {
            console.error('Ошибка создания секции:', error);
            throw error;
        }
    };

    const createTheme = async (sectionId: string, name: string, description?: string, orderNum?: number) => {
        try {
            const newTheme = await contentService.createTheme(
                sectionId,
                name,
                description || '',
            );
            setThemes(prev => ({
                ...prev,
                [sectionId]: [...(prev[sectionId] || []), newTheme]
            }));
        } catch (error) {
            console.error('Ошибка создания темы:', error);
            throw error;
        }
    };

    const updateCourse = async (id: string, name: string, description?: string) => {
        try {
            const courseData: UpdateCourseRequest = { name, description };
            const apiCourse = await contentService.updateCourse(id, courseData);

            // Преобразуем API курс в курс контекста
            const updatedCourse: Course = {
                id: apiCourse.id,
                name: apiCourse.name,
                description: apiCourse.description,
                sectionsCount: 0, // будет обновлено при необходимости
                themesCount: 0,
                tasksCount: await contentService.getTasksCountByCourse(id)
            };

            setCourses(prev => prev.map(course =>
                course.id === id ? updatedCourse : course
            ));
        } catch (error) {
            console.error('Ошибка обновления курса:', error);
            throw error;
        }
    };

    const updateSection = async (id: string, name: string, description?: string) => {
        try {
            const sectionData: UpdateSectionRequest = { name, description };
            const apiSection = await contentService.updateSection(id, sectionData);

            // Преобразуем API секцию в секцию контекста
            const updatedSection: Section = {
                id: apiSection.id,
                courseId: apiSection.courseId,
                name: apiSection.name,
                description: apiSection.description,
                themesCount: 0,
                tasksCount: await contentService.getTasksCountBySection(id)
            };

            setSections(prev => {
                const newSections = { ...prev };
                Object.keys(newSections).forEach(courseId => {
                    newSections[courseId] = newSections[courseId].map(section =>
                        section.id === id ? updatedSection : section
                    );
                });
                return newSections;
            });
        } catch (error) {
            console.error('Ошибка обновления секции:', error);
            throw error;
        }
    };

    const updateTheme = async (id: string, name: string, description?: string) => {
        try {
            const themeData: UpdateThemeRequest = { name, description };
            const apiTheme = await contentService.updateTheme(id, themeData);

            // Преобразуем API тему в тему контекста
            const updatedTheme: Theme = {
                id: apiTheme.id,
                sectionId: apiTheme.sectionId,
                name: apiTheme.name,
                description: apiTheme.description,
                tasksCount: await contentService.getTasksCountByTheme(id)
            };

            setThemes(prev => {
                const newThemes = { ...prev };
                Object.keys(newThemes).forEach(sectionId => {
                    newThemes[sectionId] = newThemes[sectionId].map(theme =>
                        theme.id === id ? updatedTheme : theme
                    );
                });
                return newThemes;
            });
        } catch (error) {
            console.error('Ошибка обновления темы:', error);
            throw error;
        }
    };

    const deleteCourse = async (id: string) => {
        try {
            await contentService.deleteCourse(id);
            setCourses(prev => prev.filter(course => course.id !== id));
            setSections(prev => {
                const newSections = { ...prev };
                delete newSections[id];
                return newSections;
            });
        } catch (error) {
            console.error('Ошибка удаления курса:', error);
            throw error;
        }
    };

    const deleteSection = async (id: string) => {
        try {
            await contentService.deleteSection(id);
            setSections(prev => {
                const newSections = { ...prev };
                Object.keys(newSections).forEach(courseId => {
                    newSections[courseId] = newSections[courseId].filter(section => section.id !== id);
                });
                return newSections;
            });
        } catch (error) {
            console.error('Ошибка удаления секции:', error);
            throw error;
        }
    };

    const deleteTheme = async (id: string) => {
        try {
            await contentService.deleteTheme(id);
            setThemes(prev => {
                const newThemes = { ...prev };
                Object.keys(newThemes).forEach(sectionId => {
                    newThemes[sectionId] = newThemes[sectionId].filter(theme => theme.id !== id);
                });
                return newThemes;
            });
        } catch (error) {
            console.error('Ошибка удаления темы:', error);
            throw error;
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await taskApiService.deleteTask(id);
            setTasks(prev => {
                const newTasks = { ...prev };
                Object.keys(newTasks).forEach(themeId => {
                    newTasks[themeId] = newTasks[themeId].filter(task => task.id !== id);
                });
                return newTasks;
            });
        } catch (error) {
            console.error('Ошибка удаления задачи:', error);
            throw error;
        }
    };

    const createTask = async (themeId: string, taskData: Omit<Task, 'id' | 'themeId'>): Promise<Task> => {
        try {
            const fullTaskData = { ...taskData, themeId };
            const apiTask = await taskApiService.createFullTask(fullTaskData);
            const finalTask = transformApiTaskToTask(apiTask);

            setTasks(prev => ({
                ...prev,
                [themeId]: [...(prev[themeId] || []), finalTask]
            }));

            return finalTask;
        } catch (error) {
            console.error('Ошибка создания задачи:', error);
            throw error;
        }
    };


    const updateTask = async (taskId: string, taskData: Partial<Omit<Task, 'id' | 'themeId'>>): Promise<Task> => {
        try {
            const updateRequest: UpdateTaskRequest = {};
            if (taskData.name) updateRequest.name = taskData.name;
            if (taskData.question) updateRequest.question = taskData.question;
            if (taskData.instructions !== undefined) updateRequest.instructions = taskData.instructions;
            if (taskData.isTraining !== undefined) updateRequest.isTraining = taskData.isTraining;
            if (taskData.orderNum !== undefined) updateRequest.orderNum = taskData.orderNum;

            const apiTask = await taskApiService.updateTask(taskId, updateRequest);
            const updatedTask = transformApiTaskToTask(apiTask);

            setTasks(prev => {
                const newTasks = { ...prev };
                Object.keys(newTasks).forEach(themeId => {
                    newTasks[themeId] = newTasks[themeId].map(task =>
                        task.id === taskId ? updatedTask : task
                    );
                });
                return newTasks;
            });

            return updatedTask;
        } catch (error) {
            console.error('Ошибка обновления задачи:', error);
            throw error;
        }
    };

    const uploadMediaFile = async (file: File): Promise<string> => {
        setIsUploadingMedia(true);
        try {
            const mediaId = await taskApiService.uploadMediaFile(file);
            return mediaId;
        } catch (error) {
            console.error('Ошибка загрузки медиафайла:', error);
            throw error;
        } finally {
            setIsUploadingMedia(false);
        }
    };

    const getContentStats = async (): Promise<unknown> => {
        try {
            return await contentService.getContentStats();
        } catch (error) {
            console.error('Ошибка получения статистики:', error);
            throw error;
        }
    };

    const getTasksCountByCourse = async (courseId: string): Promise<number> => {
        try {
            return await contentService.getTasksCountByCourse(courseId);
        } catch (error) {
            console.error('Ошибка получения количества задач курса:', error);
            return 0;
        }
    };

    const getTasksCountBySection = async (sectionId: string): Promise<number> => {
        try {
            return await contentService.getTasksCountBySection(sectionId);
        } catch (error) {
            console.error('Ошибка получения количества задач секции:', error);
            return 0;
        }
    };

    const getTasksCountByTheme = async (themeId: string): Promise<number> => {
        try {
            return await contentService.getTasksCountByTheme(themeId);
        } catch (error) {
            console.error('Ошибка получения количества задач темы:', error);
            return 0;
        }
    };

    return (
        <ContentContext.Provider value={{
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
            deleteTask,
            createTask,
            updateTask,
            uploadMediaFile,
            getContentStats,
            getTasksCountByCourse,
            getTasksCountBySection,
            getTasksCountByTheme,
            isLoadingTasks,
            isUploadingMedia,
            isLoadingCourses,
            isLoadingSections,
            isLoadingThemes
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};