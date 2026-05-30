# Development Instructions & Guidelines

**Car Recommendation Platform** - Code Standards, Best Practices & Naming Conventions

---

## 1. GENERAL PRINCIPLES (Both FE & BE)

### 1.1 Code Quality
- ✅ Write clean, readable, maintainable code
- ✅ Follow DRY (Don't Repeat Yourself) principle
- ✅ Use meaningful names for variables, functions, and files
- ✅ Add comments for complex logic only (code should be self-documenting)
- ✅ Keep functions small and focused (single responsibility)
- ✅ Write tests for critical business logic
- ✅ No console.log in production code (use proper logging)
- ✅ Always handle errors gracefully

### 1.2 Version Control
- ✅ Commit early and often with clear messages
- ✅ Commit message format: `<type>: <description>`
  - Types: `feat`, `fix`, `refactor`, `docs`, `test`, `style`, `chore`
  - Example: `feat: add car recommendation algorithm`
- ✅ No committing sensitive data (keys, passwords)
- ✅ Pull latest before starting work
- ✅ Create a new branch for each feature/fix
- ✅ Branch naming: `feature/feature-name` or `fix/bug-name`

### 1.3 Code Review Checklist
- ✅ Does it follow naming conventions?
- ✅ Is error handling in place?
- ✅ Are there any console.logs or debugging code?
- ✅ Is it DRY (no code duplication)?
- ✅ Are types/interfaces properly defined (TypeScript)?
- ✅ Are comments clear and necessary?
- ✅ Does it have proper tests?
- ✅ Performance impact considered?
- ✅ Security implications reviewed?
- ✅ Dependencies appropriate and up-to-date?

---

## 2. FRONTEND (React + TypeScript + Vite)

### 2.1 File & Folder Structure
```
src/
├── pages/           # Full page components
├── components/      # Reusable components
├── hooks/           # Custom React hooks
├── services/        # API calls, external service integration
├── types/           # TypeScript interfaces/types
├── utils/           # Utility functions
├── constants/       # App constants (magic numbers, strings)
├── styles/          # Global styles, CSS variables
├── assets/          # Images, fonts, etc.
└── App.tsx
```

### 2.2 Naming Conventions

#### File Names
- **Pages:** PascalCase (e.g., `HomePage.tsx`, `CarDetailsPage.tsx`)
- **Components:** PascalCase (e.g., `CarCard.tsx`, `FilterSidebar.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useShortlist.ts`, `useFetch.ts`)
- **Services:** camelCase (e.g., `apiService.ts`, `recommendationService.ts`)
- **Types/Interfaces:** PascalCase (e.g., `Car.ts`, `Review.ts`)
- **Utils:** camelCase (e.g., `formatPrice.ts`, `calculateScore.ts`)
- **CSS/Styles:** kebab-case (e.g., `car-card.css`, `filter-sidebar.css`)

#### Variable & Function Names
- **React Components:** PascalCase (e.g., `function HomePage() {}`)
- **Functions:** camelCase (e.g., `calculateRecommendationScore()`, `formatPrice()`)
- **Variables:** camelCase (e.g., `userPreferences`, `filteredCars`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_PRICE`, `DEFAULT_PAGE_SIZE`)
- **Boolean variables:** Prefix with `is` or `has` (e.g., `isLoading`, `hasError`)

#### React/TypeScript Specifics
- **Component Props Interface:** `<ComponentName>Props`
  ```typescript
  interface CarCardProps {
    car: Car;
    onSelect: (carId: string) => void;
  }
  ```
- **Hook Returns:** Follow convention or return object with clear names
  ```typescript
  const { data, loading, error } = useFetch('/api/cars');
  ```

### 2.3 Component Best Practices
- ✅ Keep components under 300 lines (extract if larger)
- ✅ Define PropTypes or TypeScript interfaces for all props
- ✅ Use functional components with hooks (no class components)
- ✅ Memoize expensive components: `React.memo(Component)`
- ✅ Use `useCallback` for event handlers passed as props
- ✅ Extract complex JSX into sub-components
- ✅ No direct DOM manipulation (use refs sparingly)
- ✅ Lift state only as high as needed

**Example Structure:**
```typescript
import React, { useState, useCallback } from 'react';
import { Car } from '@/types/Car';
import './CarCard.css';

interface CarCardProps {
  car: Car;
  onSelect: (carId: string) => void;
  isSelected?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, onSelect, isSelected = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    onSelect(car.id);
  }, [car.id, onSelect]);

  return (
    <div
      className={`car-card ${isSelected ? 'selected' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Component JSX */}
    </div>
  );
};

export default CarCard;
```

### 2.4 Hooks & Custom Hooks
- ✅ Custom hooks file name: `use<HookName>.ts`
- ✅ Custom hooks should be reusable across components
- ✅ Extract component logic into custom hooks
- ✅ Always handle loading and error states

**Example:**
```typescript
// useShortlist.ts
export const useShortlist = () => {
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToShortlist = useCallback((carId: string) => {
    // Implementation
  }, []);

  return { shortlist, addToShortlist, isLoading, error };
};
```

### 2.5 API & Service Layer
- ✅ Centralize all API calls in `services/` folder
- ✅ Create typed requests and responses
- ✅ Handle errors consistently
- ✅ Use environment variables for API base URL

**Example:**
```typescript
// services/apiService.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiService = {
  cars: {
    getAll: async (filters?: any) => {
      // Implementation
    },
    getById: async (id: string) => {
      // Implementation
    },
  },
  recommendations: {
    get: async (preferences: UserPreferences) => {
      // Implementation
    },
  },
};
```

### 2.6 State Management
- ✅ Use React Context for global state (theme, user, etc.)
- ✅ Use LocalStorage for client-side persistence
- ✅ Keep component state for local/temporary data
- ✅ Document prop drilling depth (max 2 levels recommended)

### 2.7 Styling
- ✅ Use CSS modules or Tailwind CSS (pick one, be consistent)
- ✅ No inline styles (except dynamic values)
- ✅ CSS class names: kebab-case
- ✅ Modularize CSS (one file per component)
- ✅ Use CSS variables for colors, spacing, etc.

### 2.8 Error Handling
- ✅ Catch API errors and display user-friendly messages
- ✅ Implement error boundaries for component errors
- ✅ Log errors for debugging
- ✅ Provide fallback UI

### 2.9 Performance
- ✅ Lazy load pages using React.lazy()
- ✅ Memoize expensive computations
- ✅ Optimize re-renders (avoid unnecessary deps)
- ✅ Handle pagination for large lists
- ✅ Optimize images (correct sizes, formats)

### 2.10 Testing
- ✅ Test critical components and hooks
- ✅ Test user interactions (click, input, etc.)
- ✅ Test edge cases and error states
- ✅ Use React Testing Library (avoid implementation details)

---

## 3. BACKEND (Node.js + TypeScript + Express)

### 3.1 File & Folder Structure
```
src/
├── routes/          # Express route definitions
├── controllers/     # Route handlers, business logic
├── services/        # Business logic, algorithms
├── models/          # Database models/schemas
├── middleware/      # Express middleware (auth, validation, errors)
├── types/           # TypeScript interfaces/types
├── utils/           # Utility functions
├── constants/       # App constants
├── config/          # Configuration (database, env vars)
├── seed/            # Data seeding scripts
└── index.ts         # Entry point
```

### 3.2 Naming Conventions

#### File Names
- **Routes:** camelCase (e.g., `carRoutes.ts`, `reviewRoutes.ts`)
- **Controllers:** camelCase with suffix (e.g., `carController.ts`, `reviewController.ts`)
- **Models:** PascalCase (e.g., `Car.ts`, `Review.ts`)
- **Services:** camelCase (e.g., `recommendationService.ts`, `carService.ts`)
- **Middleware:** camelCase (e.g., `errorHandler.ts`, `validation.ts`)
- **Utils:** camelCase (e.g., `logger.ts`, `validators.ts`)

#### Variable & Function Names
- **Functions:** camelCase (e.g., `getCarById()`, `calculateScore()`)
- **Variables:** camelCase (e.g., `carData`, `userPreferences`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_RESULTS`, `DEFAULT_PAGE_SIZE`)
- **Classes:** PascalCase (e.g., `CarService`, `RecommendationEngine`)
- **Database fields:** snake_case (convention for databases)
  ```typescript
  {
    car_id: string;
    make_name: string;
    fuel_type: string;
  }
  ```

### 3.3 API Endpoint Conventions
- ✅ Use REST principles (GET, POST, PUT, DELETE)
- ✅ Use plural nouns for resources: `/api/cars`, `/api/reviews`
- ✅ Use sub-resources for relations: `/api/cars/:carId/reviews`
- ✅ Use query params for filtering: `/api/cars?type=sedan&maxPrice=5000`
- ✅ Use path params for specific resources: `/api/cars/:id`
- ✅ Version API if needed: `/api/v1/cars`

**Example Routes:**
```typescript
// carRoutes.ts
router.get('/cars', getAllCars);              // GET list
router.get('/cars/:id', getCarById);         // GET single
router.post('/cars', createCar);             // POST create
router.put('/cars/:id', updateCar);          // PUT update
router.delete('/cars/:id', deleteCar);       // DELETE

router.get('/cars/:carId/reviews', getCarReviews);  // Sub-resource
```

### 3.4 Controller Best Practices
- ✅ Keep controllers thin (delegate to services)
- ✅ Handle request/response validation
- ✅ Return proper HTTP status codes
- ✅ Catch and pass errors to error middleware
- ✅ Add input validation

**Example Controller:**
```typescript
// controllers/carController.ts
import { Request, Response, NextFunction } from 'express';
import { carService } from '@/services/carService';

export const getAllCars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, type, maxPrice } = req.query;
    
    const cars = await carService.getAll({
      page: Number(page),
      limit: Number(limit),
      filters: { type, maxPrice: Number(maxPrice) },
    });
    
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    next(error);
  }
};
```

### 3.5 Service Layer
- ✅ Encapsulate business logic
- ✅ Handle data transformations
- ✅ Validate data before database operations
- ✅ Keep services database-agnostic when possible

**Example Service:**
```typescript
// services/recommendationService.ts
import { UserPreferences, Car } from '@/types';

export const recommendationService = {
  generateRecommendations: async (preferences: UserPreferences): Promise<Car[]> => {
    // 1. Fetch all cars (or filtered set)
    // 2. Score each car
    // 3. Sort by score
    // 4. Return top 10
  },

  scoreCarByPreferences: (car: Car, preferences: UserPreferences): number => {
    // Scoring logic
  },
};
```

### 3.6 Middleware
- ✅ Order matters: parsing → auth → validation → routes → error handler
- ✅ Always include error handling middleware last
- ✅ Create reusable middleware for auth, validation, cors

**Example:**
```typescript
// middleware/errorHandler.ts
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

// index.ts - Usage order
app.use(express.json());
app.use(cors());
app.use(authMiddleware);
app.use(validationMiddleware);
app.use('/api', routes);
app.use(errorHandler);  // Last!
```

### 3.7 Database Models
- ✅ Use schema validation (if using Mongoose/Sequelize)
- ✅ Add indexes for frequently queried fields
- ✅ Include timestamps (createdAt, updatedAt)
- ✅ Use proper data types

**Example Mongoose Model:**
```typescript
// models/Car.ts
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true, index: true },
    model: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    type: { type: String, required: true, index: true },
    fuelType: String,
    // ... other fields
  },
  { timestamps: true }
);

