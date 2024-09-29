import React, { useState, useEffect } from "react";
import axios from "axios";
import TokenDecoder from './TokenDecoder';
import LogoutComponent from './LogOut';
const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://localhost:7210/api/Users/GetUserDetails");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (userId, hardDelete) => {
        try {
            const response = await axios.delete(`https://localhost:7210/api/Users/DeleteUsersDetails/${userId}?hardDelete=${hardDelete}`);
            console.log(response.data);
            setUsers(users.filter(user => user.userId !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.userId.toString().includes(searchTerm) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h2>User Details</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by userId, Name, or Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button className="btn btn-danger mr-2" style={{marginRight: '30px'}} onClick={() => deleteUser(user.userId, false)}>Temporary Delete</button>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user.userId, true)}>Permanent Delete</button>
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
};

export default DashboardPage;
