import React, { useState } from 'react';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import { login } from './../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './../components/Loader';
import FormContainer from './../components/FormContainer';
const LoginPage = ({ history, isPage = true, location }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
		history.push(location.pathname);
	};

	const a = {
		'font-size': '1rem',
		padding: '0px 2px',
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
							<Image
								src='/img/icons/googleoauth.svg'
								alt='Google Login'
							/>
						</span>
						<span className='d-flex align-items-center'>
							<hr className='hr-bar w-25' />
							<span
								className='text-muted'
								style={{ 'letter-spacing': '0.5px' }}
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
