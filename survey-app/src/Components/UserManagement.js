// src/Components/UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users'); // Update this endpoint if needed
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async (event) => {
        event.preventDefault();
        try {
            const newUser = { username, password };
            await axios.post('http://localhost:8080/addUser', newUser);
            fetchUsers();
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="container">
            <h2>User Management</h2>
            <form onSubmit={handleAddUser}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add User</button>
            </form>
            <h3 className="mt-4">Existing Users</h3>
            <ul className="list-group">
                {users.map(user => (
                    <li key={user.id} className="list-group-item">{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
