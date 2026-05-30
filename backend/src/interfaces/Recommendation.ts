export interface UserPreferences {
  budget: {
    min: number;
    max: number;
  };
  type?: string; // sedan, SUV, hatchback, etc.
  fuelType?: string;
  transmission?: string;
  seating?: number;
  features?: string[];
  priorities?: string[]; // comfort, performance, efficiency, safety, etc.
  brands?: string[];
  mileageRequired?: number;
  maxMileage?: number;
}

export interface RecommendationScore {
  carId: string;
  make: string;
  model: string;
  variant: string;
  price: number;
  matchScore: number; // 0-100
  priceScore: number;
  typeScore: number;
  fuelScore: number;
  featureScore: number;
  ratingScore: number;
  reason: string;
}
