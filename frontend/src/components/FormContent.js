import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import LoginPage from '../pages/LoginPage';
// ×
function FormContent({ show, handleClose, history, location }) {
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Body>
				<Button className='close' onClick={handleClose}>
					×
				</Button>
				<LoginPage history={history} location={location} />
			</Modal.Body>
		</Modal>
	);
}

export default FormContent;