export const Car = mongoose.model('Car', carSchema);
```

### 3.8 Validation
- ✅ Validate inputs at API entry point
- ✅ Use validation libraries (joi, zod, or custom)
- ✅ Return clear error messages
- ✅ Validate data types and ranges

**Example:**
```typescript
// utils/validators.ts
export const validateQuizPreferences = (data: any) => {
  if (!data.budget || data.budget < 0) {
    throw new Error('Invalid budget');
  }
  if (!['sedan', 'suv', 'hatchback'].includes(data.type)) {
    throw new Error('Invalid car type');
  }
  // More validations
};
```

### 3.9 Error Handling
- ✅ Create custom error classes
- ✅ Always return errors in consistent format
- ✅ Log errors for debugging
- ✅ Use appropriate HTTP status codes

**Example:**
```typescript
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// In controller
try {
  // Logic
} catch (error) {
  if (error instanceof ValidationError) {
    res.status(400).json({ success: false, message: error.message });
  } else {
    next(error);
  }
}
```

### 3.10 Logging
- ✅ Use logging library (winston, pino, or similar)
- ✅ Log meaningful information (not every variable)
- ✅ Different log levels (error, warn, info, debug)
- ✅ Include timestamps

**Example:**
```typescript
// utils/logger.ts
export const logger = {
  error: (message: string, error?: any) => console.error(`[ERROR] ${message}`, error),
  warn: (message: string) => console.warn(`[WARN] ${message}`),
  info: (message: string) => console.info(`[INFO] ${message}`),
  debug: (message: string) => console.debug(`[DEBUG] ${message}`),
};
```

### 3.11 Environment Variables
- ✅ Use .env file (never commit to repo)
- ✅ Define required variables in code
- ✅ Validate on startup
- ✅ Use NODE_ENV (development, test, production)

**Example .env:**
```
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/car-recommend
API_BASE_URL=http://localhost:5000
CORS_ORIGIN=http://localhost:5173
```

### 3.12 Performance
- ✅ Add database indexes for commonly queried fields
- ✅ Use pagination for large datasets
- ✅ Cache frequently accessed data
- ✅ Optimize database queries (select fields, joins)
- ✅ Use connection pooling

### 3.13 Testing
- ✅ Test API endpoints (integration tests)
- ✅ Test service layer (unit tests)
- ✅ Test error scenarios
- ✅ Mock external dependencies
- ✅ Use Jest with supertest for API testing

---

## 4. TYPESCRIPT STANDARDS (Both FE & BE)

### 4.1 Type Definitions
- ✅ Always define types for function parameters and returns
- ✅ Avoid `any` type (use `unknown` if really needed)
- ✅ Create interfaces for objects in `types/` folder
- ✅ Use `Pick`, `Omit`, `Partial` for type utilities

**Example:**
```typescript
// types/Car.ts
export interface Car {
  id: string;
  make: string;
  model: string;
  price: number;
  type: 'sedan' | 'suv' | 'hatchback'; // Use unions for enums
}

