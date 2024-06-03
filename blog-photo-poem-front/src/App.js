// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Public/Home';
import Navbar from './components/Public/Navbar';
import PoemDetail from './components/Public/PoemDetail';
import Login from './components/Public/Login';
import Signup from './components/Public/Signup';
import AdminPoem from './components/Admin/AdminPoem';
import AdminUser from './components/Admin/AdminUser';
import CreatePoem from './components/Admin/CreatePoem';
import EditPoem from './components/Admin/EditPoem';
import PrivateRoute from './routes/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poem/:id" element={<PoemDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/admin" element={<PrivateRoute element={AdminPoem} />} /> */}
          {/* <Route path="/admin" element={<PrivateRoute element={AdminPoem} />} />
          <Route path="/admin/create" element={<PrivateRoute element={CreatePoem} />} />
          <Route path="/admin/edit/:id" element={<PrivateRoute element={EditPoem} />} /> */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route index element={<AdminPoem />} />
            <Route path="users" element={<AdminUser />} />
            <Route path="create" element={<CreatePoem />} />
            <Route path="edit/:id" element={<EditPoem />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
