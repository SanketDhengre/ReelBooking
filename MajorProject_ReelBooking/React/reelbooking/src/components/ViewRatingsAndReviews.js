import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingsAndReviews = ({ movieId }) => {
  const [ratingsAndReviews, setRatingsAndReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRatingsAndReviews, setShowRatingsAndReviews] = useState(false);

  useEffect(() => {
    const fetchRatingsAndReviews = async () => {
      try {
        const response = await axios.get(`https://localhost:7210/api/RatingAndReviews/GetRatingAndReviewByMovieId/${movieId}`);
        setRatingsAndReviews(response.data);
        setLoading(false);
      } catch (error) {
        setError('No reviews available for this movie');
        setLoading(false);
      }
    };

    fetchRatingsAndReviews();

    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, [movieId]);

  const toggleRatingsAndReviews = () => {
    setShowRatingsAndReviews(!showRatingsAndReviews);
  };

  return (
    <>
      <button className="btn btn-primary" style={{ borderRadius: '10px', padding: '10px 30px', fontWeight: 'bold', textDecoration: 'none' }} onClick={toggleRatingsAndReviews}>
        {showRatingsAndReviews ? 'Hide Ratings and Reviews' : 'View Ratings and Reviews'}
      </button>
      {showRatingsAndReviews && (
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : ratingsAndReviews.length === 0 ? (
            <p>No ratings and reviews found for this movie.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Review Date</th>
                </tr>
              </thead>
              <tbody>
                {ratingsAndReviews.map((item, index) => (
                  <tr key={index}>
                    <td>{item.userName}</td>
                    <td>{item.rating}</td>
                    <td>{item.reviewText}</td>
                    <td>{new Date(item.reviewDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default RatingsAndReviews;
