import React, { useState, useEffect } from 'react';
import { Container, Nav, Dropdown, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';

import ProductCardUI from './../components/ProductCardUI';
import 'react-multi-carousel/lib/styles.css';
import RangeSlider from './../components/RangeSlider';
import { listProducts } from './../actions/productActions';
import Loader from './../components/Loader';

function GetAllCakes({ history }) {
	const dispatch = useDispatch();

	const [sideNav, setsideNav] = useState(false);
	const sideNavtoggle = () => {
		const a = sideNav ? false : true;
		setsideNav(a);
	};

	const [price, setprice] = useState({ minimum: 0, maximum: 950 });
	const filterPriceHandler = (e, minimum, maximum) => {
		console.log(e);
		e.preventDefault();
		const newvalue = { minimum, maximum };
		setprice(newvalue);
		if (newvalue.minimum || newvalue.maximum) {
			history.push(`/cakes?${newvalue.minimum}&${newvalue.maximum}`);
		}
		// console.log(newvalue.minimum, newvalue.maximum);
		// console.log(price.minimum, price.maximum);
	};

	const [weight, setweight] = useState(1000);
	const filterWeight = (weightValue) => {
		setweight(weightValue);
	};

	const [rating, setrating] = useState(1);
	const filterReviewHandler = (reviewValue) => {
		setrating(reviewValue);
	};

	const products = useSelector((state) => state.productList.products);
	const dataprod = products.data || [];

	const productList = useSelector((state) => state.productList);
	const { loading, error } = productList;

	useEffect(() => {
		dispatch(listProducts(price, weight));
	}, [dispatch, price, weight, rating]);

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
	return (
		<div className='mt-2'>
			{loading ? (
				<Loader />
			) : (
				<Container
					id='wrapper'
					className={`wrapper-cakes ${
						sideNav ? 'toggled-complete' : ''
					}`}
				>
					<aside id='sidebar-wrapper'>
						<Nav
							className='sidebar-nav justify-content-center'
							as='ul'
						>
							<div className='d-flex align-items-center '>
								<img
									src='/img/icons/filter.svg'
									alt='filter icon'
								/>
								<h3
									className='text-white px-2'
									style={{ fontWeight: '600' }}
								>
									Filter
								</h3>
							</div>
							<RangeSlider
								filterPriceHandler={filterPriceHandler}
							/>
						</Nav>
						<br />
						<Nav className='d-flex align-items-center justify-content-around'>
							<h2
								className='text-white pl-2'
								style={{ fontWeight: '600' }}
							>
								Weight
							</h2>
							<Dropdown>
								<Dropdown.Toggle
									className='button-sidenav '
									id='dropdown-basic'
									style={{ width: '10rem!important' }}
								>
									{`${
										weight >= 1000 ? weight / 1000 : weight
									} ${weight >= 1000 ? 'kg' : 'g'}`}
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => filterWeight(500)}
									>
										500g
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() => filterWeight(1000)}
									>
										1kg
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() => filterWeight(1500)}
									>
										1.5kg
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() => filterWeight(2000)}
									>
										2kg
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Nav>
						<br />
						<Nav className='d-flex flex-column align-items-center justify-content-center '>
							<h2
								className='text-white pl-2'
								style={{ fontWeight: '600' }}
							>
								Reviews
							</h2>
							<Nav.Item
								className='d-flex align-items-center justify-content-center rating-item '
								style={{ cursor: 'pointer' }}
								onClick={() => filterReviewHandler(4)}
							>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span className='fa fa-star text-white'></span>
								<h4 className='text-white pl-2 '>&Up</h4>
							</Nav.Item>
							<Nav.Item
								className='d-flex align-items-center justify-content-center rating-item '
								style={{ cursor: 'pointer' }}
								onClick={() => filterReviewHandler(3)}
							>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span className='fa fa-star text-white'></span>
								<span className='fa fa-star text-white'></span>
								<h4 className='text-white pl-2 '>&Up</h4>
							</Nav.Item>
							<Nav.Item
								className='d-flex align-items-center justify-content-center rating-item '
								style={{ cursor: 'pointer' }}
								onClick={() => filterReviewHandler(2)}
							>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span className='fa fa-star text-white'></span>
								<span className='fa fa-star text-white'></span>
								<span className='fa fa-star text-white'></span>
								<h4 className='text-white pl-2 '>&Up</h4>
							</Nav.Item>
							<Nav.Item
								className='d-flex align-items-center justify-content-center rating-item '
								style={{ cursor: 'pointer' }}
								onClick={() => filterReviewHandler(1)}
							>
								<span
									style={{ color: '#ffdf00' }}
									className='fa fa-star'
								></span>
								<span className='fa fa-star text-white'></span>
								<span className='fa fa-star text-white'></span>
								<span className='fa fa-star text-white'></span>
								<span className='fa fa-star text-white'></span>
								<h4 className='text-white pl-2 '>&Up</h4>
							</Nav.Item>
						</Nav>
					</aside>
					{error && <Alert variant='danger'>{error}</Alert>}
					<div id='navbar-wrapper' className='d-flex'>
						<Nav className='navbar'>
							<div
								onClick={sideNavtoggle}
								className={`${sideNav ? '' : 'navbar-inverse'}`}
							>
								<span className='sidenav-icon'>
									<i className='fa fa-angle-double-right' />
								</span>
							</div>
							<h2
								className='text-color pl-2'
								style={{ fontWeight: '600' }}
							>
								Filters
							</h2>
						</Nav>
					</div>

					<section
						id='content-wrapper'
						className='overflow-auto d-flex flex-column'
						style={{ height: '100vh' }}
					>
						<Carousel
							additionalTransfrom={0}
							arrows
							autoPlaySpeed={3000}
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
							slidesToSlide={1}
							infinite
							swipeable
						>
							{dataprod.map((product) => {
								return (
									<div
										className='justify-content-center'
										key={product.id}
									>
										<ProductCardUI product={product} />
									</div>
								);
							})}
						</Carousel>
						<h4 className='mt-4 text-color'>
							Available:{' '}
							<span className='text-primary font-weight-bold'>
								{dataprod.length}
							</span>
						</h4>
					</section>
				</Container>
			)}
		</div>
	);
}

export default GetAllCakes;
