import {ContentApi, ContentManagerApi, type MediaFileMeta} from "../api";
import {axiosInstance} from "../instances/axiosInstance.ts";

import {
    CreateTaskContentRequestContentTypeEnum,
    type Course as ApiCourse,
    type CreateCourseRequest,
    type UpdateCourseRequest,
    // ...existing code...
    type UpdateThemeRequest,
    type Theme as ApiTheme,
    type CreateReportRequest,
    type Report,
    CreateTaskAnswerRequestAnswerTypeEnum,
} from "../api";
import type {AxiosResponse} from "axios";
import {mediaService} from "./MediaService";
import type {
    Course,
    Theme,
} from "../context/content/ContentProvider";

class ContentService {
    private contentApi: ContentApi;
    private managerApi: ContentManagerApi;

    get contentApiInstance() {
        return this.contentApi;
    }

    constructor() {
        this.contentApi = new ContentApi(undefined, undefined, axiosInstance);
        this.managerApi = new ContentManagerApi(
            undefined,
            undefined,
            axiosInstance
        );
    }

    private mapFileTypeToContentType(
        fileType: string
    ): CreateTaskContentRequestContentTypeEnum {
        switch (fileType.toUpperCase()) {
            case "AUDIO":
                return CreateTaskContentRequestContentTypeEnum.Audio;
            case "VIDEO":
                return CreateTaskContentRequestContentTypeEnum.Video;
            case "IMAGE":
                return CreateTaskContentRequestContentTypeEnum.Image;
            default:
                return CreateTaskContentRequestContentTypeEnum.Text;
        }
    }

    private mapAnswerTypeToBackend(
        answerType: string
    ): CreateTaskAnswerRequestAnswerTypeEnum {
        switch (answerType) {
            case "SINGLE_CHOICE":
                return CreateTaskAnswerRequestAnswerTypeEnum.SingleChoiceShort;
            case "MULTI_CHOICE":
                return CreateTaskAnswerRequestAnswerTypeEnum.MultipleChoiceShort;
            case "ORDER_WORDS":
                return CreateTaskAnswerRequestAnswerTypeEnum.WordOrder;
            case "SELECT_WORDS":
                return CreateTaskAnswerRequestAnswerTypeEnum.WordSelection;
            default:
                return CreateTaskAnswerRequestAnswerTypeEnum.TextInput;
        }
    }

