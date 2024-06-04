// src/Components/AddSurvey.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const AddSurvey = () => {
    const [name, setName] = useState('');
    const { auth } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!auth.user || !auth.user.id) {
            console.error('User ID is not set');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/addSurvey?userId=${auth.user.id}`, { name });
            console.log(response.data);
            setName('');
        } catch (error) {
            console.error('There was an error adding the survey!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Survey Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <button type="submit">Add Survey</button>
        </form>
    );
};

export default AddSurvey;
