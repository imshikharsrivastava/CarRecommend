export interface RecommendationScore {
  carId: string;
  make: string;
  model: string;
  variant: string;
  price: number;
  matchScore: number;
  priceScore: number;
  typeScore: number;
  fuelScore: number;
  featureScore: number;
  ratingScore: number;
  reason: string;
}

export interface UserPreferences {
  budget: {
    min: number;
    max: number;
  };
  type?: string;
  fuelType?: string;
  transmission?: string;
  seating?: number;
  features?: string[];
  priorities?: string[];
  brands?: string[];
  mileageRequired?: number;
  maxMileage?: number;
}

export interface RecommendationsResponse {
  success: boolean;
  message: string;
  data: {
    recommendations: RecommendationScore[];
    count: number;
    preferences: UserPreferences;
  };
}
