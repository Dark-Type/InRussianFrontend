import {ContentApi, ContentManagerApi, type MediaFileMeta} from '../api';
import {axiosInstance} from '../instances/axiosInstance.ts';

import {
    CreateTaskContentRequestContentTypeEnum,
    type Course as ApiCourse,
    type CreateCourseRequest,
    type UpdateCourseRequest,
    type CreateSectionRequest,
    type UpdateSectionRequest,
    type CreateThemeRequest,
    type UpdateThemeRequest,
    type Section as ApiSection,
    type Theme as ApiTheme,
    type CreateReportRequest,
    type Report,
    CreateTaskAnswerRequestAnswerTypeEnum} from '../api';
import type {AxiosResponse} from 'axios';
import {mediaService} from "./MediaService";
import type {Course, Section, Theme} from '../context/content/ContentProvider';

class ContentService {
    private contentApi: ContentApi;
    private managerApi: ContentManagerApi;

    get contentApiInstance() {
        return this.contentApi;
    }

    constructor() {
        this.contentApi = new ContentApi(undefined, undefined, axiosInstance);
        this.managerApi = new ContentManagerApi(undefined, undefined, axiosInstance);
    }

    private mapFileTypeToContentType(fileType: string): CreateTaskContentRequestContentTypeEnum {
        switch (fileType.toUpperCase()) {
            case 'AUDIO':
                return CreateTaskContentRequestContentTypeEnum.Audio;
            case 'VIDEO':
                return CreateTaskContentRequestContentTypeEnum.Video;
            case 'IMAGE':
                return CreateTaskContentRequestContentTypeEnum.Image;
            default:
                return CreateTaskContentRequestContentTypeEnum.Text;
        }
    }

    private mapAnswerTypeToBackend(answerType: string): CreateTaskAnswerRequestAnswerTypeEnum {
        switch (answerType) {
            case 'SINGLE_CHOICE':
                return CreateTaskAnswerRequestAnswerTypeEnum.SingleChoiceShort;
            case 'MULTI_CHOICE':
                return CreateTaskAnswerRequestAnswerTypeEnum.MultipleChoiceShort;
            case 'ORDER_WORDS':
                return CreateTaskAnswerRequestAnswerTypeEnum.WordOrder;
            case 'SELECT_WORDS':
                return CreateTaskAnswerRequestAnswerTypeEnum.WordSelection;
            default:
                return CreateTaskAnswerRequestAnswerTypeEnum.TextInput;
        }
    }

    async uploadMediaFile(file: File): Promise<MediaFileMeta> {
        const userId = localStorage.getItem('userId') || undefined;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('mimeType', file.type);
        formData.append('fileSize', file.size.toString());

        let fileType = 'CONTENT';
        if (file.type.startsWith('image/')) {
            fileType = 'IMAGE';
        } else if (file.type.startsWith('audio/')) {
            fileType = 'AUDIO';
        } else if (file.type.startsWith('video/')) {
            fileType = 'VIDEO';
        }
        formData.append('fileType', fileType);

        return await mediaService.uploadMediaWithMeta(formData, userId);
    }

    // ============ COURSES ============
    async getAllCourses(): Promise<Course[]> {
        const response: AxiosResponse<ApiCourse[]> = await this.contentApi.contentCoursesGet();
        const apiCourses = response.data;

        const courses: Course[] = await Promise.all(
            apiCourses.map(async (apiCourse) => ({
                id: apiCourse.id,
                name: apiCourse.name,
                description: apiCourse.description,
                sectionsCount: await this.getSectionsCountByCourse(apiCourse.id),
                themesCount: await this.getThemesCountByCourse(apiCourse.id),
                tasksCount: await this.getTasksCountByCourse(apiCourse.id)
            }))
        );

        return courses;
    }

    async getCourseById(courseId: string): Promise<Course> {
        const response: AxiosResponse<ApiCourse> = await this.contentApi.contentCoursesCourseIdGet(courseId);
        const apiCourse = response.data;

        return {
            id: apiCourse.id,
            name: apiCourse.name,
            description: apiCourse.description,
            sectionsCount: await this.getSectionsCountByCourse(courseId),
            themesCount: await this.getThemesCountByCourse(courseId),
            tasksCount: await this.getTasksCountByCourse(courseId)
        };
    }

    async getTasksByTheme(themeId: string): Promise<unknown[]> {
        try {
            const response = await this.contentApi.contentThemesThemeIdTasksGet(themeId);
            return response.data || [];
        } catch (error) {
            console.error(`Ошибка загрузки задач темы ${themeId}:`, error);
            return [];
        }
    }

