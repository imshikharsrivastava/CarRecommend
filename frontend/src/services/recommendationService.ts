import axiosInstance from './axiosInstance';
import type { UserPreferences, RecommendationsResponse } from '../interfaces';

export const recommendationService = {
  // Get recommendations based on preferences
  getRecommendations: async (
    preferences: UserPreferences,
    limit?: number
  ) => {
    try {
      const params = limit ? { limit } : {};
      const response = await axiosInstance.post<RecommendationsResponse>(
        '/recommendations',
        preferences,
        { params }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Validate user preferences
  validatePreferences: async (preferences: UserPreferences) => {
    try {
      const response = await axiosInstance.post<{
        success: boolean;
        message: string;
        errors?: string[];
      }>('/recommendations/validate', preferences);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
