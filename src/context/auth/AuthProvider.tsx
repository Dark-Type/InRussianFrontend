import {useEffect, useState, type ReactNode, useCallback} from "react";
import {
    type CreateStaffProfileRequest,
    type StaffRegisterRequest,
    type UserRoleEnum,
} from "../../api";
import {setTokens} from '../../instances/axiosInstance';
import {AuthContext} from "./AuthContext";
import {authApi} from "../../instances/axiosInstance.ts";
import {profileApi} from "../../instances/profileApiInstance";

// Safely decode JWT payload and extract custom 'status' claim
function extractStatusFromToken(token: string | null): string | undefined {
    if (!token) return undefined;
    const parts = token.split('.');
    if (parts.length < 2) return undefined;
    try {
        const payloadJson = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
        const payload = JSON.parse(decodeURIComponent(escape(payloadJson)));
        return payload.status || payload.user_status || undefined; // fallback keys just in case
    } catch {
        return undefined;
    }
}

type AuthUser = {
    id: string;
    email: string;
    role: UserRoleEnum;
    status?: string; // ACTIVE, SUSPENDED, DEACTIVATED, PENDING_VERIFICATION
};

export type AuthContextType = {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<UserRoleEnum | undefined>;
    logout: () => void;
    refreshUser: () => Promise<void>;
    registerWithStaffProfile: (
        userData: StaffRegisterRequest,
        staffProfileData: CreateStaffProfileRequest
    ) => Promise<UserRoleEnum>;
};

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!token && !!user;

    const setAuthTokens = useCallback(
        (accessToken: string | null, refreshToken?: string | null) => {
            setToken(accessToken);
            setTokens(accessToken, refreshToken);
        },
        []
    );

    const logout = useCallback(() => {
        setAuthTokens(null, null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
    }, [setAuthTokens]);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem("accessToken");
            if (storedToken) {
                setToken(storedToken);
                try {
                    const {data} = await authApi.authMeGet();
                    setUser(prev => ({
                        id: data.user.id,
                        email: data.user.email,
                        role: data.user.role as UserRoleEnum,
                        status: extractStatusFromToken(localStorage.getItem('accessToken')) || prev?.status
                    }));
                    localStorage.setItem('userId', data.user.id);
                } catch (error) {
                    console.error("Failed to get user info:", error);
                    logout();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, [logout]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const {data} = await authApi.authLoginPost({email, password});
            setAuthTokens(data.accessToken, data.refreshToken);
            setUser({
                id: data.user.id,
                email: data.user.email,
                role: data.user.role as UserRoleEnum,
                status: extractStatusFromToken(data.accessToken)
            });
            localStorage.setItem('userId', data.user.id);
            return data.user.role as UserRoleEnum;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const {data} = await authApi.authMeGet();
            setUser(prev => ({
                id: data.user.id,
                email: data.user.email,
                role: data.user.role as UserRoleEnum,
                status: extractStatusFromToken(localStorage.getItem('accessToken')) || prev?.status
            }));
            localStorage.setItem('userId', user!.id);
        } catch (error) {
            console.error("Failed to get user info:", error);
            logout();
        } finally {
            setLoading(false);
        }
    }, [token, logout]);

    const registerWithStaffProfile = async (
        userData: StaffRegisterRequest,
        staffProfileData: CreateStaffProfileRequest
    ): Promise<UserRoleEnum> => {
        setLoading(true);
        try {
            const {data} = await authApi.authStaffRegisterPost(userData);
            setAuthTokens(data.accessToken, data.refreshToken);

            setUser({
                id: data.user.id,
                email: data.user.email,
                role: data.user.role as UserRoleEnum,
                status: extractStatusFromToken(data.accessToken)
            });
            localStorage.setItem('userId', data.user.id);
            await profileApi.profilesStaffPost(staffProfileData);

            return data.user.role as UserRoleEnum;
        } catch (error) {
            console.error("Registration failed:", error);
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
                registerWithStaffProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}