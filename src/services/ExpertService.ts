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
    profile?: UserProfile | null;
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
            const response: any = await this.expertApi.expertStudentsCountGet(createdFrom, createdTo);
            if (typeof response.data === 'string') return parseInt(response.data, 10) || 0;
            if (response.data && typeof response.data.count !== 'undefined') return parseInt(response.data.count, 10) || 0;
            return 0;
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
            const response: any = await this.profileApi.profilesUserLanguageSkillsGet(userId);
            if (!response.data) {
                return [];
            }
            
            if (Array.isArray(response.data.skills)) {
                return response.data.skills as UserLanguageSkillRequest[];
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

            return studentsWithProfiles as StudentWithProfile[];
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

    // (Removed duplicate/invalid task endpoints to avoid type errors - keep only verified ones below)

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
            const response: any = await this.contentApi.contentThemesThemeIdTasksGet(themeId);
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
        const response: any = await this.expertApi.expertStatisticsOverallAverageProgressGet();
        if (response.data && typeof response.data === 'object' && 'averageProgress' in response.data) {
            return parseFloat(response.data.averageProgress) || 0;
        }
        if (typeof response.data === 'string') return parseFloat(response.data) || 0;
        return 0;
    }

    async getOverallAverageTime(): Promise<number> {
        const response: any = await this.expertApi.expertStatisticsOverallAverageTimeGet();
        if (response.data && typeof response.data === 'object' && 'averageTime' in response.data) {
            return parseFloat(response.data.averageTime) || 0;
        }
        if (typeof response.data === 'string') return parseFloat(response.data) || 0;
        return 0;
    }

    async getCourseAverageProgress(courseId: string): Promise<number> {
        const response: any = await this.expertApi.expertStatisticsCourseCourseIdAverageProgressGet(courseId);
        if (response.data && typeof response.data === 'object' && 'averageProgress' in response.data) {
            return parseFloat(response.data.averageProgress) || 0;
        }
        if (typeof response.data === 'string') return parseFloat(response.data) || 0;
        return 0;
    }

    async getCourseAverageTime(courseId: string): Promise<number> {
        const response: any = await this.expertApi.expertStatisticsCourseCourseIdAverageTimeGet(courseId);
        if (response.data && typeof response.data === 'object' && 'averageTime' in response.data) {
            return parseFloat(response.data.averageTime) || 0;
        }
        if (typeof response.data === 'string') return parseFloat(response.data) || 0;
        return 0;
    }

    async getCourseStudentsCount(courseId: string): Promise<number> {
        const response = await this.expertApi.expertStatisticsCourseCourseIdStudentsCountGet(courseId);
        return parseInt(response.data, 10) || 0;
    }

    async getStudentsOverallStats(): Promise<string> {
        const response = await this.expertApi.expertStatisticsStudentsOverallGet();
        return response.data;
    }

    // ============ USER STATS (/users/{userId}/stats) ============
    // Local DTOs mirroring backend Kotlin models (subset of fields we use)
    // If OpenAPI spec updates later these can be removed in favor of generated types.
    async getUserStats(userId: string): Promise<UserStatsDTO | null> {
        try {
            const response = await axiosInstance.get(`/users/${userId}/stats`);
            return response.data as UserStatsDTO;
        } catch (error) {
            console.error(`Ошибка загрузки статистики пользователя ${userId}:`, error);
            return null;
        }
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
        try {
            // Fallback: if delete endpoint not generated, ignore.
            // @ts-ignore
            if (this.contentApi.contentReportsReportIdDelete) {
                // @ts-ignore
                await this.contentApi.contentReportsReportIdDelete(reportId);
            }
        } catch (e) {
            console.warn('Delete report not supported by current API client');
        }
    }
}

export default new ExpertService();

// ---- Lightweight Type Definitions for User Stats (manual) ----
// Based on backend models:
// UserStatsDTO -> courses: List<CourseStatsDTO>
// CourseStatsDTO -> courseProgress?: CourseProgressDTO, sections: List<SectionProgressDTO>
export interface SectionProgressDTO {
    userId: string;
    sectionId: string;
    solvedTasks: number;
    totalTasks: number;
    percent: number;
    averageTimeMs: number;
    updatedAt: string; // ISO Instant
}

export interface CourseProgressDTO {
    userId: string;
    courseId: string;
    solvedTasks: number;
    totalTasks: number;
    percent: number;
    averageTimeMs: number;
    updatedAt: string; // ISO Instant
}

export interface CourseStatsDTO {
    courseId: string;
    courseProgress?: CourseProgressDTO | null;
    sections: SectionProgressDTO[];
}

export interface UserStatsDTO {
    userId: string;
    courses: CourseStatsDTO[];
}