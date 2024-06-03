// src/components/Public/PoemDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PoemDetail = () => {
    const { id } = useParams();
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
            <h1>{`Título Poema: ${poem.title}`}</h1>
            <p>{poem.content}</p>
            {poem.image_url && <img src={poem.image_url} alt={poem.title} />}
        </div>
    );
};

export default PoemDetail;
