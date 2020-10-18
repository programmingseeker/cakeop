import React, {useEffect, useState} from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './../actions/userActions';

const Header = () => {
  const [user, setUser] = useState({})
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.auth.user)

  useEffect(() => {
    setUser(userdata);
  },[userdata])

  const onClickLogoutHandler = () => { 
    dispatch(logout())
  }

  
  return (
  <Navbar expand='lg' bg='white' fixed='top' className="shadow">
  <Container className="text-center">
    <Navbar.Brand href='/'>
      <img alt="Logo"src="/img/icons/logo.svg" className="d-inline-block align-middle"/>{'  '}
      <span className="align-middle h2 font-weight-bold">CakeOp</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="#navbarSupportedContent"/>
    <Navbar.Collapse id="navbarSupportedContent">
      <Nav className='ml-auto text-center'>
        <Nav.Link href="#home">
          <i className="fas fa-users fa-lg px-2"></i>
          About Us</Nav.Link>
        <Nav.Link href="#link1">
          <i className="fas fa-phone-alt px-2"></i>
          Contact Us
        </Nav.Link>
        <Nav.Link href="#link2">
          <i className="fas fa-shopping-cart px-2"></i>
          Cart
        </Nav.Link>
          {
            user ?
            (
              <NavDropdown title={user.username} id='username'>
                <NavDropdown.Item>
                  <Link to='/profile' className='text-decoration-none text-dark'>Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={onClickLogoutHandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>  
            ) : (
                  <Nav.Link href='/login'>
                    <i className="fas fa-user pr-2"></i>
                Log In / Sign Up
              </Nav.Link>                    
            )
          }
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
)
  
  
}


export default Header
