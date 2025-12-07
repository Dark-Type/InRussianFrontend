import {type ReactNode, useCallback} from "react";
import {
    type CreateStaffProfileRequest,
    type CreateUserProfileRequest,
    type MediaFileMeta,
    type StaffProfile,
    type StaffProfileResponse,
    type UpdateStaffProfileRequest,
    type UpdateUserProfileRequest,
    type UserLanguageSkillRequest,
    type UserProfileResponse,
} from "../../api";
import {ProfileContext} from "./ProfileContext.ts";
import {profileApi} from "../../instances/profileApiInstance";
import {mediaService} from "../../services/MediaService.ts";
import {axiosInstance} from "../../instances/axiosInstance";

export interface UpdateUserBaseProfileRequest {
    phone?: string;
    role?: string;
    systemLanguage?: string;
    avatarId?: string;
    surname?: string;
    name?: string;
    patronymic?: string;
    status?: string;
}

type ProfileProviderProps = {
    children: ReactNode;
};
export type ProfileContextType = {
    getStaffProfiles: () => Promise<StaffProfileResponse>;
    getStaffProfileById: (id: string) => Promise<StaffProfile>;
    updateStaffProfileById: (id: string, data: UpdateStaffProfileRequest) => Promise<StaffProfileResponse>;
    createStaffProfile: (data: CreateStaffProfileRequest) => Promise<StaffProfileResponse>;
    updateStaffProfile: (data: UpdateStaffProfileRequest) => Promise<StaffProfileResponse>;

    getUserProfiles: () => Promise<UserProfileResponse>;
    getUserProfileById: (id: string) => Promise<UserProfileResponse>;
    updateUserProfileById: (id: string, data: UpdateUserProfileRequest) => Promise<UserProfileResponse>;
    createUserProfile: (data: CreateUserProfileRequest) => Promise<UserProfileResponse>;
    updateUserProfile: (data: UpdateUserProfileRequest) => Promise<UserProfileResponse>;

    updateUserBaseProfile: (userId: string, data: UpdateUserBaseProfileRequest) => Promise<void>;

    addUserLanguageSkill: (data: UserLanguageSkillRequest) => Promise<string>;

    getAvatarIdByUserId: (userId: string) => Promise<string>;
    uploadAvatar: (file: File, userId?: string) => Promise<MediaFileMeta>;
    getAvatarUrl: (mediaId: string) => string;
    updateAvatar: (mediaId: string, file: File, userId?: string) => Promise<MediaFileMeta>;
    deleteAvatar: (mediaId: string, userId?: string) => Promise<void>;
};

export function ProfileProvider({children}: ProfileProviderProps) {

    const getStaffProfiles = async () => {
        const {data} = await profileApi.profilesStaffGet();
        return data;
    };
    const getAvatarIdByUserId = async (userId: string): Promise<string> => {
        const { data } = await profileApi.profilesAvatarUserIdGet(userId);
        if (typeof data === "string") return data;
        return (data as { avatarId?: string })?.avatarId || "";
    };

    const getStaffProfileById = useCallback(async (id: string): Promise<StaffProfile> => {
        const {data} = await profileApi.profilesStaffIdGet(id);
        return data.profile;
    }, []);
    const updateStaffProfileById = async (id: string, req: UpdateStaffProfileRequest) => {
        const {data} = await profileApi.profilesStaffIdPut(id, req);
        return data;
    };

    const createStaffProfile = async (req: CreateStaffProfileRequest) => {
        const {data} = await profileApi.profilesStaffPost(req);
        return data;
    };

    const updateStaffProfile = async (req: UpdateStaffProfileRequest) => {
        const {data} = await profileApi.profilesStaffPut(req);
        return data;
    };

    const getUserProfiles = async () => {
        const {data} = await profileApi.profilesUserGet();
        return data;
    };

    const getUserProfileById = async (id: string) => {
        const {data} = await profileApi.profilesUserIdGet(id);
        return data;
    };

    const updateUserProfileById = async (id: string, req: UpdateUserProfileRequest) => {
        const {data} = await profileApi.profilesUserIdPut(id, req);
        return data;
    };

    const createUserProfile = async (req: CreateUserProfileRequest) => {
        const {data} = await profileApi.profilesUserPost(req);
        return data;
    };

    const updateUserProfile = async (req: UpdateUserProfileRequest) => {
        const {data} = await profileApi.profilesUserPut(req);
        return data;
    };

    const updateUserBaseProfile = async (userId: string, req: UpdateUserBaseProfileRequest) => {
        await axiosInstance.put(`/profiles/user/base?targetUserId=${userId}`, req);
    };

    const addUserLanguageSkill = async (req: UserLanguageSkillRequest) => {
        const {data} = await profileApi.profilesUserLanguageSkillsPost(req);
        return data;
    };
    const uploadAvatar = async (file: File, userId?: string): Promise<MediaFileMeta> => {
        const fileName = file.name;
        const mimeType = file.type;
        const fileSize = file.size;
        const fileType = "AVATAR";

        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("mimeType", mimeType);
        formData.append("fileSize", fileSize.toString());
        formData.append("fileType", fileType);

        return await mediaService.uploadMediaWithMeta(formData, userId);
    };

    const getAvatarUrl = (mediaId: string): string => {
        return `${import.meta.env.VITE_API_URL || "/api"}/media/${mediaId}`;
    };

    const updateAvatar = async (mediaId: string, file: File, userId?: string): Promise<MediaFileMeta> => {
        const fileName = file.name;
        const mimeType = file.type;
        const fileSize = file.size;
        const fileType = "AVATAR";

        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("mimeType", mimeType);
        formData.append("fileSize", fileSize.toString());
        formData.append("fileType", fileType);

        return await mediaService.updateMediaWithMeta(mediaId, formData, userId);
    };

    const deleteAvatar = async (mediaId: string, userId?: string): Promise<void> => {
        await mediaService.deleteMedia(mediaId, userId);
    };


    return (
        <ProfileContext.Provider
            value={{
                getStaffProfiles,
                getStaffProfileById,
                updateStaffProfileById,
                createStaffProfile,
                updateStaffProfile,
                getUserProfiles,
                getUserProfileById,
                updateUserProfileById,
                createUserProfile,
                updateUserProfile,
                updateUserBaseProfile,
                addUserLanguageSkill,
                uploadAvatar,
                getAvatarUrl,
                updateAvatar,
                deleteAvatar,
                getAvatarIdByUserId,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}