import React, { useState, useEffect } from 'react';
import FormContainer from './../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { signup } from './../actions/userActions';
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
	// d-flex justify-content-start
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
								<img
									className='image-cursor'
									src='/img/icons/googleoauth.svg'
									alt='Google Login'
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
