// src/components/Admin/AdminPoem.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AdminPoem = () => {
  const navigate = useNavigate()
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/admin', {
          auth: {
            username: 'admin',
            password: 'secret'
          }
        });
        setPoems(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this poem?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/poem/${id}`, {
          auth: {
            username: 'admin',
            password: 'secret'
          }
        });
        setPoems(poems.filter(poem => poem.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Admin - Poems</h1>
      <button onClick={() => navigate('/admin/create')}>Create New Poem</button>
      <ul>
        {poems.map(poem => (
          <li key={poem.id}>
            <h2>{poem.title}</h2>
            <p>{poem.content}</p>
            {poem.image_url && <img src={`http://localhost:5000${poem.image_url}`} alt={poem.title} style={{ maxWidth: '25vw' }} />}
            <button onClick={() => navigate(`/admin/edit/${poem.id}`)}>Edit</button>
            <button onClick={() => handleDelete(poem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPoem;
