import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { login, googleAuth } from './../actions/userActions';
import Loader from './../components/Loader';
import FormContainer from './../components/FormContainer';
const LoginPage = ({ history, isPage = true, location }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.userInfo);
	const redirect = location.search ? location.search.split('=')[1] : '/';
	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	useEffect(() => {
		if (user) {
			history.push(redirect);
		}
	}, [history, user, redirect]);
	const a = {
		fontSize: '1rem',
		padding: '0px 2px',
	};

	const responseGoogleHandler = ({ tokenId }) => {
		dispatch(googleAuth(tokenId));
	};

	return (
		<>
			<div
				className={`d-flex flex-column center-screen  ${
					isPage ? 'mt-5 pt-3 w-30 ' : ''
				}`}
			>
				{loading ? (
					<Loader />
				) : (
					<FormContainer className='col-sm-center w-75 '>
						<h1 className='d-flex align-items-center justify-content-center text-color fac-title'>
							Log In
						</h1>
						<span className='d-flex justify-content-center cursor-pointer'>
							<GoogleLogin
								clientId='49017489345-nu8iljtrgl7milau4g6dtb02ch5m8tq3.apps.googleusercontent.com'
								buttonText='Login with Google'
								onSuccess={responseGoogleHandler}
								onFailure={responseGoogleHandler}
								theme='dark'
								className='mb-3 screen-center'
							/>
						</span>
						<span className='d-flex align-items-center'>
							<hr className='hr-bar w-25' />
							<span
								className='text-muted'
								style={{ letterSpacing: '0.5px' }}
							>
								LOGIN WITH EMAIL
							</span>
							<hr className='hr-bar w-25' />
						</span>
						{error && <Alert variant='danger'>{error}</Alert>}
						<Form
							onSubmit={onSubmitHandler}
							className={`${isPage ? 'container px-5' : null}`}
						>
							<Form.Group>
								<Form.Label className='form-label'>
									Email
								</Form.Label>
								<Form.Control
									type='email'
									placeholder='user@example.com'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label className='form-label'>
									Password
								</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</Form.Group>
							<Button type='submit'>Submit</Button>
							<Form.Group className='d-flex align-items-center justify-content-end'>
								<span
									style={a}
									className='d-flex align-items-center'
								>
									Are you a new user
								</span>
								<a href='/signup' style={a}>
									OR Sign Up
								</a>
							</Form.Group>
						</Form>
					</FormContainer>
				)}
			</div>
		</>
	);
};

export default LoginPage;
