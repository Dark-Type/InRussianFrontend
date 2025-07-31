import React, {createContext, ReactNode, useState} from 'react';
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

interface ExpertContextType {
    courses: ExpertCourse[];
    sections: { [courseId: string]: ExpertSection[] };
    themes: { [sectionId: string]: ExpertTheme[] };
    studentProgress: StudentProgress[];
    courseStatistics: { [courseId: string]: CourseStatistics };
    searchTerm: string;
    selectedCourse: string;
    setSearchTerm: (term: string) => void;
    setSelectedCourse: (courseId: string) => void;
    loadCourses: () => Promise<void>;
    loadSections: (courseId: string) => Promise<void>;
    loadThemes: (sectionId: string) => Promise<void>;
    loadStudentProgress: (courseId?: string) => Promise<void>;
    loadCourseStatistics: (courseId: string) => Promise<void>;
    getFilteredStudentProgress: () => StudentProgress[];
    exportStudentProgressToExcel: (courseId?: string) => void;
    exportCourseStatisticsToExcel: (courseId: string) => void;
}

export const ExpertContext = createContext<ExpertContextType | undefined>(undefined);

// Mock данные
const mockCourses: ExpertCourse[] = [
    {
        id: '1',
        name: 'Базовый русский язык',
        description: 'Основы русского языка для начинающих',
        sectionsCount: 4,
        themesCount: 12,
        tasksCount: 48,
        enrolledStudents: 25
    },
    {
        id: '2',
        name: 'Продвинутый русский язык',
        description: 'Углубленное изучение русского языка',
        sectionsCount: 6,
        themesCount: 18,
        tasksCount: 72,
        enrolledStudents: 15
    }
];

const mockSections: { [courseId: string]: ExpertSection[] } = {
    '1': [
        {
            id: 's1',
            courseId: '1',
            name: 'Алфавит и произношение',
            description: 'Изучение русского алфавита',
            themesCount: 3,
            tasksCount: 12,
            averageProgress: 85
        },
        {
            id: 's2',
            courseId: '1',
            name: 'Базовая грамматика',
            description: 'Основы русской грамматики',
            themesCount: 4,
            tasksCount: 16,
            averageProgress: 72
        }
    ]
};

const mockStudentProgress: StudentProgress[] = [
    {
        userId: '1',
        courseId: '1',
        courseName: 'Базовый русский язык',
        lastActive: '2024-12-02T10:30:00Z',
        totalTimeSpent: 450,
        overallProgress: 78,
        sectionProgress: [
            {
                sectionId: 's1',
                sectionName: 'Алфавит и произношение',
                testingProgress: 90,
                learningProgress: 85
            },
            {
                sectionId: 's2',
                sectionName: 'Базовая грамматика',
                testingProgress: 70,
                learningProgress: 65
            }
        ],
        profile: {
            userId: '1',
            surname: 'Петров',
            name: 'Иван',
            patronymic: 'Сергеевич',
            email: 'ivan.petrov@example.com',
            gender: 'MALE',
            dob: '1995-03-15',
            dor: '2024-01-15',
            citizenship: 'Российская Федерация',
            nationality: 'русский',
            countryOfResidence: 'Россия',
            cityOfResidence: 'Москва',
            education: 'Высшее',
            purposeOfRegister: 'Изучение языка'
        },
        languageSkills: [
            {
                language: 'Английский',
                understands: true,
                speaks: true,
                reads: true,
                writes: false
            },
            {
                language: 'Хинди',
                understands: false,
                speaks: false,
                reads: false,
                writes: false
            }
        ]
    },
    {
        userId: '2',
        courseId: '1',
        courseName: 'Базовый русский язык',
        lastActive: '2024-12-01T14:20:00Z',
        totalTimeSpent: 320,
        overallProgress: 65,
        sectionProgress: [
            {
                sectionId: 's1',
                sectionName: 'Алфавит и произношение',
                testingProgress: 80,
                learningProgress: 75
            },
            {
                sectionId: 's2',
                sectionName: 'Базовая грамматика',
                testingProgress: 50,
                learningProgress: 55
            }
        ],
        profile: {
            userId: '2',
            surname: 'Смит',
            name: 'Джон',
            email: 'john.smith@example.com',
            gender: 'MALE',
            dob: '1992-07-22',
            dor: '2024-02-01',
            citizenship: 'США',
            nationality: 'американец',
            countryOfResidence: 'США',
            cityOfResidence: 'Нью-Йорк',
            education: 'Высшее',
            purposeOfRegister: 'Деловое общение'
        },
        languageSkills: [
            {
                language: 'Английский',
                understands: true,
                speaks: true,
                reads: true,
                writes: true
            }
        ]
    }
];

export const ExpertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [courses, setCourses] = useState<ExpertCourse[]>([]);
    const [sections, setSections] = useState<{ [courseId: string]: ExpertSection[] }>({});
    const [themes, setThemes] = useState<{ [sectionId: string]: ExpertTheme[] }>({});
    const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
    const [courseStatistics, setCourseStatistics] = useState<{ [courseId: string]: CourseStatistics }>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const loadCourses = async () => {
        setCourses(mockCourses);
    };

    const loadSections = async (courseId: string) => {
        setSections(prev => ({
            ...prev,
            [courseId]: mockSections[courseId] || []
        }));
    };

    const loadThemes = async (sectionId: string) => {
        // Mock themes data
        const mockThemes = [
            {
                id: 't1',
                sectionId,
                name: 'Согласные буквы',
                description: 'Изучение согласных звуков',
                tasksCount: 4,
                averageProgress: 88,
                averageTimeSpent: 25
            }
        ];

        setThemes(prev => ({
            ...prev,
            [sectionId]: mockThemes
        }));
    };

    const loadStudentProgress = async (courseId?: string) => {
        const filtered = courseId
            ? mockStudentProgress.filter(p => p.courseId === courseId)
            : mockStudentProgress;
        setStudentProgress(filtered);
    };

    const loadCourseStatistics = async (courseId: string) => {
        const mockStats: CourseStatistics = {
            courseId,
            courseName: mockCourses.find(c => c.id === courseId)?.name || '',
            totalStudents: 25,
            activeStudents: 20,
            averageProgress: 72,
            averageTimeSpent: 385,
            completionRate: 32,
            sections: [
                {
                    sectionId: 's1',
                    sectionName: 'Алфавит и произношение',
                    averageProgress: 85,
                    themes: [
                        {
                            themeId: 't1',
                            themeName: 'Согласные буквы',
                            averageProgress: 88,
                            averageTimeSpent: 25
                        }
                    ]
                }
            ]
        };

        setCourseStatistics(prev => ({
            ...prev,
            [courseId]: mockStats
        }));
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

