import {ContentApi, ContentManagerApi, Configuration} from "../api";
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
    private contentApi: ContentApi;
    private managerApi: ContentManagerApi;

    constructor() {
        const config = new Configuration({
            basePath: import.meta.env.VITE_API_URL || "http://localhost:8080",
        });
        this.contentApi = new ContentApi(config, undefined, axiosInstance);
        this.managerApi = new ContentManagerApi(config, undefined, axiosInstance);
    }

    // ============ TASK MANAGEMENT ============
    async createTask(taskData: CreateTaskRequest): Promise<TaskWithDetails> {
        const response: AxiosResponse<TaskWithDetails> = await this.managerApi.contentTasksPost(taskData);
        return response.data;
    }

    async getTaskById(taskId: string): Promise<TaskWithDetails> {
        const response: AxiosResponse<TaskWithDetails> = await this.contentApi.contentTasksTaskIdGet(taskId);
        return response.data;
    }

    async updateTask(taskId: string, taskData: UpdateTaskRequest): Promise<TaskWithDetails> {
        const response: AxiosResponse<TaskWithDetails> = await this.managerApi.contentTasksTaskIdPut(taskId, taskData);
        return response.data;
    }

    async deleteTask(taskId: string): Promise<void> {
        await this.managerApi.contentTasksTaskIdDelete(taskId);
    }

    async getTasksByTheme(themeId: string): Promise<TaskWithDetails[]> {
        const response: AxiosResponse<TaskWithDetails[]> = await this.contentApi.contentThemesThemeIdTasksGet(themeId);
        return response.data;
    }

    // ============ TASK CONTENT ============
    async createTaskContent(taskId: string, contentData: CreateTaskContentRequest): Promise<TaskContentItem> {
        const response: AxiosResponse<TaskContentItem> = await this.managerApi.contentTasksTaskIdContentPost(taskId, contentData);
        return response.data;
    }

    async deleteTaskContent(taskId: string, contentId: string): Promise<void> {
        await this.managerApi.contentTasksTaskIdContentContentIdDelete(contentId, taskId);
    }

    // ============ TASK ANSWER ============
    async createTaskAnswer(taskId: string, answerData: CreateTaskAnswerRequest): Promise<TaskAnswerItem> {
        const response: AxiosResponse<TaskAnswerItem> = await this.managerApi.contentTasksTaskIdAnswerPost(taskId, answerData);
        return response.data;
    }

    async deleteTaskAnswer(taskId: string): Promise<void> {
        await this.managerApi.contentTasksTaskIdAnswerDelete(taskId);
    }

    // ============ TASK ANSWER OPTIONS ============
    async createTaskAnswerOption(taskId: string, optionData: CreateTaskAnswerOptionRequest): Promise<TaskAnswerOptionItem> {
        const response: AxiosResponse<TaskAnswerOptionItem> = await this.managerApi.contentTasksTaskIdOptionsPost(taskId, optionData);
        return response.data;
    }

    async deleteTaskAnswerOption(taskId: string, optionId: string): Promise<void> {
        await this.managerApi.contentTasksTaskIdOptionsOptionIdDelete(optionId, taskId);
    }
}

export default new TaskService();