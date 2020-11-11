import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer className='footer container-fluid mt-10'>
			<Row className='d-flex footer-primary-bg p-5  mt-4'>
				<Col sm={4}>
					<div className='d-flex mb-3'>
						<img src='/img/icons/logo.svg' alt='logo' />
						<h3 className='align-self-center pl-2 text-white footer-main-title'>
							CakeOp
						</h3>
					</div>
					<p className='text-white text-justify'>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Veniam earum odio officiis voluptatibus.
					</p>
				</Col>
				<Col sm={2} className='w-25'>
					<>
						<h5>COMPANY</h5>
						<ul className='footer-links'>
							<li>
								<a href='/'>About Us</a>
							</li>
							<li>
								<a href='/'>Our Works</a>
							</li>
							<li>
								<a href='/'>Our Products</a>
							</li>
						</ul>
					</>
				</Col>
				<Col sm={2}>
					<h5>RESOURCES</h5>
					<ul className='footer-links'>
						<li>
							{' '}
							<a href='/'>Account</a>{' '}
						</li>
						<li>
							{' '}
							<a href='/'>Purchases</a>
						</li>
						<li>
							{' '}
							<a href='/'>Cart</a>{' '}
						</li>
					</ul>
				</Col>
				<Col sm={2}>
					<h5>SUPPORT</h5>
					<ul className='footer-links'>
						<li>
							<a href='/'>Contact Us</a>
						</li>
						<li>
							<a href='/'>FAQs</a>
						</li>
					</ul>
				</Col>
				<Col sm={2}>
					<h5>FOLLOW US</h5>
					<ul className='footer-links'>
						<li className='my-1'>
							{' '}
							<a href='/'>
								<img
									src='/img/icons/Twitter.svg'
									alt='twitter account'
								/>{' '}
								Twitter
							</a>{' '}
						</li>
						<li className='my-1'>
							{' '}
							<a href='/'>
								<img
									src='/img/icons/Facebook.svg'
									alt='Facebook Account'
								/>{' '}
								Facebook
							</a>{' '}
						</li>
						<li className='my-1'>
							{' '}
							<a href='/'>
								<img
									src='/img/icons/Instagram.svg'
									alt='Instagram Account'
								/>{' '}
								Instagram
							</a>{' '}
						</li>
					</ul>
				</Col>
			</Row>
			<Row className='footer-secondary-bg d-flex justify-content-sm-between'>
				<div className=' footer-copyright ml-5 '>
					<h5>Copyright &#169; 2020 CakeOP. All rights reserved.</h5>
				</div>
				<div>
					<ul className='footer-links d-inline-flex justify-content-sm-between pr-5'>
						<li className='align-self-center'>
							<a className='ml-2 mr-2' href='/'>
								Terms &amp; Conditions
							</a>
						</li>
						<li className='align-self-center'>
							<a className='ml-2 mr-2 ' href='/'>
								Privacy Policy
							</a>
						</li>
					</ul>
				</div>
			</Row>
		</footer>
	);
};

export default Footer;
