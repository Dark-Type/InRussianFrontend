import {
    ContentApi,
    type CreateTaskRequest,
    type UpdateTaskRequest,
    type CreateTaskContentRequest,
    type UpdateTaskContentRequest,
    type CreateTaskAnswerRequest,
    type UpdateTaskAnswerRequest,
    type CreateTaskAnswerOptionRequest,
    type UpdateTaskAnswerOptionRequest,

    CreateTaskRequestTaskTypeEnum
} from '../api';
import type { AxiosResponse } from 'axios';
import { axiosInstance } from '../axiosInstance.ts';
import type { Task } from '../context/ContentContext';
interface ApiTaskContent {
    id: string;
    contentType: string;
    contentId?: string;
    description?: string;
    transcription?: string;
    translation?: string;
    orderNum: number;
}

interface ApiTaskAnswerOption {
    id: string;
    optionText?: string;
    optionAudioId?: string;
    isCorrect: boolean;
    orderNum: number;
}

interface ApiMediaFile {
    id: string;
    fileName: string;
    fileType: string;
    mimeType: string;
    fileSize: number;
    uploadedBy?: string;
    uploadedAt: string;
    isActive: boolean;
    fileBlob: string;
}

interface ApiTask {
    id: string;
    themeId: string;
    name: string;
    taskType: string;
    question: string;
    instructions?: string;
    isTraining: boolean;
    orderNum: number;
    contents?: ApiTaskContent[];
    answer?: {
        answerType: string;
        correctAnswer: Record<string, unknown>;
        options?: ApiTaskAnswerOption[];
    };
}
class TaskApiService {
    private api: ContentApi;

    constructor() {
        this.api = new ContentApi(undefined, undefined, axiosInstance);
    }



    async createTask(themeId: string, name: string, taskType: CreateTaskRequestTaskTypeEnum, question: string, instructions: string = '', isTraining: boolean = false): Promise<ApiTask> {
        const tasks = await this.getTasksByTheme(themeId);
        const orderNum = tasks.length + 1;

        const taskData: CreateTaskRequest = {
            themeId,
            name,
            taskType,
            question,
            instructions,
            isTraining,
            orderNum
        };

        const response: AxiosResponse<unknown> = await this.api.contentTasksPost(taskData);
        return response.data as ApiTask;
    }

    async getTask(taskId: string): Promise<ApiTask> {
        const response: AxiosResponse<unknown> = await this.api.contentTasksTaskIdGet(taskId);
        return response.data as ApiTask;
    }

    async updateTask(taskId: string, updates: UpdateTaskRequest): Promise<ApiTask> {
        const response: AxiosResponse<unknown> = await this.api.contentTasksTaskIdPut(taskId, updates);
        return response.data as ApiTask;
    }

    async deleteTask(taskId: string): Promise<void> {
        await this.api.contentTasksTaskIdDelete(taskId);
    }

    async getTasksByTheme(themeId: string): Promise<ApiTask[]> {
        const response: AxiosResponse<unknown> = await this.api.contentThemesThemeIdTasksGet(themeId);
        return response.data as ApiTask[];
    }

    async createTaskContent(taskId: string, contentData: Omit<CreateTaskContentRequest, 'orderNum'>): Promise<ApiTaskContent> {
        const task = await this.getTask(taskId);
        const contents = task.contents || [];
        const orderNum = contents.length + 1;

        const dataWithOrder: CreateTaskContentRequest = {
            ...contentData,
            orderNum
        };

        const createResponse: AxiosResponse<unknown> = await this.api.contentTasksTaskIdContentPost(taskId, dataWithOrder);
        return createResponse.data as ApiTaskContent;
    }

    async getTaskContent(taskId: string, contentId: string): Promise<ApiTaskContent> {
        const response: AxiosResponse<unknown> = await this.api.contentTasksTaskIdContentContentIdGet(taskId, contentId);
        return response.data as ApiTaskContent;
    }

    async updateTaskContent(taskId: string, contentId: string, updates: UpdateTaskContentRequest): Promise<ApiTaskContent> {
        const response: AxiosResponse<unknown> = await this.api.contentTasksTaskIdContentContentIdPut(taskId, contentId, updates);
        return response.data as ApiTaskContent;
    }

    async deleteTaskContent(taskId: string, contentId: string): Promise<void> {
        await this.api.contentTasksTaskIdContentContentIdDelete(taskId, contentId);
    }

    async createTaskAnswer(taskId: string, answerData: CreateTaskAnswerRequest): Promise<void> {
        await this.api.contentTasksTaskIdAnswerPost(taskId, answerData);
    }

    async getTaskAnswer(taskId: string): Promise<unknown> {
        const task = await this.getTask(taskId);
        return task.answer;
    }

