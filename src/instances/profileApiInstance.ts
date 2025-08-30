import {ProfileApi, Configuration} from "../api";
import {axiosInstance} from "./axiosInstance";

export const profileApi = new ProfileApi(
    new Configuration({
        basePath: import.meta.env.VITE_API_URL || "/api",
    }),
    undefined,
    axiosInstance
);