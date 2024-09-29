import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BookingForm.css"; // Import CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import TokenDecoder from "./TokenDecoder";
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
    const [userId, setUserId] = useState("");
    const { movieId } = useParams(); // Access movieId from URL params
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [movieTime, setMovieTime] = useState("");
    const [ticketPrice, setTicketPrice] = useState(0);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [, setMovieData] = useState(null);
    const navigate = useNavigate();

    const handleIdUserChange = (id) => {
        setUserId(id);
    };

    // Fetch ticket price and available seats for the selected movie
    useEffect(() => {
        fetchTicketPrice();
        fetchAvailableSeats();
    }, [movieId]);

    // Update totalPrice whenever ticketPrice or selectedSeats change
    useEffect(() => {
        const numSeats = selectedSeats.length;
        const calculatedTotalPrice = numSeats * ticketPrice;
        setTotalPrice(calculatedTotalPrice);
    }, [selectedSeats, ticketPrice]);

    // Function to fetch ticket price
    const fetchTicketPrice = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7210/api/Movie/${movieId}`
            );
            const movieData = response.data;
            if (movieData && movieData.ticketPrice) {
                setTicketPrice(movieData.ticketPrice);
                setMovieData(movieData); // Set movie data
            } else {
                console.error(
                    "Ticket price not available for the selected movie"
                );
            }
        } catch (error) {
            console.error("Error fetching ticket price:", error.message);
        }
    };

    // Function to handle seat click
    const handleSeatClick = (seat) => {
        const updatedSelectedSeats = [...selectedSeats];
        const seatIndex = updatedSelectedSeats.indexOf(seat);

        if (seatIndex === -1) {
            // Add seat to selectedSeats if it's not already selected
            updatedSelectedSeats.push(seat);
        } else {
            // Remove seat from selectedSeats if it's already selected
            updatedSelectedSeats.splice(seatIndex, 1);
        }
        setSelectedSeats(updatedSelectedSeats);
    };

    // Function to fetch available seats
    const fetchAvailableSeats = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7210/api/Movie/${movieId}/seats`
            );
            const seatsData = response.data;
            if (seatsData && seatsData.availableSeats) {
                // Update availableSeats state with the fetched data
                setAvailableSeats(seatsData.availableSeats);
            } else {
                console.error(
                    "Available seats data not available for the selected movie"
                );
                // Reset availableSeats state
                setAvailableSeats([]);
            }
        } catch (error) {
            console.error("The following seats are already booked!", error.message);
            // Reset availableSeats state
            setAvailableSeats([]);
        }
    };

    // Function to check if seat is selected
    const isSeatSelected = (seat) => {
        return selectedSeats.includes(seat);
    };
    // Function to check if seat is booked
const isSeatBooked = (seat) => {
    return availableSeats.includes(seat);
};

    // Function to render seats
    // Function to render seats
const renderSeats = () => {
    const rows = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
    ];
    const cols = ["1", "2", "3", "4", "5", "6", "7", "8"];

    return (
        <div className="seat-grid">
            {rows.map((row) => (
                <div className="row" key={row}>
                    {cols.map((col) => {
                        const seat = `${row}${col}`;
                        const seatClass = `seat ${
                            isSeatBooked(seat)
                                ? "booked"
                                : isSeatSelected(seat)
                                ? "selected"
                                : "available"
                        }`;
                        return (
                            <div
                                key={seat}
                                className={seatClass}
                                onClick={() => handleSeatClick(seat)}
                                style={{
                                    backgroundColor: isSeatBooked(seat)
                                        ? "#A9A9A9"
                                        : isSeatSelected(seat)
                                        ? "#2196F3"
                                        : "#d43838", // Change to red for unselected seats
                                }}
                            >
                                {seat}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate selected seats
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }
        try {
            const numSeats = selectedSeats.length;
            const calculatedTotalPrice = numSeats * ticketPrice;
            console.log("Calculated total price:", calculatedTotalPrice);

            const response = await axios.post(
                "https://localhost:7210/api/Bookings",
                {
                    userId,
                    movieId,
                    selectedSeats: selectedSeats.join(","),
                    totalPrice: calculatedTotalPrice,
                    movieTime, // Use current booking time
                }
            );

            // Log relevant information from the response
            console.log("Booking ID:", response.data.bookingId);
            console.log("Total Price:", response.data.totalPrice);

            // Display alert for successful booking
            alert("Booking successful!");

            // Clear form fields after successful booking
            setUserId("");
            setSelectedSeats([]);
            setTotalPrice(0);
            setMovieData(null); // Clear movie data
            navigate('/viewbookings');
        } catch (error) {
            // Log the specific error received
            console.error("Error adding booking:", error.message);

            // Display a more user-friendly error message based on the response status
            if (error.response && error.response.status === 500) {
                // If the server returns a 500 error, display a generic error message
                alert("Booking successfull...");

            } else if (error.response && error.response.status === 400) {
                // If the server returns a 400 error, display the error message from the server
                alert("Error adding booking: " + error.response.data);
            } else {
                // If there's no response or the status code is not recognized, display a generic error message
                alert("Unknown error adding booking. Please try again later.");
            }

            setUserId("");
            setSelectedSeats([]);
            setTotalPrice(0);
            setMovieData(null); // Clear movie data
        }
    };

    // Function to handle movie data selection

    return (
        <>
        <Form onSubmit={handleSubmit} className="mainForm">
            <Form.Group controlId="selectedSeats" isRequired>
                <Form.Label></Form.Label>
                <br />
                <Form.Label id="screen">SCREEN</Form.Label>
                <br />
                <br />
                <div className="seats-container">{renderSeats()}</div>
                <Form.Control
                    type="text"
                    value={selectedSeats.join(",")}
                    readOnly
                    isInvalid={selectedSeats.length === 0}
                    isValid={selectedSeats.length > 0}
                />
                <Form.Control.Feedback type="invalid">
                    Please select at least one seat.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="movieTime">
                <Form.Label>Movie Time:</Form.Label>
                <Form.Control
                    type="datetime-local"
                    value={movieTime}
                    onChange={(e) => setMovieTime(e.target.value)}
                    required
                    min={new Date().toISOString().slice(0, 16)} // Set min to today's date
                    />
            </Form.Group>

            <Form.Group controlId="totalPrice">
                <Form.Label>Total Price to Pay: ${totalPrice}</Form.Label>
            </Form.Group>
            <Button variant="primary" type="submit" >
                Book Ticket
            </Button>
        </Form>
        <TokenDecoder onIdUserChange={handleIdUserChange} />
        </>
    );
};

export default BookingForm;
