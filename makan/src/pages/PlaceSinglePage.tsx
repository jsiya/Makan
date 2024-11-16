import { useParams } from "react-router-dom";
import SinglePageBookingSection from "../components/SinglePageBookingSection/SinglePageBookingSection";
import SinglePageDescriptionSection from "../components/SinglePageDescriptionSection/SinglePageDescriptionSection";
import SinglePageReviewSection from "../components/SinglePageReviewSection/SinglePageReviewSection";
import SinglePageTitleSection from "../components/SinglePageTitleSection/SinglePageTitleSection";
import SinglePageTopSection from "../components/SinglePageTopSection/SinglePageTopSection";

import '../styles/PlaceSinglePageStyles.css';
import { useEffect, useState } from "react";
import axios from "axios";

interface Place {
  id: number;
  name: string;
  location: string;
  rating: number;
  description?: string;
  entertainment_type_id: number;
  images: string[];
  default_price?: number;
}

interface EntertainmentType {
  id: number;
  name: string;
}

const PlaceSinglePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [entertainmentTypes, setEntertainmentTypes] = useState<EntertainmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/places/${id}`);
        setPlace(response.data.data);
      } catch (err) {
        console.error("Error fetching place details:", err);
        setError('Failed to load place details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <SinglePageTopSection />
      {place && (
        <SinglePageTitleSection
          title={place.name}
          location={place.location}
          entertainment_type="Entertainment Type" // Replace with dynamic type if needed
        />
      )}
      <div className="single-page-body">
        <div className="single-page-body-inner">
          <div className="single-page-body-inner-top">
            {place && <SinglePageDescriptionSection place={place} />}
            {place && <SinglePageBookingSection price={place.default_price || 0} />}
          </div>
          {place && (
            <SinglePageReviewSection place_id={place.id} rating={place.rating} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceSinglePage;
