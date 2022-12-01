import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Cart from './Cart';

const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to='/' className='nav-bar-options'>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to='/login' className='nav-bar-options'>Login</Nav.Link>
              <Nav.Link as={Link} to='/purchases' className='nav-bar-options'>Purchases</Nav.Link>
              <Nav.Link as={Link} to='' className='nav-bar-options' onClick={handleShow}>
                <i className="fa-solid fa-cart-shopping cart"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;