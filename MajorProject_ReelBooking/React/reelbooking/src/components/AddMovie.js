import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMovie = ({ managerId }) => {
  const [movie, setMovie] = useState({
    Title: '',
    Genre: '',
    Director: '',
    Language: '',
    ReleaseDate: '',
    AvailableSeats: 0,
    TicketPrice: 0,
    AverageRating: 0,
    Description: '',
    ManagerId: null,
    ImageUrl: '',
    IsDeleted: false
  });
  const [alert, setAlert] = useState('');
  const [displayForm, setDisplayForm] = useState(false); // State to manage form visibility
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Update ManagerId in movie state when managerId changes
    setMovie((prevState) => ({
      ...prevState,
      ManagerId: managerId
    }));
  }, [managerId]); // Only run when managerId changes

  const validateForm = () => {
    const newErrors = {};

    // Basic validation rules (customize based on your requirements)
    if (!movie.Title) {
      newErrors.Title = 'Title is required.';
    }

    if (!movie.Genre) {
      newErrors.Genre = 'Genre is required.';
    }

    if (!movie.Director) {
      newErrors.Director = 'Director is required.';
    }

    if (!movie.Language) {
      newErrors.Language = 'Language is required.';
    }

    if (!movie.ReleaseDate) {
      newErrors.ReleaseDate = 'Release Date is required.';
    }

    if (movie.AvailableSeats <= 0) {
      newErrors.AvailableSeats = 'Available Seats must be greater than 0.';
    }

    if (movie.TicketPrice <= 0) {
      newErrors.TicketPrice = 'Ticket Price must be greater than 0.';
    }

    if (movie.AverageRating != 0 ) {
      newErrors.AverageRating = 'Average Rating must  0 .';
    }

    if (!movie.Description) {
      newErrors.Description = 'Description is required.';
    }

    if (!movie.ImageUrl) {
      newErrors.ImageUrl = 'Image URL is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear the error when the user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If validation fails, do not proceed with the submission
      return;
    }

    try {
      await axios.post('https://localhost:7210/api/Movie', movie);
      setAlert('Movie added successfully');
      setMovie({
        Title: '',
        Genre: '',
        Director: '',
        Language: '',
        ReleaseDate: '',
        AvailableSeats: 0,
        TicketPrice: 0,
        AverageRating: 0,
        Description: '',
        ManagerId: managerId,
        ImageUrl: '',
        IsDeleted: false
      });
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const toggleFormDisplay = () => {
    setDisplayForm(!displayForm);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-3" onClick={toggleFormDisplay}>
        {displayForm ? 'Hide Form' : 'Add Movie'}
      </button>
      {displayForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className={`form-control ${errors.Title ? 'is-invalid' : ''}`}
              name="Title"
              value={movie.Title}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.Title}</div>
          </div>
          <div className="form-group">
            <label>Genre:</label>
            <input
              type="text"
              className={`form-control ${errors.Genre ? 'is-invalid' : ''}`}
              name="Genre"
              value={movie.Genre}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.Genre}</div>
          </div>
          <div className="form-group">
            <label>Director:</label>
            <input
              type="text"
              className={`form-control ${errors.Director ? 'is-invalid' : ''}`}
              name="Director"
              value={movie.Director}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.Director}</div>
          </div>
          <div className="form-group">
            <label>Language:</label>
            <input
              type="text"
              className={`form-control ${errors.Language ? 'is-invalid' : ''}`}
              name="Language"
              value={movie.Language}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.Language}</div>
          </div>
          <div className="form-group">
            <label>Release Date:</label>
            <input
              type="date"
              className={`form-control ${errors.ReleaseDate ? 'is-invalid' : ''}`}
              name="ReleaseDate"
              value={movie.ReleaseDate}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.ReleaseDate}</div>
          </div>
          <div className="form-group">
            <label>Available Seats:</label>
            <input
              type="number"
              className={`form-control ${errors.AvailableSeats ? 'is-invalid' : ''}`}
              name="AvailableSeats"
              value={movie.AvailableSeats}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.AvailableSeats}</div>
          </div>
          <div className="form-group">
            <label>Ticket Price:</label>
            <input
              type="number"
              className={`form-control ${errors.TicketPrice ? 'is-invalid' : ''}`}
              name="TicketPrice"
              value={movie.TicketPrice}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.TicketPrice}</div>
          </div>
          <div className="form-group">
            <label>Average Rating:</label>
            <input
              type="number"
              className={`form-control ${errors.AverageRating ? 'is-invalid' : ''}`}
              name="AverageRating"
              value={movie.AverageRating}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.AverageRating}</div>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className={`form-control ${errors.Description ? 'is-invalid' : ''}`}
              name="Description"
              value={movie.Description}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.Description}</div>
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              className={`form-control ${errors.ImageUrl ? 'is-invalid' : ''}`}
              name="ImageUrl"
              value={movie.ImageUrl}
              onChange={handleChange}
              
            />
            <div className="invalid-feedback">{errors.ImageUrl}</div>
          </div>
          <button type="submit" className="btn btn-primary">
            Insert Movie
          </button>
        </form>
      )}
      {alert && <div className="alert alert-success mt-3">{alert}</div>}
    </div>
  );
};

export default AddMovie;
