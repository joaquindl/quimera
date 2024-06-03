// src/components/Public/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
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
      <ul>
        {poems.map(poem => (
          <li key={poem.id}>
            <h2>{poem.title}</h2>
            <p>{poem.content}</p>
            {poem.image_url && <img src={`http://localhost:5000${poem.image_url}`} alt={poem.title} style={{ maxWidth: '25vw' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
