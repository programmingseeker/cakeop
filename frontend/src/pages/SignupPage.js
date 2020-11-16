import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';

import FormContainer from './../components/FormContainer';
import { signup, googleAuth } from './../actions/userActions';
import Loader from './../components/Loader';

const SignupPage = ({ history, location }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	const { loading, error, user } = useSelector((state) => state.auth);

	const redirect = location.search ? location.search.split('=')[1] : '/';
	useEffect(() => {
		if (user) {
			history.push(redirect);
		}
	}, [history, user, redirect]);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(signup(username, email, password, confirmPassword));
		}
	};
	const responseGoogleHandler = ({ tokenId }) => {
		dispatch(googleAuth(tokenId));
	};

	return (
		<>
			<div className='d-flex justify-content-center flex-column mt-5 pt-3'>
				{loading ? (
					<Loader />
				) : (
					<div className='w-30 center-screen'>
						<FormContainer className='d-flex justify-content-center '>
							<h1 className='d-flex align-items-center justify-content-center text-color fac-title'>
								Sign Up
							</h1>
							<span className='d-flex justify-content-center'>
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
								<hr className='hr-barl d-flex justify-content-start' />
								<span
									className='text-muted '
									style={{ 'letter-spacing': '0.5px' }}
								>
									SIGNUP WITH EMAIL
								</span>
								<hr className='hr-barr d-flex justify-content-end' />
							</span>
							{message && (
								<Alert variant='danger'>{message}</Alert>
							)}
							{error && <Alert variant='danger'>{error}</Alert>}
							<Form
								onSubmit={onSubmitHandler}
								className='container px-5'
							>
								<Form.Group>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type='text'
										placeholder='username'
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type='email'
										placeholder='user@example.com'
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='********'
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='********'
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
									/>
								</Form.Group>
								<Button type='submit'>Submit</Button>
							</Form>
						</FormContainer>
					</div>
				)}
			</div>
		</>
	);
};

export default SignupPage;
