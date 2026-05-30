import { Router } from "express";
import { recommendationController } from "../controllers/recommendationController";

const router = Router();

// Get recommendations based on user preferences
router.post("/", recommendationController.getRecommendations);

// Validate user preferences
router.post("/validate", recommendationController.validatePreferences);

export default router;
