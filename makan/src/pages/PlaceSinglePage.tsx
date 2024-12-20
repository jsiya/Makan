import { useParams } from "react-router-dom";
import SinglePageBookingSection from "../components/SinglePageBookingSection/SinglePageBookingSection";
import SinglePageDescriptionSection from "../components/SinglePageDescriptionSection/SinglePageDescriptionSection";
import SinglePageReviewSection from "../components/SinglePageReviewSection/SinglePageReviewSection";
import SinglePageTitleSection from "../components/SinglePageTitleSection/SinglePageTitleSection";
import SinglePageTopSection from "../components/SinglePageTopSection/SinglePageTopSection";

import '../styles/PlaceSinglePageStyles.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Place } from "../models/Place";

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
      }
    };

    const fetchEntertainmentTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/entertainment_types`);
        setEntertainmentTypes(response.data.data);
      } catch (err) {
        console.error("Error fetching entertainment types:", err);
      }
    };

    fetchPlace();
    fetchEntertainmentTypes();
    setLoading(false);
  }, [id]);

  const getEntertainmentTypeName = (entertainmentTypeId: number) => {
    const type = entertainmentTypes.find((etype) => etype.id === entertainmentTypeId);
    return type ? type.name : "Unknown Entertainment Type";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <SinglePageTopSection />
      {place && (
        <SinglePageTitleSection
          title={place.name}
          location={place.location}
          entertainment_type={getEntertainmentTypeName(place.entertainment_type_id)}
        />
      )}
      <div className="single-page-body">
        <div className="single-page-body-inner">
          <div className="single-page-body-inner-top">
            {place && <SinglePageDescriptionSection place={place} />}
            {place && <SinglePageBookingSection price={place.default_price || 0}
              placeId={place.id} 
              category={place.category_id}/>}
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
