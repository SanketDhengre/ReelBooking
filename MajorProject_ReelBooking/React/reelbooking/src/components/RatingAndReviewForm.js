import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import TokenDecoder from './TokenDecoder';
import { useParams } from "react-router-dom";

const RatingAndReviewForm = () => {
  const [formData, setFormData] = useState({
    rating: 0,
    reviewText: '',
  });
  const [userId, setUserId] = useState(""); // State for userId
  const { movieId } = useParams(); // Access movieId from URL params

  // Function to handle userId change
  const handleIdUserChange = (id) => {
    setUserId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const response = await axios.post('https://localhost:7210/api/RatingAndReviews', { ...formData, userId, movieId });
      console.log('Rating and review added:', response.data);
      // Show alert message upon successful submission
      alert('Rating and review added successfully!');
      // Clear the form data
      setFormData({
        rating: 0,
        reviewText: '',
      });
    } catch (error) {
      console.error('Error adding rating and review:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {/* Pass the function to handle userId change */}
      <TokenDecoder onIdUserChange={handleIdUserChange} />
      <Form onSubmit={handleSubmit}>
        {/* Omitting movieId field as it's filled dynamically */}
        <Form.Group controlId="rating">
          <Form.Label>Rating:</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="reviewText">
          <Form.Label>Review Text:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default RatingAndReviewForm;
