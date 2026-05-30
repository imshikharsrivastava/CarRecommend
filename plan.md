# Car Recommendation Platform - Implementation Plan

## Project Overview
A car research platform that helps buyers navigate vehicle options through intelligent recommendations and comparisons. Users progress from initial confusion to a confident shortlist of vehicles.

---

## 1. FRONTEND (React + TypeScript + Vite)

### 1.1 Key Pages/Views
- **Home Page**
  - Hero section with call-to-action
  - Quick recommendation quiz starter button
  - Featured cars/recent recommendations

- **Recommendation Quiz**
  - Multi-step form capturing buyer preferences
  - Progressive disclosure of questions
  - Real-time filtering feedback
  - Recommendation engine integration

- **Results Page**
  - Display filtered/recommended cars (list + grid view)
  - Ranking/relevance score display
  - Save to shortlist functionality
  - Recommendation reasoning explanation

- **Car Details Page**
  - Comprehensive specs and features
  - Price breakdown
  - Safety ratings visualization
  - User reviews section
  - Comparison tool (add to comparison basket)

- **Comparison Page**
  - Side-by-side car comparison (2-4 vehicles)
  - Spec by spec comparison
  - Highlight differences
  - Download/print comparison

- **Shortlist/Favorites Page**
  - User's saved cars
  - Notes per car
  - Removal/reordering
  - Share shortlist functionality

### 1.2 Components to Build
- `QuizForm` - Multi-step form with question progression
- `CarCard` - Reusable car display component
- `CarGrid` / `CarList` - Layout components for results
- `SpecsComparison` - Table/structured comparison view
- `ReviewSection` - User reviews display
- `RatingStars` - Visual rating component
- `FilterSidebar` - Dynamic filter options
- `Header/Navigation` - App navigation
- `Shortlist` - Favorites management UI

### 1.3 State Management
- User preference data (from quiz)
- Current filters/search state
- Shortlist/favorites (localStorage + optional sync)
- Car comparison data
- Pagination state

### 1.4 Data to Capture from User
- **Quiz Responses:**
  - Budget range (min/max)
  - Vehicle type preference (sedan, SUV, hatchback, etc.)
  - Fuel type (petrol, diesel, hybrid, electric)
  - Transmission (manual/automatic)
  - Seating capacity needed
  - Must-have features/priorities
  - Brand preferences (if any)
  - Mileage expectations (if concerns)
  - Safety priorities

---

## 2. BACKEND (Node.js + TypeScript + Express)

### 2.1 Data Models

#### Car
```typescript
{
  id: string,
  make: string,
  model: string,
  variant: string,
  year: number,
  price: number,
  type: string, // sedan, SUV, hatchback, etc.
  fuelType: string,
  transmission: string,
  engine: {
    displacement: number,
    power: number,
    torque: number
  },
  mileage: number, // kmpl or city/highway
  seating: number,
  specs: {
    dimensions: { length, width, height },
    weight: number,
    features: string[],
    warranty: string,
    serviceCenter: number
  },
  safetyRating: {
    nhtsa: number,
    euroncap: number,
    crashTest: string
  },
  colors: string[],
  images: string[],
  createdAt: Date,
  updatedAt: Date
}
```

#### Review
```typescript
{
  id: string,
  carId: string,
  userId: string,
  rating: number, // 1-5
  title: string,
  body: string,
  aspects: {
    comfort: number,
    performance: number,
    fuelEfficiency: number,
    reliability: number,
    valueForMoney: number
  },
  helpfulCount: number,
  createdAt: Date,
  updatedAt: Date
}
```

#### User (optional for MVP)
```typescript
{
  id: string,
  email: string,
  shortlist: string[], // array of car IDs
  comparisons: object,
  preferences: object,
  createdAt: Date
}
```

### 2.2 API Endpoints

#### Cars
- `GET /api/cars` - Get all cars with pagination
  - Query params: page, limit, make, model, maxPrice, minPrice, type, fuelType
- `GET /api/cars/:id` - Get single car details
- `GET /api/cars/makes` - Get list of all makes
- `GET /api/cars/models/:make` - Get models by make
- `GET /api/cars/search` - Search/filter cars (advanced)

#### Recommendations
- `POST /api/recommendations` - Get recommendations based on quiz
  - Body: { budget, type, fuelType, transmission, seating, features, priorities }
  - Response: Ranked list of cars with match scores

