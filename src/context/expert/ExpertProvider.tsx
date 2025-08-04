import React, {type ReactNode, useState} from 'react';
import {ExpertContext} from './ExpertContext';
import expertService from "../../services/ExpertService.ts";
import * as XLSX from 'xlsx';

export interface StudentProfile {
    userId: string;
    surname: string;
    name: string;
    patronymic?: string;
    email: string;
    gender: 'MALE' | 'FEMALE';
    dob: string;
    dor: string;
    citizenship?: string;
    nationality?: string;
    countryOfResidence?: string;
    cityOfResidence?: string;
    countryDuringEducation?: string;
    periodSpent?: string;
    kindOfActivity?: string;
    education?: string;
    purposeOfRegister?: string;
}

export interface UserLanguageSkill {
    language: string;
    understands: boolean;
    speaks: boolean;
    reads: boolean;
    writes: boolean;
}

export interface StudentProgress {
    userId: string;
    courseId: string;
    courseName: string;
    lastActive: string;
    totalTimeSpent: number;
    overallProgress: number;
    sectionProgress: {
        sectionId: string;
        sectionName: string;
        testingProgress: number;
        learningProgress: number;
    }[];
    profile: StudentProfile;
    languageSkills: UserLanguageSkill[];
}

export interface ExpertCourse {
    id: string;
    name: string;
    description: string;
    sectionsCount: number;
    themesCount: number;
    tasksCount: number;
    enrolledStudents: number;
}

export interface ExpertSection {
    id: string;
    courseId: string;
    name: string;
    description?: string;
    themesCount: number;
    tasksCount: number;
    averageProgress: number;
}

export interface ExpertTheme {
    id: string;
    sectionId: string;
    name: string;
    description?: string;
    tasksCount: number;
    averageProgress: number;
    averageTimeSpent: number;
}

export interface CourseStatistics {
    courseId: string;
    courseName: string;
    totalStudents: number;
    activeStudents: number;
    averageProgress: number;
    averageTimeSpent: number;
    completionRate: number;
    sections: {
        sectionId: string;
        sectionName: string;
        averageProgress: number;
        themes: {
            themeId: string;
            themeName: string;
            averageProgress: number;
            averageTimeSpent: number;
        }[];
    }[];
}



