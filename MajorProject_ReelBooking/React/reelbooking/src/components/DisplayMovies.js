
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { Carousel } from "react-bootstrap";

import Badge from 'react-bootstrap/Badge';
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

// --------------------------------Images----------------------------------
import second from '../Images/second.jpg';
import third from '../Images/third.jpg';
import fourth from '../Images/fourth.jpg';
import arrival from '../MovieImages/english-movies/arrival.jpg';
import BadBoysforLife from '../MovieImages/english-movies/BadBoysforLife.jpg';
import Bloodshot from '../MovieImages/english-movies/Bloodshot.jpg';
import fantasyisland from '../MovieImages/english-movies/fantasyisland.jpg';
import lion from '../MovieImages/english-movies/lion.jpg';
import rampage from '../MovieImages/english-movies/rampage.jpg';
import c1 from '../Images/c1.jpg'
import c2 from '../Images/c2.png'
import c3 from '../Images/c3.jpg'

import cc1 from '../Images/cc1.png'
import cc2 from '../Images/cc2.png'
import cc3 from '../Images/cc3.png'
import cc5 from '../Images/cc5.png'
import cc6 from '../Images/cc6.png'
import suits from '../Images/se1.jpg'
import f5 from '../Images/f5.jpg'
import avatar from '../Images/avatar.jpg'
import u5 from '../Images/u5.jpg'
import avengers from '../Images/avengers.jpg'

import premierBanner from '../Images/premierBanner.png'
import p1 from '../Images/p1.png'
import p2 from '../Images/p2.png'
import p3 from '../Images/p3.png'
import p4 from '../Images/p4.png'
import p5 from '../Images/p5.png'
import p6 from '../Images/p6.png'
import p7 from '../Images/p7.png'

import { FaStar } from 'react-icons/fa'


const DisplayAllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get('https://localhost:7210/api/Movie');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    fetchMovies();
  }, []);

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };
  return (
    <>

      <div className="container"  >


        <Carousel >
          <Carousel.Item>
            <img src={second} style={{ width: "1300px" }} alt="First slide" />
            <Carousel.Caption>
              <h3>
                The Big Bang Theory
              </h3>
              <p>
                The Big Bang Theory is an American television sitcom created by Chuck Lorre and Bill Prady, which premiered in 2007 and concluded in 2019. The series revolves around a group of socially awkward but brilliant scientists and their interactions with each other and the world around them.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={third} style={{ width: "1300px" }} alt="Second slide" />
            <Carousel.Caption>
              <h3>Peaky Blinders</h3>
              <p>Peaky Blinders is a British television series created by Steven Knight. It first premiered in 2013 and has gained widespread acclaim for its gripping storytelling, strong performances, and stylish cinematography. The series is set in Birmingham, England, in the aftermath of World War I and follows the Shelby crime family, led by the ambitious and cunning Thomas Shelby, played by Cillian Murphy.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={fourth} style={{ width: "1300px" }} alt="Third slide" />
            <Carousel.Caption>
              <h3>
              Narcos
              </h3>
              <p>
              Narcos is a popular television series that first premiered on Netflix in 2015. It was created by Chris Brancato, Carlo Bernard, and Doug Miro. The show is a crime drama that chronicles the rise and fall of drug cartels in Colombia, primarily focusing on the notorious Medellín and Cali cartels, as well as the efforts of law enforcement to bring them down.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>






        <hr />
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'black' }}>TRENDING MOVIES...</h1>
        <hr />



        <div className="row row-cols-1 row-cols-2 row-cols-3 row-cols-4 g-4">
          {movies.slice(0, 12).map((movie) => (
            <div key={movie.movieId} className="col">
              <div className="card" style={{
                width: '250px',
                // height:'470px',
                backgroundColor: '#f9f9f9',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <img src={movie.imageUrl} className="card-img-top" alt="Movie Poster" style={{
                  borderRadius: '15px 15px 0 0',
                  height: '350px',
                  objectFit: 'cover'
                }} />
                {/* <div className="card-body" style={{ padding: '20px' }}>
                                <h5 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{movie.title}</h5>
                                <Link to={`/moviedetails/${movie.movieId}`} className="btn btn-primary" style={{ marginTop: '10px' }}>
                                  Show Details
                                </Link>
                              </div> */}

                <div className="card-body" style={{ padding: '20px' }}>

                  <h5 sx={{ alignItems: 'left' }} className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginRight: '10px' }}>{movie.title}</h5>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to={`/moviedetails/${movie.movieId}`} className="btn btn-primary" style={{ marginTop: '10px' }}>
                      Show Details
                    </Link>
                    <h5 className="card-title" style={{ fontSize: '1.2rem' }}>
                      {movie.averageRating}
                      <FaStar style={{ color: '#333', margin: '5px' }} />
                    </h5>

                  </div>

                </div>


              </div>
            </div>
          ))}
        </div>

        <hr />
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'black' }}>UPCOMING MOVIES...</h1>
        <hr />

        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={suits}
          alt="suits"
        />
        <Carousel.Caption>
          <h3>Suits</h3>
          <p>
            Suits is a legal drama television series that follows the lives of talented college dropout Mike Ross and the brilliant lawyer Harvey Specter as they navigate the high-stakes world of corporate law. With sharp wit, intriguing cases, and compelling characters, Suits captivates audiences with its gripping storytelling and intense courtroom battles.
          </p>
        </Carousel.Caption>

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={f5}
          alt="Doctor Strange"
        />
       <Carousel.Caption>
          <h3>Doctor Strange</h3>
          <p>
            Doctor Strange is a Marvel superhero film that introduces audiences to the mystical realm of the Marvel Cinematic Universe. Follow the journey of Dr. Stephen Strange, a brilliant but arrogant neurosurgeon, as he discovers the hidden world of magic and sorcery after a tragic accident. With mind-bending visuals and mind-blowing action, Doctor Strange takes viewers on a thrilling adventure across dimensions, challenging reality and redefining what it means to be a hero.
          </p>
        </Carousel.Caption>

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={BadBoysforLife}
          alt="Bad Boys for Life"
        />
        <Carousel.Caption>
          <h3>Bad Boys for Life</h3>
          <p>
            Bad Boys for Life is an action-packed comedy film starring Will Smith and Martin Lawrence. It is the third installment in the Bad Boys franchise. The movie follows detectives Mike Lowrey and Marcus Burnett as they team up once again to take down a ruthless drug cartel leader.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Bloodshot}
          alt="Bloodshot"
        />
        <Carousel.Caption>
          <h3>Bloodshot</h3>
          <p>
            Bloodshot is a superhero film based on the Valiant Comics character of the same name. Starring Vin Diesel, the movie follows a soldier who is enhanced with nanotechnology, giving him superhuman abilities. As he seeks revenge for his wife's murder, he discovers disturbing truths about his past.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fantasyisland}
          alt="Fantasy Island"
        />
        <Carousel.Caption>
          <h3>Fantasy Island</h3>
          <p>
            Fantasy Island is a horror adaptation of the television series of the same name. The movie follows a group of guests who arrive at a luxurious resort on a remote island to have their wildest fantasies fulfilled. However, their dreams turn into nightmares as they uncover the island's dark secrets.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={avengers}
          alt="avengers"
        />
        <Carousel.Caption>
          <h1>Avengers</h1>
          <p>
            Avengers is a superhero film based on the Marvel Comics superhero team of the same name. Directed by Joss Whedon, the film brings together iconic Marvel characters such as Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye as they join forces to combat the villainous plot of Loki and his alien army. Filled with action-packed sequences, witty dialogue, and memorable character interactions, Avengers delivers an epic cinematic experience that celebrates the spirit of heroism, teamwork, and sacrifice. As Earth's mightiest heroes unite to save the world, audiences are treated to a thrilling adventure that showcases the power of unity and the enduring legacy of Marvel's beloved characters.
          </p>
        </Carousel.Caption>


      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={u5}
          alt="Mangalyan"
        />
        <Carousel.Caption>
          <h3>Mangalyaan</h3>
          <p>
            Mangalyaan is a historical drama film that chronicles the incredible journey of India's Mars Orbiter Mission (MOM), also known as Mangalyaan. The movie celebrates the scientific prowess and determination of the Indian Space Research Organisation (ISRO) in successfully launching an orbiter to Mars on its maiden attempt. Through the eyes of the dedicated team of scientists and engineers, Mangalyaan showcases the challenges, triumphs, and patriotic fervor behind India's landmark achievement in space exploration. With captivating storytelling and a stellar cast, Mangalyaan captures the spirit of innovation and national pride that propelled India to reach for the stars.
          </p>
        </Carousel.Caption>

      </Carousel.Item>
    </Carousel>
          
        
        <hr />


        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={c2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={c3}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={c1}
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
                  

        <hr />
        <h3 style={{ color: 'black' }}>
          User Rewards <Badge bg="secondary">New</Badge>
        </h3>

        <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Know your User Rewards...</Accordion.Header>
                        <Accordion.Body>
                          Every time a User Books a ticket, he gets 2 points in his account. After the points count reaches 10, on the next booking, he will get a 50% discount. Also, if he is booking 5 tickets at the same time, he will still get a 50% discount since the points count will be 10. After he gets the discount, 10 points will be deducted from his account.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>How User Rewards Work</Accordion.Header>
                        <Accordion.Body>
                          <ul>
                            <li>Every ticket booking earns the user 2 reward points.</li>
                            <li>When the user accumulates 10 points, they are eligible for a 50% discount on their next booking.</li>
                            <li>The discount applies even if the user books multiple tickets (up to 5) in a single transaction.</li>
                            <li>After receiving the discount, 10 points are deducted from the user's reward points balance.</li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>



        <hr />





        {/* ----------------------------------------------------------------------------------------------- */}








        <div >
          <Carousel indicators={false} >
            <Carousel.Item >
              <CardGroup style={{ display: "flex", gap: "40px", justifyContent: "space-around" }}>
                <Card className="bg-light" style={{ height: "225px", width: "225px", }}>
                  <Card.Img src={cc1} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
                <Card className="bg-light" style={{ height: "225px", width: "225px" }}>
                  <Card.Img src={cc2} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
                <Card className="bg-light" style={{ height: "225px", width: "225px" }}>
                  <Card.Img src={cc3} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
                <Card className="bg-light" style={{ height: "225px", width: "225px" }}>
                  <Card.Img src={cc5} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
                <Card className="bg-light" style={{ height: "225px", width: "225px" }}>
                  <Card.Img src={cc6} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
              </CardGroup>
            </Carousel.Item>
            <Carousel.Item>
              <CardGroup style={{ display: "flex", gap: "40px", justifyContent: "space-around" }}>
                <Card className="bg-light" style={{ height: "225px", width: "225px" }}>
                  <Card.Img src={cc2} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
                <Card className="bg-light" style={{ height: "225px", width: "225px" }}>
                  <Card.Img src={cc3} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
                <Card className="bg-light" style={{ height: "225px", width: "225px" }}>
                  <Card.Img src={cc5} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
                <Card className="bg-light" style={{ height: "225px", width: "225px" }}>
                  <Card.Img src={cc6} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
                <Card className="bg-light" style={{ height: "225px", width: "225px", }}>
                  <Card.Img src={cc1} alt="Card image" style={{ height: "225px", width: "225px", alignSelf: "center" }} />
                </Card>
              </CardGroup>
            </Carousel.Item>
          </Carousel>
        </div>

        <hr />

        <div style={{ background: "rgb(43, 49, 72)", padding: "5%" }}>
          <img width={"100%"} src={premierBanner}></img>
          <h2 style={{ color: "white" }}>Premieres</h2>
          <h7 style={{ color: "white" }}>Brand new releases every Friday</h7>
          <Carousel indicators={false} >
            <Carousel.Item >
              <CardGroup style={{ display: "flex", gap: "40px", justifyContent: "space-around" }}>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p1} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p2} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p3} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p4} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p5} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
              </CardGroup>
            </Carousel.Item>
            <Carousel.Item>
              <CardGroup style={{ display: "flex", gap: "40px", justifyContent: "space-around" }}>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p6} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p7} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p2} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p5} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
                <Card style={{ height: "300px", width: "200px", backgroundColor: "rgb(43,49,72)" }}>
                  <Card.Img src={p3} alt="Card image" style={{ height: "300px", width: "200px", alignSelf: "center" }} />
                </Card>
              </CardGroup>
            </Carousel.Item>
          </Carousel>
        </div>

        <hr />

        <div className="container">

          {/* Section for random reviews */}
          <h3 style={{ color: 'white' }}>User Reviews</h3>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {/* Sample review 1 */}
            <div className="col">
              <div className="card h-100" style={{ backgroundColor: '#f9f9f9', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Great Experience!</h5>
                  <p className="card-text">
                    "I booked my tickets through this platform and had a wonderful experience. The booking process was smooth, and the movie selection was great. Highly recommended!"
                  </p>
                  <p className="card-text">
                    <small className="text-muted">- John Doe</small>
                  </p>
                </div>
              </div>
            </div>

            {/* Sample review 2 */}
            <div className="col">
              <div className="card h-100" style={{ backgroundColor: '#f9f9f9', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Easy and Convenient</h5>
                  <p className="card-text">
                    "This booking platform made it so easy for me to book tickets for my favorite movies. The interface is user-friendly, and I love the rewards program!"
                  </p>
                  <p className="card-text">
                    <small className="text-muted">- Jane Smith</small>
                  </p>
                </div>
              </div>
            </div>

            {/* Additional reviews */}
            {/* Sample review 3 */}
            <div className="col">
              <div className="card h-100" style={{ backgroundColor: '#f9f9f9', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Fantastic Service</h5>
                  <p className="card-text">
                    "I've been using this platform for a while now, and I'm always impressed by the quality of service. The booking process is quick, and the customer support is excellent!"
                  </p>
                  <p className="card-text">
                    <small className="text-muted">- Emily Johnson</small>
                  </p>
                </div>
              </div>
            </div>

            {/* Sample review 4 */}
            <div className="col">
              <div className="card h-100" style={{ backgroundColor: '#f9f9f9', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Highly Recommend</h5>
                  <p className="card-text">
                    "I highly recommend this booking platform to everyone. It's convenient, reliable, and offers a wide range of movie options. 5 stars!"
                  </p>
                  <p className="card-text">
                    <small className="text-muted">- Michael Anderson</small>
                  </p>
                </div>
              </div>
            </div>
                            <hr></hr>
            {/* Add more sample reviews as needed */}
          </div>
        </div>





      </div>
    </>
  );
};

export default DisplayAllMovies;












