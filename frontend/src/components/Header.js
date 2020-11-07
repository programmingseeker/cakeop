import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from './../actions/userActions';
import FormContent from './FormContent';

const Header = () => {
	const [user, setUser] = useState({});
	const dispatch = useDispatch();
	const userdata = useSelector((state) => state.auth.user);
	const [showModal, setshowModal] = useState(false);
	useEffect(() => {
		setUser(userdata);
	}, [userdata]);

	const showModalHandler = () => {
		setshowModal(true);
	};
	const hideModalHandler = () => {
		setshowModal(false);
	};
	const onClickLogoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Navbar expand='lg' bg='white' fixed='top' className='shadow'>
			<Container className='text-center'>
				<LinkContainer to='/'>
					<Navbar.Brand>
						<img
							alt='Logo'
							src='/img/icons/logo.svg'
							className='d-inline-block align-middle'
						/>
						{'  '}
						<span className='align-middle h2 font-weight-bold'>
							CakeOp
						</span>
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls='#navbarSupportedContent' />
				<Navbar.Collapse id='navbarSupportedContent'>
					<Nav className='ml-auto text-center'>
						<LinkContainer to='/#About'>
							<Nav.Link>
								<i className='fas fa-users fa-lg px-2'></i>
								About Us
							</Nav.Link>
						</LinkContainer>

						<LinkContainer to='/#contact'>
							<Nav.Link>
								<i className='fas fa-phone-alt px-2'></i>
								Contact Us
							</Nav.Link>
						</LinkContainer>

						<LinkContainer to='/cart'>
							<Nav.Link>
								<i className='fas fa-shopping-cart px-2'></i>
								Cart
							</Nav.Link>
						</LinkContainer>

						{user ? (
							<NavDropdown
								title={user.username ? user.username : ''}
								id='username'
								onClick={hideModalHandler}
							>
								<LinkContainer to='/profile'>
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>

								<NavDropdown.Item
									as='button'
									className='text-decoration-none text-dark'
									onClick={onClickLogoutHandler}
								>
									Log Out
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<>
								<Nav.Link onClick={showModalHandler}>
									<i className='fas fa-user pr-2'></i>
									Log In / Sign Up
								</Nav.Link>
								{showModal ? (
									<Route
										render={({ history, location }) => (
											<FormContent
												show={showModal}
												handleClose={hideModalHandler}
												history={history}
												location={location}
											></FormContent>
										)}
									/>
								) : null}
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
