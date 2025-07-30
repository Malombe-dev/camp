// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles = ['super-admin', 'communications'] }) {
  const token = localStorage.getItem('token');
  const user  = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const location = useLocation();

  // Debugging log:
  console.log("User role from token:", user?.role);

  if (!token || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
