import { Request, Response, NextFunction } from "express";
import { carService } from "../services/carService";

export const carController = {
  getAllCars: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        page = 1,
        limit = 10,
        make,
        type,
        maxPrice,
        minPrice,
        fuelType,
        transmission,
        seating,
        search,
        sortBy = "price",
      } = req.query;

      const filters = {
        make: make ? String(make) : undefined,
        type: type ? String(type) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        fuelType: fuelType ? String(fuelType) : undefined,
        transmission: transmission ? String(transmission) : undefined,
        seating: seating ? Number(seating) : undefined,
        search: search ? String(search) : undefined,
      };

      const result = carService.getAllCars(
        filters,
        sortBy ? String(sortBy) : undefined,
        Number(page),
        Number(limit)
      );

      res.status(200).json({
        success: true,
        message: "Cars retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getCarById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Car ID is required",
        });
      }

      const car = carService.getCarById(id);

      if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Car details retrieved successfully",
        data: car,
      });
    } catch (error) {
      next(error);
    }
  },

  getMakes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const makes = carService.getMakes();

      res.status(200).json({
        success: true,
        message: "Car makes retrieved successfully",
        data: makes,
      });
    } catch (error) {
      next(error);
    }
  },

  getModelsByMake: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const make = Array.isArray(req.params.make)
        ? req.params.make[0]
        : req.params.make;

      if (!make) {
        return res.status(400).json({
          success: false,
          message: "Make is required",
        });
      }

      const models = carService.getModelsByMake(make);

      if (models.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No models found for make: ${make}`,
        });
      }

      res.status(200).json({
        success: true,
        message: "Models retrieved successfully",
        data: models,
      });
    } catch (error) {
      next(error);
    }
  },

  getCarTypes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const types = carService.getCarTypes();

      res.status(200).json({
        success: true,
        message: "Car types retrieved successfully",
        data: types,
      });
    } catch (error) {
      next(error);
    }
  },

  getPriceRange: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const priceRange = carService.getPriceRange();

      res.status(200).json({
        success: true,
        message: "Price range retrieved successfully",
        data: priceRange,
      });
    } catch (error) {
      next(error);
    }
  },
};
