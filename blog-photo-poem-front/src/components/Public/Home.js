// src/components/Public/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// Components
import Button from '../common/Button';

const Home = () => {
  const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/');
        setPoems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPoems();
  }, []);

  return (
    <div>
      <h1>Poems</h1>
      {/* {isAuthenticated && <Button onClick={() => {navigate('/poem/create')}}>Create post</Button>} */}
      <ul>
        {poems.map(poem => (
          <li key={poem.id} onClick={() => navigate(`/poem/${poem.id}`)} style={{ cursor: 'pointer' }}>
            <h2>{poem.title}</h2>
            <p>{poem.content}</p>
            <span>Author: {poem.author}</span>
            {poem.image_url && <img src={`http://localhost:5000${poem.image_url}`} alt={poem.title} style={{ maxWidth: '25vw' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
