import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
      }, { withCredentials: true });

      if (response.data.message === 'Logged in successfully') {
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        setUsername(username);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('username', username);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signup = async (username, password, confirmPassword) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        username,
        password,
        confirm_password: confirmPassword
      }, { withCredentials: true });
  
      if (response.data.message === 'User registered successfully') {
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        setUsername(username);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('username', username);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserRole(null);
      setUsername('');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, username, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
