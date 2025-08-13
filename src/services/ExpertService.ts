import {
    ExpertApi,
    ContentApi,
    ProfileApi,
    Configuration,
    type User,
    type UserProfile,
    type Course,
    type Section,
    type Theme,
    type TaskWithDetails,
    type CountStats,
    type Report,
    type CreateReportRequest,
    type UserLanguageSkillRequest,
} from '../api';
import {axiosInstance} from '../instances/axiosInstance.ts';

interface StudentWithProfile extends User {
    profile?: UserProfile;
    languageSkills?: UserLanguageSkillRequest[];
    avatarUrl?: string;
}

class ExpertService {
    private expertApi: ExpertApi;
    private profileApi: ProfileApi;
    private contentApi: ContentApi;

    constructor() {
        const config = new Configuration({basePath: axiosInstance.defaults.baseURL});
        this.expertApi = new ExpertApi(config, undefined, axiosInstance);
        this.profileApi = new ProfileApi(config, undefined, axiosInstance);
        this.contentApi = new ContentApi(config, undefined, axiosInstance);
    }

    // ============ STUDENTS ============ (без изменений)
    async getAllStudents(page?: number, size?: number, sortBy?: string, sortOrder?: string, createdFrom?: string, createdTo?: string): Promise<User[]> {
        try {
            const response = await this.expertApi.expertStudentsGet(page, size, sortBy, sortOrder, createdFrom, createdTo);
            return response.data;
        } catch (error) {
            console.error('Ошибка загрузки студентов:', error);
            return [];
        }
    }

    async getStudentsCount(createdFrom?: string, createdTo?: string): Promise<number> {
        try {
            const response = await this.expertApi.expertStudentsCountGet(createdFrom, createdTo);
            return parseInt(response.data.count, 10) || 0;
        } catch (error) {
            console.error('Ошибка загрузки количества студентов:', error);
            return 0;
        }
    }

    // ============ STUDENT PROFILES ============ (без изменений)
    async getStudentProfile(userId: string): Promise<UserProfile | null> {
        try {
            const response = await this.profileApi.profilesUserIdGet(userId);
            return response.data?.profile || null;
        } catch (error) {
            console.error(`Ошибка загрузки профиля студента ${userId}:`, error);
            return null;
        }
    }

    async getStudentLanguageSkills(userId: string): Promise<UserLanguageSkillRequest[]> {
        try {
            const response = await this.profileApi.profilesUserLanguageSkillsGet(userId);
            if (!response.data) {
                return [];
            }
            
            if (Array.isArray(response.data.skills)) {
                return response.data.skills;
            }

            if (typeof response.data === 'string') {
                try {
                    const parsed = JSON.parse(response.data);
                    return Array.isArray(parsed) ? parsed : [];
                } catch (parseError) {
                    console.error(`Ошибка парсинга языковых навыков студента ${userId}:`, parseError);
                    return [];
                }
            }

            return [];
        } catch (error) {
            console.error(`Ошибка загрузки языковых навыков студента ${userId}:`, error);
            return [];
        }
    }

    async getStudentsWithProfiles(page?: number, size?: number): Promise<StudentWithProfile[]> {
        try {
            const students = await this.getAllStudents(page, size);

            const studentsWithProfiles = await Promise.all(
                students.map(async (student) => {
                    const [profile, languageSkills] = await Promise.all([
                        this.getStudentProfile(student.id).catch(() => null),
                        this.getStudentLanguageSkills(student.id).catch(() => [])
                    ]);

                    return {
                        ...student,
                        profile,
                        languageSkills
                    };
                })
            );

            return studentsWithProfiles;
        } catch (error) {
            console.error('Ошибка загрузки студентов с профилями:', error);
            return [];
        }
    }

    // ============ CONTENT ============
    async getAllCourses(): Promise<Course[]> {
        try {
            const response = await this.contentApi.contentCoursesGet();
            console.log('Курсы загружены:', response.data);
            return response.data || [];
        } catch (error) {
            console.error('Ошибка загрузки курсов:', error);
            return [];
        }
    }

    async getSectionsByCourse(courseId: string): Promise<Section[]> {
        try {
            const response = await this.contentApi.contentSectionsByCourseCourseIdGet(courseId);
            return response.data || [];
        } catch (error) {
            console.error(`Ошибка загрузки разделов курса ${courseId}:`, error);
            return [];
        }
    }

    async getThemesBySection(sectionId: string): Promise<Theme[]> {
        try {
            const response = await this.contentApi.contentThemesBySectionSectionIdGet(sectionId);
            return response.data || [];
        } catch (error) {
            console.error(`Ошибка загрузки тем раздела ${sectionId}:`, error);
            return [];
        }
    }

