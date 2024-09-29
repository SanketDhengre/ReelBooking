import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteBooking from './DeleteBooking'; // Import the DeleteBooking component
import TokenDecoder from './TokenDecoder';
import TicketComponent from './TicketComponent';
import BookingHistory from './BookingHistory';

function ViewBooking() {
  const [userId, setUserId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const handleUserIdChange = (id) => { // Modified to accept id directly
    setUserId(id);
  };

  useEffect(() => {
    if (userId) {
      handleViewBookings();
    }
  }, [userId]); // Fetch bookings when userId changes

  const handleViewBookings = async () => {
    try {
      const response = await axios.get(`https://localhost:7210/api/Bookings/user/${userId}`);
      const currentDate = new Date();
      const filteredBookings = response.data.filter(booking => new Date(booking.movieTime) > currentDate);
      setBookings(filteredBookings);
    } catch (error) {
      setError('User has no bookings');
    }
  };

  // const userData = localStorage.getItem('userData');
  // if (!userData) {
  //   return null; // If no userData, don't render anything
  // }

  return (
    <>

    <TicketComponent/>
    

    <TokenDecoder onIdUserChange={handleUserIdChange} /> {/* Pass the callback */}
    </>
  );
}

export default ViewBooking;
