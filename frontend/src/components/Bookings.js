import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

function Bookings({ cakesBrought }) {
	const renderBookings = () => {
		if (cakesBrought.length > 0) {
			return (
				<ListGroup>
					{cakesBrought.map((cake) => {
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
