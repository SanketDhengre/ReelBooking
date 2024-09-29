import React, { useState } from 'react';
import axios from 'axios';
import TokenDecoder from './TokenDecoder';

const UpdateUserDetails = () => {
  const [userId, setUserId] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [newValue, setNewValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldValidations, setFieldValidations] = useState({
    Name: /^[a-zA-Z\s]+$/,
    Email: /^\S+@\S+\.\S+$/,
    Phone: /^\d{10}$/,
    Password: /^.{6,}$/,
  });
  const [showForm, setShowForm] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleUserIdChange = (id) => {
    setUserId(id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.put(`https://localhost:7210/api/Users/UpdateUserDetails/${userId}`, {
        Key: selectedField,
        Value: newValue
      });
      setSuccessMessage('User details updated successfully.');
    } catch (error) {
      if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        setErrorMessage(error.response.data.errors.join(', '));
      } else {
        setErrorMessage('An error occurred while updating user details.');
      }
    }
  };

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
    setErrorMessage('');
  };

  const validateInput = (value) => {
    const pattern = fieldValidations[selectedField];
    if (!pattern) return true; // No validation pattern found, accept any value
    return pattern.test(value);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewValue(value);
    setIsValid(validateInput(value));
  };

  return (
    <>
      <div className="login-form">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center">Update User Details</h2>
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label htmlFor="selectedField" className="form-label">Select Field:</label>
                      <select
                        value={selectedField}
                        onChange={handleFieldChange}
                        className="form-select"
                        id="selectedField"
                        required
                      >
                        <option value="">-- Select --</option>
                        <option value="Name">Name</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="Password">Password</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newValue" className="form-label">New Value:</label>
                      <input
                        type="text"
                        value={newValue}
                        onChange={handleInputChange}
                        className="form-control"
                        id="newValue"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={!isValid}>Update User Details</button>
                  </form>
                  {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                  {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TokenDecoder onIdUserChange={handleUserIdChange} />
    </>
  );
};

export default UpdateUserDetails;
