import {type ReactNode} from "react";
import {
    type CreateStaffProfileRequest,
    type UpdateStaffProfileRequest,
    type CreateUserProfileRequest,
    type UpdateUserProfileRequest,
    type UserLanguageSkillRequest,
    type StaffProfileResponse,
    type UserProfileResponse,
} from "../../api";
import {ProfileContext} from "./ProfileContext.ts";
import {profileApi} from "../../instances/profileApiInstance";

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

    // Language skills
    const addUserLanguageSkill = async (req: UserLanguageSkillRequest) => {
        const {data} = await profileApi.profilesUserUserLanguageSkillsPost(req);
        return data;
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
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}