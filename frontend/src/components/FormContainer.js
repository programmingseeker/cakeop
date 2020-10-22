import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormContainer = ({children}) => {
  return (
    <div >
      <Container className="center-screen bg-light w-30 rounded-lg">
        <div className="pl-5 pr-5 pt-4 pb-4">
          {children}
        </div>  
      </Container>
    </div>
  )
}

export default FormContainer