    async createCourse(name: string, description: string = '', authorUrl: string, language: string = 'RUSSIAN', isPublished: boolean = false): Promise<Course> {
        const courseData: CreateCourseRequest = {
            name,
            description,
            authorUrl,
            language,
            isPublished,
        };
        const response: AxiosResponse<ApiCourse> = await this.managerApi.contentCoursesPost(courseData);
        const apiCourse = response.data;

        return {
            id: apiCourse.id,
            name: apiCourse.name,
            description: apiCourse.description,
            sectionsCount: 0,
            themesCount: 0,
            tasksCount: 0
        };
    }

    async updateCourse(courseId: string, courseData: UpdateCourseRequest): Promise<ApiCourse> {
        const response: AxiosResponse<ApiCourse> = await this.managerApi.contentCoursesCourseIdPut(courseId, courseData);
        return response.data;
    }

    async deleteCourse(courseId: string): Promise<void> {
        await this.managerApi.contentCoursesCourseIdDelete(courseId);
    }

    // ============ SECTIONS ============
    async getSectionsByCourse(courseId: string): Promise<Section[]> {
        const response: AxiosResponse<ApiSection[]> = await this.contentApi.contentSectionsByCourseCourseIdGet(courseId);
        const apiSections = response.data;

        const sections: Section[] = await Promise.all(
            apiSections.map(async (apiSection) => ({
                id: apiSection.id,
                courseId: apiSection.courseId,
                name: apiSection.name,
                description: apiSection.description,
                themesCount: await this.getThemesCountBySection(apiSection.id),
                tasksCount: await this.getTasksCountBySection(apiSection.id)
            }))
        );

        return sections;
    }

    async getSectionById(sectionId: string): Promise<ApiSection> {
        const response: AxiosResponse<ApiSection> = await this.contentApi.contentSectionsSectionIdGet(sectionId);
        return response.data;
    }

    async createSection(courseId: string, name: string, description: string = ''): Promise<Section> {
        const sections = await this.getSectionsByCourse(courseId);
        const orderNum = sections.length + 1;

        const sectionData: CreateSectionRequest = {
            name,
            description,
            courseId,
            orderNum
        };
        const response: AxiosResponse<ApiSection> = await this.managerApi.contentSectionsPost(sectionData);
        const apiSection = response.data;

        return {
            id: apiSection.id,
            courseId: apiSection.courseId,
            name: apiSection.name,
            description: apiSection.description,
            themesCount: 0,
            tasksCount: 0
        };
    }

    async updateSection(sectionId: string, sectionData: UpdateSectionRequest): Promise<ApiSection> {
        const response: AxiosResponse<ApiSection> = await this.managerApi.contentSectionsSectionIdPut(sectionId, sectionData);
        return response.data;
    }

    async deleteSection(sectionId: string): Promise<void> {
        await this.managerApi.contentSectionsSectionIdDelete(sectionId);
    }

    // ============ THEMES ============
    async getThemesBySection(sectionId: string): Promise<Theme[]> {
        const response: AxiosResponse<ApiTheme[]> = await this.contentApi.contentThemesBySectionSectionIdGet(sectionId);
        const apiThemes = response.data;

        const themes: Theme[] = await Promise.all(
            apiThemes.map(async (apiTheme) => ({
                id: apiTheme.id,
                sectionId: apiTheme.sectionId,
                name: apiTheme.name,
                description: apiTheme.description,
                tasksCount: await this.getTasksCountByTheme(apiTheme.id)
            }))
        );

        return themes;
    }

    async getThemeById(themeId: string): Promise<ApiTheme> {
        const response: AxiosResponse<ApiTheme> = await this.contentApi.contentThemesThemeIdGet(themeId);
        return response.data;
    }

    async createTheme(sectionId: string, name: string, description: string = ''): Promise<Theme> {
        const themes = await this.getThemesBySection(sectionId);
        const orderNum = themes.length + 1;

        const themeData: CreateThemeRequest = {
            name,
            description,
            sectionId,
            orderNum
        };
        const response: AxiosResponse<ApiTheme> = await this.managerApi.contentThemesPost(themeData);
        const apiTheme = response.data;

        return {
            id: apiTheme.id,
            sectionId: apiTheme.sectionId,
            name: apiTheme.name,
            description: apiTheme.description,
            tasksCount: 0
        };
    }

    async updateTheme(themeId: string, themeData: UpdateThemeRequest): Promise<ApiTheme> {
        const response: AxiosResponse<ApiTheme> = await this.managerApi.contentThemesThemeIdPut(themeId, themeData);
        return response.data;
    }

    async deleteTheme(themeId: string): Promise<void> {
        await this.managerApi.contentThemesThemeIdDelete(themeId);
    }

    // ============ REPORTS ============
    async getAllReports(): Promise<Report[]> {
        const response: AxiosResponse<Report[]> = await this.contentApi.contentReportsGet();
        return response.data;
    }

    async getReportById(reportId: string): Promise<Report> {
        const response: AxiosResponse<Report> = await this.contentApi.contentReportsReportIdGet(reportId);
        return response.data;
    }

