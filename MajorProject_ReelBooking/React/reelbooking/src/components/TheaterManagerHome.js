import DisplayAllMovies from "./DisplayMovies";
import React, { useState } from 'react'; // Import useState
import AddMovie from "./AddMovie";

import UpdateMovieDetails from "./UpdateMovieDetails";
import TokenDecoder from './TokenDecoder';
import LogoutComponent from './LogOut';
import DisplayAddedMovies from "./DisplayMovieByManager";
import DeleteMovieForm from "./DeleteMovie";

const TheaterManagerHome = () => {
    const [managerId, setManagerId] = useState(0);

    const handleIdUserChange = (id) => {
        setManagerId(id);
    };

    return (
        <div>
           {/* <Link to="/add movie" className="btn btn-success ml-2">Insert Movie</Link> */}
            
            <AddMovie managerId={managerId} />
            
            <DisplayAddedMovies managerId={managerId}/>
            <TokenDecoder onIdUserChange={handleIdUserChange} />
            {/* <LogoutComponent /> */}
        </div>
    );
};

export default TheaterManagerHome;
