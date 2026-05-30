import React from 'react';
import type { RecommendationScore } from '../../interfaces';
import './RecommendationCard.css';

interface RecommendationCardProps {
  recommendation: RecommendationScore;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
}) => {
  return (
    <div className="recommendation-card">
      <div className="recommendation-header">
        <h3>{recommendation.make} {recommendation.model}</h3>
        <span className="match-score">{recommendation.matchScore}% Match</span>
      </div>

      <div className="recommendation-body">
        <div className="recommendation-info">
          <div className="info-row">
            <span className="label">Variant:</span>
            <span className="value">{recommendation.variant}</span>
          </div>
          <div className="info-row">
            <span className="label">Price:</span>
            <span className="value">₹{(recommendation.price / 100000).toFixed(2)}L</span>
          </div>
        </div>

        <div className="score-breakdown">
          <div className="score-item">
            <span className="score-label">Price Score</span>
            <div className="score-bar">
              <div
                className="score-fill"
                style={{ width: `${recommendation.priceScore}%` }}
              />
            </div>
            <span className="score-value">{recommendation.priceScore}%</span>
          </div>
          <div className="score-item">
            <span className="score-label">Type Score</span>
            <div className="score-bar">
              <div
                className="score-fill"
                style={{ width: `${recommendation.typeScore}%` }}
              />
            </div>
            <span className="score-value">{recommendation.typeScore}%</span>
          </div>
          <div className="score-item">
            <span className="score-label">Fuel Score</span>
            <div className="score-bar">
              <div
                className="score-fill"
                style={{ width: `${recommendation.fuelScore}%` }}
              />
            </div>
            <span className="score-value">{recommendation.fuelScore}%</span>
          </div>
          <div className="score-item">
            <span className="score-label">Features Score</span>
            <div className="score-bar">
              <div
                className="score-fill"
                style={{ width: `${recommendation.featureScore}%` }}
              />
            </div>
            <span className="score-value">{recommendation.featureScore}%</span>
          </div>
          <div className="score-item">
            <span className="score-label">Rating Score</span>
            <div className="score-bar">
              <div
                className="score-fill"
                style={{ width: `${recommendation.ratingScore}%` }}
              />
            </div>
            <span className="score-value">{recommendation.ratingScore}%</span>
          </div>
        </div>

        <div className="recommendation-reason">
          <strong>Why this car:</strong>
          <p>{recommendation.reason}</p>
        </div>
      </div>
    </div>
  );
};
