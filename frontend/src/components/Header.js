import React, {useEffect, useState} from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './../actions/userActions';

const Header = () => {
  const [navbar, setNavbar] = useState(true);
  const [user, setUser] = useState({})
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.auth.user)

  useEffect(() => {
    setUser(userdata);
    renderNavbarBg()
  },[userdata])

  const onClickLogoutHandler = () => { 
    dispatch(logout())
  }

  const renderNavbarBg = () => {
    const urls = ['/', '/login', '/signup'];
    if (urls.includes(window.location.pathname)){
      setNavbar(true)
    } else {
      setNavbar(false)
    } 
  }
  return (
    <div>
      <Navbar variant='light' expand="md" className='bg-dark'>
        <Container>
        <Navbar.Brand className='h1'>
          <Link to='/' className='text-decoration-none text-white'><span className="text-danger">You </span>Movies</Link>
        </Navbar.Brand>          
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto h5">
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
            ):(
              <>
              <Nav.Link className='pr-5'>
                <Link to='/login' className='text-decoration-none text-white'>Log In</Link>
              </Nav.Link>
              <Nav.Link className='pr-3'>
                <Link to='/signup' className='text-decoration-none text-white'>Sign Up</Link>
              </Nav.Link>
              </>
            )}
        </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
