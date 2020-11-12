import React, { useState } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
	const [paymentMethod, setPaymentMethod] = useState('PayPal');
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<Container className='mt-5 mb-5 pt-5 center-screen left-fade-in  w-50 '>
			<FormContainer>
				<CheckoutSteps step1 step2 step3 />
				<h2 className='h1'>Payment Method</h2>
				<Form onSubmit={submitHandler}>
					<Form.Group>
						<Form.Label as='legend'>Select Method</Form.Label>
						<Col>
							<Form.Check
								type='radio'
								label='PayPal or Credit Card'
								id='PayPal'
								name='paymentMethod'
								value='PayPal'
								checked={
									paymentMethod === 'PayPal' ? true : false
								}
								onChange={(e) =>
									setPaymentMethod(e.target.value)
								}
							></Form.Check>
							{/* <Form.Check
								type='radio'
								label='Stripe'
								id='Stripe'
								name='paymentMethod'
								value='Stripe'
								checked={
									paymentMethod === 'Stripe' ? true : false
								}
								onChange={(e) =>
									setPaymentMethod(e.target.value)
								}
							></Form.Check> */}
						</Col>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Continue
					</Button>
				</Form>
			</FormContainer>
		</Container>
	);
};

export default PaymentScreen;
