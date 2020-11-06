import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';

import FormContainer from './FormContainer';

function AddProdForm(props) {
	const [productName, setProductName] = useState('');
	const [weight, setWeight] = useState(500);
	const [theme, setTheme] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [pics, setPics] = useState();
	const [images, setImages] = useState();
	const [step, setStep] = useState(1);
	
	const isFilled = productName && weight >= 500 && theme && price > 0 && description ;

	const onChangeHandler = (e) => {
		setPics(e.target.files);
	};

	const setWeightHandler = (weightValue) => {
		setWeight(weightValue);
	};

	const imageUploadHandler = async () => {
		const formData = new FormData();
		for (const key of Object.keys(pics)) {
			formData.append('images', pics[key]);
		}
		const { data } = await axios.post('/api/upload', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		console.log(typeof data.images);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		imageUploadHandler();
		console.log(images);
	};

	switch (step) {
		case 1:
			return (
				<Container className='mt-5 pt-5 center-screen left-fade-in  w-50 '>
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
									{`${
										weight >= 1000 ? weight / 1000 : weight
									} ${weight >= 1000 ? 'kg' : 'g'}`}
									<Form.Control as='select'>
										<option onClick={() => setWeightHandler(500)}>
											500 g 
										</option>
										<option onClick={() => setWeightHandler(1000)}>
											1 kg
										</option>
										<option onClick={() => setWeightHandler(1500)}>
											1.5 kg
										</option>
										<option onClick={() => setWeightHandler(2000)}>
											2 kg
										</option>
										<option onClick={() => setWeightHandler(2500)}>
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
						<Button onClick={() =>{return(`${(isFilled)?setStep(2):setStep(1)}`)}} variant='dark' >
							{`${(isFilled)? "Continue to upload images": "Please Fill the form"}`}
						</Button>
					</Row>
				</Container>
			);

		case 2:
			return (
				<Container className='mt-5 pt-5 center-screen right-fade-in  w-50 ' style={{ minHeight: '90vh' }}>
					<Form >
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
