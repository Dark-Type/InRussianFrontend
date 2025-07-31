import { ProfileApi, Configuration } from "../api";
import { axiosInstance } from "./axiosInstance";

export const profileApi = new ProfileApi(
    new Configuration({
        basePath: import.meta.env.VITE_API_URL || "http://localhost:8080",
    }),
    undefined,
    axiosInstance
);