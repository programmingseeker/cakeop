import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
	Container,
	Form,
	Button,
	Modal,
	Image,
	Spinner,
	Row,
	Col,
	Alert,
} from 'react-bootstrap';
import { getUserInfo } from './../actions/userActions';

function Settings() {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newConfirmPassword, setConfirmNewPassword] = useState('');

	const { user } = useSelector((state) => state.auth);
	const uploadProfileImageHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('profileImage', file);
		setUploading(true);
		await axios.post('/api/upload/user', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		dispatch(getUserInfo());
		setUploading(false);
	};

	const onSubmitPasswordChangeHandler = async (e) => {
		e.preventDefault();
		if (currentPassword && newPassword === newConfirmPassword) {
			const passwordData = {
				password: currentPassword,
				newPassword,
				confirmNewPassword: newConfirmPassword,
			};
			const { data } = await axios.patch('/api/user/me', passwordData);
			setSuccessMessage(data.message);
			setCurrentPassword('');
			setNewPassword('');
			setConfirmNewPassword('');
		} else {
			setErrorMessage('new password and confirm password does not match');
		}
	};

	useEffect(() => {
		if (errorMessage.length > 0) {
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
		}
		if (successMessage.length > 0) {
			setTimeout(() => {
				setSuccessMessage('');
			}, 3000);
		}
	}, [errorMessage, successMessage]);

	return (
		<Container>
			<h1 className='page-content-main-text'>Account Settings</h1>
			<br />
			<Form className='mb-5'>
				<Form.Group controlId='formBasicName'>
					<Form.Label className='form-label-profile'>Name</Form.Label>
					<Form.Control
						type='name'
						readOnly
						plaintext
						className='text-muted drop-shadow input'
						defaultValue={user.username}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicEmail'>
					<Form.Label className='form-label-profile '>
						E-mail
					</Form.Label>
					<Form.Control
						type='email'
						readOnly
						plaintext
						className='text-muted drop-shadow input'
						defaultValue={user.email}
					/>
				</Form.Group>
			</Form>
			<div className='profile d-flex align-items-center mb-5 mt-5'>
				<Image
					id='myImg'
					src={
						user.googleId
							? user.profileImage
							: `/img/user/${user.profileImage}`
					}
					alt='User Profile'
					className='profile-photo'
					onClick={() => setShowModal(true)}
				/>
				{showModal ? (
					<Modal
						show={showModal}
						onHide={() => setShowModal(false)}
						dialogClassName='modal-90w'
						centered
					>
						<Modal.Body>
							<Button
								className='close'
								onClick={() => setShowModal(false)}
							>
								×
							</Button>
							<Image
								id='myImg'
								src={`/img/user/${user.profileImage}`}
								alt='User Profile'
								className='profile-photo'
								style={{ width: '25rem' }}
							/>
						</Modal.Body>
					</Modal>
				) : null}
				<Row className=' w-100'>
					<Col>
						<Form.Label
							className='ml-2 h2 cursor-pointer'
							htmlFor='custom-file-input'
						>
							Choose New Photo
						</Form.Label>
						<Form.File
							onChange={uploadProfileImageHandler}
							className='form-label-profile pl-3 ml-3'
							hidden
							id='custom-file-input'
						/>
					</Col>
					{uploading && (
						<Col>
							<Spinner
								animation='border'
								variant='secondary'
								size='lg'
								className='screen-center'
							/>
						</Col>
					)}
				</Row>
			</div>
			<Form onSubmit={onSubmitPasswordChangeHandler} className='mt-5'>
				{errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
				{successMessage && (
					<Alert variant='success'>{successMessage}</Alert>
				)}
				<Form.Group controlId='formBasicPassword'>
					<Form.Label className='form-label-profile '>
						Current Password
					</Form.Label>
					<Form.Control
						className='text-muted drop-shadow input'
						type='password'
						placeholder='Password'
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='formBasicPassword'>
					<Form.Label className='form-label-profile '>
						New Password
					</Form.Label>
					<Form.Control
						className='text-muted drop-shadow input form-control'
						type='password'
						placeholder='Password'
						id='inputPassword5'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						aria-describedby='passwordHelpBlock'
					/>
					<small
						id='passwordHelpBlock'
						className='form-text text-muted'
					>
						Your password must be 8-20 characters long, contain
						letters and numbers, and must not contain spaces,
						special characters, or emoji.
					</small>
				</Form.Group>
				<Form.Group controlId='formBasicPassword'>
					<Form.Label className='form-label-profile '>
						Confirm Password
					</Form.Label>
					<Form.Control
						className='text-muted drop-shadow input'
						type='password'
						placeholder='Password'
						value={newConfirmPassword}
						onChange={(e) => setConfirmNewPassword(e.target.value)}
					/>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					className='float-right mt-2'
				>
					Update Password
				</Button>
			</Form>
		</Container>
	);
}

export default Settings;
