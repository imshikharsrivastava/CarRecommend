import axiosInstance from './axiosInstance';
import type { CarsResponse, SingleCarResponse } from '../interfaces';

export const carService = {
  // Get all cars with filters and pagination
  getAllCars: async (params?: {
    page?: number;
    limit?: number;
    make?: string;
    type?: string;
    maxPrice?: number;
    minPrice?: number;
    fuelType?: string;
    transmission?: string;
    seating?: number;
    search?: string;
    sortBy?: string;
  }) => {
    try {
      const response = await axiosInstance.get<CarsResponse>('/cars', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single car by ID
  getCarById: async (id: string) => {
    try {
      const response = await axiosInstance.get<SingleCarResponse>(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all car makes
  getMakes: async () => {
    try {
      const response = await axiosInstance.get<{ success: boolean; data: string[] }>(
        '/cars/metadata/makes'
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Get models by make
  getModelsByMake: async (make: string) => {
    try {
      const response = await axiosInstance.get<{ success: boolean; data: string[] }>(
        `/cars/metadata/models/${make}`
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all car types
  getCarTypes: async () => {
    try {
      const response = await axiosInstance.get<{ success: boolean; data: string[] }>(
        '/cars/metadata/types'
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Get price range
  getPriceRange: async () => {
    try {
      const response = await axiosInstance.get<{
        success: boolean;
        data: { min: number; max: number };
      }>('/cars/metadata/price-range');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};
