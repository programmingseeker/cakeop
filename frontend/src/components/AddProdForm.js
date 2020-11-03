import React ,{useState}from 'react'
import { Form, Dropdown} from 'react-bootstrap';
import FormContainer from './FormContainer'

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function AddProdForm() {
    const [weight, setweight] = useState(500);
	const filterWeight = (weightValue) => {
		setweight(weightValue);
    };
  const [files, setFiles] = useState([]);

    return (
        <div className='d-flex justify-content-center flex-column mt-5 pt-3'>
            <FormContainer>
            <Form style={{'min-height': '100vh'}}>
                <Form.Group controlId="formBasicName">
                    <Form.Label className="form-label-profile">Product Name</Form.Label>
                    <Form.Control type="name" className="text-muted drop-shadow input" placeholder="Product Name" />
                </Form.Group>
                
                <Form.Group className="d-flex" >
                <Form.Label className="form-label-profile pr-3">Weight</Form.Label>
                <Dropdown>
                    <Dropdown.Toggle
                        className='button-sidenav bg-white text-dark'
                        id='dropdown-basic'
                        style={{ width: '10rem!important'}}
                    >
                        {`${weight >= 1000 ? weight / 1000 : weight} ${
                            weight >= 1000 ? 'kg' : 'g'
                        }`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => filterWeight(500)}
                        >
                            500g
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => filterWeight(1000)}
                        >
                            1kg
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => filterWeight(1500)}
                        >
                            1.5kg
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => filterWeight(2000)}
                        >
                            2kg
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="form-label-profile">Theme</Form.Label>
                    <Form.Control type="text" className="text-muted drop-shadow input" placeholder="Theme" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="form-label-profile">Price</Form.Label>
                    <Form.Control input="number" className="text-muted drop-shadow input" placeholder="Price" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="form-label-profile">Description</Form.Label>
                    <Form.Control as="textarea"className="text-muted input" rows={3} style={{'box-shadow':' 4px 4px 10px 1px rgba(0, 0,0,0.25)'}} placeholder="Description" />
                </Form.Group>
                <Form.Group>
                <Form.Label className="form-label-profile col-lg-6">Upload Product pictures</Form.Label>
                <FilePond
                    files={files}
                    allowReorder={true}
                    allowMultiple={true}
                    onupdatefiles={setFiles}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
                </Form.Group>
            </Form>
            </FormContainer>
        </div>
    )
}

export default AddProdForm