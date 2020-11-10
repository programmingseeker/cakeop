import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Container,
	Table,
	Media,
	Col,
	Row,
	Card,
	Button,
	Image,
} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { addToCart, removeFromCart } from '../actions/cartActions';

function Cart({ match, location, history }) {
	const [subTotalPrice, setSubTotalPrice] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		let subtotalprice;
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
		subtotalprice = cartItems
			.reduce((acc, item) => acc + item.quantity * item.price, 0)
			.toFixed(2);
		setSubTotalPrice(subtotalprice);

		const totalprice = (
			Number(subTotalPrice) +
			(18 / 100) * subTotalPrice
		).toFixed(2);

		setTotalPrice(totalprice);
	}, [
		dispatch,
		productId,
		qty,
		cartItems,
		setSubTotalPrice,
		setTotalPrice,
		subTotalPrice,
	]);

	const removeCartItemHandler = (product) => {
		dispatch(removeFromCart(product));
	};

	const paymentHandler = () => {
		if (user) {
			history.push('/shipping');
		} else {
			history.push('/login?redirect=shipping');
		}
	};
	return (
		<Container className='d-flex flex-wrap page-def'>
			<Table borderless className='col-sm-11 col-md-9'>
				<thead className='h4 mb-3'>
					<tr>
						<th className='px-2'>Product</th>
						<th className='px-2'>Quantity</th>
						<th className='px-2'>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((item) => (
						<tr
							className='align-middle bg-light rounded-lg'
							key={item.product}
						>
							<td
								className='col-sm-9 col-xs-9 col-md-6'
								style={{ transition: 'all 0.5s ease-in' }}
							>
								<Media className='d-flex flex-wrap'>
									<Image
										src={`/img/cakes/${item.image}`}
										alt='Cake-img'
										className='img-responsive float-left mr-2 img-anc'
									/>
									<Media.Body className='d-flex flex-column ml-2'>
										<h4 className='cart-item-head'>
											{item.name}
										</h4>
										<span
											className='text-muted'
											style={{ lineHeight: '1' }}
										>
											Theme: {item.theme}
										</span>
										<span className='text-muted'>
											Weight: {item.weight} grams
										</span>
									</Media.Body>
								</Media>
							</td>
							<td className='align-middle'>
								<NumericInput
									min={1}
									max={5}
									value={item.quantity}
									size='1'
									onChange={(e) => {
										dispatch(
											addToCart(item.product, Number(e))
										);
									}}
									mobile
									style={{
										wrap: {
											border: '0px !important',
										},
										input: {
											border: '0px !important',
											fontWeight: 550,
										},
									}}
								/>
							</td>
							<td
								className='align-middle h4 text-dark'
								style={{
									transition: 'all 0.5s ease-in',
									fontWeight: 550,
								}}
							>
								{`₹${item.price}`}
							</td>
							<td className='col-sm-1 col-md-1 align-middle'>
								<button
									type='button'
									className='btn btn-danger d-flex align-items-center'
									onClick={() =>
										removeCartItemHandler(item.product)
									}
								>
									<span className='d-flex align-items-center'>
										Remove
										<i className='fa fa-trash pl-2 align-middle pt-1'></i>
									</span>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Col className='d-flex flex-column'>
				<div className='rounded '>
					<Row>
						<Card
							bg='light'
							className='ml-3 card-cart-coupon text-color'
						>
							<Card.Body>
								<h2 className='text-color'>
									{cartItems.reduce(
										(acc, item) => acc + item.quantity,
										0
									)}{' '}
									Items
								</h2>
								<Card.Text>
									<li
										style={{ fontWeight: 550 }}
										className='d-flex justify-content-between text-color my-2'
									>
										{' '}
										Sub Total price:{' '}
										<span>₹{subTotalPrice}</span>
									</li>
									<li
										style={{ fontWeight: 550 }}
										className='d-flex justify-content-between text-color my-2'
									>
										GST: <span>18%</span>
									</li>
									<li
										style={{ fontWeight: 550 }}
										className='d-flex justify-content-between text-color my-2'
									>
										{' '}
										Total price: <span>₹{totalPrice}</span>
									</li>
								</Card.Text>
								<div className='d-flex justify-content-around'>
									<Image
										src='/img/icons/Mastercard-Logo.svg'
										alt='master-card'
										className='img-responsive'
									/>

									<Image
										src='/img/icons/phonepe.svg'
										alt='phonepe'
										className='img-responsive'
									/>
									<Image
										src='/img/icons/VISA-Logo.svg'
										alt='visa'
										className='img-responsive'
									/>
								</div>
								<Button
									type='button'
									className='btn-block mt-3'
									disabled={cartItems.length === 0}
									onClick={paymentHandler}
								>
									Proceed To Payment
								</Button>
							</Card.Body>
						</Card>
					</Row>
				</div>
			</Col>
		</Container>
	);
}

export default Cart;
