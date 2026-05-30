import { useState, useEffect } from 'react';
import type { Car } from '../interfaces';
import { carService } from '../services';

interface UseCarListOptions {
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
}

export const useCarList = (options?: UseCarListOptions) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await carService.getAllCars(options);
        if (response.success) {
          setCars(response.data.data);
          setPagination(response.data.pagination);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [options?.page, options?.make, options?.type, options?.maxPrice]);

  return { cars, pagination, loading, error };
};

export const useCarById = (id: string) => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await carService.getCarById(id);
        if (response.success) {
          setCar(response.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch car');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  return { car, loading, error };
};

export const useCarMetadata = () => {
  const [makes, setMakes] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);
      setError(null);
      try {
        const [makesData, typesData, priceData] = await Promise.all([
          carService.getMakes(),
          carService.getCarTypes(),
          carService.getPriceRange(),
        ]);
        setMakes(makesData);
        setTypes(typesData);
        setPriceRange(priceData);
      } catch (err: any) {
        setError('Failed to fetch metadata');
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  return { makes, types, priceRange, loading, error };
};
