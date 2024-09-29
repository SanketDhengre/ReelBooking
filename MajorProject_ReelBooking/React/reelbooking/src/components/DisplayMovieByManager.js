import React, { useState, useEffect } from 'react';
import UpdateMovieDetails from './UpdateMovieDetails';
import DeleteMovieForm from './DeleteMovie'; // Import the DeleteMovieForm component

const DisplayAddedMovies = ({ managerId }) => {
  const [movies, setMovies] = useState([]);
  const [Id, setId] = useState(0);
  const [selectedMovieId, setSelectedMovieId] = useState(null); // Track selected movieId for delete action

  useEffect(() => {
    if (managerId && managerId !== Id) {
      setId(managerId);
    }
  }, [managerId, Id]);

  useEffect(() => {
    if (Id > 0) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://localhost:7210/api/Movie/GetMoviesByManagerId/${Id}`);
          const data = await response.json();
          setMovies(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      console.log('ID:', Id);
      fetchData();
    }
  }, [Id]);

  const handleDeleteMovie = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseDeleteModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Movies</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Director</th>
            <th>Language</th>
            <th>Release Date</th>
            <th>Available Seats</th>
            <th>Ticket Price</th>
            <th>Average Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.movieId}>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.director}</td>
              <td>{movie.language}</td>
              <td>{movie.releaseDate}</td>
              <td>{movie.availableSeats}</td>
              <td>{movie.ticketPrice}</td>
              <td>{movie.averageRating}</td>
              <td>
                <div className="btn-group">
                  <button className="btn btn-danger mr-4" onClick={() => handleDeleteMovie(movie.movieId)}>Delete</button>
                  <UpdateMovieDetails movieId={movie.movieId} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedMovieId && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Movie</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseDeleteModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <DeleteMovieForm movieId={selectedMovieId} onClose={handleCloseDeleteModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayAddedMovies;
