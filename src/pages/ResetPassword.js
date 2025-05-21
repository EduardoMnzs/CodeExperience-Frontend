import React from 'react';
import { Link } from 'react-router-dom';
import Reset from '../components/Auth/Reset';
import logo from '../assets/images/logo.png';

const ResetPassword = () => {
  return (
    <div>
      <header className="header">
        <nav className="header__nav">
          <Link to="/" className="header__logo-container">
            <img src={logo} alt="Logo" className="header__logo" />
          </Link>
        </nav>
      </header>
      <Reset />
    </div>
  );
};

export default ResetPassword;