// src/Components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/addUser', { username, password });
            console.log(response.data);
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('There was an error adding the user!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Add User</button>
        </form>
    );
};

export default AddUser;
