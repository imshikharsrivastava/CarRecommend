import React from 'react';
import type { Car } from '../../interfaces';
import './CarCard.css';

interface CarCardProps {
  car: Car;
  onSelect?: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onSelect }) => {
  return (
    <div className="car-card" onClick={() => onSelect?.(car)}>
      <div className="car-card-header">
        <h3 className="car-title">{car.make} {car.model}</h3>
        <span className="car-variant">{car.variant}</span>
      </div>

      <div className="car-card-body">
        <div className="car-price">₹{(car.price / 100000).toFixed(2)}L</div>

        <div className="car-specs">
          <div className="spec-item">
            <span className="spec-label">Type:</span>
            <span className="spec-value">{car.type}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Fuel:</span>
            <span className="spec-value">{car.fuelType}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Transmission:</span>
            <span className="spec-value">{car.transmission}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Mileage:</span>
            <span className="spec-value">{car.mileage} kmpl</span>
          </div>
        </div>

        <div className="car-features">
          {car.specs.features.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="feature-tag">{feature}</span>
          ))}
          {car.specs.features.length > 3 && (
            <span className="feature-tag">+{car.specs.features.length - 3}</span>
          )}
        </div>

        <div className="car-rating">
          <span className="rating-value">⭐ {car.rating}</span>
          <span className="review-count">({car.reviewCount} reviews)</span>
        </div>
      </div>

      <div className="car-card-footer">
        <button className="btn-primary" onClick={() => onSelect?.(car)}>
          View Details
        </button>
      </div>
    </div>
  );
};
