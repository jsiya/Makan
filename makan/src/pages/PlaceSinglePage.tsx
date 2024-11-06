import { useParams } from "react-router-dom";
import SinglePageBookingSection from "../components/SinglePageBookingSection/SinglePageBookingSection";
import SinglePageDescriptionSection from "../components/SinglePageDescriptionSection/SinglePageDescriptionSection";
import SinglePageReviewSection from "../components/SinglePageReviewSection/SinglePageReviewSection";
import SinglePageTitleSection from "../components/SinglePageTitleSection/SinglePageTitleSection";
import SinglePageTopSection from "../components/SinglePageTopSection/SinglePageTopSection";

import '../styles/PlaceSinglePageStyles.css'
import { useEffect, useState } from "react";
import axios from "axios";

interface Place {
  id: number;
  name: string;
  location: string;
  rating: number;
  description: string;
}

const PlaceSinglePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/places/${id}`);
        setPlace(response.data);
      } catch (err) {
        setError('Failed to load place details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

    return (
      <div>
        <SinglePageTopSection/>
        <SinglePageTitleSection
        title={place?.name}
        location={place?.location}
      />
        <div className="single-page-body">
          <div className="single-page-body-inner">
          <div>
            <SinglePageDescriptionSection/>
            <SinglePageReviewSection place_id={place?.id} rating={place?.rating}/>
          </div>
          <SinglePageBookingSection/>
          </div>
        </div>
      </div>
    );
  }
  
  export default PlaceSinglePage;