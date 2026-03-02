import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">SafeGuard</span>
        </Link>

        <button 
          className={`nav-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/need-help" className={`nav-link ${isActive('/need-help')}`} onClick={closeMenu}>
              Need Help
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sos" className={`nav-link sos-link ${isActive('/sos')}`} onClick={closeMenu}>
              🚨 SOS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/safe-route" className={`nav-link ${isActive('/safe-route')}`} onClick={closeMenu}>
              Safe Route
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
