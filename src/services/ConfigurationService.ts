import { axiosInstance } from '../instances/axiosInstance';
import type { RetrySwitchStatusDto } from '../api/custom-types';

export class ConfigurationService {
    /**
     * Get current retry switch configuration
     */
    static async getConfiguration(): Promise<RetrySwitchStatusDto> {
        const response = await axiosInstance.get<RetrySwitchStatusDto>('/configuration');
        return response.data;
    }

    /**
     * Update retry switch configuration
     */
    static async updateConfiguration(config: RetrySwitchStatusDto): Promise<RetrySwitchStatusDto> {
        const response = await axiosInstance.put<RetrySwitchStatusDto>('/configuration', config);
        return response.data;
    }
}