import {ContentApi, Configuration} from "../api";
import {axiosInstance} from "../instances/axiosInstance";
import type {AxiosResponse} from 'axios';
import type {
    TaskWithDetails,
    CreateTaskRequest,
    UpdateTaskRequest,
    TaskContentItem,
    CreateTaskContentRequest,
    UpdateTaskContentRequest,
    TaskAnswerItem,
    CreateTaskAnswerRequest,
    UpdateTaskAnswerRequest,
    TaskAnswerOptionItem,
    CreateTaskAnswerOptionRequest,
    UpdateTaskAnswerOptionRequest,
    CreateTaskRequestTaskTypeEnum,
    CreateTaskAnswerRequestAnswerTypeEnum,
    CreateTaskContentRequestContentTypeEnum
} from "../api";
import {mediaService} from "./MediaService";

class TaskService {
    private api: ContentApi;

    constructor() {
        this.api = new ContentApi(
            new Configuration({
                basePath: import.meta.env.VITE_API_URL || "http://localhost:8080",
            }),
            undefined,
            axiosInstance
        );
    }

    // ============ TASK MANAGEMENT ============
    async createTask(taskData: CreateTaskRequest): Promise<TaskWithDetails> {
        const response: AxiosResponse<TaskWithDetails> = await this.api.contentTasksPost(taskData);
        return response.data;
    }

    async getTaskById(taskId: string): Promise<TaskWithDetails> {
        const response: AxiosResponse<TaskWithDetails> = await this.api.contentTasksTaskIdGet(taskId);
        return response.data;
    }

    async updateTask(taskId: string, taskData: UpdateTaskRequest): Promise<TaskWithDetails> {
        const response: AxiosResponse<TaskWithDetails> = await this.api.contentTasksTaskIdPut(taskId, taskData);
        return response.data;
    }

    async deleteTask(taskId: string): Promise<void> {
        await this.api.contentTasksTaskIdDelete(taskId);
    }

    async getTasksByTheme(themeId: string): Promise<TaskWithDetails[]> {
        const response: AxiosResponse<TaskWithDetails[]> = await this.api.contentThemesThemeIdTasksGet(themeId);
        return response.data;
    }

    // ============ TASK CONTENT ============
    async createTaskContent(taskId: string, contentData: CreateTaskContentRequest): Promise<TaskContentItem> {
        const response: AxiosResponse<TaskContentItem> = await this.api.contentTasksTaskIdContentPost(taskId, contentData);
        return response.data;
    }

    async getTaskContent(taskId: string, contentId: string): Promise<TaskContentItem> {
        const response: AxiosResponse<TaskContentItem> = await this.api.contentTasksTaskIdContentContentIdGet(contentId, taskId);
        return response.data;
    }

    async updateTaskContent(taskId: string, contentId: string, contentData: UpdateTaskContentRequest): Promise<TaskContentItem> {
        const response: AxiosResponse<TaskContentItem> = await this.api.contentTasksTaskIdContentContentIdPut(contentId, taskId, contentData);
        return response.data;
    }

    async deleteTaskContent(taskId: string, contentId: string): Promise<void> {
        await this.api.contentTasksTaskIdContentContentIdDelete(contentId, taskId);
    }

    // ============ TASK ANSWER ============
    async createTaskAnswer(taskId: string, answerData: CreateTaskAnswerRequest): Promise<TaskAnswerItem> {
        const response: AxiosResponse<TaskAnswerItem> = await this.api.contentTasksTaskIdAnswerPost(taskId, answerData);
        return response.data;
    }

    async getTaskAnswer(taskId: string): Promise<TaskAnswerItem> {
        const response: AxiosResponse<TaskAnswerItem> = await this.api.contentTasksTaskIdAnswerGet(taskId);
        return response.data;
    }

    async updateTaskAnswer(taskId: string, answerData: UpdateTaskAnswerRequest): Promise<TaskAnswerItem> {
        const response: AxiosResponse<TaskAnswerItem> = await this.api.contentTasksTaskIdAnswerPut(taskId, answerData);
        return response.data;
    }