export const ExpertProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [courses, setCourses] = useState<ExpertCourse[]>([]);
    const [sections, setSections] = useState<{ [courseId: string]: ExpertSection[] }>({});
    const [themes, setThemes] = useState<{ [sectionId: string]: ExpertTheme[] }>({});
    const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
    const [courseStatistics, setCourseStatistics] = useState<{ [courseId: string]: CourseStatistics }>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const loadCourses = async () => {
        try {
            const coursesData = await expertService.getAllCourses();
            setCourses(coursesData);
        } catch (error) {
            console.error('Ошибка загрузки курсов:', error);
            setCourses([]);
        }
    };

    const loadSections = async (courseId: string) => {
        try {
            const sectionsData = await expertService.getSectionsByCourse(courseId);
            setSections(prev => ({
                ...prev,
                [courseId]: sectionsData
            }));
        } catch (error) {
            console.error('Ошибка загрузки секций:', error);
            setSections(prev => ({
                ...prev,
                [courseId]: []
            }));
        }
    };

    const loadThemes = async (sectionId: string) => {
        try {
            const themesData = await expertService.getThemesBySection(sectionId);
            setThemes(prev => ({
                ...prev,
                [sectionId]: themesData
            }));
        } catch (error) {
            console.error('Ошибка загрузки тем:', error);
            setThemes(prev => ({
                ...prev,
                [sectionId]: []
            }));
        }
    };

    const loadStudentProgress = async (courseId?: string) => {
        try {
            const progressData = await expertService.getStudentProgress(courseId);
            setStudentProgress(progressData);
        } catch (error) {
            console.error('Ошибка загрузки прогресса студентов:', error);
            setStudentProgress([]);
        }
    };

    const loadCourseStatistics = async (courseId: string) => {
        try {
            const statsData = await expertService.getCourseStatistics(courseId);
            setCourseStatistics(prev => ({
                ...prev,
                [courseId]: statsData
            }));
        } catch (error) {
            console.error('Ошибка загрузки статистики курса:', error);
        }
    };

    const getFilteredStudentProgress = () => {
        let filtered = studentProgress;

        if (selectedCourse) {
            filtered = filtered.filter(p => p.courseId === selectedCourse);
        }

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.profile.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.profile.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };
    const exportStudentProgressToExcel = (courseId?: string) => {
        const dataToExport = courseId
            ? studentProgress.filter(p => p.courseId === courseId)
            : getFilteredStudentProgress();

        if (!dataToExport || dataToExport.length === 0) {
            alert('Нет данных для экспорта');
            return;
        }

        const data = dataToExport.map(student => ({
            'ФИО Учащегося': `${student.profile.surname} ${student.profile.name} ${student.profile.patronymic || ''}`.trim(),
            'Почта': student.profile.email,
            'Дата последней активности': new Date(student.lastActive).toLocaleString('ru-RU'),
            'Общее время в курсе (минуты)': student.totalTimeSpent,
            'Общий прогресс (%)': student.overallProgress,
            'Курс': student.courseName,
            'Гражданство': student.profile.citizenship || '',
            'Национальность': student.profile.nationality || '',
            'Город проживания': student.profile.cityOfResidence || '',
            'Образование': student.profile.education || '',
            'Языковые навыки': student.languageSkills.map(skill =>
                `${skill.language}: ${[
                    skill.understands ? 'понимает' : '',
                    skill.speaks ? 'говорит' : '',
                    skill.reads ? 'читает' : '',
                    skill.writes ? 'пишет' : ''
                ].filter(Boolean).join(', ')}`
            ).join('; '),
            ...student.sectionProgress.reduce((acc, section, index) => ({
                ...acc,
                [`Раздел ${index + 1} (${section.sectionName}) - Тестирование (%)`]: section.testingProgress,
                [`Раздел ${index + 1} (${section.sectionName}) - Обучение (%)`]: section.learningProgress,
            }), {})
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Прогресс студентов');

        const fileName = `StudentProgress_${courseId ? `Course_${courseId}_` : ''}${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    const exportCourseStatisticsToExcel = (courseId: string) => {
        const stats = courseStatistics[courseId];

        if (!stats) {
            alert('Статистика курса не найдена');
            return;
        }

        const data = stats.sections.map(section => ({
            'Раздел': section.sectionName,
            'Средний прогресс (%)': section.averageProgress,
            ...section.themes.reduce((acc, theme, index) => ({
                ...acc,
                [`Тема ${index + 1} (${theme.themeName}) - Прогресс (%)`]: theme.averageProgress,
                [`Тема ${index + 1} (${theme.themeName}) - Время (минуты)`]: theme.averageTimeSpent,
            }), {})
        }));

        const summaryData = [{
            'Раздел': 'ОБЩАЯ СТАТИСТИКА',
            'Средний прогресс (%)': `Курс: ${stats.courseName}`,
            'Дополнительная информация': `Всего студентов: ${stats.totalStudents}, Активных: ${stats.activeStudents}, Средний прогресс: ${stats.averageProgress}%, Среднее время: ${stats.averageTimeSpent} мин`
        }];

        const worksheet = XLSX.utils.json_to_sheet([...summaryData, ...data]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Статистика курса');

        const fileName = `CourseStatistics_${courseId}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    return (
        <ExpertContext.Provider value={{
            courses,
            sections,
            themes,
            studentProgress,
            courseStatistics,
            searchTerm,
            selectedCourse,
            setSearchTerm,
            setSelectedCourse,
            loadCourses,
            loadSections,
            loadThemes,
            loadStudentProgress,
            loadCourseStatistics,
            getFilteredStudentProgress,
            exportStudentProgressToExcel,
            exportCourseStatisticsToExcel
        }}>
            {children}
        </ExpertContext.Provider>
    );
};

