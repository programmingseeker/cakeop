import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormContainer = ({children}) => {
  return (
    <div >
      <Container className="center-screen bg-light w-30 rounded-lg">
        <button className="close mt-3 mr-1 bg-transparent" type="button" aria-label='Close'>
          <Link to='/' className='text-decoration-none text-dark'>&times;</Link>
        </button>
        <div className="pl-5 pr-5 pt-4 pb-4">
          {children}
        </div>  
      </Container>
    </div>
  )
}

export default FormContainer
