import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenDecoder = ({ onIdUserChange }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
   
    useEffect(() => {
        const decodeToken = (token) => {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                        .join('')
                );

                const payload = JSON.parse(jsonPayload);
                let id;
                if (payload.theaterManagerId) {
                    id = payload.theaterManagerId;
                } else if (payload.userId) {
                    id = payload.userId;
                } else if (payload.adminId) {
                    id = payload.adminId;
                } else {
                    console.error('Invalid token payload: No identifier found');
                    return;
                }
                const email = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
                
                setUserData({ id, email });
                onIdUserChange(id); // Call the function passed as prop
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        };

        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.token) {
            decodeToken(userData.token);
        } else {
            console.error('Token not found in local storage');
            navigate('/');
        }
    }, [navigate, onIdUserChange]);

    return (
        userData && userData.id && userData.email && (
            <div>
                {/* <h1>Token Decoded</h1>
                <div>
                    <p>ID: {userData.id}</p>
                    <p>Email: {userData.email}</p>
                </div> */}
            </div>
        )
    );
};

export default TokenDecoder;
