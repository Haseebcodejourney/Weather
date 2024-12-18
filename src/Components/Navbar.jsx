import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../style/navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // Use isLoggedIn and logout from AuthContext

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">WeatherApp</Link>
        <ul className="navbar-links">
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li>
                {/* <Link to="/signup" className="navbar-link">Sign Up</Link> */}
              </li>
            </>
          ) : (
            <>
              <li onClick={logout}>
              <Link>
                  Logout
                  </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/home" className="navbar-link">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
