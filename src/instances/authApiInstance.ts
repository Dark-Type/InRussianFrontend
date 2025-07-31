import {AuthApi, Configuration} from "../api";
import {axiosInstance} from "./axiosInstance";

export const authApi = new AuthApi(
    new Configuration({
        basePath: import.meta.env.VITE_API_URL || "http://localhost:8080",
    }),
    undefined,
    axiosInstance
);