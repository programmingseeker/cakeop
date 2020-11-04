import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import LoginPage from '../pages/LoginPage';
// ×
function FormContent({ show, handleClose, history }) {
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Body>
				<Button className='close' onClick={handleClose}>
					×
				</Button>
				<LoginPage history={history} />
			</Modal.Body>
		</Modal>
	);
}

export default FormContent;
