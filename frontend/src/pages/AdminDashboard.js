import React, {useState,useEffect}from 'react'
import { Container, Nav,Row,Col,Media} from 'react-bootstrap';
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
    const weight =500;
    const products = useSelector((state) => state.productList.products);
	const dataprod = products.data || [];

    useEffect(() => {
		dispatch(listProducts({ minimum: 0, maximum: 950 },weight));
	}, [dispatch]);

    return (
        <Container id='wrapper' className={`${sideNav ? 'toggled' : ''}`}>
				<aside id='sidebar-wrapper'>
					<Nav className='sidebar-nav' as='ul'>
						<Nav.Item as='li'>
							<LinkContainer to='/adminprod'>
								<Nav.Link
									className="sidenav-icon active"
								>
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
                            <Link to="/addprodform">
								<button type="button" class="btn btn-primary "style={{fontWeight:550}}>Add <i class="fas fa-plus"></i></button>
							</Link>
                        </div>
					</Nav>
				</div>
				<section id='content-wrapper' className='overflow-auto'>
					<div className='col-lg-12 d-flex flex-wrap'>
                        {
                        dataprod.map((item)=>(
                        <Row className='align-middle bg-light rounded-lg my-3 col-lg-6 col-md-12'>
                            <Col className='col-sm-9 col-xs-9 col-md-9' style={{ transition: 'all 0.5s ease-in' }}>
                            <Media className='d-flex flex-wrap'>
								<a className='float-left mr-2 img-anc' href='#'>
									<img
										src={`/img/${item.images[0]}`}
										alt='Cake-img'
										className='img-responsive'
									></img>
								</a>
								<Media.Body className='d-flex flex-column ml-2'>
									<h4 className='cart-item-head'>
										{item.name}
									</h4>
									<span
										className='text-muted'
										style={{ 'line-height': '1' }}
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
					</div>
				</section>
			</Container>
    )
}
