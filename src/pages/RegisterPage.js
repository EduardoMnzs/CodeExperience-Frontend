import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../components/Auth/Register';
import logo from '../assets/images/logo.png';

const RegisterPage = () => {
  return (
    <div>
      <header className="header">
        <nav className="header__nav">
          <Link to="/" className="header__logo-container">
            <img src={logo} alt="Logo" className="header__logo" />
          </Link>
        </nav>
      </header>
      <Register />
    </div>
  );
};

export default RegisterPage;