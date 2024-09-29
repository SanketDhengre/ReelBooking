import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TokenDecoder from './TokenDecoder';

const BookingHistory = () => {
  const [userId, setUserId] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [userId]); // Fetch bookings whenever userId changes

  const handleUserIdChange = (id) => {
    setUserId(id);
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`https://localhost:7210/api/Bookings/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  return (
    <>
    <div className="container mt-5">
      <h2>Booking History</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Booking Time</th>
            <th>Movie Title</th>
            <th>Selected Seats</th>
            <th>Booking Date</th>
            <th>Total Price</th>
            <th>Movie Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.bookingId}>
              <td>{booking.bookingId}</td>
              <td>{new Date(booking.bookingDate).toLocaleString()}</td>
              <td>{booking.movieTitle}</td>
              <td>{booking.selectedSeats}</td>
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>${booking.totalPrice}</td>
              <td>{new Date(booking.movieTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <TokenDecoder onIdUserChange={handleUserIdChange} />
    </>
  );
};

export default BookingHistory;
