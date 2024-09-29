import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('user');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to manage confirm password visibility
    const navigate = useNavigate();

    const client = axios.create({
        baseURL: 'https://localhost:7210/api',
    });

    const validateForm = () => {
    const newErrors = {};

    // Validation for Name
    if (!name.trim()) {
        newErrors.name = 'Name is required';
    }

    // Validation for Email
    if (!email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
        newErrors.email = 'Email address is invalid';
    }

    // Validation for Phone
    if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.trim())) {
        newErrors.phone = 'Phone number must be 10 digits and should only contain numbers';
    }

    // Validation for Password
    if (!password.trim()) {
        newErrors.password = 'Password is required';
    } else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
    }

    // Validation for Confirm Password
    if (!confirmPassword.trim()) {
        newErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors }; // Copy the current errors state
    
        // Validate each input as it changes
        switch (name) {
            case 'name':
                newErrors.name = !value.trim() ? 'Name is required' : !/^[a-zA-Z\s]*$/.test(value.trim()) ? 'Name must contain only letters' : '';
                break;
            case 'email':
                newErrors.email = !value.trim() ? 'Email is required' : !/\S+@\S+\.\S+/.test(value.trim()) ? 'Email address is invalid' : '';
                break;
            case 'phone':
                newErrors.phone = !value.trim() ? 'Phone number is required' : !/^\d{10}$/.test(value.trim()) ? 'Phone number must be 10 digits and should only contain numbers' : '';
                break;
            case 'password':
                newErrors.password = !value.trim() ? 'Password is required' : value.length < 8 ? 'Password must be at least 8 characters long' : '';
                break;
            case 'confirmPassword':
                newErrors.confirmPassword = !value.trim() ? 'Confirm password is required' : password !== value ? 'Passwords do not match' : '';
                break;
            default:
                break;
        }
    
        // Update the state with new errors
        setErrors(newErrors);
    
        // Update the input state
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'phone') {
            setPhone(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };
    

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        try {
            setIsLoading(true);
            const response = await client.post(`${role === 'user' ? 'Users/Registration' : 'TheaterManager/Registration'}`, {
                Name: name,
                Email: email,
                Phone: phone,
                Password: password,
                Status: ""
            });
    
            window.alert('Registration successful!');
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                const errorMessage = error.response.data;
                window.alert(errorMessage);
            } else {
                console.error('Registration failed:', error.response.data);
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    
    return (
        <>
            <form className="login-form" onSubmit={handleRegister}>
                {/* <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Register</h1>
                </div> */}

                <div className='mb-3'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="role" id="flexRadioDefault1"
                            checked={role === 'user'}
                            value="user"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            User
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="role" id="flexRadioDefault2"
                            checked={role === 'manager'}
                            value="manager" onChange={(e) => setRole(e.target.value)} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Theater Manager
                        </label>
                    </div>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Name</label>
                    <input type="text" id="form3Example3" className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        placeholder="Enter a valid name" />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Phone</label>
                    <input type="tel" id="form3Example3" className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                        name="phone"
                        value={phone}
                        onChange={handleInputChange}
                        placeholder="Enter a valid phone" />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                    <input type="email" id="form3Example3" className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder="Enter a valid email address" />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <div className="input-group">
                        <input type={showPassword ? "text" : "password"} id="form3Example4" className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            placeholder="Enter password" />
                        <button className="btn btn-outline-secondary" type="button" onClick={handleTogglePassword}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example5">Confirm Password</label>
                    <div className="input-group">
                        <input type={showConfirmPassword ? "text" : "password"} id="form3Example5" className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm password" />
                        <button className="btn btn-outline-secondary" type="button" onClick={handleToggleConfirmPassword}>
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    {isLoading ?
                        <button disabled type="button" className="btn btn-primary">
                            <div type="button" className="spinner-border spinner-border-sm text-white "></div>
                            Loading...
                        </button>
                        : <button type="submit" className="btn btn-primary btn-lg">Register</button>}
                    {/* <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="/login" className="link-danger">Login</Link></p> */}
                </div>
            </form>
        </>
    );
}

export default RegisterPage;
