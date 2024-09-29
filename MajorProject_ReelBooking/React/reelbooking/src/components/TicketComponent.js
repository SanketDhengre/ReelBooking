import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteBooking from './DeleteBooking'; // Import the DeleteBooking component
import TokenDecoder from './TokenDecoder';
import qrCodeImage from '../Images/QR.png'; // Import the QR code image

function TicketComponent() {
  const [userId, setUserId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const handleUserIdChange = (id) => {
    setUserId(id);
  };

  useEffect(() => {
    if (userId) {
      handleViewBookings();
    }
  }, [userId]);

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

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>Your Movie Tickets</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {bookings.map((booking) => (
          <div key={booking.bookingId} style={{
            backgroundColor: '#fff',
            border: '1px solid #E6B205',
            borderRadius: '10px',
            margin: '10px',
            padding: '20px',
            width: 'calc(45% - 20px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed rgb(86 73 29)', paddingBottom: '10px', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <img src={booking.imageUrl} alt="Movie Poster" style={{ maxWidth: '150px', marginBottom: '10px' }} /> {/* Display movie image */}
              </div>
              <div>
                <h3 style={{ margin: '0', color: '#E6B205' }}>{booking.movieTitle}</h3>
                <p style={{ fontSize: '0.8rem', color: '#777', margin: '5px 0' }}>Booking Date: {new Date(booking.bookingDate).toLocaleString()}</p>
                <p style={{ fontSize: '0.8rem', color: '#777', margin: '5px 0' }}>Movie Time: {new Date(booking.movieTime).toLocaleString()}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px' }}>
              <img src={qrCodeImage} alt="QR Code" style={{ maxWidth: '130px' }} />
              <div style={{ marginLeft: '20px' }}>
                <p style={{ fontSize: '1.5rem', color: '#777',margin: '5px 0' }}>Screen: 1</p>
                <p style={{ fontSize: '0.8rem', color: '#777',margin: '5px 0' }}>Booking ID: {booking.bookingId}</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', margin: '0' }}>Ticket Price:  {booking.totalPrice} $</p>
            </div>
            <DeleteBooking bookingId={booking.bookingId} />
          </div>
        ))}
      </div>
      <TokenDecoder onIdUserChange={handleUserIdChange} />
    </div>
  );
}

export default TicketComponent;