    async getTasksByTheme(themeId: string): Promise<TaskWithDetails[]> {
        try {
            // Используем правильный endpoint для получения задач по теме
            const response = await this.contentApi.contentTasksGet();
            const allTasks = response.data || [];

            // Фильтруем задачи по themeId
            const themeTasks = allTasks.filter(task => task.themeId === themeId);
            return themeTasks;
        } catch (error) {
            console.error(`Ошибка загрузки задач темы ${themeId}:`, error);
            return [];
        }
    }

    async getTaskById(taskId: string): Promise<TaskWithDetails | null> {
        try {
            const response = await this.contentApi.contentTasksTaskIdGet(taskId);
            return response.data;
        } catch (error) {
            console.error(`Ошибка загрузки задачи ${taskId}:`, error);
            return null;
        }
    }

    async getAllTasks(): Promise<TaskWithDetails[]> {
        try {
            const response = await this.contentApi.contentTasksGet();
            return response.data || [];
        } catch (error) {
            console.error('Ошибка загрузки всех задач:', error);
            return [];
        }
    }

    // ============ STATISTICS ============
    async getContentStats(): Promise<CountStats | null> {
        try {
            const response = await this.contentApi.contentStatsGet();
            return response.data;
        } catch (error) {
            console.error('Ошибка загрузки статистики контента:', error);
            return null;
        }
    }

    async getTasksByTheme(themeId: string): Promise<TaskWithDetails[]> {
        try {
            const response = await this.contentApi.contentThemesThemeIdTasksGet(themeId);
            return response.data || [];
        } catch (error) {
            console.error(`Ошибка загрузки задач темы ${themeId}:`, error);
            return [];
        }
    }

    async getTasksCountBySection(sectionId: string): Promise<number> {
        try {
            const themes = await this.getThemesBySection(sectionId);
            let totalTasks = 0;
            for (const theme of themes) {
                const taskCount = await this.getTasksCountByTheme(theme.id);
                totalTasks += taskCount;
            }
            return totalTasks;
        } catch (error) {
            console.error(`Ошибка подсчета задач раздела ${sectionId}:`, error);
            return 0;
        }
    }
    async getTasksCountByTheme(themeId: string): Promise<number> {
        try {
            const response = await this.contentApi.contentStatsThemeThemeIdTasksCountGet(themeId);
            return parseInt(response.data, 10) || 0;
        } catch (error) {
            const tasks = await this.getTasksByTheme(themeId);
            return tasks.length;
        }
    }

    async getTasksCountByCourse(courseId: string): Promise<number> {
        try {
            const sections = await this.getSectionsByCourse(courseId);
            let totalTasks = 0;
            for (const section of sections) {
                const taskCount = await this.getTasksCountBySection(section.id);
                totalTasks += taskCount;
            }
            return totalTasks;
        } catch (error) {
            console.error(`Ошибка подсчета задач курса ${courseId}:`, error);
            return 0;
        }
    }


    async getOverallAverageProgress(): Promise<number> {
        const response = await this.expertApi.expertStatisticsOverallAverageProgressGet();
        return parseFloat(response.data.averageProgress) || 0;
    }

    async getOverallAverageTime(): Promise<number> {
        const response = await this.expertApi.expertStatisticsOverallAverageTimeGet();
        return parseFloat(response.data.averageTime) || 0;
    }

    async getCourseAverageProgress(courseId: string): Promise<number> {
        const response = await this.expertApi.expertStatisticsCourseCourseIdAverageProgressGet(courseId);
        return parseFloat(response.data.averageProgress) || 0;
    }

    async getCourseAverageTime(courseId: string): Promise<number> {
        const response = await this.expertApi.expertStatisticsCourseCourseIdAverageTimeGet(courseId);
        return parseFloat(response.data.averageTime) || 0;
    }

    async getCourseStudentsCount(courseId: string): Promise<number> {
        const response = await this.expertApi.expertStatisticsCourseCourseIdStudentsCountGet(courseId);
        return parseInt(response.data, 10) || 0;
    }

    async getStudentsOverallStats(): Promise<string> {
        const response = await this.expertApi.expertStatisticsStudentsOverallGet();
        return response.data;
    }

    // ============ REPORTS ============
    async createReport(reportData: CreateReportRequest): Promise<Report> {
        const response = await this.contentApi.contentReportsPost(reportData);
        return response.data;
    }

    async getAllReports(): Promise<Report[]> {
        const response = await this.contentApi.contentReportsGet();
        return response.data;
    }

    async deleteReport(reportId: string): Promise<void> {
        await this.contentApi.contentReportsReportIdDelete(reportId);
    }
}

export default new ExpertService();