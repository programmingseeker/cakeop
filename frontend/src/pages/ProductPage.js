import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	Form,
	Button,
	ListGroup,
	Card,
	Alert,
} from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import Ratings from './../components/Ratings';
import Loader from './../components/Loader';

import {
	listProductDetails,
	createProductReview,
} from './../actions/productActions';
const ProductPage = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [ratings, setRatings] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const auth = useSelector((state) => state.auth);
	const { user } = auth;
	const reviewSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				review: comment,
				ratings: ratings,
			})
		);
		setComment('');
		setRatings();
		dispatch(listProductDetails(match.params.id));
	};

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	const responsive = {
		desktop: {
			breakpoint: {
				max: 3000,
				min: 1024,
			},
			items: 3,
			partialVisibilityGutter: 40,
		},
		mobile: {
			breakpoint: {
				max: 464,
				min: 0,
			},
			items: 1,
			partialVisibilityGutter: 30,
		},
		tablet: {
			breakpoint: {
				max: 1024,
				min: 464,
			},
			items: 2,
			partialVisibilityGutter: 30,
		},
	};

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<div className='mt-5 pt-5 mb-3 container'>
			<Link className='btn btn-light my-3 mb-3' to='/cakes'>
				<i className='fa fa-angle-left' /> Go Back
			</Link>
			{error && <Alert variant='danger'>{error}</Alert>}
			{loading ? (
				<div className='mt-5 pt-5'>
					<Loader className='mt-5 pt-5' />
				</div>
			) : (
				<>
					<Row className='mt-4'>
						<Col sm={12} md={6}>
							<Carousel
								additionalTransfrom={0}
								arrows
								autoPlaySpeed={3000}
								centerMode={false}
								className=''
								containerClass='image-container'
								dotListClass=''
								draggable
								focusOnSelect={false}
								infinite
								itemClass=''
								style={{
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
								keyBoardControl
								minimumTouchDrag={80}
								renderButtonGroupOutside={false}
								renderDotsOutside
								responsive={{
									desktop: {
										breakpoint: {
											max: 3000,
											min: 1024,
										},
										items: 1,
									},
									mobile: {
										breakpoint: {
											max: 464,
											min: 0,
										},
										items: 1,
									},
									tablet: {
										breakpoint: {
											max: 1024,
											min: 464,
										},
										items: 1,
									},
								}}
								showDots
								sliderClass=''
								slidesToSlide={1}
								swipeable
							>
								{product.images &&
									product.images.map((image, index) => {
										return (
											<Image
												key={index}
												fluid
												src={`/img/cakes/${image}`}
												center='true'
											/>
										);
									})}
							</Carousel>
						</Col>
						<Col>
							<h3>{product.name}</h3>
							<Ratings
								value={product.ratingsAverage}
								text={`${product.ratingsQuantity} reviews`}
							/>
							<div className='my-4'>
								<span className='h3'>₹ {product.price}</span>
							</div>
							<p>{product.description}</p>
							<div className='my-1'>
								Theme:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<strong>{product.theme}</strong>
							</div>
							<div className='my-1'>
								Weight:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<strong>{`${
								product.weight >= 1000 ? product.weight / 1000 : product.weight
								} ${product.weight >= 1000 ? 'kg' : 'gm'}`
							}</strong>
							</div>
						</Col>
						<Col>
							<ListGroup>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>₹ {product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.inStock === true
												? 'In Stock'
												: 'Out Of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{product.inStock && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) =>
														setQty(e.target.value)
													}
												>
													<option key='1' value='1'>
														{' '}
														1{' '}
													</option>
													<option key='2' value='2'>
														{' '}
														2{' '}
													</option>
													<option key='3' value='3'>
														{' '}
														3{' '}
													</option>
													<option key='4' value='4'>
														{' '}
														4{' '}
													</option>
													<option key='5' value='5'>
														{' '}
														5{' '}
													</option>
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
										disabled={product.inStock === false}
										onClick={addToCartHandler}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<br />
							{user ? (
								<Form onSubmit={reviewSubmitHandler}>
									<Form.Group>
										<Form.Label className='form-label h4'>
											Write a Review
										</Form.Label>
										<div>
											<Image
												src={`/img/user/${user.image}`}
											></Image>
										</div>
										<Form.Control
											as='select'
											size='sm'
											onChange={(e) => {
												setRatings(e.target.value);
											}}
										>
											<option selected disabled>
												---Select Rating---
											</option>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</Form.Control>
										<Form.Text className='text-muted'>
											Enter the rating
										</Form.Text>
										<br />
										<Form.Control
											as='textarea'
											placeholder='Write a Review'
											rows={3}
											onChange={(e) => {
												setComment(e.target.value);
											}}
										/>
									</Form.Group>
									<Button variant='primary' type='submit'>
										Submit
									</Button>
								</Form>
							) : (
								<span className='font-weight-bold text-dark '>
									Please login to To Write a review{' '}
									<Link
										to='/login'
										className='font-weight-normal'
									>
										login
									</Link>
								</span>
							)}
							<br />
						</Col>
						<Col md={12}>
							<Carousel
								additionalTransfrom={0}
								arrows
								autoPlay
								autoPlaySpeed={2000}
								centerMode={false}
								className=''
								containerClass='container-with-dots'
								dotListClass=''
								draggable
								focusOnSelect={false}
								itemClass=''
								keyBoardControl
								minimumTouchDrag={80}
								renderButtonGroupOutside={false}
								renderDotsOutside={false}
								responsive={responsive}
								showDots={false}
								sliderClass=''
								slidesToSlide={2}
								swipeable
								infinite
							>
								{product.reviews.map((reviewItem) => (
									<Card
										className='card-cart-coupon rounded-lg'
										bg='light'
										text='dark'
										style={{ height: '5rem !important' }}
									>
										<Card.Header>
											{reviewItem.userName}
										</Card.Header>
										<Card.Body>
											<Card.Title key={reviewItem._id}>
												<Ratings
													value={reviewItem.ratings}
												/>
											</Card.Title>
											<Card.Text>
												<span>{reviewItem.review}</span>
											</Card.Text>
										</Card.Body>
									</Card>
								))}
							</Carousel>
						</Col>
					</Row>
				</>
			)}
		</div>
	);
};

export default ProductPage;
