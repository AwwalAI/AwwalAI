import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = sessionStorage.getItem('authToken');

  if (!authToken) {
    return <Navigate to="/Landing" replace />;
  }

  return children;
};

export default PrivateRoute;
