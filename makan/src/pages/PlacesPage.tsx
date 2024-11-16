import { useState, useEffect } from 'react';
import PlacesFilterSection from '../components/PlacesFilterSection/PlacesFilterSection';
import PlaceResultsSection from '../components/PlaceResultsSection/PlaceResultsSection';
import PlacesTopSection from '../components/PlacesTopSection/PlacesTopSection';
import '../styles/PlacesPageStyles.css';
import axios from 'axios';

const PlacesPage: React.FC = () => {
  const [places, setPlaces] = useState([]);
  const [sortOption, setSortOption] = useState<string>('rating');
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    category: null,
    entertainmentType: null,
    priceRange: [0, 50000],
    rating: null,
  });

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

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="places-main">
      <PlacesTopSection />
      <div className="place-results-sec">
        <div className="place-results-sec-inner">
          <PlacesFilterSection onFilterChange={handleFilterChange} />
          <div className="place-results-sec-right">
            <PlaceResultsSection
              sortOption={sortOption}
              isAscending={isAscending}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;
