import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import ticket from '../MovieImages/ticket.jpg';
import '../cssFile/login.css'
const LoginForm = ({ updateLoginStatus }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://localhost:7210/api/Auth/Login', {
        params: {
          email: formData.email,
          password: formData.password
        }
      });
      
      localStorage.setItem('userData', JSON.stringify(response.data));
      localStorage.removeItem('users');
      
      setFormData({ email: '', password: '' });
  
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { role } = userData;
      
      if (role === 'user') {
        updateLoginStatus(true,role);
        navigate('/userhome');
      } else if (role === 'theaterManager') {
        updateLoginStatus(true,role);
        navigate('/theatermanagerhome');
      }
      else if (role === 'admin') {
        updateLoginStatus(true,role);
        navigate('/adminhome');
      }
      
      setMessage('Login successful');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred while processing your request');
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
  <Col md={6} className="order-md-2">
    <div className="container-right">
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    id="password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
          </Form>
          {message && <p className="mt-3 text-danger">{message}</p>}
        </Card.Body>
      </Card>
    </div>
  </Col>
  <Col md={6} className="order-md-1">
    <img src={ticket} alt="Left Image" className="image-left" />
  </Col>
</Row>
    </Container>
  );
};

export default LoginForm;
