import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const AddSurvey = () => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [access, setAccess] = useState('');
    const { auth } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!auth.user || !auth.user.id) {
            console.error('User ID is not set');
            return;
        }

        // Ensure startTime and endTime are provided
        if (!startTime || !endTime) {
            console.error('Start time and end time are required');
            return;
        }

        // Create the survey object to send to the backend
        const survey = { 
            name, 
            access,
            startTime, 
            endTime 
        };

        console.log(survey);

        try {
            const response = await axios.post(`http://localhost:8080/addSurvey?userId=${auth.user.id}`, survey);
            console.log(response.data);
            setName('');
            setStartTime('');
            setEndTime('');
            setAccess('');
        } catch (error) {
            console.error('There was an error adding the survey!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Survey Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Start Time:</label>
                <input 
                    type="datetime-local" 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>End Time:</label>
                <input 
                    type="datetime-local" 
                    value={endTime} 
                    onChange={(e) => setEndTime(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Manage Acess</label>
                <select value={access} onChange={(e) => setAccess(e.target.value)} required>
                        <option value="Public">Select</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
            </div>
            <button type="submit">Add Survey</button>
        </form>
    );
};

export default AddSurvey;
