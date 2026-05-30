export interface Engine {
  displacement: number;
  power: number;
  torque: number;
}

export interface Specs {
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  features: string[];
  warranty: string;
  serviceCenters: number;
}

export interface SafetyRating {
  nhtsa: number;
  euroncap: number;
  crashTest: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  type: string;
  fuelType: string;
  transmission: string;
  engine: Engine;
  mileage: number;
  seating: number;
  specs: Specs;
  safetyRating: SafetyRating;
  colors: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface CarsResponse {
  success: boolean;
  message: string;
  data: {
    data: Car[];
    pagination?: Pagination;
  };
}

export interface SingleCarResponse {
  success: boolean;
  message: string;
  data: Car;
}
