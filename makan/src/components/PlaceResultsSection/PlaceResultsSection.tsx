import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import './PlaceResultsSectionStyles.css';
import { Pagination, PaginationProps } from 'antd';
import { Place } from '../../models/Place';

interface PlaceResultsSectionProps {
  sortOption: string;
  isAscending: boolean;
  filters: {
    category?: string | null;
    entertainmentType?: string | null;
    priceRange?: [number, number];
    rating?: number | null;
  };
}

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') return <a>Previous</a>;
  if (type === 'next') return <a>Next</a>;
  return originalElement;
};

const PlaceResultsSection: React.FC<PlaceResultsSectionProps> = ({ sortOption, isAscending, filters }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/places`);
        setPlaces(response.data.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    let result = [...places];

    // Apply category filter
    if (filters.category) {
      result = result.filter((place) => place.category_id.toString() === filters.category);
    }

    // Apply entertainment type filter
    if (filters.entertainmentType) {
      result = result.filter((place) => place.entertainment_type_id.toString() === filters.entertainmentType);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      result = result.filter((place) => place.default_price >= minPrice && place.default_price <= maxPrice);
    }

    // Apply rating filter
    if (filters.rating) {
      result = result.filter((place) => Math.floor(place.rating) === filters.rating);
    }

    setFilteredPlaces(result);
  }, [filters, places]);

  // Sort places based on the selected option and order
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortOption === 'price') {
      return isAscending ? a.default_price - b.default_price : b.default_price - a.default_price;
    } else if (sortOption === 'rating') {
      return isAscending ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0;
  });

  // Paginate sorted places
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPlaces = sortedPlaces.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <div className="result-cards-sec">
        {paginatedPlaces.map((place) => (
          <Card
            key={place.id}
            id={place.id}
            name={place.name}
            location={place.location}
            rating={place.rating}
            images={place.images}
            price={place.default_price}
          />
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredPlaces.length}
        onChange={(page) => setCurrentPage(page)}
        itemRender={itemRender}
        style={{ textAlign: 'center', marginTop: '20px' }}
      />
    </div>
  );
};

export default PlaceResultsSection;
