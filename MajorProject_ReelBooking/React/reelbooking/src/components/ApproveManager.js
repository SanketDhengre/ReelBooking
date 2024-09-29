
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TokenDecoder from './TokenDecoder';
import LogoutComponent from './LogOut';
function ApproveManager({ onLogout }) {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('https://localhost:7210/api/TheaterManager/GetPendingManagers');
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };
  
  const handleApproval = async (managerId, isApproved) => {
    try {
      const response = await axios.post(`https://localhost:7210/api/TheaterManager/ApproveManager/${managerId}`, { isApproved });
      if (isApproved) {
        alert('Manager approval status updated to Approved');
      } 
      // Remove the approved or rejected manager from the list
      setPendingRequests(prevRequests => prevRequests.filter(request => request.managerId !== managerId));
    } catch (error) {
      console.error('Approval failed:', error.response.data);
    }
  };

    
  const handleRejection = async (managerId, isRejected) => {
    try {
      const response = await axios.post(`https://localhost:7210/api/TheaterManager/RejectManager/${managerId}`, {isRejected});
      alert('Manager approval status updated to Rejected');
      
      // Remove the rejected manager from the list
      setPendingRequests(prevRequests => prevRequests.filter(request => request.managerId !== managerId));
    } catch (error) {
      console.error('Rejection failed:', error.response.data);
    }
  };
  
  

  return (
    <>
    <div className="approve-manager">
      <h3 className="mt-3">Pending Managers Registration Requests:</h3>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>ManagerId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map((request) => (
            <tr key={request.managerId}>
              <td>{request.managerId}</td>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.phone}</td>
              <td>{request.password}</td>
              <td>{request.status}</td>
              <td>
                <button className="btn btn-success me-2" onClick={() => handleApproval(request.managerId, true)}>Accept</button>
                <button className="btn btn-danger" onClick={() => handleRejection(request.managerId, false)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    <TokenDecoder/>
      {/* <LogoutComponent/> */}
          </>
  );
}

// export default ApproveManager;
export default ApproveManager;
