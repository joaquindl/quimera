// src/components/Admin/EditPoem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPoem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/poem/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setImageUrl(response.data.image_url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPoem();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedPoem = { title, content, image_url: imageUrl };
    try {
      await axios.put(`http://127.0.0.1:5000/poem/${id}`, updatedPoem, {
        auth: {
          username: 'admin',
          password: 'secret'
        }
      });
      navigate('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Poem</h1>
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
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <button type="submit">Update Poem</button>
      </form>
      <button onClick={() => {navigate('/admin')}}>Back to Admin Panel</button>
    </div>
  );
};

export default EditPoem;
