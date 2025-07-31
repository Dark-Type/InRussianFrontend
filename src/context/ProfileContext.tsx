import React, { createContext, useMemo } from 'react';
import { Configuration, type CreateStaffProfileRequest, ProfileApi } from '../api';
import { axiosInstance } from '../axiosInstance.ts';

type ProfileContextType = {
    createStaffProfile: (data: CreateStaffProfileRequest) => Promise<void>;
};

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const profileApi = useMemo(() => new ProfileApi(
        new Configuration({
            basePath: import.meta.env.VITE_API_URL || 'http://localhost:8080',
        }),
        undefined,
        axiosInstance
    ), []);

    const createStaffProfile = async (data: CreateStaffProfileRequest) => {
        console.log('Creating staff profile with token:', localStorage.getItem('accessToken'));
        try {
            await profileApi.profilesStaffPost(data);
        } catch (error) {
            console.error('Failed to create staff profile:', error);
            throw error;
        }
    };

    return (
        <ProfileContext.Provider value={{ createStaffProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};