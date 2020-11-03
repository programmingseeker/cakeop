import React, { useState, useEffect } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Settings from '../components/Settings';
import Reviews from '../components/Reviews';
import Bookings from '../components/Bookings';

function ProfilePage({ tab } = 'settings') {
	const [sideNav, setsideNav] = useState(false);
	const sideNavtoggle = () => {
		const a = sideNav ? false : true;
		setsideNav(a);
	};

	const [screen, setscreen] = useState('settings');
	useEffect(() => {
		setscreen(tab);
	}, [screen]);

	const handlescreen = (screen = 'settings') => {
		switch (screen) {
			case 'settings':
				return <Settings />;
			case 'reviews':
				return <Reviews />;
			case 'bookings':
				return <Bookings />;
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
							<LinkContainer to='/settings'>
								<Nav.Link
									className={`sidenav-icon ${
										tab === 'settings' ? 'active' : ''
									}`}
								>
									<i className='fa fa-user-cog' />
									Settings
								</Nav.Link>
							</LinkContainer>
						</Nav.Item>

						<Nav.Item as='li'>
							<LinkContainer to='/reviews'>
								<Nav.Link
									className={`sidenav-icon ${
										tab === 'reviews' ? 'active' : ''
									}`}
								>
									<i className='fa fa-star' />
									Reviews
								</Nav.Link>
							</LinkContainer>
						</Nav.Item>

						<Nav.Item as='li'>
							<LinkContainer to='/bookings'>
								<Nav.Link
									className={`sidenav-icon ${
										tab === 'bookings' ? 'active' : ''
									}`}
								>
									<i class='fa fa-shopping-bag'></i>Bookings
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
					</Nav>
				</div>
				<section id='content-wrapper' className='overflow-auto'>
					<div className='col-lg-12'>
						<Tab.Content>{handlescreen(screen)}</Tab.Content>
					</div>
				</section>
			</Container>
		</Tab.Container>
	);
}

export default ProfilePage;
