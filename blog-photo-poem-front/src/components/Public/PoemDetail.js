// src/components/Public/PoemDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PoemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [poem, setPoem] = useState(null);

    useEffect(() => {
        const fetchPoemDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/poem/${id}`);
                setPoem(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPoemDetail();
    }, [id]);

    if (!poem) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={() => navigate('/')}>Back to Home</button>
            <h1>{`Título Poema: ${poem.title}`}</h1>
            <p>{poem.content}</p>
            {poem.image_url && <img src={`http://localhost:5000${poem.image_url}`} alt={poem.title} style={{ maxWidth: '25vw'}} />}
        </div>
    );
};

export default PoemDetail;
