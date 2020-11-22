import React, { useState, useEffect } from 'react';
import { Container, Nav, Dropdown, Alert, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ProductCardUI from '../components/ProductCardUI';
import 'react-multi-carousel/lib/styles.css';
import RangeSlider from '../components/RangeSlider';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';

function GetAllCakes({ history }) {
	const dispatch = useDispatch();
	const [sideNav, setsideNav] = useState(false);
	const [price, setprice] = useState({ minimum: 0, maximum: 950 });
	const [weight, setweight] = useState(1000);
	const [rating, setrating] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const limit = 3;

	const productList = useSelector((state) => state.productList);
	const products = productList.products;
	const noofpages = Math.ceil(products.totalLength / limit);
	const dataprod = products.data || [];
	const { loading, error } = productList;

	const sideNavtoggle = () => {
		const a = sideNav ? false : true;
		setsideNav(a);
	};

	const filterPriceHandler = (e, minimum, maximum) => {
		e.preventDefault();
		const newvalue = { minimum, maximum };
		setprice(newvalue);
		if (newvalue.minimum || newvalue.maximum) {
			history.push(`/cakes?${newvalue.minimum}&${newvalue.maximum}`);
		}
	};
	const filterWeight = (weightValue) => setweight(weightValue);
	const filterReviewHandler = (reviewValue) => setrating(reviewValue);

	useEffect(() => {
		dispatch(listProducts(price, weight, currentPage, limit));
	}, [dispatch, price, weight, currentPage, rating]);

	const renderPaginate = () => {
		const array = [];
		for (let i = 1; i <= noofpages; i++) {
			array.push(i);
		}
		if (products.totalLength > limit) {
			return (
				<Pagination className='center-screen mt-3 '>
					<Pagination.Prev
						as='button'
						disabled={currentPage === 1 ? true : false}
						onClick={() => setCurrentPage(currentPage - 1)}
					/>
					{array.map((item) => (
						<Pagination.Item
							as='button'
							active={item === currentPage ? true : false}
							onClick={() => setCurrentPage(item)}
						>
							{item}
						</Pagination.Item>
					))}
					<Pagination.Next
						as='button'
						disabled={currentPage === noofpages ? true : false}
						onClick={() => {
							setCurrentPage(currentPage + 1);
						}}
					/>
				</Pagination>
			);
		} else {
			return null;
		}
	};

	return (
		<div className='mt-2 '>
			<Container
				id='wrapper'
				className={`wrapper-cakes ${sideNav ? 'toggled-complete' : ''}`}
				style={{
					marginRight: '20px',
					marginLeft: '55px',
					maxWidth: '1230px',
				}}
			>
				<aside id='sidebar-wrapper'>
					<Nav className='sidebar-nav justify-content-center' as='ul'>
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
						<RangeSlider filterPriceHandler={filterPriceHandler} />
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
								{`${weight >= 1000 ? weight / 1000 : weight} ${
									weight >= 1000 ? 'kg' : 'g'
								}`}
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
					{loading ? (
						<Loader />
					) : (
						<>
							<h4 className='mt-2 text-color'>
								Available:{' '}
								<span className='text-primary font-weight-bold'>
									{products.totalLength}
								</span>
							</h4>
							<div className='d-flex flex-wrap'>
								{dataprod.map((product) => {
									return (
										<div
											className='justify-content-center'
											key={product.id}
											style={{
												padding:
													'0px -10px 0px -10px!important',
											}}
										>
											<ProductCardUI product={product} />
										</div>
									);
								})}
							</div>
							{renderPaginate()}
						</>
					)}
				</section>
			</Container>
		</div>
	);
}

export default GetAllCakes;
