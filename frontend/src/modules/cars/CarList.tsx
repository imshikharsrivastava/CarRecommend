import React, { useState } from 'react';
import { useCarList } from '../../hooks';
import { CarCard } from './CarCard';
import { Loading, ErrorMessage } from '../../common';
import './CarList.css';

export const CarList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    maxPrice: undefined,
    type: undefined,
  });

  const { cars, pagination, loading, error } = useCarList({
    page,
    limit: 10,
    ...filters,
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="car-list-container">
      <h2>Browse Cars</h2>

      <div className="car-filter">
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) =>
            handleFilterChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
          }
        />
        <select
          onChange={(e) =>
            handleFilterChange({ ...filters, type: e.target.value || undefined })
          }
        >
          <option value="">All Types</option>
          <option value="sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="hatchback">Hatchback</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="car-grid">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {pagination && (
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn-secondary"
              >
                Previous
              </button>
              <span className="page-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage(page + 1)}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
