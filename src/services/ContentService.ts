import { ContentApi } from '../api';
import { axiosInstance } from '../axiosInstance.ts';
import type {
    Course as ApiCourse,
    CreateCourseRequest,
    UpdateCourseRequest,
    CreateSectionRequest,
    UpdateSectionRequest,
    CreateThemeRequest,
    UpdateThemeRequest,
    Section as ApiSection,
    Theme as ApiTheme
} from '../api';
import type { AxiosResponse } from 'axios';
import type { Course, Section, Theme } from '../context/ContentContext';

class ContentService {
    private api: ContentApi;

    constructor() {
        this.api = new ContentApi(undefined, undefined, axiosInstance);
    }

    // ============ COURSES ============
    async getAllCourses(): Promise<Course[]> {
        const response: AxiosResponse<unknown> = await this.api.contentCoursesGet();
        const apiCourses = response.data as ApiCourse[];

        const courses: Course[] = await Promise.all(
            apiCourses.map(async (apiCourse) => ({
                id: apiCourse.id,
                name: apiCourse.name,
                description: apiCourse.description,
                sectionsCount: await this.getTasksCountByCourse(apiCourse.id),
                themesCount: 0,
                tasksCount: await this.getTasksCountByCourse(apiCourse.id)
            }))
        );

        return courses;
    }

    async getCourseById(courseId: string): Promise<Course> {
        const response: AxiosResponse<unknown> = await this.api.contentCoursesCourseIdGet(courseId);
        const apiCourse = response.data as ApiCourse;

        return {
            id: apiCourse.id,
            name: apiCourse.name,
            description: apiCourse.description,
            sectionsCount: 0, // получим отдельным запросом если нужно
            themesCount: 0,
            tasksCount: await this.getTasksCountByCourse(courseId)
        };
    }

    async createCourse(name: string, description: string = '', authorUrl: string, language: string = 'RUSSIAN', isPublished: boolean = false): Promise<Course> {
        const courses = await this.getAllCourses();
        const orderNum = courses.length + 1;

        const courseData: CreateCourseRequest = {
            name,
            description,
            authorUrl,
            language,
            isPublished,
        };
        const response: AxiosResponse<unknown> = await this.api.contentCoursesPost(courseData);
        const apiCourse = response.data as ApiCourse;

        return {
            id: apiCourse.id,
            name: apiCourse.name,
            description: apiCourse.description,
            sectionsCount: 0,
            themesCount: 0,
            tasksCount: 0
        };
    }

    // ============ SECTIONS ============
    async getSectionsByCourse(courseId: string): Promise<Section[]> {
        const response: AxiosResponse<unknown> = await this.api.contentSectionsByCourseCourseIdGet(courseId);
        const apiSections = response.data as ApiSection[];

        const sections: Section[] = await Promise.all(
            apiSections.map(async (apiSection) => ({
                id: apiSection.id,
                courseId: apiSection.courseId,
                name: apiSection.name,
                description: apiSection.description,
                themesCount: 0, // получим отдельным запросом
                tasksCount: await this.getTasksCountBySection(apiSection.id)
            }))
        );

        return sections;
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
        const response: AxiosResponse<unknown> = await this.api.contentSectionsPost(sectionData);
        const apiSection = response.data as ApiSection;

        return {
            id: apiSection.id,
            courseId: apiSection.courseId,
            name: apiSection.name,
            description: apiSection.description,
            themesCount: 0,
            tasksCount: 0
        };
    }

    // ============ THEMES ============
    async getThemesBySection(sectionId: string): Promise<Theme[]> {
        const response: AxiosResponse<unknown> = await this.api.contentThemesBySectionSectionIdGet(sectionId);
        const apiThemes = response.data as ApiTheme[];

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

    async createTheme(sectionId: string, name: string, description: string = ''): Promise<Theme> {
        const themes = await this.getThemesBySection(sectionId);
        const orderNum = themes.length + 1;

        const themeData: CreateThemeRequest = {
            name,
            description,
            sectionId,
            orderNum
        };
        const response: AxiosResponse<unknown> = await this.api.contentThemesPost(themeData);
        const apiTheme = response.data as ApiTheme;

        return {
            id: apiTheme.id,
            sectionId: apiTheme.sectionId,
            name: apiTheme.name,
            description: apiTheme.description,
            tasksCount: 0
        };
    }
    // Остальные методы остаются без изменений
    async updateCourse(courseId: string, courseData: UpdateCourseRequest): Promise<ApiCourse> {
        const response: AxiosResponse<unknown> = await this.api.contentCoursesCourseIdPut(courseId, courseData);
        return response.data as ApiCourse;
    }

    async deleteCourse(courseId: string): Promise<void> {
        await this.api.contentCoursesCourseIdDelete(courseId);
    }

    async updateSection(sectionId: string, sectionData: UpdateSectionRequest): Promise<ApiSection> {
        const response: AxiosResponse<unknown> = await this.api.contentSectionsSectionIdPut(sectionId, sectionData);
        return response.data as ApiSection;
    }

    async deleteSection(sectionId: string): Promise<void> {
        await this.api.contentSectionsSectionIdDelete(sectionId);
    }

    async updateTheme(themeId: string, themeData: UpdateThemeRequest): Promise<ApiTheme> {
        const response: AxiosResponse<unknown> = await this.api.contentThemesThemeIdPut(themeId, themeData);
        return response.data as ApiTheme;
    }

    async deleteTheme(themeId: string): Promise<void> {
        await this.api.contentThemesThemeIdDelete(themeId);
    }

    // ============ STATS ============
    async getContentStats(): Promise<unknown> {
        const response: AxiosResponse<unknown> = await this.api.contentStatsGet();
        return response.data;
    }

    async getTasksCountByCourse(courseId: string): Promise<number> {
        const response: AxiosResponse<unknown> = await this.api.contentStatsCourseCourseIdTasksCountGet(courseId);
        const data = response.data as { count: number };
        return data.count;
    }

    async getTasksCountBySection(sectionId: string): Promise<number> {
        const response: AxiosResponse<unknown> = await this.api.contentStatsSectionSectionIdTasksCountGet(sectionId);
        const data = response.data as { count: number };
        return data.count;
    }

    async getTasksCountByTheme(themeId: string): Promise<number> {
        const response: AxiosResponse<unknown> = await this.api.contentStatsThemeThemeIdTasksCountGet(themeId);
        const data = response.data as { count: number };
        return data.count;
    }
}

export default new ContentService();