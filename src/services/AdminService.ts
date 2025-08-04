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
    type UserLanguageSkillRequest,
} from '../api';
import {profileApi} from '../instances/profileApiInstance.ts';
import { axiosInstance } from "../instances/axiosInstance.ts";

const adminApi = new AdminApi(
    new Configuration({ basePath: axiosInstance.defaults.baseURL }),
    undefined,
    axiosInstance
);



export const AdminService = {
    getCourseStatistics(courseId: string) {
        return adminApi.adminStatisticsCourseCourseIdGet(courseId);
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

    /** @deprecated Используйте changeUserStatus */
    updateUserStatus(userId: string, status: string) {
        return this.changeUserStatus(userId, status as UserStatusEnum);
    }
};