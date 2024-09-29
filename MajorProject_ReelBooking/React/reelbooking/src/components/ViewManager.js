import React, { useState, useEffect } from "react";
import axios from "axios";
import TokenDecoder from './TokenDecoder';
import LogoutComponent from './LogOut';
const DashboardPage = () => {
    const [managers, setManagers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        try {
            const response = await axios.get("https://localhost:7210/api/TheaterManager/GetManagerDetails");
            setManagers(response.data);
        } catch (error) {
            console.error("Error fetching managers:", error);
        }
    };

    const deleteManager = async (managerId, hardDelete) => {
        try {
            const response = await axios.delete(`https://localhost:7210/api/TheaterManager/DeleteManagerDetails/${managerId}?hardDelete=${hardDelete}`);
            console.log(response.data);
            setManagers(managers.filter(manager => manager.managerId !== managerId));
        } catch (error) {
            console.error("Error deleting manager:", error);
        }
    };

    // Filter managers based on search term
    const filteredManagers = managers.filter(manager =>
        manager.managerId.toString().includes(searchTerm) ||
        manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h2>Manager Details</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by ManagerId, Name, or Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ManagerId</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredManagers.map(manager => (
                            <tr key={manager.managerId}>
                                <td>{manager.managerId}</td>
                                <td>{manager.name}</td>
                                <td>{manager.email}</td>
                                <td>{manager.phone}</td>
                                <td>{manager.password}</td>
                                <td>{manager.status}</td>
                                <td>
                                    <button className="btn btn-danger mr-2" style={{marginRight: '30px'}} onClick={() => deleteManager(manager.managerId, false)}>Temporary Delete</button>
                                    <button className="btn btn-danger" onClick={() => deleteManager(manager.managerId, true)}>Permanent Delete</button>
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
