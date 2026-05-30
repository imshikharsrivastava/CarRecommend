import { Car, UserPreferences, RecommendationScore } from "../interfaces";
import { loadCarsData, filterCars, sortCars } from "../utils/dataUtils";

export const carService = {
  getAllCars: (filters?: any, sortBy?: string, page?: number, limit?: number) => {
    let cars = loadCarsData();

    if (filters) {
      cars = filterCars(cars, filters);
    }

    if (sortBy) {
      const order = sortBy.startsWith("-") ? "desc" : "asc";
      const sortField = sortBy.replace("-", "");
      cars = sortCars(cars, sortField, order);
    }

    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCars = cars.slice(startIndex, endIndex);

      return {
        data: paginatedCars,
        pagination: {
          currentPage: page,
          limit: limit,
          totalItems: cars.length,
          totalPages: Math.ceil(cars.length / limit),
        },
      };
    }

    return { data: cars };
  },

  getCarById: (id: string): Car | null => {
    const cars = loadCarsData();
    return cars.find((car) => car.id === id) || null;
  },

  getCarsByMake: (make: string) => {
    const cars = loadCarsData();
    return cars.filter((car) => car.make.toLowerCase() === make.toLowerCase());
  },

  getMakes: () => {
    const cars = loadCarsData();
    const makes = Array.from(new Set(cars.map((car) => car.make)));
    return makes.sort();
  },

  getModelsByMake: (make: string) => {
    const cars = loadCarsData();
    const filtered = cars.filter(
      (car) => car.make.toLowerCase() === make.toLowerCase()
    );
    const models = Array.from(new Set(filtered.map((car) => car.model)));
    return models.sort();
  },

  getCarTypes: () => {
    const cars = loadCarsData();
    const types = Array.from(new Set(cars.map((car) => car.type)));
    return types.sort();
  },

  getPriceRange: () => {
    const cars = loadCarsData();
    if (cars.length === 0) return { min: 0, max: 0 };

    const prices = cars.map((car) => car.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  },
};
