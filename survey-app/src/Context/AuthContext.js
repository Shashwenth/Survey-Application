// src/Context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null });

    const login = (user) => {
        setAuth({ user });
    };

    const logout = () => {
        setAuth({ user: null });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
