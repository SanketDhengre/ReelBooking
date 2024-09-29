// DeleteMovieForm.js

import React, { useState } from 'react';
import axios from 'axios';

const DeleteMovieForm = ({ movieId, onClose }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://localhost:7210/api/Movie/${movieId}`);
      if (response.status === 204) {
        setSuccessMessage('Movie deleted successfully.');
        onClose(); // Close the modal after successful deletion
        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Adjust the delay as needed
      } else {
        setErrorMessage('Failed to delete movie.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while deleting movie.');
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <h2>Delete Movie</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
        <div className="form-group">
          <label htmlFor="movieId">Movie ID:</label>
          <input
            type="text"
            className="form-control"
            id="movieId"
            value={movieId}
            disabled // Disable the input field as movieId is passed as a prop
          />
        </div>
        <button type="submit" className="btn btn-danger">Delete</button>
      </form>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
    </div>
  );
};

export default DeleteMovieForm;