    async updateTaskAnswer(taskId: string, updates: UpdateTaskAnswerRequest): Promise<void> {
        await this.api.contentTasksTaskIdAnswerPut(taskId, updates);
    }

    async deleteTaskAnswer(taskId: string): Promise<void> {
        await this.api.contentTasksTaskIdAnswerDelete(taskId);
    }

    // Task answer options operations
    async createTaskAnswerOption(taskId: string, optionData: Omit<CreateTaskAnswerOptionRequest, 'orderNum'>): Promise<ApiTaskAnswerOption> {
        const task = await this.getTask(taskId);
        const options = task.answer?.options || [];
        const orderNum = options.length + 1;

        const dataWithOrder: CreateTaskAnswerOptionRequest = {
            ...optionData,
            orderNum
        };

        const response: AxiosResponse<unknown> = await this.api.contentTasksTaskIdOptionsPost(taskId, dataWithOrder);
        return response.data as ApiTaskAnswerOption;
    }

    async getTaskAnswerOption(taskId: string, optionId: string): Promise<ApiTaskAnswerOption> {
        const task = await this.getTask(taskId);
        const options = task.answer?.options || [];
        const option = options.find((opt: ApiTaskAnswerOption) => opt.id === optionId);

        if (!option) {
            throw new Error(`Option with id ${optionId} not found`);
        }

        return option as ApiTaskAnswerOption;
    }

    async updateTaskAnswerOption(taskId: string, optionId: string, updates: UpdateTaskAnswerOptionRequest): Promise<ApiTaskAnswerOption> {
        const response: AxiosResponse<unknown> = await this.api.contentTasksTaskIdOptionsOptionIdPut(taskId, optionId, updates);
        return response.data as ApiTaskAnswerOption;
    }

    async deleteTaskAnswerOption(taskId: string, optionId: string): Promise<void> {
        await this.api.contentTasksTaskIdOptionsOptionIdDelete(taskId, optionId);
    }

    async createFullTask(taskData: Omit<Task, 'id'>): Promise<ApiTask> {
        const createdTask = await this.createTask(
            taskData.themeId,
            taskData.name,
            taskData.taskType,
            taskData.question,
            taskData.instructions ?? '',
            taskData.isTraining ?? false
        );
        const taskId = createdTask.id;

        // Обрабатываем содержимое
        for (const content of taskData.contents) {
            let contentId: string | undefined;

            // Загружаем файл, если есть
            if (content.file) {
                contentId = await this.uploadMediaFile(content.file);
            }

            await this.createTaskContent(taskId, {
                contentType: content.contentType,
                contentId: contentId || content.contentId,
                description: content.description,
                transcription: content.transcription,
                translation: content.translation
            });
        }

        await this.createTaskAnswer(taskId, {
            answerType: taskData.answer.answerType,
            correctAnswer: this.generateCorrectAnswerJson(
                taskData.answer.answerType,
                taskData.answer.options || [],
                taskData.answer.matchPairs || []
            )
        });

        // Создаём опции ответа
        if (taskData.answer.options) {
            for (const option of taskData.answer.options) {
                let audioId: string | undefined;

                // Загружаем аудиофайл, если есть
                if (option.audioFile) {
                    audioId = await this.uploadMediaFile(option.audioFile);
                }

                await this.createTaskAnswerOption(taskId, {
                    optionText: option.text,
                    optionAudioId: audioId || option.audioId,
                    isCorrect: option.isCorrect
                });
            }
        }

        return await this.getTask(taskId);
    }

    private getFileType(mimeType: string): string {
        if (mimeType.startsWith('audio/')) return 'AUDIO';
        if (mimeType.startsWith('image/')) return 'IMAGE';
        if (mimeType.startsWith('video/')) return 'VIDEO';
        return 'TEXT';
    }

    generateCorrectAnswerJson(answerType: string, options: ApiTaskAnswerOption[], matchPairs: unknown[]): Record<string, unknown> {
        switch (answerType) {
            case 'ORDER_WORDS': {
                const correctOrder = options
                    .filter(opt => opt.isCorrect)
                    .sort((a, b) => a.orderNum - b.orderNum)
                    .map(opt => opt.optionText);
                return { order: correctOrder.join(', ') };
            }

            case 'SELECT_WORDS': {
                const correctWords = options
                    .filter(opt => opt.isCorrect)
                    .map(opt => opt.optionText);
                return { words: correctWords };
            }

            case 'SINGLE_CHOICE':
            case 'MULTI_CHOICE': {
                const correctOptions = options
                    .filter(opt => opt.isCorrect)
                    .map(opt => opt.id);
                return { selectedOptions: correctOptions };
            }

            case 'MATCH_PAIRS': {
                return { pairs: matchPairs };
            }

            default:
                return {};
        }
    }
}

export const taskApiService = new TaskApiService();