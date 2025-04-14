import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/" style={styles.navLink}>Home</Link></li>
          <li style={styles.navItem}><Link to="/about" style={styles.navLink}>Sobre</Link></li>
          <li style={styles.navItem}><Link to="/contact" style={styles.navLink}>Contate-nos</Link></li>
          {!user ? (
            <>
              <li style={styles.navItem}><Link to="/login" style={styles.navLink}>Login</Link></li>
              <li style={styles.navItem}><Link to="/register" style={styles.navLink}>Register</Link></li>
            </>
          ) : (
            <>
              <li style={styles.navItem}><button onClick={logout} style={styles.logoutButton}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
    width: 'auto',
    marginRight: '20px',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  navItem: {
    marginLeft: '1.5rem',
  },
  navLink: {
    color: '#252525',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    padding: '0.5rem 0',
    borderBottom: '2px solid transparent',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
};

export default Header;