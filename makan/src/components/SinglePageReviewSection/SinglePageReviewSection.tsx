import { useEffect, useState } from 'react';
import './SinglePageReviewStyles.css';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

interface Review {
  place_id: number;
  user_id: number;
  date: string;
  rating: number;
  comment: string;
}

interface User {
  id: number;
  username: string;
}

interface SinglePageReviewSectionProps {
  place_id: number;
  rating: number;
}

const SinglePageReviewSection: React.FC<SinglePageReviewSectionProps> = ({ place_id, rating }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [usernames, setUsernames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/reviews');
        const reviewsData = response.data.data;
        if (Array.isArray(reviewsData)) {
          const placeReviews = reviewsData.filter((review: Review) => review.place_id === place_id);
          setReviews(placeReviews);

          const userIds = Array.from(new Set(placeReviews.map((review) => review.user_id)));
          const userPromises = userIds.map((id) => axios.get(`http://127.0.0.1:5000/users/${id}`));
          const userResponses = await Promise.all(userPromises);

          const users: User[] = userResponses.map((res) => res.data);
          const usernamesMap = users.reduce((acc, user) => {
            acc[user.id] = user.username;
            return acc;
          }, {} as { [key: number]: string });
        console.log(usernamesMap);
          setUsernames(usernamesMap);
        } else {
          console.error('Expected reviews data to be an array, but got:', reviewsData);
        }
      } catch (error) {
        console.error('Error fetching reviews or usernames:', error);
      }
    };

    fetchReviews();
  }, [place_id]);

  return (
    <div className='review-main-sec'>
      <p className='reviews-title'>Reviews</p>
      <div className="rating-sec">
        <div className="rating-sec-inner">
          <h2>{rating}</h2>
          <p className="gray-p">/5</p>
        </div>
        <p className="gray-p">{reviews.length} Verified review(s)</p>
      </div>

      {reviews.length > 0 && (
        <>
          <p className='reviews-title'>Comments</p>
          <div className="review-comments-sec">
            {reviews.map((review, index) => (
              <div key={index} className="review">
                <p className="review-username">{usernames[review.user_id] || `User ${review.user_id}`}</p>
                <p className="review-date gray-p">{review.date}</p>
                <div>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < review.rating ? '#F7931E' : 'gray'} />
                  ))}
                </div>
                <p className="comment">{review.comment}</p>
                {index < reviews.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePageReviewSection;
