// ==========================================
// UPDATED App.js
// ==========================================
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Homepage';
import About from './pages/AboutPage';
import Press from './pages/PressPage';
import Moments from './pages/Moments';
import Join from './pages/Join';
import ContactForm from './components/forms/ContactForm';
import Donate from './pages/Donate';
import PressRelease from './pages/PressRelease';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AdminNotFound from './admin/components/AdminNotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import EditorialPolicy from './pages/EditorialPolicy';

// Admin Components
import PressAdmin from './admin/components/PressAdmin';
import GalleryManager from './admin/components/GalleryAdmin';
import AdminDashboard from './admin/components/AdminDashboard';
import ProtectedRoute from './utils/protectedRoute';

function App() {
  // Check if user is logged in
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <Routes>
      {/* Public Routes with Navbar & Footer */}
      <Route
        path="/*"
        element={
          <PublicLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/press" element={<Press />} />
              <Route path="/press/:id" element={<PressRelease />} />
              <Route path="/moments" element={<Moments />} />
              <Route path="/join" element={<Join />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="/editorial-policy" element={<EditorialPolicy />} />
            </Routes>
          </PublicLayout>
        }
      />

      {/* Login Page (No Layout) */}
      <Route 
        path="/login" 
        element={
          isAuthenticated() ? <Navigate to="/admin" replace /> : <Login />
        } 
      />

      {/* Admin Routes WITHOUT Navbar & Footer */}
      <Route
        path="/admin/*"
        element={
          <AdminLayout>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute allowedRoles={['communications', 'super-admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/press"
                element={
                  <ProtectedRoute allowedRoles={['communications', 'super-admin']}>
                    <PressAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gallery"
                element={
                  <ProtectedRoute allowedRoles={['communications', 'super-admin']}>
                    <GalleryManager />
                  </ProtectedRoute>
                }
              />
              {/* Admin 404 for logged-in users */}
              <Route path="*" element={<AdminNotFound />} />
            </Routes>
          </AdminLayout>
        }
      />

      {/* Legacy redirect */}
      <Route
        path="/pressadmin"
        element={
          <Navigate to="/admin" replace />
        }
      />

      {/* 404 - Catch all other routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;