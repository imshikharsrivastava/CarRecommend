import { Router } from "express";
import { carController } from "../controllers/carController";

const router = Router();

// Get all cars with filters and pagination
router.get("/", carController.getAllCars);

// Get car by ID
router.get("/:id", carController.getCarById);

// Get all car makes
router.get("/metadata/makes", carController.getMakes);

// Get models by make
router.get("/metadata/models/:make", carController.getModelsByMake);

// Get all car types
router.get("/metadata/types", carController.getCarTypes);

// Get price range
router.get("/metadata/price-range", carController.getPriceRange);

export default router;
