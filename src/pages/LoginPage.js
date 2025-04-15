import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Auth/Login';
import logo from '../assets/images/logo.png';

const LoginPage = () => {
  return (
    <div>
      <header className="header">
        <nav className="header__nav">
          <Link to="/" className="header__logo-container">
            <img src={logo} alt="Logo" className="header__logo" />
          </Link>
        </nav>
      </header>
      <Login />
    </div>
  );
};

export default LoginPage;