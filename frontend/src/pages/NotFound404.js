import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound404.scss'

const NotFound404 = () => {
  return (
    <>
      <div className="d-flex text-center h-100 mt-6">
        <div className='container d-flex items-center'>
          <img className='notfoundimg pr-3' src="/img/404-error.svg" alt="Not found image" />
          <div className="w-30 mt-5">
            <h1>404</h1>
            <h2>Oops! Page Not Be Found</h2>
            <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
            <Link to='/'>Back to homepage</Link>
          </div>  
        </div>
      </div>
    </>
  )
}

export default NotFound404;
