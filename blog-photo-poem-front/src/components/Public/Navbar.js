import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <ul>
        {!isAuthenticated && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>{localStorage.getItem('username')}</li>
            {userRole === 'admin' ? (
              <>
                {location.pathname.startsWith('/admin') ? (
                  <li><Link to="/">Home</Link></li>
                ) : (
                  <li><Link to="/admin">Admin Panel</Link></li>
                )}
              </>
            ) : null}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
