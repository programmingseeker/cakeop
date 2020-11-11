import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from './../components/Loader';
import { listProductDetails, updateProduct } from './../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditPage = ({ match, history }) => {
	const productId = match.params.id;
	const [productName, setProductName] = useState('');
	const [weight, setWeight] = useState(500);
	const [theme, setTheme] = useState('');
	const [price, setPrice] = useState(0);
	const [inStock, setInStock] = useState(true);
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admindash');
		}
		if (product._id !== productId) {
			dispatch(listProductDetails(productId));
		} else {
			setProductName(product.name);
			setWeight(product.weight);
			setTheme(product.theme);
			setPrice(product.price);
			setDescription(product.description);
			setInStock(Boolean(product.inStock));
		}
	}, [product, dispatch, productId, history, successUpdate]);

	const updateProductHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name: productName,
				weight,
				theme,
				price,
				inStock,
				description,
			})
		);
	};

	return (
		<Container>
			<h1 className='page-content-main-text'>Edit Products</h1>
			<br />
			<Link className='btn btn-light my-3 mb-3' to='/admindash'>
				<i className='fa fa-angle-left' /> Go Back
			</Link>
			{loadingUpdate && <Loader />}
			{error && <Alert variant='danger'>{error}</Alert>}
			{errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
			{loading ? (
				<div className='mt-5 pt-5'>
					<Loader className='mt-5 pt-5' />
				</div>
			) : (
				<div className='center-screen left-fade-in  w-50'>
					<Row className='d-flex justify-content-center flex-column container'>
						<FormContainer>
							<Form>
								<Form.Group controlId='productName'>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type='productName'
										placeholder='Cake Name'
										value={productName}
										onChange={(e) =>
											setProductName(e.target.value)
										}
									/>
								</Form.Group>

								<Form.Group controlId='weight'>
									<Form.Label>Weight</Form.Label>
									{`${
										weight >= 1000 ? weight / 1000 : weight
									} ${weight >= 1000 ? 'kg' : 'g'}`}
									<Form.Control
										type='number'
										value={weight}
										onChange={(e) =>
											setWeight(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group controlId='inStock'>
									<Form.Label>Stock</Form.Label>
									<Form.Control
										as='select'
										className='mr-sm-2'
										id='inlineFormCustomSelect'
										custom
										onChange={(e) =>
											setInStock(e.target.value)
										}
										value={inStock}
									>
										<option value={true}>In Stock</option>
										<option value={false}>Out Of Stock</option>
									</Form.Control>
								</Form.Group>

								<Form.Group controlId='theme'>
									<Form.Label>Theme</Form.Label>
									<Form.Control
										type='theme'
										value={theme}
										onChange={(e) =>
											setTheme(e.target.value)
										}
										placeholder='Cake Theme'
									/>
								</Form.Group>
								<Form.Group controlId='pric'>
									<Form.Label>Price</Form.Label>
									<Form.Control
										type='number'
										value={price}
										onChange={(e) =>
											setPrice(e.target.value)
										}
										placeholder='Cake Price'
									/>
								</Form.Group>
								<Form.Group controlId='description'>
									<Form.Label>Cake Description</Form.Label>
									<Form.Control
										as='textarea'
										rows={3}
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
									/>
								</Form.Group>
							</Form>
						</FormContainer>
					</Row>
					<Row className='d-flex justify-content-center mt-3'>
						<Button variant='dark' onClick={updateProductHandler}>
							Update the product
						</Button>
					</Row>
				</div>
			)}
		</Container>
	);
};

export default ProductEditPage;
