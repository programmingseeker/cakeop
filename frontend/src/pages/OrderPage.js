import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Button,
	Alert,
	Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import {
	ORDER_DELIVER_RESET,
	ORDER_PAY_RESET,
} from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
	const orderId = match.params.id;
	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success } = orderPay;

	const { user } = useSelector((state) => state.userInfo);

	if (!loading) {
		//   Calculate prices
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(
			order.orderItems.reduce(
				(acc, item) => acc + item.price * item.quantity,
				0
			)
		);
	}

	useEffect(() => {
		if (!user) {
			history.push('/login');
		}
		if (!order || success || order._id !== orderId) {
			dispatch(getOrderDetails(orderId));
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
		}
	}, [dispatch, orderId, order, success]);

	const successPaymentHandler = (e) => {
		dispatch(payOrder(orderId));
	};

	return (
		<Container className='mt-6'>
			{loading ? (
				<Loader />
			) : error ? (
				<Alert variant='danger'>{error}</Alert>
			) : (
				<>
					<h1 className='h2'>Order {order._id}</h1>
					<Row>
						<Col md={8}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2 className='h2'>Shipping</h2>
									<p>
										<strong>Name: </strong>{' '}
										{order.user.username}
									</p>
									<p>
										<strong>Email: </strong>{' '}
										<a
											className='text-dark'
											href={`mailto:${order.user.email}`}
										>
											{order.user.email}
										</a>
									</p>
									<p>
										<strong>Address:</strong>
										{order.shippingAddress.address},{' '}
										{order.shippingAddress.city}{' '}
										{order.shippingAddress.postalCode},{' '}
										{order.shippingAddress.country}
									</p>
									{order.isDelivered ? (
										<h5 className='text-success'>
											Delivered on {order.deliveredAt}
										</h5>
									) : (
										<h5 className='text-danger '>
											Not Delivered
										</h5>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Payment Method</h2>
									<p>
										<strong>Method: </strong>
										{order.paymentMethod}
									</p>
									{order.isPaid ? (
										<h5 className='text-success'>
											Paid on {order.paidAt}
										</h5>
									) : (
										<h5 className='text-danger '>
											Not Paid
										</h5>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Order Items</h2>
									{order.orderItems.length === 0 ? (
										<Alert>Order is empty</Alert>
									) : (
										<ListGroup variant='flush'>
											{order.orderItems.map(
												(item, index) => (
													<ListGroup.Item key={index}>
														<Row>
															<Col md={1}>
																<Image
																	src={`/img/cakes/${item.image}`}
																	alt={
																		item.name
																	}
																	fluid
																	rounded
																/>
															</Col>
															<Col>
																<Link
																	className='text-dark text-decoration-none'
																	to={`/cake/${item.product}`}
																>
																	{item.name}
																</Link>
															</Col>
															<Col md={4}>
																{item.quantity}{' '}
																x ₹{item.price}{' '}
																= ₹
																{item.quantity *
																	item.price}
															</Col>
														</Row>
													</ListGroup.Item>
												)
											)}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<ListGroup>
								<ListGroup.Item>
									<h2>Order Summary</h2>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Items</Col>
										<Col>₹{order.itemsPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Shipping</Col>
										<Col>₹{order.shippingPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Tax</Col>
										<Col>₹{order.taxPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Total</Col>
										<Col>₹{order.totalPrice}</Col>
									</Row>
								</ListGroup.Item>
								{!order.isPaid && (
									<ListGroup.Item>
										{loadingPay ? (
											<Loader />
										) : (
											<Button
												variant='warning'
												block
												onClick={successPaymentHandler}
											>
												Pay Now
											</Button>
										)}
									</ListGroup.Item>
								)}
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default OrderScreen;
