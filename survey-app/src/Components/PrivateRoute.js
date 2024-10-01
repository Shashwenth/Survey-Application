// src/Components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  console.log('PrivateRoute auth:', auth);

  return auth.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
