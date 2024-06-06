// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Components
import Home from '../components/Public/Home';
import Landing from '../components/Public/Landing';
import Navbar from '../components/Public/Navbar';
import PoemDetail from '../components/Public/PoemDetail';
import Login from '../components/Public/Login';
import Signup from '../components/Public/Signup';
import AdminPoem from '../components/Admin/AdminPoem';
import AdminUser from '../components/Admin/AdminUser';
import CreatePoem from '../components/Public/CreatePoem';
import EditPoem from '../components/Admin/EditPoem';
// Auth
import PrivateRoute from './PrivateRoutes';
import { useAuth } from '../context/AuthContext';


function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Landing />} />
        <Route path="/poem/create" element={<CreatePoem />} />
        <Route path="/poem/:id" element={<PoemDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<AdminPoem />} />
          <Route path="users" element={<AdminUser />} />
          <Route path="edit/:id" element={<EditPoem />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
