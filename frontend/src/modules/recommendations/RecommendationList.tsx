import { useState } from 'react';
import { useRecommendations } from '../../hooks';
import { Loading, ErrorMessage } from '../../common';
import { RecommendationForm } from './RecommendationForm';
import { RecommendationCard } from './RecommendationCard';
import './RecommendationList.css';

export const RecommendationList: React.FC = () => {
  const { recommendations, loading, error, fetchRecommendations } = useRecommendations();
  const [showForm, setShowForm] = useState(true);

  // Recommendations are fetched by RecommendationForm; toggle shows results

  return (
    <div className="recommendation-list-container">
      <h1>Car Recommendations</h1>

      {showForm ? (
        <div className="form-wrapper">
          <RecommendationForm
            fetchRecommendations={fetchRecommendations}
            loading={loading}
            onClose={() => setShowForm(false)}
          />
        </div>
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorMessage
              message={error}
              onRetry={() => setShowForm(true)}
            />
          ) : (
            <>
              <div className="results-header">
                <h2>Top Recommendations ({recommendations.length})</h2>
                <button
                  className="btn-secondary"
                  onClick={() => setShowForm(true)}
                >
                  New Search
                </button>
              </div>

              <div className="recommendations-grid">
                {recommendations.map((rec, idx) => (
                  <RecommendationCard
                    key={`${rec.carId}-${idx}`}
                    recommendation={rec}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
