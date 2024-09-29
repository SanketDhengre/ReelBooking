import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BookingForm from './BookingForm';
import RatingAndReviewForm from './RatingAndReviewForm'; 
import RatingsAndReviews from './ViewRatingsAndReviews';

const MovieDetails = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false); 
  const { movieId } = useParams();
  const userData = JSON.parse(localStorage.getItem('userData')); 

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(`https://localhost:7210/api/Movie/GetMovieById/${movieId}`);
        setSelectedMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  const handleClose = () => {
    setSelectedMovie(null);
  };

  const handleRatingModalOpen = () => {
    setShowRatingModal(true);
  };

  const handleRatingModalClose = () => {
    setShowRatingModal(false);
  };

  return (
    <>
      <div className="container mt-5">
        {selectedMovie && (
          <div className="card mb-3" style={{ maxWidth: '800px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={selectedMovie.imageUrl} alt="Movie Poster" style={{ width: '100%', height: '100%', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{selectedMovie.title}</h5>
                  <p className="card-text"><strong>Genre:</strong> {selectedMovie.genre}</p>
                  <p className="card-text"><strong>Director:</strong> {selectedMovie.director}</p>
                  <p className="card-text"><strong>Language:</strong> {selectedMovie.language}</p>
                  <p className="card-text"><strong>Release Date:</strong> {selectedMovie.releaseDate}</p>
                  <p className="card-text"><strong>Available Seats:</strong> {selectedMovie.availableSeats}</p>
                  <p className="card-text"><strong>Average Ratings:</strong> {selectedMovie.averageRating}</p> 
                  <p className="card-text"><strong>Ticket Price:</strong> {selectedMovie.ticketPrice}</p>
                  <p className="card-text"><strong>Description:</strong> {selectedMovie.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="container mb-3">
      {userData && userData.role === 'user' && (
        <>
          <Link to={`/booking/${movieId}`} className="btn btn-danger mr-2" style={{ borderRadius: '10px', padding: '10px 30px', fontWeight: 'bold', textDecoration: 'none' }}>Book Movie Ticket</Link>
          <button onClick={handleRatingModalOpen} className="btn btn-success" style={{ borderRadius: '10px', margin: "20px", padding: '10px 30px', fontWeight: 'bold', textDecoration: 'none' }}>Ratings/Review</button>
        </>
      )}
        <RatingsAndReviews movieId={movieId} />
      </div>
      
      {/* Rating and Review Modal */}
      {showRatingModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
          <div className="modal-dialog" style={{ margin: 'auto', marginTop: '100px', maxWidth: '600px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ratings and Review</h5>
                <button type="button" className="close" onClick={handleRatingModalClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <RatingAndReviewForm movieId={movieId} onClose={handleRatingModalClose} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End Rating and Review Modal */}
    </>
  );
};

export default MovieDetails;
