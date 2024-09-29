import React, { useState } from 'react';
import axios from 'axios';

const DeleteBooking = ({ bookingId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const confirmDelete = window.confirm('Are you sure you want to cancel this booking?'); // Custom confirmation dialog
      if (confirmDelete) {
        await axios.delete(`https://localhost:7210/api/Bookings/${bookingId}`);
        alert('Your amount will get back to you within 24 hours.'); // Custom success alert
        // Reload the page
        window.location.reload();
      }
    } catch (error) {
      setError(error.response.data);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: 'none' }}>
        <label htmlFor="bookingId">Booking ID:</label>
        <input
          type="text"
          id="bookingId"
          value={bookingId}
          readOnly
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button className="btn btn-outline-warning mt-2" onClick={handleDelete} disabled={loading}>
        Cancel Booking
      </button>
    </div>
  );
};

export default DeleteBooking;