#### Reviews
- `GET /api/cars/:carId/reviews` - Get reviews for a car
  - Query: page, limit, sortBy (helpful, recent, rating)
- `POST /api/cars/:carId/reviews` - Create review (auth required)
- `GET /api/cars/:carId/reviews/summary` - Get review stats/summary

#### User Shortlist (if implemented)
- `GET /api/users/shortlist` - Get user's shortlist
- `POST /api/users/shortlist/:carId` - Add to shortlist
- `DELETE /api/users/shortlist/:carId` - Remove from shortlist
- `POST /api/users/comparisons` - Save a comparison

### 2.3 Recommendation Algorithm
- Score each car based on user preferences
- Weight factors:
  - Price match (is it within budget?) - 25%
  - Type match (does it match preferred type?) - 20%
  - Fuel type alignment - 15%
  - Feature match (must-haves present?) - 20%
  - Overall ratings/reviews average - 20%
- Return top 10-15 matches with explanation scores

### 2.4 Database
- Vehicle data (cars table with indexes on make, model, price, type)
- Reviews data
- User data (if implementing authentication/personalization)
- Possibly cache frequently accessed data

### 2.5 Additional Backend Features
- Search optimization (full-text search on make/model)
- Aggregation endpoints for filters (available makes, price ranges, etc.)
- Error handling and validation
- Logging for user interactions (optional analytics)
- CORS configuration for frontend

---

## 3. Integration Points

### 3.1 Frontend → Backend Communication
- Quiz form submission → POST `/api/recommendations`
- Car list fetching → GET `/api/cars` with filters
- Car details → GET `/api/cars/:id`
- Reviews fetching → GET `/api/cars/:carId/reviews`
- Add to shortlist → POST `/api/users/shortlist/:carId`

### 3.2 Data Flow
1. User completes quiz → FE sends preferences to BE
2. BE scores all cars → returns ranked recommendations
3. FE displays results with filters
4. User clicks car → FE fetches full details + reviews
5. User adds to shortlist → persisted in FE (localStorage) or synced with BE

---

## 4. MVP vs Extended Features

### MVP (Phase 1)
- ✅ Car database with basic filters
- ✅ Recommendation quiz + algorithm
- ✅ Results page with sorting/filtering
- ✅ Car detail page
- ✅ Comparison (2-3 cars)
- ✅ Reviews display (read-only)
- ✅ Shortlist in localStorage

### Phase 2 (Extended)
- User authentication
- Persistent shortlist (database)
- Saved comparisons
- Review submission
- Advanced analytics
- Email recommendations

---

## 5. Tech Stack Summary

**Frontend:**
- React 18+ with TypeScript
- Vite (build tool)
- Axios/Fetch for API calls
- CSS/Tailwind for styling
- React Router for navigation

**Backend:**
- Node.js + Express
- TypeScript
- Mongoose or Sequelize (if using DB)
- Validator libraries
- Error handling middleware

---

## 6. File Structure Reference

```
CarRecommend/
├── frontend/
│   ├── src/
│   │   ├── pages/ (Home, Quiz, Results, Details, Comparison, Shortlist)
│   │   ├── components/ (CarCard, FilterSidebar, ReviewSection, etc.)
│   │   ├── services/ (api.ts, recommendationService.ts)
│   │   ├── hooks/ (useFetch, useFilters, useShortlist)
│   │   ├── types/ (Car.ts, Review.ts, User.ts)
│   │   └── App.tsx
│   └── ...
├── backend/
│   ├── src/
│   │   ├── routes/ (cars.ts, recommendations.ts, reviews.ts)
│   │   ├── controllers/ (carController, reviewController, etc.)
│   │   ├── models/ (Car, Review, User)
│   │   ├── services/ (recommendationEngine.ts)
│   │   ├── middleware/ (auth, errorHandler, validation)
│   │   ├── types/ (interfaces.ts)
│   │   └── index.ts (entry point)
│   └── ...
└── plan.md (this file)
```

---

## 7. Next Steps
1. Set up backend Express server with TypeScript
2. Create database models and seed with car data
3. Implement recommendation algorithm
4. Build API endpoints
5. Create React components and pages
6. Integrate frontend with backend APIs
7. Test and refine user experience
