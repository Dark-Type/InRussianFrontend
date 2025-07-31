// src/context/UseAdmin.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
    id: string;
    email: string;
    role: 'STUDENT' | 'CONTENT_MANAGER' | 'ADMIN' | 'EXPERT';
    name: string;
    surname: string;
    patronymic?: string;
    phone?: string;
    birthDate?: string;
    registrationDate: string;
    lastActive: string;
    isActive: boolean;
    studentId?: string;
    group?: string;
    course?: string;
    department?: string;
    position?: string;
}

export interface CourseStats {
    id: string;
    name: string;
    enrolledUsers: number;
    completedUsers: number;
    averageProgress: number;
    averageTimeSpent: number;
}

export interface AdminStats {
    totalUsers: number;
    usersByRole: {
        students: number;
        staff: number;
        admins: number;
    };
    activeUsers: number;
    newUsersThisMonth: number;
    courses: CourseStats[];
}

interface AdminContextType {
    users: UserProfile[];
    stats: AdminStats;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    updateUser: (id: string, updates: Partial<UserProfile>) => void;
    getFilteredUsers: () => UserProfile[];
    getCourseUsers: (courseId: string) => UserProfile[];
    getStatsForPeriod: (startDate: string, endDate: string) => AdminStats;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock данные
const mockUsers: UserProfile[] = [
    {
        id: '1',
        email: 'ivan.petrov@example.com',
        role: 'STUDENT',
        name: 'Иван',
        surname: 'Иванов',
        patronymic: 'Иванович',
        phone: '+7 (999) 123-45-67',
        birthDate: '1995-03-15',
        registrationDate: '2024-01-15',
        lastActive: '2024-12-01',
        isActive: true,
        studentId: 'ST001',
        group: 'РКИ-101',
        course: 'Базовый русский язык'
    },
    {
        id: '2',
        email: 'maria.teacher@example.com',
        role: 'EXPERT',
        name: 'Иван',
        surname: 'Иванов',
        patronymic: 'Иванович',
        phone: '+7 (999) 234-56-78',
        registrationDate: '2023-09-01',
        lastActive: '2024-12-02',
        isActive: true,
        department: 'Филология',
        position: 'Преподаватель'
    },
    {
        id: '3',
        email: 'admin@example.com',
        role: 'ADMIN',
        name: 'AdminName',
        surname: 'AdminSurname',
        registrationDate: '2023-01-01',
        lastActive: '2024-12-02',
        isActive: true
    }
];

const mockCourses: CourseStats[] = [
    {
        id: '1',
        name: 'Базовый русский язык',
        enrolledUsers: 25,
        completedUsers: 8,
        averageProgress: 65,
        averageTimeSpent: 120
    },
    {
        id: '2',
        name: 'Продвинутый русский язык',
        enrolledUsers: 15,
        completedUsers: 5,
        averageProgress: 45,
        averageTimeSpent: 180
    }
];

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<UserProfile[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');

    const updateUser = (id: string, updates: Partial<UserProfile>) => {
        setUsers(prev => prev.map(user =>
            user.id === id ? { ...user, ...updates } : user
        ));
    };

    const getFilteredUsers = () => {
        if (!searchTerm) return users;
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const getCourseUsers = (courseId: string) => {
        return users.filter(user => user.role === 'student');
    };

    const getStatsForPeriod = (startDate: string, endDate: string): AdminStats => {
        return {
            totalUsers: users.length,
            usersByRole: {
                students: users.filter(u => u.role === 'student').length,
                staff: users.filter(u => u.role === 'staff').length,
                admins: users.filter(u => u.role === 'admin').length
            },
            activeUsers: users.filter(u => u.isActive).length,
            newUsersThisMonth: users.filter(u =>
                new Date(u.registrationDate) > new Date('2024-11-01')
            ).length,
            courses: mockCourses
        };
    };

    const stats = getStatsForPeriod('2024-01-01', '2024-12-31');

    return (
        <AdminContext.Provider value={{
            users,
            stats,
            searchTerm,
            setSearchTerm,
            updateUser,
            getFilteredUsers,
            getCourseUsers,
            getStatsForPeriod
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};