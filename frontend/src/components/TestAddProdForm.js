import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Form, Dropdown, Button ,Tabs,Tab} from 'react-bootstrap';
import FormContainer from './FormContainer';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function AddProdForm() {
	const [productName, setProductName] = useState('');
	const [weight, setweight] = useState(500);
	const [theme, setTheme] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	// const [images, setImages] = useState([]);
	const [files, setFiles] = useState([]);

	// const onUpdatefilesHandler = (e) => setFiles(e.target.files);

	const isFilled = productName && weight >= 500 && theme && price > 0 && description ;
	// ?"t":"f";
	const uploadImageHandler = async () => {
		let imageFiles = new FormData();
		imageFiles.append('images', files);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
			const { data } = await axios.post(
				'/api/upload',
				imageFiles,
				config
			);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	
	const [key, setKey] = useState('addProductForm');
	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [key])

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		uploadImageHandler();
		// console.log({ productName, weight, theme, price, description, files });
	};

	return (
		<div className='d-flex justify-content-center flex-column mt-5 pt-5 w-50 center-screen'>
		<Tabs
			id="controlled-tab-example"
			activeKey={key}
			onSelect={(k) => setKey(k)}
			variant='pills'
			>
			<Tab eventKey="addProductForm" title="Home">
				<FormContainer>
					<Form style={{ minHeight: '100vh' }}>
						<Form.Group controlId='formBasicName'>
							<Form.Label className='form-label-profile'>
								Product Name
							</Form.Label>
							<Form.Control
								type='name'
								className='text-muted drop-shadow input'
								placeholder='Product Name'
								value={productName}
								onChange={(e) => setProductName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className='d-flex'>
							<Form.Label className='form-label-profile pr-3'>
								Weight
							</Form.Label>
							<Dropdown>
								<Dropdown.Toggle
									className='button-sidenav bg-white text-dark'
									id='dropdown-basic'
									style={{ width: '10rem !important' }}
								>
									{`${weight >= 1000 ? weight / 1000 : weight} ${
										weight >= 1000 ? 'kg' : 'g'
									}`}
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item onClick={() => setweight(500)}>
										500g
									</Dropdown.Item>
									<Dropdown.Item onClick={() => setweight(1000)}>
										1kg
									</Dropdown.Item>
									<Dropdown.Item onClick={() => setweight(1500)}>
										1.5kg
									</Dropdown.Item>
									<Dropdown.Item onClick={() => setweight(2000)}>
										2kg
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Form.Group>
						<Form.Group>
							<Form.Label className='form-label-profile'>
								Theme
							</Form.Label>
							<Form.Control
								type='text'
								className='text-muted drop-shadow input'
								placeholder='Theme'
								value={theme}
								onChange={(e) => setTheme(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className='form-label-profile'>
								Price
							</Form.Label>
							<Form.Control
								input='number'
								className='text-muted drop-shadow input'
								placeholder='Price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className='form-label-profile'>
								Description
							</Form.Label>
							<Form.Control
								as='textarea'
								className='text-muted input'
								rows={3}
								style={{
									boxShadow:
										' 4px 4px 10px 1px rgba(0, 0,0,0.25)',
								}}
								placeholder='Description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>
						<Button onClick={() => {return(`${(isFilled)?setKey("addImage"):setKey("addProductForm")}`)}}>Next</Button>
					</Form>
				</FormContainer>
			</Tab>
			<Tab eventKey="addImage" disabled={!isFilled} title="Upload Image">
				<FormContainer>
					<Form style={{ minHeight: '100vh' }}>
						<Form.Group>
							<FilePond
								files={files}
								allowReorder={true}
								allowMultiple={true}
								onupdatefiles={setFiles}
								labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
							/>
							<Button type='submit' onClick={onSubmitHandler}>
								Submit
							</Button>
						</Form.Group>
					</Form>
				</FormContainer>
			</Tab>
		</Tabs>
		</div>
	);
}

export default AddProdForm;
