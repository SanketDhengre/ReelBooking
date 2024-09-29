import React, { Component,useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Navbar, Nav, Carousel } from "react-bootstrap";
import axios from "axios";
import AddUser from "./AddUser";
import LoginForm from "./LoginUser";
import SearchMovie from "./SearchMovie";
import UserHome from "./UserHome";
import TheaterManagerHome from "./TheaterManagerHome";
import AdminHome from "./AdminHome";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogoutComponent from "./LogOut";
import RegisterPage from "./Registerpage";
import ViewUser from "./ViewUser";
import ViewManager from "./ViewManager";
import ApproveManager from "./ApproveManager";
import DisplayAllMovies from "./DisplayMovies";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import MovieDetails from "./MovieDetails";
import BookingForm from "./BookingForm";
import RatingAndReviewForm from "./RatingAndReviewForm";
import RatingsAndReviews from "./ViewRatingsAndReviews";
import ViewBooking from "./ViewBookings";
import GetBookings from "./GetBookings";
import UpdateUserDetails from "./UpdateUserDetails";
import { NavDropdown } from 'react-bootstrap';

import logo from "../Images/logo.png";
import BookingHistory from "./BookingHistory";

const iconStyle = {
    marginRight: "10px",
    fontSize: "24px",
    color: "#fff",
    transition: "transform 0.3s ease-in-out",
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: {
                isAddUser: false,
                isUserDetails: true
            },
            response: null,
            userData: {},
            isLoggedIn: false,
            role:'',
            movies: []
        };
    }
    
    componentDidMount() {
        this.fetchMovies();
         // Fetch user role from localStorage when component mounts
         const role = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).role : null;
         this.setState({ userRole: role });
    }

    fetchMovies = async () => {
        try {
            const response = await axios.get('https://localhost:7210/api/Movie');
            this.setState({ movies: response.data });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    getRandomMovieImages = (count) => {
        const { movies } = this.state;
        const randomImages = [];
        const movieCount = movies.length;
        if (movieCount === 0) return [];

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * movieCount);
            randomImages.push(movies[randomIndex].imageUrl);
        }

        return randomImages;
    }

    updateLoginStatus = (isLoggedIn,role) => {
        this.setState({ isLoggedIn,role });
    }
    updateMovies = (newMovies) => {
        this.setState({ movies: newMovies });
    };
    componentDidUpdate(prevProps, prevState) {
        // Check if the user role has changed and update state accordingly
        const newRole = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).role : null;
        if (newRole !== prevState.userRole) {
            this.setState({ userRole: newRole });
        }
    }
    render() {
        const { isLoggedIn, movies } = this.state;
        const { userRole } = this.state;
        return (
            <div className="App" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Router>
                <Navbar bg="dark" variant="dark">
                <Container>
                    
                <Link to="/" className="logo-link">
          <img src={logo} alt="ReelBooking" style={{ height: '30px', marginRight: '10px' }} />
        </Link>

                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/searchmovie">Go To Search</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {!localStorage.getItem('userData') ? (
                            <>
                                <Link to="/login" className="btn btn-primary">Login</Link>
                                <span style={{ marginLeft: '10px' }} />
                                <Link to="/register" className="btn btn-primary">Register</Link>
                            </>
                        ) : (
                            <>
                                {userRole === 'user' && ( 
                                    <NavDropdown title="User Menu" id="collasible-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/updateuserdetails">Update Profile</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/viewbookings">View Bookings</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/bookinghistory">View History</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </NavDropdown>
                                )}
                                <span className="nav-link" style={{color:'white'}}>Hello {this.state.role}</span>
                                <LogoutComponent/>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>

                    <Container>
                        <header>
                            <h1></h1>
                        </header>



                        <Routes>
                            <Route path="/" element={<DisplayAllMovies />} />
                            <Route path="/login" element={<LoginForm updateLoginStatus={this.updateLoginStatus} />} />
                            <Route path="/userhome" element={<UserHome />} />
                            <Route path="/theatermanagerhome" element={<TheaterManagerHome />} />
                            <Route path="/adminhome" element={<AdminHome />} />
                            <Route path="/logout" element={<LogoutComponent />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route
                                path="/searchmovie"
                                element={<SearchMovie updateMovies={this.updateMovies} />}
                            />
                            <Route path="/viewuser" element={<ViewUser />} />
                            <Route path="/approvemanager" element={<ApproveManager />} />
                            <Route path="/viewmanager" element={<ViewManager />} />
                            <Route path="/moviedetails/:movieId" element={<MovieDetails />} />
                            <Route path="/booking/:movieId" element={<BookingForm />} />
                            <Route path="/viewbookings" element={<ViewBooking />} />
                            <Route path="/viewAllbookings" element={<GetBookings  />} />
                            <Route path="/updateuserdetails" element={<UpdateUserDetails />} />
                            <Route path="/bookinghistory" element={<BookingHistory />} />

                            <Route path="/ratings-review/:movieId" element={<RatingAndReviewForm />} />
                            {/* <Route path="/reviewsbymovieid/:movieId" element={<RatingsAndReviews  />}/> */}

                        </Routes>
                        {/* <DisplayAllMovies /> */}
                    </Container>

                    <footer className="footer mt-auto py-5 bg-dark text-white">
                        <Container>
                            <div className="footer-content">
                                <div className="row">
                                    <div className="col-lg-4 mb-4">
                                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                                        <p>Email: reelbook@gmail.com</p>
                                        <p>Phone: +91 9307600986</p>
                                        <p>Address: 123 Street Name, City, Country</p>
                                    </div>
                                    <div className="col-lg-4 mb-4">
                                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                                        <div className="social-links">
                                            <Link to="#" style={iconStyle}>
                                                <FacebookIcon />
                                            </Link>
                                            <Link to="#" style={iconStyle}>
                                                <TwitterIcon />
                                            </Link>
                                            <Link to="#" style={iconStyle}>
                                                <InstagramIcon />
                                            </Link>
                                            <Link to="#" style={iconStyle}>
                                                <EmailIcon />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-4">
                                        <h3 className="text-xl font-semibold mb-4">About Us</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis massa felis.</p>
                                        <p>Nulla facilisi. Integer consectetur urna et lacus vehicula, ut pharetra turpis condimentum.</p>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </footer>


                </Router>
            </div>
        );
    }
}

export default Home;
