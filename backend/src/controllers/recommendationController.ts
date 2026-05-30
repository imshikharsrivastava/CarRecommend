import { Request, Response, NextFunction } from "express";
import { UserPreferences } from "../interfaces";
import { recommendationService } from "../services/recommendationService";
import { carService } from "../services/carService";

export const recommendationController = {
  getRecommendations: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const preferences: UserPreferences = req.body;

      if (!preferences.budget || !preferences.budget.min || !preferences.budget.max) {
        return res.status(400).json({
          success: false,
          message: "Budget (min and max) is required",
        });
      }

      if (preferences.budget.min < 0 || preferences.budget.max < 0) {
        return res.status(400).json({
          success: false,
          message: "Budget values cannot be negative",
        });
      }

      if (preferences.budget.min > preferences.budget.max) {
        return res.status(400).json({
          success: false,
          message: "Budget min should be less than or equal to max",
        });
      }

      const limit = req.query.limit ? Number(req.query.limit) : 10;

      const recommendations = recommendationService.generateRecommendations(
        preferences,
        limit
      );

      if (recommendations.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No recommendations found for your preferences",
          data: [],
        });
      }

      res.status(200).json({
        success: true,
        message: "Recommendations generated successfully",
        data: {
          recommendations,
          count: recommendations.length,
          preferences,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  validatePreferences: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const preferences: UserPreferences = req.body;
      const errors: string[] = [];

      if (!preferences.budget) {
        errors.push("Budget is required");
      } else {
        if (!preferences.budget.min || !preferences.budget.max) {
          errors.push("Budget min and max are required");
        }
        if (preferences.budget.min < 0 || preferences.budget.max < 0) {
          errors.push("Budget values cannot be negative");
        }
        if (preferences.budget.min > preferences.budget.max) {
          errors.push("Budget min should be less than or equal to max");
        }
      }

      if (preferences.type) {
        const validTypes = carService.getCarTypes();
        if (!validTypes.includes(preferences.type)) {
          errors.push(`Invalid car type. Valid types: ${validTypes.join(", ")}`);
        }
      }

      if (preferences.fuelType) {
        const validFuels = ["petrol", "diesel", "hybrid", "electric"];
        if (!validFuels.includes(preferences.fuelType.toLowerCase())) {
          errors.push(`Invalid fuel type. Valid types: ${validFuels.join(", ")}`);
        }
      }

      if (preferences.transmission) {
        const validTransmissions = ["manual", "automatic"];
        if (
          !validTransmissions.includes(preferences.transmission.toLowerCase())
        ) {
          errors.push(
            `Invalid transmission. Valid types: ${validTransmissions.join(", ")}`
          );
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }

      res.status(200).json({
        success: true,
        message: "Preferences are valid",
      });
    } catch (error) {
      next(error);
    }
  },
};
