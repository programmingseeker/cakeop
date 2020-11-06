import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';

import FormContainer from './FormContainer';

function AddProdForm({ history }) {
	const [productName, setProductName] = useState('');
	const [weight, setWeight] = useState(500);
	const [theme, setTheme] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [pics, setPics] = useState();
	const [step, setStep] = useState(1);

	const onChangeHandler = (e) => {
		setPics(e.target.files);
	};

	const imageUploadHandler = async () => {
		const formData = new FormData();
		for (const key of Object.keys(pics)) {
			formData.append('images', pics[key]);
		}
		const { data } = await axios.post('/api/upload', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		const imagedata = [...data.images];

		const product = {
			name: productName,
			weight,
			theme,
			price,
			description,
			images: imagedata,
		};

		const { data: productData } = await axios.post(
			`/api/products`,
			product
		);
		if (productData) {
			console.log(productData);
			history.push('/admindash');
		}
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		imageUploadHandler();
	};

	switch (step) {
		case 1:
			return (
				<Container className='mt-5 mb-5 pt-5 center-screen left-fade-in'>
					<Row className='d-flex justify-content-center flex-column container'>
						<FormContainer>
							<Form>
								<Form.Group>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type='text'
										value={productName}
										onChange={(e) =>
											setProductName(e.target.value)
										}
										placeholder='Cake Name'
									/>
								</Form.Group>

								<Form.Group controlId='exampleForm.ControlSelect1'>
									<Form.Label>Weight</Form.Label>
									<Form.Control as='select'>
										<option onClick={() => setWeight(500)}>
											500 g / 0.5kg
										</option>
										<option onClick={() => setWeight(1000)}>
											1 kg
										</option>
										<option onClick={() => setWeight(1500)}>
											1.5 kg
										</option>
										<option onClick={() => setWeight(2000)}>
											2 kg
										</option>
										<option onClick={() => setWeight(2500)}>
											2.5 kg
										</option>
									</Form.Control>
								</Form.Group>

								<Form.Group>
									<Form.Label>Theme</Form.Label>
									<Form.Control
										type='text'
										value={theme}
										onChange={(e) =>
											setTheme(e.target.value)
										}
										placeholder='Cake Theme'
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Price</Form.Label>
									<Form.Control
										type='numeric'
										value={price}
										onChange={(e) =>
											setPrice(e.target.value)
										}
										placeholder='Cake Price'
									/>
								</Form.Group>
								<Form.Group controlId='exampleForm.ControlTextarea1'>
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
						<Button onClick={() => setStep(2)} variant='dark'>
							Continue to upload images
						</Button>
					</Row>
				</Container>
			);

		case 2:
			return (
				<Container className='mt-5 pt-5 center-screen right-fade-in'>
					<Form>
						<Form.Group>
							<Form.Label>Select Images</Form.Label>
							<Form.File
								id='image-file'
								label='Select Images'
								multiple
								custom
								onChange={onChangeHandler}
							></Form.File>
						</Form.Group>
					</Form>
					<div className='d-flex justify-content-center mt-3'>
						<Button
							className='mx-4'
							onClick={() => setStep(1)}
							variant='dark'
						>
							Go Back
						</Button>
						<Button
							className='mx-4'
							type='submit'
							variant='dark'
							onClick={onSubmitHandler}
						>
							Submit
						</Button>
					</div>
				</Container>
			);
	}
}

export default AddProdForm;
