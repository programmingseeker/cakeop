import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Form, Button, ListGroup } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import Ratings from './../components/Ratings';
import Loader from './../components/Loader';

import {
	listProductDetails,
	createProductReview,
} from './../actions/productActions';

import { PRODUCT_CREATE_REVIEW_RESET } from './../constants/productConstants';

const ProductPage = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [ratings, setRatings] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const auth = useSelector((state) => state.auth);
	const { user } = auth;

	const productCreateReview = useSelector(
		(state) => state.productCreateReview
	);
	const {
		success: successProductReview,
		error: errorProductReview,
	} = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<div className='mt-5 pt-5 mb-3 container'>
			<Link className='btn btn-light my-3 mb-3' to='/'>
				<span>{'<'}</span> Go Back
			</Link>
			{loading ? (
				<Loader />
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
								containerClass='carousel-container'
								dotListClass=''
								draggable
								focusOnSelect={false}
								infinite
								itemClass=''
								keyBoardControl
								minimumTouchDrag={80}
								renderButtonGroupOutside={false}
								renderDotsOutside={false}
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
									product.images.map((image) => {
										return (
											<Image
												fluid
												src={`/img/${image}`}
												style={{
													width: '50%',
													height: 'auto',
													objectPosition: '50% 50%',
													objectFit: 'contain',
													margin: '0 auto',
												}}
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
								<strong>{product.weight} gm</strong>
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
											{product.inStock === 'true'
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
										disabled={product.inStock === 'false'}
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
								
						</Col>
					</Row>
				</>
			)}
		</div>
	);
};

export default ProductPage;