    async createReport(reportData: CreateReportRequest): Promise<Report> {
        const response: AxiosResponse<Report> = await this.contentApi.contentReportsPost(reportData);
        return response.data;
    }

    async deleteReport(reportId: string): Promise<void> {
        await this.managerApi.contentReportsReportIdDelete(reportId);
    }

    // ============ STATS ============
    async getContentStats(): Promise<unknown> {
        const response: AxiosResponse<unknown> = await this.contentApi.contentStatsGet();
        return response.data;
    }

    async getTasksCountByCourse(courseId: string): Promise<number> {
        try {
            const response: AxiosResponse<{
                count: number
            }> = await this.contentApi.contentStatsCourseCourseIdTasksCountGet(courseId);
            return response.data.count || 0;
        } catch (error) {
            console.error(`Ошибка получения количества задач курса ${courseId}:`, error);
            return 0;
        }
    }

    async getTasksCountBySection(sectionId: string): Promise<number> {
        try {
            const response: AxiosResponse<{
                count: number
            }> = await this.contentApi.contentStatsSectionSectionIdTasksCountGet(sectionId);
            return response.data.count || 0;
        } catch (error) {
            console.error(`Ошибка получения количества задач секции ${sectionId}:`, error);
            return 0;
        }
    }

    async getTasksCountByTheme(themeId: string): Promise<number> {
        try {
            const response: AxiosResponse<{
                count: number
            }> = await this.contentApi.contentStatsThemeThemeIdTasksCountGet(themeId);
            return response.data.count || 0;
        } catch (error) {
            try {
                const tasks = await this.getTasksByTheme(themeId);
                console.log(`Manual count for theme ${themeId}:`, tasks.length);
                return tasks.length;
            } catch {
                console.error(`Ошибка получения количества задач темы ${themeId}:`, error);
                return 0;
            }
        }
    }

    private async getSectionsCountByCourse(courseId: string): Promise<number> {
        const sections = await this.getSectionsByCourse(courseId);
        return sections.length;
    }

    private async getThemesCountByCourse(courseId: string): Promise<number> {
        const sections = await this.getSectionsByCourse(courseId);
        let totalThemes = 0;
        for (const section of sections) {
            const themes = await this.getThemesBySection(section.id);
            totalThemes += themes.length;
        }
        return totalThemes;
    }

    private async getThemesCountBySection(sectionId: string): Promise<number> {
        const themes = await this.getThemesBySection(sectionId);
        return themes.length;
    }

    // ============ TASKS ============
    async deleteTask(taskId: string): Promise<void> {
        await this.managerApi.contentTasksTaskIdDelete(taskId);
    }



    async createTask(themeId: string, taskData: {
        name: string;
        question: string;
        taskType: string;
        instructions?: string;
        isTraining?: boolean;
        contents?: Array<{
            id: string;
            contentType: string;
            description?: string;
            transcription?: string;
            translation?: string;
            text?: string;
            file?: File;
            orderNum: number;
        }>;
        answer?: {
            answerType: string;
            correctAnswer: any;
            options?: Array<{
                id: string;
                text: string;
                isCorrect: boolean;
                orderNum: number;
            }>;
        };
    }): Promise<unknown> {
        try {
            // Получаем правильный orderNum
            const existingTasks = await this.getTasksByTheme(themeId);
            const orderNum = Array.isArray(existingTasks) ? existingTasks.length + 1 : 1;

            const createTaskRequest = {
                themeId,
                name: taskData.name,
                question: taskData.question,
                taskType: taskData.taskType,
                instructions: taskData.instructions || '',
                isTraining: taskData.isTraining || false,
                orderNum
            };

            const {data: createdTask} = await this.managerApi.contentTasksPost(createTaskRequest);

            for (const content of taskData.contents || []) {
                let mediaId: string | undefined;

                if (content.file) {
                    const mediaInfo = await this.uploadMediaFile(content.file);
                    mediaId = mediaInfo.mediaId;
                }

                await this.managerApi.contentTasksTaskIdContentPost(createdTask.id, {
                    contentType: this.mapFileTypeToContentType(content.contentType),
                    description: content.description,
                    transcription: content.transcription,
                    translation: content.translation,
                    text: content.text,
                    mediaId,
                    orderNum: content.orderNum
                });
            }

            if (taskData.answer?.options?.length) {
                for (const option of taskData.answer.options) {
                    await this.managerApi.contentTasksTaskIdAnswerOptionsPost(createdTask.id, {
                        optionText: option.text,
                        isCorrect: option.isCorrect,
                        orderNum: option.orderNum
                    });
                }

                await this.managerApi.contentTasksTaskIdAnswerPost(createdTask.id, {
                    answerType: this.mapAnswerTypeToBackend(taskData.answer.answerType),
                    correctAnswer: taskData.answer.correctAnswer || {}
                });
            }

            return createdTask;
        } catch (error) {
            console.error('Ошибка создания задачи:', error);
            throw error;
        }
    }
}

export default new ContentService();