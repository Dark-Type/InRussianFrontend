import {
    ExpertApi,
    ContentApi,
    Configuration,
    type User,
    type UserProfile,
    type UserLanguageSkillRequest,
    type Course,
    type Section,
    type Theme,
    type TaskWithDetails,
    type CountStats,
    type Report,
    type CreateReportRequest,
} from '../api';
import { axiosInstance } from '../instances/axiosInstance.ts';
import {profileApi} from "../instances/profileApiInstance.ts";

interface UserLanguageSkill {
    id?: string;
    language: string;
    understands: boolean;
    speaks: boolean;
    reads: boolean;
    writes: boolean;
}

interface StudentWithProfile extends User {
    profile?: UserProfile;
    languageSkills?: UserLanguageSkill[];
    avatarUrl?: string;
}

class ExpertService {
    private expertApi: ExpertApi;
    private profileApi: ProfileApi;
    private contentApi: ContentApi;

    constructor() {
        const config = new Configuration({ basePath: axiosInstance.defaults.baseURL });
        this.expertApi = new ExpertApi(config, undefined, axiosInstance);
        this.profileApi = profileApi;
        this.contentApi = new ContentApi(config, undefined, axiosInstance);
    }

    // ============ STUDENTS ============
    async getAllStudents(page?: number, size?: number, sortBy?: string, sortOrder?: string, createdFrom?: string, createdTo?: string): Promise<User[]> {
        const response = await this.expertApi.expertStudentsGet(page, size, sortBy, sortOrder, createdFrom, createdTo);
        return response.data;
    }

    async getStudentsCount(createdFrom?: string, createdTo?: string): Promise<number> {
        const response = await this.expertApi.expertStudentsCountGet(createdFrom, createdTo);
        return parseInt(response.data, 10) || 0;
    }

    // ============ STUDENT PROFILES ============
    async getStudentProfile(userId: string): Promise<UserProfile | null> {
        try {
            const response = await this.profileApi.profilesUserIdGet(userId);
            return response.data;
        } catch (error) {
            console.error(`Ошибка загрузки профиля студента ${userId}:`, error);
            return null;
        }
    }

    async getStudentLanguageSkills(userId: string): Promise<UserLanguageSkill[]> {
        try {
            const response = await this.profileApi.profilesUserLanguageSkillsGet(userId);
            if (response.data) {
                // Парсим строку JSON в массив, как в AdminService
                return JSON.parse(response.data as string) || [];
            }
            return [];
        } catch (error) {
            console.error(`Ошибка загрузки языковых навыков студента ${userId}:`, error);
            return [];
        }
    }

    // ============ STUDENTS WITH PROFILES ============
    async getStudentsWithProfiles(page?: number, size?: number): Promise<StudentWithProfile[]> {
        try {
            const students = await this.getAllStudents(page, size);

            const studentsWithProfiles = await Promise.all(
                students.map(async (student) => {
                    const enrichedStudent: StudentWithProfile = { ...student };

                    try {
                        const [profile, languageSkills] = await Promise.all([
                            this.getStudentProfile(student.id),
                            this.getStudentLanguageSkills(student.id)
                        ]);

                        enrichedStudent.profile = profile || undefined;
                        enrichedStudent.languageSkills = languageSkills;
                    } catch (error) {
                        console.error(`Ошибка загрузки данных студента ${student.id}:`, error);
                    }

                    return enrichedStudent;
                })
            );

            return studentsWithProfiles;
        } catch (error) {
            console.error('Ошибка загрузки студентов с профилями:', error);
            return [];
        }
    }

    // ============ COURSES ============
    async getAllCourses(): Promise<Course[]> {
        const response = await this.contentApi.contentCoursesGet();
        return response.data;
    }

    async getCourseById(courseId: string): Promise<Course> {
        const response = await this.contentApi.contentCoursesCourseIdGet(courseId);
        return response.data;
    }

    // ============ SECTIONS ============
    async getSectionsByCourse(courseId: string): Promise<Section[]> {
        const response = await this.contentApi.contentSectionsByCourseCourseIdGet(courseId);
        return response.data;
    }

    async getSectionById(sectionId: string): Promise<Section> {
        const response = await this.contentApi.contentSectionsSectionIdGet(sectionId);
        return response.data;
    }

    // ============ THEMES ============
    async getThemesBySection(sectionId: string): Promise<Theme[]> {
        const response = await this.contentApi.contentThemesBySectionSectionIdGet(sectionId);
        return response.data;
    }

    async getThemeById(themeId: string): Promise<Theme> {
        const response = await this.contentApi.contentThemesThemeIdGet(themeId);
        return response.data;
    }

