import {MediaApi, Configuration, type MediaFileMeta} from "../api";
import {axiosInstance} from "../instances/axiosInstance";


const mediaApi = new MediaApi(
    new Configuration({
        basePath: import.meta.env.VITE_API_URL || "http://localhost:8080",
    }),
    undefined,
    axiosInstance
);

export const mediaService = {
    async uploadMediaWithMeta(formData: FormData, userId?: string): Promise<MediaFileMeta> {
        return (
            await mediaApi.mediaUploadPost(userId, {
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            })
        ).data;
    },

    async updateMediaWithMeta(mediaId: string, formData: FormData, userId?: string): Promise<MediaFileMeta> {
        return (
            await mediaApi.mediaMediaIdPut(mediaId, userId, {
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            })
        ).data;
    },

    async getMediaById(mediaId: string): Promise<Blob> {
        const resp = await axiosInstance.get(`/media/${mediaId}`, {
            responseType: "blob",
        });
        return resp.data as Blob;
    },

    async deleteMedia(mediaId: string, userId?: string): Promise<string> {
        return (await mediaApi.mediaMediaIdDelete(mediaId, userId)).data;
    },
};