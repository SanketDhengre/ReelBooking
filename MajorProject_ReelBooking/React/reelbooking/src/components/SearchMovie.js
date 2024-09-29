import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'
import DisplayAllMovies from './DisplayMovies';
const SearchMovie = ({ searchParameter, setSearchParameter, movies, setMovies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://localhost:7210/api/Movie/search?searchParameter=${searchParameter}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div style={{ marginBottom: '50px' }}> {/* Add margin to bottom of the container */}
       <div className="input-group mb-3" style={{ maxWidth: '800px' }}>
    <input
      type="text"
      className="form-control"
      placeholder="Search movies..."
      value={searchParameter}
      onChange={(e) => setSearchParameter(e.target.value)}
      style={{ marginBottom: '10px' }}
    />
    <button
      className="btn btn-primary " style={{height:'38px'}} // Added btn-sm for smaller button size
      type="button"
      onClick={handleSearch}
    >
      Search
    </button>
  </div>
      <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {movies.map(movie => (
            <div key={movie.movieId} className="col">
            <div className="card" style={{
              width: '250px',
              // height:'470px',
              backgroundColor: '#f9f9f9',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <img src={movie.imageUrl} className="card-img-top" alt="Movie Poster" style={{
                borderRadius: '15px 15px 0 0',
                height: '350px',
                objectFit: 'cover'
              }} />
              {/* <div className="card-body" style={{ padding: '20px' }}>
                              <h5 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{movie.title}</h5>
                              <Link to={`/moviedetails/${movie.movieId}`} className="btn btn-primary" style={{ marginTop: '10px' }}>
                                Show Details
                              </Link>
                            </div> */}

              <div className="card-body" style={{ padding: '20px' }}>

                <h5 sx={{ alignItems: 'left' }} className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginRight: '10px' }}>{movie.title}</h5>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Link to={`/moviedetails/${movie.movieId}`} className="btn btn-primary" style={{ marginTop: '10px' }}>
                    Show Details
                  </Link>
                  <h5 className="card-title" style={{ fontSize: '1.2rem' }}>
                    {movie.averageRating}
                    <FaStar style={{ color: '#333', margin: '5px' }} />
                  </h5>

                </div>

              </div>


            </div>
          </div>
          ))}
        </div>
      </div>
                
      {/* <Modal show={selectedMovie !== null} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie && selectedMovie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedMovie && (
            <>
              <img src={selectedMovie.imageUrl} alt="Movie Poster" style={{ width: '50%', marginBottom: '20px' }} />
              <p><strong>Genre:</strong> {selectedMovie.genre}</p>
              <p><strong>Director:</strong> {selectedMovie.director}</p>
              <p><strong>Language:</strong> {selectedMovie.language}</p>
              <p><strong>Release Date:</strong> {selectedMovie.releaseDate}</p>
              <p><strong>Available Seats:</strong> {selectedMovie.availableSeats}</p>
              <p><strong>Ticket Price:</strong> {selectedMovie.ticketPrice}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

const SearchComponent = () => {
  const [searchParameter, setSearchParameter] = useState('');
  const [movies, setMovies] = useState([]);

  return (
    <SearchMovie
      searchParameter={searchParameter}
      setSearchParameter={setSearchParameter}
      movies={movies}
      setMovies={setMovies}
    />
  );
};

export default SearchComponent;
