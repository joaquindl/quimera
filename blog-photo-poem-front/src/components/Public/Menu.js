import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Menu.css'; // Estilos del Menu

const Menu = ({ toggleMenu }) => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  return (
    <div className="menu">
      <div className="menu-header">
        <button className="close-menu" onClick={toggleMenu}>X</button>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>HOME</Link>
          </li>
          <li>
            <Link to="/museum" onClick={toggleMenu}>MUSEUM</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>ABOUT</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>{localStorage.getItem('username')}</li>
              {userRole === 'admin' ? (
                <>
                  {location.pathname.startsWith('/admin') ? (
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                  ) : (
                    <li><Link to="/admin" onClick={toggleMenu}>Admin Panel</Link></li>
                  )}
                </>
              ) : null}
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
      <div className="menu-footer">
        <Link to="/help" onClick={toggleMenu}>How to help Ukraine?</Link>
        <Link to="/submit" onClick={toggleMenu}>Submit work →</Link>
        <p>©2022 QUIMERA</p>
        <p>Proudly made in [Your Country]</p>
      </div>
    </div>
  );
};

export default Menu;
