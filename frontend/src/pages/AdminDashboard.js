import React, { useState, useEffect } from 'react';
import { Container, Nav, Row, Col, Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from './../actions/productActions';

export default function AdminDashboard() {
	const dispatch = useDispatch();

	const [sideNav, setsideNav] = useState(false);
	const sideNavtoggle = () => {
		const a = sideNav ? false : true;
		setsideNav(a);
	};
	const weight = 500;
	const products = useSelector((state) => state.productList.products);
	const dataprod = products.data || [];

	useEffect(() => {
		dispatch(listProducts({ minimum: 0, maximum: 950 }, weight));
	}, [dispatch]);

	return (
		<Container id='wrapper' className={`${sideNav ? 'toggled' : ''}`}>
			<aside id='sidebar-wrapper'>
				<Nav className='sidebar-nav' as='ul'>
					<Nav.Item as='li'>
						<LinkContainer to='/admindash'>
							<Nav.Link className='sidenav-icon active'>
								<i className='fa fa-birthday-cake' />
								Cakes
							</Nav.Link>
						</LinkContainer>
					</Nav.Item>
				</Nav>
			</aside>
			<div id='navbar-wrapper'>
				<Nav className='navbar'>
					<div
						onClick={sideNavtoggle}
						className={`${sideNav ? '' : 'navbar-inverse'}`}
					>
						<span className='sidenav-icon'>
							<i className='fa fa-angle-double-right' />
						</span>
					</div>

					<div>
						<Link to='/addproduct'>
							<Button type='button' style={{ fontWeight: 550 }}>
								Add <i className='fas fa-plus'></i>
							</Button>
						</Link>
					</div>
				</Nav>
			</div>
			<section id='content-wrapper' className='overflow-auto'>
				<Link to='/profile'>
					<Button variant={'light'}>
						<span className='sidenav-icon'>
							<i className='fa fa-angle-left' />
							{'  '}Go Back
						</span>
					</Button>
				</Link>
				<Col lg={12} className='d-flex flex-wrap'>
					{dataprod.map((item) => (
						<Row
							className='align-middle bg-light rounded-lg my-3 col-lg-6 col-md-12'
							key={item.id}
						>
							<Col
								className='col-sm-9 col-xs-9 col-md-9'
								style={{ transition: 'all 0.5s ease-in' }}
							>
								<Media className='d-flex flex-wrap'>
									<Link
										className='float-left mr-2 img-anc'
										to=''
									>
										<img
											src={`/img/${item.images[0]}`}
											alt='Cake-img'
											className='img-responsive'
										></img>
									</Link>
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
							</Col>
						</Row>
					))}
				</Col>
			</section>
		</Container>
	);
}
