import {
    AdminApi,
    Configuration,
    type StaffRegisterRequest,
    type CreateStaffProfileRequest,
    type UpdateStaffProfileRequest,
    type CreateUserProfileRequest,
    type UpdateUserProfileRequest,
    type UpdateUserRequest,
    type UserStatusEnum,
    type UserSystemLanguageEnum,
    type UserLanguageSkillRequest, type UserProfile,
} from '../api'
import {profileApi} from '../instances/profileApiInstance.ts';
import {axiosInstance} from "../instances/axiosInstance.ts";
import type { UserLanguageSkill } from '../context/expert/ExpertProvider.tsx'

const adminApi = new AdminApi(
    new Configuration({basePath: axiosInstance.defaults.baseURL}),
    undefined,
    axiosInstance
);

const validateSystemLanguage = (language: string): UserSystemLanguageEnum => {
    const validLanguages = ['RUSSIAN', 'UZBEK', 'CHINESE', 'HINDI', 'TAJIK', 'ENGLISH'];
    if (validLanguages.includes(language)) {
        return language as UserSystemLanguageEnum;
    }
    return 'RUSSIAN' as UserSystemLanguageEnum; // Значение по умолчанию
};

export const AdminService = {
    getCourseStatistics(courseId: string) {
        return adminApi.adminStatisticsCourseCourseIdGet(courseId);
    },
    async getStudentProfile(userId: string): Promise<UserProfile | null> {
        try {
            const response = await profileApi.profilesUserIdGet(userId);
            return response.data?.profile || null;
        } catch (error) {
            console.error(`Ошибка загрузки профиля студента ${userId}:`, error);
            return null;
        }
    },

    async getStudentLanguageSkills(userId: string): Promise<UserLanguageSkill[]> {
        try {
            const response = await profileApi.profilesUserLanguageSkillsGet(userId);

            if (!response.data) {
                return [];
            }

            if (Array.isArray(response.data)) {
                return response.data;
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
    },
    getOverallStatistics() {
        return adminApi.adminStatisticsOverallGet();
    },
    getCourseStudentsStatistics(courseId: string) {
        return adminApi.adminStatisticsStudentsCourseCourseIdGet(courseId);
    },
    getOverallStudentsStatistics() {
        return adminApi.adminStatisticsStudentsOverallGet();
    },

    getUsersCount(role?: string, createdFrom?: string, createdTo?: string) {
        return adminApi.adminUsersCountGet(role, createdFrom, createdTo);
    },
    getUsers(page?: number, size?: number, role?: string, sortBy?: string, sortOrder?: string, createdFrom?: string, createdTo?: string) {
        return adminApi.adminUsersGet(page, size, role, sortBy, sortOrder, createdFrom, createdTo);
    },
    createStaffUser(staffRegisterRequest: StaffRegisterRequest) {
        return adminApi.adminUsersStaffPost(staffRegisterRequest);
    },
    getUserById(userId: string) {
        return adminApi.adminUsersUserIdGet(userId);
    },
    changeUserStatus(userId: string, status: UserStatusEnum) {
        return adminApi.adminUsersUserIdStatusPut(userId, status);
    },

    updateUserBase(updateUserRequest: UpdateUserRequest, targetUserId?: string) {
        return profileApi.profilesUserBasePut(updateUserRequest, targetUserId);
    },
    updateUser(userId: string, updateUserRequest: UpdateUserRequest) {
        if (updateUserRequest.systemLanguage) {
            updateUserRequest.systemLanguage = validateSystemLanguage(updateUserRequest.systemLanguage);
        }
        return this.updateUserBase(updateUserRequest, userId);
    },

    getStaffProfile(userId: string) {
        return profileApi.profilesStaffIdGet(userId);
    },
    createStaffProfile(createStaffProfileRequest: CreateStaffProfileRequest, targetUserId?: string) {
        return profileApi.profilesStaffPost(createStaffProfileRequest, targetUserId);
    },
    updateStaffProfile(userId: string, updateStaffProfileRequest: UpdateStaffProfileRequest) {
        return profileApi.profilesStaffIdPut(userId, updateStaffProfileRequest);
    },
    getCurrentStaffProfile() {
        return profileApi.profilesStaffGet();
    },
    updateCurrentStaffProfile(updateStaffProfileRequest: UpdateStaffProfileRequest) {
        return profileApi.profilesStaffPut(updateStaffProfileRequest);
    },

    getUserProfile(userId: string) {
        return profileApi.profilesUserIdGet(userId);
    },
    createUserProfile(createUserProfileRequest: CreateUserProfileRequest, targetUserId?: string) {
        return profileApi.profilesUserPost(createUserProfileRequest, targetUserId);
    },
    updateUserProfile(userId: string, updateUserProfileRequest: UpdateUserProfileRequest) {
        return profileApi.profilesUserIdPut(userId, updateUserProfileRequest);
    },
    getCurrentUserProfile() {
        return profileApi.profilesUserGet();
    },
    updateCurrentUserProfile(updateUserProfileRequest: UpdateUserProfileRequest) {
        return profileApi.profilesUserPut(updateUserProfileRequest);
    },

    getUserLanguageSkills(targetUserId?: string) {
        return profileApi.profilesUserLanguageSkillsGet(targetUserId);
    },
    createUserLanguageSkill(userLanguageSkillRequest: UserLanguageSkillRequest, targetUserId?: string) {
        return profileApi.profilesUserLanguageSkillsPost(userLanguageSkillRequest, targetUserId);
    },
    updateUserLanguageSkill(skillId: string, userLanguageSkillRequest: UserLanguageSkillRequest, targetUserId?: string) {
        return profileApi.profilesUserLanguageSkillsSkillIdPut(skillId, userLanguageSkillRequest, targetUserId);
    },
    deleteUserLanguageSkill(skillId: string, targetUserId?: string) {
        return profileApi.profilesUserLanguageSkillsSkillIdDelete(skillId, targetUserId);
    },

    getUserAvatar(userId: string) {
        return profileApi.profilesAvatarUserIdGet(userId);
    },

    createInitialAdmin() {
        return adminApi.authAdminCreateInitialPost();
    },

    /** @deprecated Используйте updateStaffProfile */
    updateStaffProfileLegacy(userId: string, updateStaffProfileRequest: UpdateStaffProfileRequest) {
        return this.updateStaffProfile(userId, updateStaffProfileRequest);
    },

    /** @deprecated Используйте updateUserProfile */
    updateUserProfileLegacy(userId: string, updateUserProfileRequest: UpdateUserProfileRequest) {
        return this.updateUserProfile(userId, updateUserProfileRequest);
    },

    async updateUserStatus(userId: string, status: string): Promise<void> {
        try {
            const validStatuses = ['ACTIVE', 'DEACTIVATED', 'SUSPENDED', 'PENDING_VERIFICATION'];
            const validatedStatus = validStatuses.includes(status) ? status : 'PENDING_VERIFICATION';

            const statusRequest = { status: validatedStatus };

            await adminApi.adminUsersUserIdStatusPut(userId, statusRequest);
        } catch (error) {
            console.error(`Ошибка обновления статуса пользователя ${userId}:`, error);
            throw error;
        }
    }
};