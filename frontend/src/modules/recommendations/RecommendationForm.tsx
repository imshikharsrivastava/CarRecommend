import { useState } from 'react';
import type { FormEvent } from 'react';
import type { UserPreferences } from '../../interfaces';
import './RecommendationForm.css';

type Props = {
  fetchRecommendations: (
    preferences: UserPreferences,
    limit?: number
  ) => Promise<void>;
  loading: boolean;
  onClose?: () => void;
};

export const RecommendationForm: React.FC<Props> = ({
  fetchRecommendations,
  loading,
  onClose,
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: { min: 500000, max: 3000000 },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onClose?.();
    await fetchRecommendations(preferences, 10);
  };

  return (
    <form className="recommendation-form" onSubmit={handleSubmit}>
      <h2>Tell us your preferences</h2>

      <div className="form-group">
        <label>Budget Range</label>
        <div className="budget-inputs">
          <input
            type="number"
            placeholder="Min Budget"
            value={preferences.budget.min}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                budget: {
                  ...preferences.budget,
                  min: Number(e.target.value),
                },
              })
            }
            required
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max Budget"
            value={preferences.budget.max}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                budget: {
                  ...preferences.budget,
                  max: Number(e.target.value),
                },
              })
            }
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Car Type</label>
        <select
          value={preferences.type || ''}
          onChange={(e) =>
            setPreferences({ ...preferences, type: e.target.value || undefined })
          }
        >
          <option value="">Any Type</option>
          <option value="sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="hatchback">Hatchback</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      <div className="form-group">
        <label>Fuel Type</label>
        <select
          value={preferences.fuelType || ''}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              fuelType: e.target.value || undefined,
            })
          }
        >
          <option value="">Any Fuel</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric</option>
        </select>
      </div>

      <div className="form-group">
        <label>Transmission</label>
        <select
          value={preferences.transmission || ''}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              transmission: e.target.value || undefined,
            })
          }
        >
          <option value="">Any</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </div>

      <div className="form-group">
        <label>Seating Capacity</label>
        <input
          type="number"
          min="2"
          max="8"
          value={preferences.seating || 5}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              seating: Number(e.target.value),
            })
          }
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Finding recommendations...' : 'Get Recommendations'}
      </button>
    </form>
  );
};
