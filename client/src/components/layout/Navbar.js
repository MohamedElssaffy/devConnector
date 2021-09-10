import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='index.html'>
          <i className='fas fa-code'></i> DevConnector
        </a>
      </h1>
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        <li>
          <Link to='/Login'>Login</Link>
        </li>
        <li>
          <Link to='/Register'>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