    async deleteTaskAnswer(taskId: string): Promise<void> {
        await this.api.contentTasksTaskIdAnswerDelete(taskId);
    }

    // ============ TASK ANSWER OPTIONS ============
    async createTaskAnswerOption(taskId: string, optionData: CreateTaskAnswerOptionRequest): Promise<TaskAnswerOptionItem> {
        const response: AxiosResponse<TaskAnswerOptionItem> = await this.api.contentTasksTaskIdOptionsPost(taskId, optionData);
        return response.data;
    }

    async getTaskAnswerOption(taskId: string, optionId: string): Promise<TaskAnswerOptionItem> {
        const response: AxiosResponse<TaskAnswerOptionItem> = await this.api.contentTasksTaskIdOptionsOptionIdGet(optionId, taskId);
        return response.data;
    }

    async updateTaskAnswerOption(taskId: string, optionId: string, optionData: UpdateTaskAnswerOptionRequest): Promise<TaskAnswerOptionItem> {
        const response: AxiosResponse<TaskAnswerOptionItem> = await this.api.contentTasksTaskIdOptionsOptionIdPut(optionId, taskId, optionData);
        return response.data;
    }

    async deleteTaskAnswerOption(taskId: string, optionId: string): Promise<void> {
        await this.api.contentTasksTaskIdOptionsOptionIdDelete(optionId, taskId);
    }

    // ============ COMPLEX TASK CREATION ============
    async createFullTask(
        themeId: string,
        taskName: string,
        taskDescription: string,
        taskType: string,
        isTraining: boolean,
        contents: Array<{
            contentType: CreateTaskContentRequestContentTypeEnum;
            description?: string;
            transcription?: string;
            translation?: string;
            mediaFile?: File;
        }>,
        answerOptions: Array<{
            optionText: string;
            isCorrect: boolean;
            mediaFile?: File;
        }>,
        answer: {
            answerType: CreateTaskAnswerRequestAnswerTypeEnum;
            correctAnswer: object;
        },
        userId?: string
    ): Promise<TaskWithDetails> {
        try {
            // 1. Получаем количество существующих задач в теме для orderNum
            const existingTasks = await this.getTasksByTheme(themeId);
            const orderNum = existingTasks.length + 1;

            // 2. Создаем задачу
            const task = await this.createTask({
                name: taskName,
                question: taskDescription,
                themeId,
                taskType: taskType as CreateTaskRequestTaskTypeEnum,
                isTraining,
                orderNum
            });

            // 3. Создаем каждый элемент контента отдельно
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                let contentId: string | undefined;

                // Загружаем медиафайл если есть
                if (content.mediaFile) {
                    const formData = new FormData();
                    formData.append('file', content.mediaFile);
                    const mediaInfo = await mediaService.uploadMediaWithMeta(formData, userId);
                    contentId = mediaInfo.mediaId;
                }

                // Создаем элемент контента
                await this.createTaskContent(task.id, {
                    contentType: content.contentType,
                    contentId,
                    description: content.description,
                    transcription: content.transcription,
                    translation: content.translation,
                    orderNum: i + 1
                });
            }

            // 4. Создаем варианты ответов
            for (let i = 0; i < answerOptions.length; i++) {
                const option = answerOptions[i];
                let optionAudioId: string | undefined;

                // Загружаем медиафайл если есть
                if (option.mediaFile) {
                    const formData = new FormData();
                    formData.append('file', option.mediaFile);
                    const mediaInfo = await mediaService.uploadMediaWithMeta(formData, userId);
                    optionAudioId = mediaInfo.mediaId;
                }

                await this.createTaskAnswerOption(task.id, {
                    optionText: option.optionText,
                    isCorrect: option.isCorrect,
                    optionAudioId,
                    orderNum: i + 1
                });
            }

            // 5. Создаем ответ
            await this.createTaskAnswer(task.id, {
                answerType: answer.answerType,
                correctAnswer: answer.correctAnswer
            });

            // 6. Возвращаем обновленную задачу
            return await this.getTaskById(task.id);

        } catch (error) {
            console.error('Error creating full task:', error);
            throw error;
        }
    }
}

export default new TaskService();