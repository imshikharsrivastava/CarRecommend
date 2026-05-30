import { useState } from 'react';
import type { UserPreferences, RecommendationScore } from '../interfaces';
import { recommendationService } from '../services';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<RecommendationScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async (
    preferences: UserPreferences,
    limit?: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await recommendationService.getRecommendations(
        preferences,
        limit
      );
      if (response.success) {
        setRecommendations(response.data.recommendations);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to fetch recommendations'
      );
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, loading, error, fetchRecommendations };
};
