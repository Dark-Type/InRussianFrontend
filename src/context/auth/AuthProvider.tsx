import {useEffect, useState, type ReactNode, useCallback} from "react";
import {
    type CreateStaffProfileRequest,
    type StaffRegisterRequest,
    type UserRoleEnum,
} from "../../api";
import {AuthContext} from "./AuthContext";
import {authApi} from "../../instances/authApiInstance";
import {profileApi} from "../../instances/profileApiInstance";

type AuthUser = {
    id: string;
    email: string;
    role: UserRoleEnum;
};

export type AuthContextType = {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
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
    const isAuthenticated = !!token;

    const setAuthTokens = useCallback(
        (accessToken: string | null, refreshToken?: string | null) => {
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
                if (refreshToken) {
                    localStorage.setItem("refreshToken", refreshToken);
                }
            } else {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }
            setToken(accessToken);
        },
        [setToken]
    );

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedToken && storedRefreshToken) {
            setToken(storedToken);
        } else {
            setLoading(false);
        }
    }, []);


    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const {data} = await authApi.authLoginPost({email, password});
            setAuthTokens(data.accessToken, data.refreshToken);
            setUser({
                id: data.user.id,
                email: data.user.email,
                role: data.user.role as UserRoleEnum,
            });
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback(() => {
        setAuthTokens(null);
        setUser(null);
    }, [setAuthTokens, setUser]);

    const refreshUser = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const {data} = await authApi.authMeGet();
            setUser({
                id: data.user.id,
                email: data.user.email,
                role: data.user.role as UserRoleEnum,
            });
        } catch (error) {
            console.error("Failed to refresh user:", error);
            logout();
        } finally {
            setLoading(false);
        }
    }, [token, logout, setLoading, setUser]);

    useEffect(() => {
        if (token) {
            refreshUser();
        } else {
            setLoading(false);
        }
    }, [token, refreshUser]);

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
            });

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