import { Car, UserPreferences, RecommendationScore } from "../interfaces";
import { loadCarsData } from "../utils/dataUtils";

const WEIGHTS = {
  price: 0.25,
  type: 0.2,
  fuel: 0.15,
  features: 0.2,
  rating: 0.2,
};

export const recommendationService = {
  generateRecommendations: (
    preferences: UserPreferences,
    limit: number = 10
  ): RecommendationScore[] => {
    const cars = loadCarsData();
    const scoredCars = cars.map((car) =>
      recommendationService.scoreCarByPreferences(car, preferences)
    );

    return scoredCars
      .filter((scored) => scored.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  },

  scoreCarByPreferences: (
    car: Car,
    preferences: UserPreferences
  ): RecommendationScore => {
    const priceScore = calculatePriceScore(car.price, preferences.budget);
    const typeScore = calculateTypeScore(
      car.type,
      preferences.type
    );
    const fuelScore = calculateFuelScore(
      car.fuelType,
      preferences.fuelType
    );
    const featureScore = calculateFeatureScore(
      car.specs.features,
      preferences.features
    );
    const ratingScore = (car.rating / 5) * 100;

    const matchScore =
      priceScore * WEIGHTS.price +
      typeScore * WEIGHTS.type +
      fuelScore * WEIGHTS.fuel +
      featureScore * WEIGHTS.features +
      ratingScore * WEIGHTS.rating;

    const reason = generateRecommendationReason({
      price: priceScore,
      type: typeScore,
      fuel: fuelScore,
      features: featureScore,
      rating: ratingScore,
    });

    return {
      carId: car.id,
      make: car.make,
      model: car.model,
      variant: car.variant,
      price: car.price,
      matchScore: Math.round(matchScore),
      priceScore: Math.round(priceScore),
      typeScore: Math.round(typeScore),
      fuelScore: Math.round(fuelScore),
      featureScore: Math.round(featureScore),
      ratingScore: Math.round(ratingScore),
      reason,
    };
  },
};

const calculatePriceScore = (carPrice: number, budgetRange: { min: number; max: number }): number => {
  if (carPrice >= budgetRange.min && carPrice <= budgetRange.max) {
    return 100;
  }
  if (carPrice < budgetRange.min) {
    const percentageLow = ((budgetRange.min - carPrice) / budgetRange.min) * 100;
    return Math.max(0, 100 - percentageLow * 0.5);
  }
  const percentageHigh = ((carPrice - budgetRange.max) / budgetRange.max) * 100;
  return Math.max(0, 100 - percentageHigh * 0.5);
};

const calculateTypeScore = (carType: string, preferredType?: string): number => {
  if (!preferredType) return 50;
  return carType.toLowerCase() === preferredType.toLowerCase() ? 100 : 30;
};

const calculateFuelScore = (
  carFuel: string,
  preferredFuel?: string
): number => {
  if (!preferredFuel) return 60;
  return carFuel.toLowerCase() === preferredFuel.toLowerCase() ? 100 : 40;
};

const calculateFeatureScore = (
  carFeatures: string[],
  preferredFeatures?: string[]
): number => {
  if (!preferredFeatures || preferredFeatures.length === 0) return 50;

  const matchedFeatures = preferredFeatures.filter((feature) =>
    carFeatures
      .map((f) => f.toLowerCase())
      .includes(feature.toLowerCase())
  );

  return (matchedFeatures.length / preferredFeatures.length) * 100;
};

const generateRecommendationReason = (scores: {
  price: number;
  type: number;
  fuel: number;
  features: number;
  rating: number;
}): string => {
  const reasons: string[] = [];

  if (scores.price >= 80) reasons.push("Great price fit");
  if (scores.type >= 80) reasons.push("Matches your type preference");
  if (scores.fuel >= 80) reasons.push("Matches fuel preference");
  if (scores.features >= 80) reasons.push("Has desired features");
  if (scores.rating >= 80) reasons.push("Excellent reviews");

  return reasons.length > 0
    ? reasons.join(", ")
    : "Good overall match for your needs";
};
