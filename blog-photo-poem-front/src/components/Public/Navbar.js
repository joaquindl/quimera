import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Menu from './Menu'; // Importamos el componente Menu
import '../../styles/Navbar.css'; // Estilos del Navbar

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  // const location = useLocation();
  // const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const updateMobileView = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMobileView);
    return () => {
      window.removeEventListener('resize', updateMobileView);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Link to="/">QUIMERA</Link>
        </div>
      </div>
      {!isMobile && (
        <div className="navbar-center">
          <nav>
            <ul className="navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/museum">Museum</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </div>
      )}
      <div className="navbar-right">
        {!isAuthenticated && (
          <div className="navbar-auth-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
        {isAuthenticated && isMobile && (
          <>
            <Link to="/poem/create">Create Post →</Link>
            <div className="navbar-menu-button" onClick={toggleMenu}>
              Menu
            </div>
            {menuOpen && <Menu toggleMenu={toggleMenu} />}
          </>
        )}
        {!isMobile && isAuthenticated && (
          <>
            <Link to="/poem/create">Create Post →</Link>
            <div className="navbar-logout-button" onClick={handleLogout}>
              Logout
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
