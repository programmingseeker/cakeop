import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
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

function Settings({ userInfo }) {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newConfirmPassword, setConfirmNewPassword] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

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
		if (newPassword === newConfirmPassword) {
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
			setError('new password and confirm password does not match');
		}
	};

	useEffect(() => {
		if (error.length > 0) {
			setTimeout(() => {
				setError('');
			}, 2);
		}
		if (successMessage.length > 0) {
			setTimeout(() => {
				setSuccessMessage('');
			}, 2);
		}
	});

	return (
		<Container className='px-5 '>
			<h1 className='page-content-main-text'>Account Settings</h1>
			<br />
			<Form>
				<Form.Group controlId='formBasicName'>
					<Form.Label className='form-label-profile'>Name</Form.Label>
					<Form.Control
						type='name'
						readOnly
						plaintext
						className='text-muted drop-shadow input'
						defaultValue={userInfo.username}
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
						defaultValue={userInfo.email}
					/>
				</Form.Group>
			</Form>
			<br />
			<br />
			<div className='profile d-flex align-items-center'>
				<Image
					id='myImg'
					src={userInfo.profileImage}
					alt='User Profile'
					className='profile-photo'
					onClick={() => setShowModal(true)}
				/>
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
							src={userInfo.profileImage}
							alt='User Profile'
							className='profile-photo'
							style={{ width: '25rem' }}
						/>
					</Modal.Body>
				</Modal>
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
			<br />
			<br />
			<Form onSubmit={onSubmitPasswordChangeHandler}>
				{error && <Alert variant='danger'>{error}</Alert>}
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