    async uploadMediaFile(file: File): Promise<MediaFileMeta> {
        const userId = localStorage.getItem("userId") || undefined;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        formData.append("mimeType", file.type);
        formData.append("fileSize", file.size.toString());

        let fileType = "CONTENT";
        if (file.type.startsWith("image/")) {
            fileType = "IMAGE";
        } else if (file.type.startsWith("audio/")) {
            fileType = "AUDIO";
        } else if (file.type.startsWith("video/")) {
            fileType = "VIDEO";
        }
        formData.append("fileType", fileType);

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
                authorUrl: (apiCourse as any).authorUrl,
                language: (apiCourse as any).language,
                isPublished: (apiCourse as any).isPublished,
                courseId: (apiCourse as any).courseId ?? null,
                themesCount: await this.getThemesCountByCourse(apiCourse.id),
                tasksCount: await this.getTasksCountByCourse(apiCourse.id),
                posterId: (apiCourse as any).posterId
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
            authorUrl: (apiCourse as any).authorUrl,
            language: (apiCourse as any).language,
            isPublished: (apiCourse as any).isPublished,
            courseId: (apiCourse as any).courseId ?? null,
            themesCount: await this.getThemesCountByCourse(courseId),
            tasksCount: await this.getTasksCountByCourse(courseId),
        } as unknown as Course;
    }

    async getTasksByTheme(themeId: string): Promise<unknown[]> {
        try {
            const response = await this.contentApi.contentThemesThemeIdTasksGet(
                themeId
            );
            return response.data || [];
        } catch (error) {
            console.error(`Ошибка загрузки задач темы ${themeId}:`, error);
            return [];
        }
    }

    async createCourse(courseData: CreateCourseRequest): Promise<Course> {
        const response: AxiosResponse<ApiCourse> = await this.managerApi.contentCoursesPost(courseData);
        const apiCourse = response.data;

        return {
            id: apiCourse.id,
            name: apiCourse.name,
            description: apiCourse.description,
                // ...existing code...
            authorUrl: (apiCourse as any).authorUrl,
            // ...existing code...
            language: (apiCourse as any).language,
            // ...existing code...
            isPublished: (apiCourse as any).isPublished,
            // @ts-expect-error
            courseId: (apiCourse as any).courseId ?? courseData.courseId ?? null,

            sectionsCount: 0,
            themesCount: 0,
            tasksCount: 0,
        } as unknown as Course;
    }

    async updateCourse(courseId: string, courseData: UpdateCourseRequest) {
        const response = await axiosInstance.put(`/content/courses/${courseId}`, courseData);
        return response.data;
    }


    async deleteCourse(courseId: string): Promise<void> {
        await this.managerApi.contentCoursesCourseIdDelete(courseId);
    }


    // ============ THEMES ============
    /**
     * Create a theme (replaces old createSection logic)
     * @param courseId - ID of the course
     * @param parentThemeId - ID of the parent theme (null for root)
     * @param name - Name of the theme
     * @param description - Description of the theme
     * @param position - Position/order in tree
     */
    // ...existing code...

    // ============ THEMES ============

    // Use theme tree endpoint to get all themes (tree structure)
    // ...existing code...

    async getThemeById(themeId: string): Promise<ApiTheme> {
        const response: AxiosResponse<ApiTheme> =
            await this.contentApi.contentThemesThemeIdGet(themeId);
        return response.data;
    }

    // ...existing code...

    async updateTheme(
        themeId: string,
        themeData: UpdateThemeRequest
    ): Promise<ApiTheme> {
        const response: AxiosResponse<ApiTheme> =
            await axiosInstance.put(`/content/themes/${themeId}`, themeData);
        return response.data;
    }
    // Get theme tree
    async getThemeTree(themeId: string): Promise<any> {
        const response = await axiosInstance.get(`/content/themes/${themeId}/tree`);
        return response.data;
    }

    // Get theme tasks
    async getThemeTasks(themeId: string): Promise<any[]> {
        const response = await axiosInstance.get(`/content/themes/${themeId}/tasks`);
        return response.data;
    }

    // Get theme contents
    async getThemeContents(themeId: string): Promise<any> {
        const response = await axiosInstance.get(`/content/themes/${themeId}/contents`);
        return response.data;
    }

    async deleteTheme(themeId: string): Promise<void> {
        await this.managerApi.contentThemesThemeIdDelete(themeId);
    }

    // ============ REPORTS ============
    async getAllReports(): Promise<Report[]> {
        const response: AxiosResponse<Report[]> =
            await this.contentApi.contentReportsGet();
        return response.data;
    }

    async getReportById(reportId: string): Promise<Report> {
        const response: AxiosResponse<Report> =
            await this.contentApi.contentReportsReportIdGet(reportId);
        return response.data;
    }

    async createReport(reportData: CreateReportRequest): Promise<Report> {
        const response: AxiosResponse<Report> =
            await this.contentApi.contentReportsPost(reportData);
        return response.data;
    }

    async deleteReport(reportId: string): Promise<void> {
        await this.managerApi.contentReportsReportIdDelete(reportId);
    }

    // ============ STATS ============
    async getContentStats(): Promise<unknown> {
        const response: AxiosResponse<unknown> =
            await this.contentApi.contentStatsGet();
        return response.data;
    }

    async getTasksCountByCourse(courseId: string): Promise<number> {
        try {
            const response: AxiosResponse<string> = await this.contentApi.contentStatsCourseCourseIdTasksCountGet(
                courseId
            );
            return Number(response.data) || 0;
        } catch (error) {
            console.error(
                `Ошибка получения количества задач курса ${courseId}:`,
                error
            );
            return 0;
        }
    }

    async getTasksCountBySection(sectionId: string): Promise<number> {
        try {
            const response: AxiosResponse<string> = await this.contentApi.contentStatsSectionSectionIdTasksCountGet(
                sectionId
            );
            return Number(response.data) || 0;
        } catch (error) {
            console.error(
                `Ошибка получения количества задач секции ${sectionId}:`,
                error
            );
            return 0;
        }
    }

    async getTasksCountByTheme(themeId: string): Promise<number> {
        try {
            const response: AxiosResponse<string> = await this.contentApi.contentStatsThemeThemeIdTasksCountGet(themeId);
            return Number(response.data) || 0;
        } catch (error) {
            try {
                const tasks = await this.getTasksByTheme(themeId);
                console.log(`Manual count for theme ${themeId}:`, tasks.length);
                return tasks.length;
            } catch {
                console.error(
                    `Ошибка получения количества задач темы ${themeId}:`,
                    error
                );
                return 0;
            }
        }
    }


    private async getThemesCountByCourse(courseId: string): Promise<number> {
    // To count all themes, traverse the tree from a root theme using getThemeTree
    // You must know the root themeId for the course
    // Example: const tree = await this.getThemeTree(rootThemeId);
    // Implement a recursive count if needed
    return 0; // Placeholder, implement as needed
    }

    // ============ TASKS ============
    async deleteTask(taskId: string): Promise<void> {
        await this.managerApi.contentTasksTaskIdDelete(taskId);
    }

    async createTask(
        themeId: string,
        taskData: {
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
                contentId?: string
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
                matchPairs?: Array<{
                    id: string;
                    leftItem: { type: string; content: string };
                    rightItem: { type: string; content: string };
                }>;
            };
        }
    ): Promise<unknown> {
        try {
            // Получаем правильный orderNum
            const existingTasks = await this.getTasksByTheme(themeId);
            const orderNum = Array.isArray(existingTasks)
                ? existingTasks.length + 1
                : 1;

                const createTaskRequest = {
                themeId,
                name: taskData.name,
                question: taskData.question,
                    taskType: taskData.taskType as import("../api").CreateTaskRequestTaskTypeEnum,
                instructions: taskData.instructions || "",
                isTraining: taskData.isTraining || false,
                orderNum,
            };

            const {data: createdTask} = await this.managerApi.contentTasksPost(
                createTaskRequest
            );

            // Загрузка контента
            for (const content of taskData.contents || []) {
                await this.managerApi.contentTasksTaskIdContentPost(createdTask.id, {
                    contentType: this.mapFileTypeToContentType(content.contentType),
                    description: content.description,
                    transcription: content.transcription,
                    translation: content.translation,
                    contentId: content.contentId,
                    orderNum: content.orderNum,
                });
            }

            // Обработка ответа
            if (taskData.answer) {
                // Для вариантов ответа
                if (taskData.answer.options?.length) {
                    // Сначала создаем варианты
                    for (const option of taskData.answer.options) {
                        await this.managerApi.contentTasksTaskIdOptionsPost(
                            createdTask.id,
                            {
                                optionText: option.text,
                                isCorrect: option.isCorrect,
                                orderNum: option.orderNum,
                            }
                        );
                    }
                    // Затем создаем сам ответ
                    await this.managerApi.contentTasksTaskIdAnswerPost(createdTask.id, {
                        answerType: this.mapAnswerTypeToBackend(taskData.answer.answerType),
                        correctAnswer: taskData.answer.correctAnswer || {},
                    });
                }
                // Для текстового ответа
                else if (taskData.answer.answerType === "TEXT_INPUT") {
                    await this.managerApi.contentTasksTaskIdAnswerPost(createdTask.id, {
                        answerType: CreateTaskAnswerRequestAnswerTypeEnum.TextInput,
                        correctAnswer: {text: taskData.answer.correctAnswer?.text || ""},
                    });
                }
                // Для сопоставления пар
                else if (
                    taskData.answer.answerType === "MATCH_PAIRS" &&
                    taskData.answer.matchPairs?.length
                ) {
                    const pairs = taskData.answer.matchPairs.map((pair) => ({
                        leftItem: pair.leftItem,
                        rightItem: pair.rightItem,
                    }));
                    await this.managerApi.contentTasksTaskIdAnswerPost(createdTask.id, {
                        answerType: "MATCH_PAIRS",
                        correctAnswer: {pairs},
                    });
                }
            }

            return createdTask;
        } catch (error) {
            console.error("Ошибка создания задачи:", error);
            throw error;
        }
    }

    async getTaskById(taskId: string): Promise<any> {
        try {
            const response = await this.contentApi.contentTasksTaskIdGet(taskId);
            return response.data;
        } catch (error) {
            console.error(`Ошибка получения задачи ${taskId}:`, error);
            throw error;
        }
    }

    async updateTask(taskId: string, taskData: any): Promise<any> {
        try {
            const response = await this.managerApi.contentTasksTaskIdPut(
                taskId,
                taskData
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка обновления задачи ${taskId}:`, error);
            throw error;
        }
    }

    async getTaskWithDetails(taskId: string): Promise<any> {
        try {
            const response = await this.contentApi.contentTasksTaskIdGet(taskId);
            return response.data;
        } catch (error) {
            console.error(`Ошибка получения задачи ${taskId}:`, error);
            throw error;
        }
    }

    async createAnswerOption(
        taskId: string,
        option: {
            optionText?: string;
            optionAudioId?: string | null;
            isCorrect?: boolean;
            orderNum?: number;
        }
    ): Promise<any> {
        try {
            const payload = {
                optionText: option.optionText ?? "",
                optionAudioId: option.optionAudioId ?? undefined,
                isCorrect: option.isCorrect ?? false,
                orderNum: option.orderNum ?? 0,
            };
            const response = await this.managerApi.contentTasksTaskIdOptionsPost(
                taskId,
                payload
            );
            return response.data ?? response;
        } catch (error) {
            console.error(`Ошибка создания варианта задачи ${taskId}:`, error);
            throw error;
        }
    }

    async updateAnswerOption(
        taskId: string,
        optionId: string,
        updates: {
            optionText?: string;
            optionAudioId?: string | null;
            isCorrect?: boolean;
            orderNum?: number;
        }
    ): Promise<any> {
        try {
            const payload = {
                optionText: updates.optionText,
                optionAudioId: updates.optionAudioId ?? undefined,
                isCorrect: updates.isCorrect,
                orderNum: updates.orderNum,
            };
            const response = await this.managerApi.contentTasksTaskIdOptionsOptionIdPut(
                optionId,
                taskId,
                payload
            );
            return response.data ?? response;
        } catch (error) {
            console.error(
                `Ошибка обновления варианта ${optionId} задачи ${taskId}:`,
                error
            );
            throw error;
        }
    }

    async deleteAnswerOption(taskId: string, optionId: string): Promise<void> {
        try {
            await this.managerApi.contentTasksTaskIdOptionsOptionIdDelete(
                optionId,
                taskId
            );
        } catch (error) {
            console.error(
                `Ошибка удаления варианта ${optionId} задачи ${taskId}:`,
                error
            );
            throw error;
        }
    }
}

export default new ContentService();
