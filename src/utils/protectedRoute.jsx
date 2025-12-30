import React from 'react';
import NotFound from '../pages/NotFound';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');

  // If no token, show NotFound page
  if (!token) {
    return <NotFound />;
  }

  try {
    // Decode JWT token
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Check for role in different possible fields
    const userRole = payload.role || payload.userRole || payload.type || 'user';
    console.log('User role from token:', userRole);

    // If no specific roles are required, allow access
    if (allowedRoles.length === 0) {
      return children;
    }

    // Check if user's role is in allowed roles
    if (allowedRoles.includes(userRole)) {
      return children;
    }

    // If logged in but wrong role, show NotFound
    return <NotFound />;
    
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('token');
    return <NotFound />;
  }
};

export default ProtectedRoute;