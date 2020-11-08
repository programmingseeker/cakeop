import React, { useState } from 'react';
import { Container, Nav, Tab, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Settings from '../components/Settings';
import Reviews from '../components/Reviews';
import Bookings from '../components/Bookings';

function ProfilePage() {
	const [sideNav, setsideNav] = useState(false);
	const [tab, setTab] = useState('settings');
	const sideNavtoggle = () => {
		const a = sideNav ? false : true;
		setsideNav(a);
	};

	const { user } = useSelector((state) => state.auth);
	const { user: userInfo } = useSelector((state) => state.userInfo);

	const handlescreen = () => {
		switch (tab) {
			case 'settings':
				return <Settings userInfo={userInfo} />;
			case 'reviews':
				return <Reviews />;
			case 'bookings':
				return <Bookings cakesBrought={userInfo.cakesBrought} />;
			default:
				return <div> this is a wrong page</div>;
		}
	};
	return (
		<Tab.Container defaultActiveKey='settings'>
			<Container id='wrapper' className={`${sideNav ? 'toggled' : ''}`}>
				<aside id='sidebar-wrapper'>
					<Nav className='sidebar-nav' as='ul'>
						<Nav.Item as='li'>
							<Nav.Link
								as='text'
								onClick={() => setTab('settings')}
								className={`sidenav-icon cursor-pointer ${
									tab === 'settings' ? 'active' : ''
								}`}
							>
								<i className='fa fa-user-cog' />
								Settings
							</Nav.Link>
						</Nav.Item>

						<Nav.Item as='li'>
							<Nav.Link
								as='text'
								onClick={() => setTab('reviews')}
								className={`sidenav-icon cursor-pointer ${
									tab === 'reviews' ? 'active' : ''
								}`}
							>
								<i className='fa fa-star' />
								Reviews
							</Nav.Link>
						</Nav.Item>

						<Nav.Item as='li'>
							<Nav.Link
								as='text'
								onClick={() => setTab('bookings')}
								className={`sidenav-icon cursor-pointer ${
									tab === 'bookings' ? 'active' : ''
								}`}
							>
								<i className='fa fa-shopping-bag'></i>Bookings
							</Nav.Link>
						</Nav.Item>

						{user.userType === 'admin' ? (
							<Nav.Item as='li'>
								<LinkContainer to='/admindash'>
									<Nav.Link
										as='text'
										onClick={() => setTab('admindash')}
										className={`sidenav-icon cursor-pointer ${
											tab === 'admindash' ? 'active' : ''
										}`}
									>
										<i className='fa fa-tachometer-alt'></i>
										Admin Dashboard
									</Nav.Link>
								</LinkContainer>
							</Nav.Item>
						) : null}
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
					</Nav>
				</div>
				<section id='content-wrapper' className='overflow-auto'>
					<Col lg={12}>
						<Tab.Content>{handlescreen()}</Tab.Content>
					</Col>
				</section>
			</Container>
		</Tab.Container>
	);
}

export default ProfilePage;
