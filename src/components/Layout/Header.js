import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/style/header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo-container">
          <Link to="/" className="header__logo-link">
            <img src={logo} alt="Logo" className="header__logo" />
          </Link>
          <button
            className={`header__menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>

        <ul
          ref={menuRef}
          className={`header__nav-list ${menuOpen ? 'active' : ''}`}
        >
          <li className="header__nav-item">
            <Link to="/" className="header__nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/about" className="header__nav-link" onClick={closeMenu}>
              Sobre
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/login" className="header__login-button" onClick={closeMenu}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;