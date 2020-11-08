import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, ListGroup } from 'react-bootstrap';

function Bookings() {
	const [bookings, setBookings] = useState([]);
	const userInfo = useSelector((state) => state.userInfo);
	const { cakesBrought } = userInfo.user;

	useEffect(() => {
		setBookings(cakesBrought);
	}, [cakesBrought]);

	const renderBookings = () => {
		if (bookings.length > 0) {
			return (
				<ListGroup>
					{bookings.map((cake) => {
						return (
							<ListGroup.Item key={cake}>{cake}</ListGroup.Item>
						);
					})}
				</ListGroup>
			);
		} else {
			return <h2 className='center-screen h2'> You have no orders</h2>;
		}
	};

	return (
		<Container>
			<h3> Bookings</h3>
			{renderBookings()}
		</Container>
	);
}

export default Bookings;
