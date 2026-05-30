export interface Engine {
  displacement: number; // in cc
  power: number; // in bhp
  torque: number; // in nm
}

export interface Specs {
  dimensions: {
    length: number; // mm
    width: number; // mm
    height: number; // mm
  };
  weight: number; // kg
  features: string[];
  warranty: string;
  serviceCenters: number;
}

export interface SafetyRating {
  nhtsa: number; // 0-5
  euroncap: number; // 0-5
  crashTest: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number; // in INR/USD
  type: string; // sedan, SUV, hatchback, etc.
  fuelType: string; // petrol, diesel, hybrid, electric
  transmission: string; // manual, automatic
  engine: Engine;
  mileage: number; // kmpl (kilometers per liter)
  seating: number;
  specs: Specs;
  safetyRating: SafetyRating;
  colors: string[];
  images: string[];
  rating: number; // 0-5
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
