import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

function Shipping({ history }) {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [area, setArea] = useState(shippingAddress.area);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, area, postalCode }));
		history.replace('/payment');
	};
	const isFilled = address && city && postalCode && area;

	return (
		<Container className='mt-5 mb-5 pt-5 center-screen left-fade-in  w-30 '>
			<FormContainer>
				<CheckoutSteps step1 step2 />
				<h1>Shipping</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='address'>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter address'
							value={address}
							required
							onChange={(e) => setAddress(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='Area'>
						<Form.Label>Area</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Area'
							value={area}
							required
							onChange={(e) => setArea(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='city'>
						<Form.Label>City</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter city'
							value={city}
							required
							onChange={(e) => setCity(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='postalCode'>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter postal code'
							value={postalCode}
							required
							onChange={(e) => setPostalCode(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button
						type='submit'
						variant='primary'
						disabled={!isFilled}
					>
						Continue
					</Button>
				</Form>
			</FormContainer>
		</Container>
	);
}

export default Shipping;
