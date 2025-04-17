import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/style/header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo-container">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/" className="header__nav-link">Home</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/about" className="header__nav-link">Sobre</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/contact" className="header__nav-link">Contate-nos</Link>
          </li>

          <li className="header__nav-item">
            <Link to="/login" className="header__login-button">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;