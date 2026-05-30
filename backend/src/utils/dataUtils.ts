import * as fs from "fs";
import * as path from "path";
import { Car } from "../interfaces";

export const loadCarsData = (): Car[] => {
  try {
    const dataPath = path.join(__dirname, "../data/cars.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const { cars } = JSON.parse(rawData);
    return cars;
  } catch (error) {
    console.error("Error loading cars data:", error);
    return [];
  }
};

export const filterCars = (
  cars: Car[],
  filters: {
    make?: string;
    type?: string;
    maxPrice?: number;
    minPrice?: number;
    fuelType?: string;
    transmission?: string;
    seating?: number;
    search?: string;
  }
): Car[] => {
  return cars.filter((car) => {
    if (filters.make && car.make.toLowerCase() !== filters.make.toLowerCase()) {
      return false;
    }
    if (filters.type && car.type.toLowerCase() !== filters.type.toLowerCase()) {
      return false;
    }
    if (filters.maxPrice && car.price > filters.maxPrice) {
      return false;
    }
    if (filters.minPrice && car.price < filters.minPrice) {
      return false;
    }
    if (
      filters.fuelType &&
      car.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.transmission &&
      car.transmission.toLowerCase() !== filters.transmission.toLowerCase()
    ) {
      return false;
    }
    if (filters.seating && car.seating < filters.seating) {
      return false;
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const fullName = `${car.make} ${car.model}`.toLowerCase();
      if (!fullName.includes(searchTerm)) {
        return false;
      }
    }
    return true;
  });
};

export const paginateData = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      limit: limit,
      totalItems: data.length,
      totalPages: Math.ceil(data.length / limit),
      hasNextPage: endIndex < data.length,
      hasPrevPage: page > 1,
    },
  };
};

export const sortCars = (
  cars: Car[],
  sortBy: string = "price",
  order: "asc" | "desc" = "asc"
): Car[] => {
  const sortedCars = [...cars];

  sortedCars.sort((a, b) => {
    let aValue: any = a[sortBy as keyof Car];
    let bValue: any = b[sortBy as keyof Car];

    if (aValue < bValue) {
      return order === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return sortedCars;
};
