import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all local storage data
    localStorage.clear();
    // Redirect to the login page or any other appropriate page
    window.location.reload();

    navigate('/');
  };

  useEffect(() => {
    // This effect will trigger whenever the component mounts or when isLoggedIn changes
    const handleWindowNavigation = (event) => {
      // Check if the user is logged out
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        // If logged out, prevent default browser navigation
        event.preventDefault();
        // Redirect to the home page
        navigate('/');
      }
    };

    // Listen for beforeunload event to handle browser navigation
    window.addEventListener('beforeunload', handleWindowNavigation);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('beforeunload', handleWindowNavigation);
    };
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      
      <button className="btn btn-danger mr-2" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutComponent;
