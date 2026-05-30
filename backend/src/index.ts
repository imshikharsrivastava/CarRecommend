import express from "express";
import { corsMiddleware, errorHandler } from "./middleware/errorHandler";
import carRoutes from "./routes/carRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Car Recommendation Backend - Running 🚀",
    version: "1.0.0",
    endpoints: {
      cars: "/api/cars",
      recommendations: "/api/recommendations",
    },
  });
});

// API Routes
app.use("/api/cars", carRoutes);
app.use("/api/recommendations", recommendationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
});