export interface ReviewAspects {
  comfort: number; // 1-5
  performance: number; // 1-5
  fuelEfficiency: number; // 1-5
  reliability: number; // 1-5
  valueForMoney: number; // 1-5
}

export interface Review {
  id: string;
  carId: string;
  userId: string;
  rating: number; // 1-5
  title: string;
  body: string;
  aspects: ReviewAspects;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}
