import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

const NotFound = ({ message = 'Nothing Found!', linkRoute = '/', linkText = 'Go To HomePage' }) => {


  return (
    <div className='notfnd-container'>
      <p>{message}</p>
      <Link to={linkRoute}>{linkText}</Link>
    </div>
  );
};

export default NotFound;
