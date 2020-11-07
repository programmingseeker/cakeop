import React,{useState} from 'react'
import { Container, Form, Button, Modal } from 'react-bootstrap'
function Settings() {
  const [showModal,setshowModal ]=useState(false);
  
  const showModalHandler = ()=>{
    setshowModal(true);
  };
  const hideModalHandler = ()=>{
    setshowModal(false);
  };
  return (
		<Container className='px-5 '>
			<h1 className='page-content-main-text'>Account Settings</h1>
			<br />
			<Form>
				<Form.Group controlId='formBasicName'>
					<Form.Label className='form-label-profile'>Name</Form.Label>
					<Form.Control
						type='name'
						className='text-muted drop-shadow input'
						placeholder='User name'
					/>
				</Form.Group>

				<Form.Group controlId='formBasicEmail'>
					<Form.Label className='form-label-profile '>
						E-mail
					</Form.Label>
					<Form.Control
						type='email'
						className='text-muted drop-shadow input'
						placeholder='Enter email'
					/>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					className='float-right mt-2'
				>
					Submit
				</Button>
			</Form>
			<br />
			<br />
			<div className='profile d-flex align-items-center'>
				<img
					id='myImg'
					src='/img/nouser.svg'
					alt='User Profile'
					className='profile-photo'
					onClick={showModalHandler}
				/>
				<Modal
					show={showModal}
					onHide={hideModalHandler}
					dialogClassName='modal-90w'
					centered
				>
					<Modal.Body>
						<button className='close' onClick={hideModalHandler}>
							×
						</button>
						<img
							id='myImg'
							src='/img/user-picture.jpg'
							alt='User Profile'
							className='profile-photo'
							style={{ width: '25rem' }}
						/>
					</Modal.Body>
				</Modal>
				<a
					href='#new-profile-picture'
					className='form-label-profile pl-3'
				>
					Choose New photo
				</a>
			</div>
			<br />
			<br />
			<Form>
				<Form.Group controlId='formBasicPassword'>
					<Form.Label className='form-label-profile '>
						Current Password
					</Form.Label>
					<Form.Control
						className='text-muted drop-shadow input'
						type='password'
						placeholder='Password'
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
					/>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					className='float-right mt-2'
				>
					Update password
				</Button>
			</Form>
		</Container>
  );
}

export default Settings
