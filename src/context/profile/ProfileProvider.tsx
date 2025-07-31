import {type ReactNode} from "react";
import {
    type CreateStaffProfileRequest,
    type CreateUserProfileRequest,
    type MediaFileMeta,
    type StaffProfileResponse,
    type UpdateStaffProfileRequest,
    type UpdateUserProfileRequest,
    type UserLanguageSkillRequest,
    type UserProfileResponse,
} from "../../api";
import {ProfileContext} from "./ProfileContext.ts";
import {profileApi} from "../../instances/profileApiInstance";
import {mediaService} from "../../services/MediaService.ts";

type ProfileProviderProps = {
    children: ReactNode;
};
export type ProfileContextType = {
    getStaffProfiles: () => Promise<StaffProfileResponse>;
    getStaffProfileById: (id: string) => Promise<StaffProfileResponse>;
    updateStaffProfileById: (id: string, data: UpdateStaffProfileRequest) => Promise<StaffProfileResponse>;
    createStaffProfile: (data: CreateStaffProfileRequest) => Promise<StaffProfileResponse>;
    updateStaffProfile: (data: UpdateStaffProfileRequest) => Promise<StaffProfileResponse>;

    getUserProfiles: () => Promise<UserProfileResponse>;
    getUserProfileById: (id: string) => Promise<UserProfileResponse>;
    updateUserProfileById: (id: string, data: UpdateUserProfileRequest) => Promise<UserProfileResponse>;
    createUserProfile: (data: CreateUserProfileRequest) => Promise<UserProfileResponse>;
    updateUserProfile: (data: UpdateUserProfileRequest) => Promise<UserProfileResponse>;

    addUserLanguageSkill: (data: UserLanguageSkillRequest) => Promise<string>;

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

    const getStaffProfileById = async (id: string) => {
        const {data} = await profileApi.profilesStaffIdGet(id);
        return data;
    };

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

    // User endpoints
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

    const addUserLanguageSkill = async (req: UserLanguageSkillRequest) => {
        const {data} = await profileApi.profilesUserUserLanguageSkillsPost(req);
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
        return `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/media/${mediaId}`;
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
                addUserLanguageSkill,
                uploadAvatar,
                getAvatarUrl,
                updateAvatar,
                deleteAvatar,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}