import React from 'react';
import TokenDecoder from './TokenDecoder';
import LogoutComponent from './LogOut';
import UpdateUserDetails from './UpdateUserDetails';
import BookingForm from './BookingForm';
import RatingAndReviewForm from './RatingAndReviewForm';
import GetBookings from './GetBookings';
import DisplayAllMovies from './DisplayMovies';
import  { useState } from 'react'; 
import ViewBooking from './ViewBookings';
import DeleteBooking from './DeleteBooking';

import {  Link } from 'react-router-dom';
const UserHome = () => {
    
   
    return (
        <div>
            {/* <h1>User Home</h1> */}
            {/* Additional content for theater management can be added here */}
            {/* <UpdateUserDetails/> */}
            {/* <BookingForm/> */}
            {/* <RatingAndReviewForm/> */}
            {/* <Link to="/updateuserdetails" className="btn btn-success ml-2">Update Profile</Link>
            <Link to={`/viewbookings`} class="btn btn-success ml-2" style={{ marginTop: '10px' }}>
                  View Bookings
                </Link> */}
            <DisplayAllMovies/>
            <TokenDecoder  />
            {/* <LogoutComponent/> */}
        </div>
    );
};

export default UserHome;
