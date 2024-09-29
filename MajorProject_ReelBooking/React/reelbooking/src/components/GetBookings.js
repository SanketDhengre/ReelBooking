import React from "react";
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
 const apiUrl = 'https://localhost:7210/api';

class GetBookings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            bookings: [],
            response: {}
        }
    }

   
    componentDidMount() {
        this.fetchBookings();
    }

    fetchBookings = () => {
        axios.get(apiUrl + '/Bookings').then(response => response.data).then(
            (result) => {
                // Filter out bookings with isDeleted = true (soft deleted)
                const filteredBookings = result.filter(booking => !booking.isDeleted);
                this.setState({
                    bookings: filteredBookings
                });
            },
            (error) => {
                this.setState({ error });
            }
        )
    }

    deleteBooking = (bookingId) => {
        axios.delete(apiUrl + '/Bookings/' + bookingId).then(result => {
            // Alert success message
            alert(result.data);

            // Fetch bookings again to update the list (after soft delete)
            this.fetchBookings();
        });
    }

    editBooking = (bookingId) => {
        this.setState({ isUserDetails: false });
        axios.get(apiUrl + "/Bookings/" + bookingId).then(
            (result) => {
                this.setState({
                    isEditbooking: true,
                    isAddbooking: true,
                    bookingData: result.data,
                });
            },
            (error) => {
                this.setState({ error });
            }
        );
    };
    render() {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            // Use the callback function to navigate to the home page
            
            return null; // If no userData, don't render anything
        }
        const { error, bookings } = this.state;
        if (error) {
            return (
                <div>Error: {error.message}</div>
            );
        }
        else {
            return (
                <div>
                    <Table>
                        <thead className="btn-primary">
                            <tr>
                                <th>BookingId</th>
                                <th>UserId</th>
                                <th>UserName</th> {/* Add this line */}
                                <th>MovieId</th>
                                <th>MovieTitle</th> {/* Add this line */}
                                <th>SelectedSeats</th>
                                <th>BookingDate</th>
                                <th>TotalPrice</th>
                                <th>MovieTime</th>
                                {/* <th>isDeleted</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.bookingId}>
                                    <td>{booking.bookingId}</td>
                                    <td>{booking.userId}</td>
                                    <td>{booking.userName}</td> {/* Update this line */}
                                    <td>{booking.movieId}</td>
                                    <td>{booking.movieTitle}</td> {/* Update this line */}
                                    <td>{booking.selectedSeats}</td>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.totalPrice}</td>
                                    <td>{booking.movieTime}</td>
                                    {/* <td>{booking.isDeleted ? 'Yes' : 'No'}</td> */}
                                    {/* <td><Button variant="primary" onClick={() => this.editBooking(booking.bookingId)}>Edit</Button></td>
                                    <td><Button variant="danger" onClick={() => this.deleteBooking(booking.bookingId)}>Delete</Button></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
    
}

export default GetBookings;
