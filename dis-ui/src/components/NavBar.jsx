import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav class="navbar navbar-dark bg-secondary">
      <div class="container-fluid">
        <ul className="nav">
          <img src={logo} alt="logo" style={{ width: '5rem' }} />
        </ul>
        <ul className="nav">
          <FontAwesomeIcon icon={faUser} className="text-light mx-3 my-auto" />
          <span className="text-light my-auto">ADMIN</span>
          <NavLink className="nav-link text-light" to="/">
            Atsijungti
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
