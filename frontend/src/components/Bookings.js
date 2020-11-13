import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { LinkContainer, Alert } from 'react-router-bootstrap';

import Loader from './Loader';

import { listMyOrders } from '../actions/orderActions';

function Bookings() {
	const dispatch = useDispatch();

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading, error, orders } = orderListMy;
	useEffect(() => {
		dispatch(listMyOrders());
	}, [dispatch]);

	const renderBookings = () => {
		return (
			<Table striped bordered hover responsive className='table-sm'>
				<thead>
					<tr>
						<th>ORDER ID</th>
						<th>DATE</th>
						<th>TOTAL</th>
						<th>PAID</th>
						<th>DELIVERED</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order._id}>
							<td>{order._id}</td>
							<td>{order.createdAt.substring(0, 10)}</td>
							<td>{order.totalPrice}</td>
							<td>
								{order.isPaid ? (
									order.paidAt.substring(0, 10)
								) : (
									<i
										className='fas fa-times'
										style={{ color: 'red' }}
									></i>
								)}
							</td>
							<td className='text-center align-center'>
								{order.isDelivered ? (
									order.deliveredAt.substring(0, 10)
								) : (
									<i
										className='fas fa-times'
										style={{ color: 'red' }}
									></i>
								)}
							</td>
							<td className='text-center'>
								<LinkContainer to={`/order/${order._id}`}>
									<Button
										className='bg-primary text-light'
										variant='light'
									>
										Details
									</Button>
								</LinkContainer>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		);
	};

	return (
		<>
			{error && <Alert variant='danger'>{error}</Alert>}
			{loading ? (
				<Loader />
			) : (
				<Container>
					<h3> Orders</h3>
					{renderBookings()}
				</Container>
			)}
		</>
	);
}

export default Bookings;
