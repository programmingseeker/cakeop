import React,{useState} from 'react'
import { Form, Button,Container } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

function Shipping() {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
  
    const details = {address: address, city: city,postalCode: postalCode, country: country};
    const submitHandler=()=>{
        console.log(details);
    }
    const isFilled = address && city && postalCode && country;
    
    return (
				<Container className='mt-5 mb-5 pt-5 center-screen left-fade-in  w-50 '>
        <FormContainer >
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='postalCode'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postal code'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' disabled={!isFilled}>
              Continue
            </Button>
          </Form>
        </FormContainer>
        </Container>
      )
}

export default Shipping
