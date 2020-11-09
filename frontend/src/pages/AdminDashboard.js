import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Container,
	Nav,
	Row,
	Col,
	Media,
	Button,
	Image,
	ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from './../actions/productActions';

export default function AdminDashboard() {
	const dispatch = useDispatch();
	const [sideNav, setsideNav] = useState(false);
	const weight = 500;

	const products = useSelector((state) => state.productList.products);
	const dataprod = products.data || [];

	const sideNavtoggle = () => {
		const a = sideNav ? false : true;
		setsideNav(a);
	};

	const deleteProductHandler = async (id) => {
		await axios.delete(`/api/cake/${id}`);
		dispatch(listProducts({ minimum: 0, maximum: 950 }, weight));
	};

	useEffect(() => {
		dispatch(listProducts());
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
						<Link to='/cake/add'>
							<Button type='button' style={{ fontWeight: 550 }}>
								Add <i className='fas fa-plus'></i>
							</Button>
						</Link>
					</div>
				</Nav>
			</div>
			<Container id='content-wrapper' className=' h-auto'>
				<Link to='/profile'>
					<Button variant={'light'}>
						<span className='sidenav-icon'>
							<i className='fa fa-angle-left' />
							{'  '}Go Back
						</span>
					</Button>
				</Link>
				<h2 className='h2 mt-2'>Total Products: {dataprod.length}</h2>
				<ListGroup className='mt-3'>
					{dataprod.map((item) => (
						<ListGroup.Item
							className='d-flex flex-wrap align-middle rounded-lg w-50'
							key={item.id}
						>
							<Col
								sm={9}
								xs={9}
								md={9}
								style={{ transition: 'all 0.5s ease-in' }}
							>
								<Media className='d-flex flex-wrap'>
									<Link
										className='float-left mr-2 img-anc'
										to={`/cakes/${item.id}`}
									>
										<Image
											src={`/img/cakes/${item.images[0]}`}
											alt='Cake-img'
											className='img-responsive'
										/>
									</Link>
									<Media.Body className='d-flex flex-column ml-1'>
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
							<Col>
								<Row className='my-1'>
									<LinkContainer to={`/cake/edit/${item.id}`}>
										<Button
											variant='warning'
											size='sm'
											block
										>
											<i className='fa fa-edit pr-2'></i>
											Edit
										</Button>
									</LinkContainer>
								</Row>
								<Row className='my-1'>
									<Button
										variant='danger'
										size='sm'
										block
										onClick={() => {
											deleteProductHandler(item.id);
										}}
									>
										<i className='fa fa-trash pr-2'></i>
										Delete
									</Button>
								</Row>
							</Col>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Container>
		</Container>
	);
}
