import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [pageNumber]);

  const fetchMovies = async () => {
    try {
      const response = await axios.post('http://localhost:3000/films', {
        pagination: {
          pageSize: 4,
          pageNumber: pageNumber
        }
      });

      setMovies(response.data.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };


  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const handleBackPage = () => {
    setPageNumber(1);
  };

  return (
    <div className="form_page">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container style={{
          display: 'flex', width: '100%', height: '50px', justifyContent: 'space-between', fontSize: "30px"
        }}>
          <Nav.Link href="#home"><i className="fa-solid fa-bars"></i></Nav.Link>
          <Nav.Link href="#link">Movie UI</Nav.Link>
          <Nav.Link href="#link"><i className="fa-solid fa-magnifying-glass"></i></Nav.Link>
        </Container>
      </Navbar>
      <div className="container_page">
        <h1>Most Popular Movies</h1>
        <div className="d-flex flex-wrap" style={{ display: "flex" }}>
          {movies.map((movie, index) => (
            <div key={index} className="p-2">
              <Card className="card_style" style={{ width: '17rem', height: "350px", }} onClick={() => handleMovieClick(movie)}>
                <Card.Img variant="top" src={movie.image} style={{ width: '100px', height: '150px' }} />
                <Card.Body>
                  <Card.Title style={{ height: '50px' }}>{movie.name}</Card.Title>
                  <Card.Text>{movie.time}min {movie.year}</Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {movies.length >= 4 && (
            <Button variant="primary" onClick={handleNextPage}>Next</Button>
          )}
          {movies.length <= 3 && (
            <Button variant="primary" onClick={handleBackPage}>Go back to the first page</Button>
          )}
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <img width="300px" height=" 300px" src={selectedMovie?.image} alt={selectedMovie?.name} />
            <p>{selectedMovie?.introduce}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
