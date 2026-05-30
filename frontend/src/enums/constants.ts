export const API_ENDPOINTS = {
  CARS: '/cars',
  CAR_BY_ID: '/cars/:id',
  MAKES: '/cars/metadata/makes',
  MODELS: '/cars/metadata/models/:make',
  TYPES: '/cars/metadata/types',
  PRICE_RANGE: '/cars/metadata/price-range',
  RECOMMENDATIONS: '/recommendations',
  VALIDATE_PREFERENCES: '/recommendations/validate',
};

export const CAR_TYPES = ['sedan', 'SUV', 'hatchback', 'sports', 'coupe'];

export const FUEL_TYPES = ['petrol', 'diesel', 'hybrid', 'electric'];

export const TRANSMISSIONS = ['manual', 'automatic'];

export const PRIORITIES = ['comfort', 'performance', 'efficiency', 'safety', 'luxury'];

export const SORT_OPTIONS = [
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating: Low to High' },
  { value: '-rating', label: 'Rating: High to Low' },
  { value: 'mileage', label: 'Mileage: Low to High' },
];

export const PAGE_SIZE = 10;
