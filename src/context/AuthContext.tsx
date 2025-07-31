import React, { useEffect, useState } from 'react';
import {
    type CreateStaffProfileRequest,
    type LoginResponse,
    ProfileApi,
    type StaffRegisterRequest,
    type UserRoleEnum
} from '../api';
import {  Configuration, AuthApi } from '../api';
import { AuthContext } from './AuthContext.ts';
import { axiosInstance } from '../axiosInstance.ts';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<LoginResponse | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!token;

    const api = React.useMemo(() => {
        const config = new Configuration({
            basePath: import.meta.env.VITE_API_URL || 'http://localhost:8080',
        });
        return new AuthApi(config, undefined, axiosInstance);
    }, []);

    const setAuthTokens = (accessToken: string | null, refreshToken?: string | null) => {
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
        } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
        setToken(accessToken);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedToken && storedRefreshToken) {
            setToken(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            refreshUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const { data } = await api.authLoginPost({ email, password });
            setAuthTokens(data.accessToken, data.refreshToken);
            setUser(data.user);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
    };

    const refreshUser = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const { data } = await api.authMeGet();
            const user: LoginResponse = {
                id: data.user.id,
                email: data.user.email,
                role: data.user.role,
            };
            setUser(user);
        } catch (error) {
            console.error('Failed to refresh user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const registerWithStaffProfile = async (
        userData: StaffRegisterRequest,
        staffProfileData: CreateStaffProfileRequest
    ): Promise<UserRoleEnum> => {
        setLoading(true);
        try {
            const { data } = await api.authStaffRegisterPost(userData);
            setAuthTokens(data.accessToken, data.refreshToken);
            setUser(data.user);

            const profileApi = new ProfileApi(
                new Configuration({
                    basePath: import.meta.env.VITE_API_URL || 'http://localhost:8080',
                }),
                undefined,
                axiosInstance
            );

            await profileApi.profilesStaffPost(staffProfileData);

            return data.user.role as UserRoleEnum;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated,
                login,
                logout,
                refreshUser,
                registerWithStaffProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};