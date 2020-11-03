import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormContainer = ({children}) => {
  return (
    <div >
      <Container className="bg-light rounded-lg">
        <div className="pl-4 pr-2 pt-4 pb-4">
          {children}
        </div>  
      </Container>
    </div>
  )
}

export default FormContainer
