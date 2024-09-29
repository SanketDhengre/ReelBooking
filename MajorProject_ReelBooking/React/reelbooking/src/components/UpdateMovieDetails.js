import React, { useState } from 'react';
import axios from 'axios';

const UpdateMovieDetails = ({ movieId }) => {
  const [selectedField, setSelectedField] = useState('');
  const [newValue, setNewValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.put(`https://localhost:7210/api/Movie/UpdateMovieDetails/${movieId}`, {
        Key: selectedField,
        Value: newValue
      });
      setSuccessMessage('Movie details updated successfully.');
      setTimeout(() => {
        window.location.reload(); // Reload the page after 1 second
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('An error occurred while updating movie details.');
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
    setSuccessMessage('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={openModal} style={{marginLeft: "5px", borderRadius: "0px 5px 5px 0"}}> Edit</button>
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Movie Details</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label>Select Field:</label>
                    <select className="form-control" value={selectedField} onChange={(e) => setSelectedField(e.target.value)} required>
                      <option value="">-- Select --</option>
                      <option value="Title">Title</option>
                      <option value="Genre">Genre</option>
                      <option value="Director">Director</option>
                      <option value="Language">Language</option>
                      <option value="ReleaseDate">Release Date</option>
                      <option value="AvailableSeats">Available Seats</option>
                      <option value="TicketPrice">Ticket Price</option>
                      <option value="Description">Description</option>
                      <option value="ImageUrl">Image URL</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>New Value:</label>
                    <input type="text" className="form-control" value={newValue} onChange={(e) => setNewValue(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Edit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateMovieDetails;
