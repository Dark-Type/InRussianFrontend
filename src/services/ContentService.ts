import {ContentApi} from '../api';
import {axiosInstance} from '../instances/axiosInstance.ts';

import type {
    Course as ApiCourse,
    CreateCourseRequest,
    UpdateCourseRequest,
    CreateSectionRequest,
    UpdateSectionRequest,
    CreateThemeRequest,
    UpdateThemeRequest,
    Section as ApiSection,
    Theme as ApiTheme,
    CreateReportRequest,
    Report
} from '../api';
import type {AxiosResponse} from 'axios';
import type {Course, Section, Theme} from '../context/content/ContentContext.tsx';

class ContentService {
    private api: ContentApi;

    constructor() {
        this.api = new ContentApi(undefined, undefined, axiosInstance);
    }

    // ============ COURSES ============
    async getAllCourses(): Promise<Course[]> {
        const response: AxiosResponse<ApiCourse[]> = await this.api.contentCoursesGet();
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
        const response: AxiosResponse<ApiCourse> = await this.api.contentCoursesCourseIdGet(courseId);
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

    async createCourse(name: string, description: string = '', authorUrl: string, language: string = 'RUSSIAN', isPublished: boolean = false): Promise<Course> {
        const courseData: CreateCourseRequest = {
            name,
            description,
            authorUrl,
            language,
            isPublished,
        };
        const response: AxiosResponse<ApiCourse> = await this.api.contentCoursesPost(courseData);
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
        const response: AxiosResponse<ApiCourse> = await this.api.contentCoursesCourseIdPut(courseId, courseData);
        return response.data;
    }

    async deleteCourse(courseId: string): Promise<void> {
        await this.api.contentCoursesCourseIdDelete(courseId);
    }

    // ============ SECTIONS ============
    async getSectionsByCourse(courseId: string): Promise<Section[]> {
        const response: AxiosResponse<ApiSection[]> = await this.api.contentSectionsByCourseCourseIdGet(courseId);
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
        const response: AxiosResponse<ApiSection> = await this.api.contentSectionsSectionIdGet(sectionId);
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
        const response: AxiosResponse<ApiSection> = await this.api.contentSectionsPost(sectionData);
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
        const response: AxiosResponse<ApiSection> = await this.api.contentSectionsSectionIdPut(sectionId, sectionData);
        return response.data;
    }

    async deleteSection(sectionId: string): Promise<void> {
        await this.api.contentSectionsSectionIdDelete(sectionId);
    }

    // ============ THEMES ============
    async getThemesBySection(sectionId: string): Promise<Theme[]> {
        const response: AxiosResponse<ApiTheme[]> = await this.api.contentThemesBySectionSectionIdGet(sectionId);
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
        const response: AxiosResponse<ApiTheme> = await this.api.contentThemesThemeIdGet(themeId);
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
        const response: AxiosResponse<ApiTheme> = await this.api.contentThemesPost(themeData);
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
        const response: AxiosResponse<ApiTheme> = await this.api.contentThemesThemeIdPut(themeId, themeData);
        return response.data;
    }

    async deleteTheme(themeId: string): Promise<void> {
        await this.api.contentThemesThemeIdDelete(themeId);
    }

    // ============ REPORTS ============
    async getAllReports(): Promise<Report[]> {
        const response: AxiosResponse<Report[]> = await this.api.contentReportsGet();
        return response.data;
    }

    async getReportById(reportId: string): Promise<Report> {
        const response: AxiosResponse<Report> = await this.api.contentReportsReportIdGet(reportId);
        return response.data;
    }

    async createReport(reportData: CreateReportRequest): Promise<Report> {
        const response: AxiosResponse<Report> = await this.api.contentReportsPost(reportData);
        return response.data;
    }

    async deleteReport(reportId: string): Promise<void> {
        await this.api.contentReportsReportIdDelete(reportId);
    }

    // ============ STATS ============
    async getContentStats(): Promise<unknown> {
        const response: AxiosResponse<unknown> = await this.api.contentStatsGet();
        return response.data;
    }

    async getTasksCountByCourse(courseId: string): Promise<number> {
        const response: AxiosResponse<{
            count: number
        }> = await this.api.contentStatsCourseCourseIdTasksCountGet(courseId);
        return response.data.count;
    }

    async getTasksCountBySection(sectionId: string): Promise<number> {
        const response: AxiosResponse<{
            count: number
        }> = await this.api.contentStatsSectionSectionIdTasksCountGet(sectionId);
        return response.data.count;
    }

    async getTasksCountByTheme(themeId: string): Promise<number> {
        const response: AxiosResponse<{
            count: number
        }> = await this.api.contentStatsThemeThemeIdTasksCountGet(themeId);
        return response.data.count;
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
}

export default new ContentService();