// Using type utilities
export type CarPreview = Pick<Car, 'id' | 'make' | 'model' | 'price'>;
export type CarUpdate = Partial<Car>;
```

### 4.2 Strict Mode
- ✅ Enable strict mode in tsconfig.json
- ✅ Enable `strict: true`, `noImplicitAny: true`
- ✅ Fix all type errors before committing

### 4.3 Null Checking
- ✅ Use optional chaining: `obj?.property`
- ✅ Use nullish coalescing: `value ?? defaultValue`
- ✅ Check for null/undefined before use

---

## 5. GIT & COLLABORATION

### 5.1 Branch Strategy
- **Main branch:** Production-ready code only
- **Develop branch:** Integration branch for features
- **Feature branches:** `feature/feature-name` - created from develop
- **Bug branches:** `fix/bug-name` - created from develop
- **Hotfix branches:** `hotfix/issue-name` - created from main

### 5.2 Pull Request Process
1. Create feature branch from develop
2. Make changes and commit with clear messages
3. Push to remote
4. Create PR with description of changes
5. Request code review
6. Address review comments
7. Merge when approved

### 5.3 Commit Messages
- ✅ Format: `<type>: <description>`
- ✅ Types: `feat`, `fix`, `refactor`, `docs`, `test`, `style`, `chore`
- ✅ Capitalize first letter after colon
- ✅ Use imperative mood (add, not added)
- ✅ Example: `feat: add recommendation scoring algorithm`

---

## 6. CODE REVIEW CHECKLIST

- [ ] Code follows naming conventions
- [ ] TypeScript strict mode compliance
- [ ] Error handling in place
- [ ] No console.logs or debugging code
- [ ] DRY principle followed
- [ ] Functions are small and focused
- [ ] Comments are meaningful
- [ ] Tests included (if applicable)
- [ ] No secrets/sensitive data
- [ ] Performance optimized
- [ ] Accessibility considered (FE)
- [ ] Database optimized (BE)
- [ ] CORS/Security considered

---

## 7. DO's & DON'Ts

### DO ✅
- Write self-documenting code
- Keep it simple (KISS)
- Reuse existing code
- Write tests
- Document complex logic
- Handle errors gracefully
- Use TypeScript properly
- Follow conventions consistently

### DON'T ❌
- Use `any` or `eval()`
- Commit sensitive data
- Leave console.logs in code
- Mix naming conventions
- Write huge functions (>50 lines)
- Skip error handling
- Ignore TypeScript errors
- Hardcode values

---

## 8. TOOLS & SETUP

### Frontend
- ESLint: Linting
- Prettier: Code formatting
- Vitest: Testing
- TypeScript: Type safety

### Backend
- ESLint: Linting
- Prettier: Code formatting
- Jest: Testing
- TypeScript: Type safety

### Setup Command
```bash
# Frontend
npm run lint
npm run format
npm run test

# Backend
npm run lint
npm run format
npm run test
```

---

## 9. CONTINUOUS IMPROVEMENT

- 📝 Review this document quarterly
- 🔄 Update based on team feedback
- 📚 Share learnings with team
- 🛠️ Adopt new tools/practices as needed
- 🐛 Document new issues found during reviews

---

**Last Updated:** May 30, 2026  
**Version:** 1.0
