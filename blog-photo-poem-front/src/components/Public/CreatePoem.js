// src/components/Admin/CreatePoem.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CreatePoem = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const newPoem = { title, content, image_url: imageUrl };
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    image && formData.append('image', image);

    try {
      await axios.post('http://127.0.0.1:5000/poem/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        auth: {
          username: 'admin',
          password: 'secret'
        }
      });
      setMessage('Poem created successfully');
      setTitle('');
      setContent('');
      setImage('');

      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage('Error creating Poem')
    }
  };

  return (
    <div>
      <h1>Create Poem</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Image URL:</label>
          {/* <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /> */}
          <input type="file" onChange={(e) => {setImage(e.target.files[0])}} />
        </div>
        <button type="submit">Add Poem</button>
        {message && <p>{message}</p>}
      </form>
      {/* <button onClick={() => {navigate('/admin')}}>Back to Admin Panel</button> */}
    </div>
  );
};

export default CreatePoem;
