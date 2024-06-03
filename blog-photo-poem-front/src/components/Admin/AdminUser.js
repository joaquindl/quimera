import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminUser = () => {
    const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/admin/users', { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    let newRole = role === 'user' ? 'admin' : 'user';
    const confirmRoleChange = window.confirm(`Are you sure you want to change role from ${role} to ${newRole}?`)
    if (confirmRoleChange) {
        try {
            await axios.put(`http://127.0.0.1:5000/admin/users/${id}`, { role: newRole }, { withCredentials: true });
            setUsers(users.map(user => (user.id === id ? { ...user, role: newRole } : user)));
          } catch (error) {
            console.error(error);
          }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
        try {
            await axios.delete(`http://127.0.0.1:5000/admin/users/${id}`, { withCredentials: true });
            setUsers(users.filter(user => user.id !== id));
          } catch (error) {
            console.error(error);
          }
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <button onClick={() => {navigate('/admin')}}>Back to Admin Panel</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.username} - {user.role}</span>
            <button onClick={() => handleRoleChange(user.id, user.role)}>
              Toggle Role
            </button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUser;
