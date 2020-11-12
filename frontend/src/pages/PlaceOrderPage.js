import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Row,
	Col,
	ListGroup,
	Image,
	Alert,
	Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const PlaceOrderPage = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		)
	);
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
	cart.taxPrice = addDecimals(Number((0.18 * cart.itemsPrice).toFixed(2)));
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
		// eslint-disable-next-line
	}, [history, success]);

	const placeOrderHandler = (e) => {
		e.preventDefault();
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<Container className='mt-6'>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress.address},{' '}
								{cart.shippingAddress.area}
								{cart.shippingAddress.city},{' '}
								{cart.shippingAddress.postalCode}.
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{cart.paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Alert>Your cart is empty</Alert>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={`/img/cakes/${item.image}`}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link
														className='text-decoration-none text-color'
														to={`/cakes/${item.product}`}
													>
														{item.name}
													</Link>
												</Col>
												<Col
													md={4}
													className='text-color'
												>
													{item.quantity} x ₹
													{item.price} = ₹
													{item.quantity * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<ListGroup className=''>
						<ListGroup.Item>
							<h2>Order Summary</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Items</Col>
								<Col>₹{cart.itemsPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Shipping</Col>
								<Col>₹{cart.shippingPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Tax</Col>
								<Col>₹{cart.taxPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Total</Col>
								<Col>₹{cart.totalPrice}</Col>
							</Row>
						</ListGroup.Item>
						{error && (
							<ListGroup.Item>
								<Alert variant='danger'>{error}</Alert>
							</ListGroup.Item>
						)}
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cart.cartItems === 0}
								onClick={placeOrderHandler}
							>
								Place Order
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
};

export default PlaceOrderPage;