    async getTasksByTheme(themeId: string): Promise<TaskWithDetails[]> {
        const response = await this.contentApi.contentThemesThemeIdTasksGet(themeId);
        return response.data;
    }

    // ============ TASKS ============
    async getTaskById(taskId: string): Promise<TaskWithDetails> {
        const response = await this.contentApi.contentTasksTaskIdGet(taskId);
        return response.data;
    }

    // ============ CONTENT STATISTICS ============
    async getContentStats(): Promise<CountStats> {
        const response = await this.contentApi.contentStatsGet();
        return response.data;
    }

    async getCourseTasksCount(courseId: string): Promise<number> {
        const response = await this.contentApi.contentStatsCourseCourseIdTasksCountGet(courseId);
        return parseInt(response.data, 10) || 0;
    }

    async getSectionTasksCount(sectionId: string): Promise<number> {
        const response = await this.contentApi.contentStatsSectionSectionIdTasksCountGet(sectionId);
        return parseInt(response.data, 10) || 0;
    }

    async getThemeTasksCount(themeId: string): Promise<number> {
        const response = await this.contentApi.contentStatsThemeThemeIdTasksCountGet(themeId);
        return parseInt(response.data, 10) || 0;
    }

    // ============ REPORTS ============
    async createReport(createReportRequest: CreateReportRequest): Promise<Report> {
        const response = await this.contentApi.contentReportsPost(createReportRequest);
        return response.data;
    }

    async getReportById(reportId: string): Promise<Report> {
        const response = await this.contentApi.contentReportsReportIdGet(reportId);
        return response.data;
    }

    // ============ EXPERT STATISTICS ============
    async getOverallAverageProgress(): Promise<number> {
        const response = await this.expertApi.expertStatisticsOverallAverageProgressGet();
        return parseFloat(response.data) || 0;
    }

    async getOverallAverageTime(): Promise<number> {
        const response = await this.expertApi.expertStatisticsOverallAverageTimeGet();
        return parseFloat(response.data) || 0;
    }

    async getCourseAverageProgress(courseId: string): Promise<number> {
        const response = await this.expertApi.expertStatisticsCourseCourseIdAverageProgressGet(courseId);
        return parseFloat(response.data) || 0;
    }

    async getCourseAverageTime(courseId: string): Promise<number> {
        const response = await this.expertApi.expertStatisticsCourseCourseIdAverageTimeGet(courseId);
        return parseFloat(response.data) || 0;
    }

    async getStudentsOverallCount(): Promise<number> {
        const response = await this.expertApi.expertStatisticsStudentsOverallGet();
        return parseInt(response.data, 10) || 0;
    }

    async getStudentsCountByCourse(courseId: string): Promise<number> {
        const response = await this.expertApi.expertStatisticsCourseCourseIdStudentsCountGet(courseId);
        return parseInt(response.data, 10) || 0;
    }

    // ============ COMPLEX DATA METHODS ============
    async getCourseWithSections(courseId: string): Promise<Course & { sections: Section[] }> {
        const [course, sections] = await Promise.all([
            this.getCourseById(courseId),
            this.getSectionsByCourse(courseId)
        ]);

        return { ...course, sections };
    }

    async getSectionWithThemes(sectionId: string): Promise<Section & { themes: Theme[] }> {
        const [section, themes] = await Promise.all([
            this.getSectionById(sectionId),
            this.getThemesBySection(sectionId)
        ]);

        return { ...section, themes };
    }

    async getThemeWithTasks(themeId: string): Promise<Theme & { tasks: TaskWithDetails[] }> {
        const [theme, tasks] = await Promise.all([
            this.getThemeById(themeId),
            this.getTasksByTheme(themeId)
        ]);

        return { ...theme, tasks };
    }

    async getCourseStructure(courseId: string): Promise<Course & {
        sections: (Section & {
            themes: (Theme & {
                tasks: TaskWithDetails[]
            })[]
        })[]
    }> {
        const course = await this.getCourseById(courseId);
        const sections = await this.getSectionsByCourse(courseId);

        const sectionsWithThemes = await Promise.all(
            sections.map(async (section) => {
                const themes = await this.getThemesBySection(section.id);

                const themesWithTasks = await Promise.all(
                    themes.map(async (theme) => {
                        const tasks = await this.getTasksByTheme(theme.id);
                        return { ...theme, tasks };
                    })
                );

                return { ...section, themes: themesWithTasks };
            })
        );

        return { ...course, sections: sectionsWithThemes };
    }

    // ============ АВАТАРЫ ============
    getStudentAvatar(userId: string) {
        return this.profileApi.profilesAvatarUserIdGet(userId);
    }
}

export default new ExpertService();