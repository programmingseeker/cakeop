import React from 'react'
import {Container,Form,Button} from 'react-bootstrap'
function Settings() {
    return (
        <Container>
            <h1 className="page-content-main-text">Account Settings</h1>
            <Form>
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="User name" />
        </Form.Group>
        
        <Form.Group controlId="formBasicEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" className="text-muted"placeholder="Enter email" />
        </Form.Group>
        
{/*       
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    )
}

export default Settings
