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
import MomentDetail from './pages/MomentDetail';

// Admin Components
import PressAdmin from './admin/components/PressAdmin';
import GalleryManager from './admin/components/GalleryAdmin';
import AdminDashboard from './admin/components/AdminDashboard';
import ProtectedRoute from './utils/protectedRoute';

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <Routes>
      {/* Login Page (No Layout) */}
      <Route 
        path="/login" 
        element={
          isAuthenticated() ? <Navigate to="/admin" replace /> : <Login />
        } 
      />

      {/* Admin Routes WITHOUT Navbar & Footer */}
      <Route path="/admin/*" element={
        <AdminLayout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="press"
              element={
                <ProtectedRoute>
                  <PressAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="gallery"
              element={
                <ProtectedRoute>
                  <GalleryManager />
                </ProtectedRoute>
              }
            />
            {/* Admin 404 - only shows for logged-in users */}
            <Route 
              path="*" 
              element={
                <ProtectedRoute>
                  <AdminNotFound />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AdminLayout>
      } />

      {/* Legacy redirect */}
      <Route path="/pressadmin" element={<Navigate to="/admin" replace />} />

      {/* Public Routes with Navbar & Footer - ALL ROUTES PRESERVED */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/press" element={<PublicLayout><Press /></PublicLayout>} />
      <Route path="/press/:id" element={<PublicLayout><PressRelease /></PublicLayout>} />
      <Route path="/moments" element={<PublicLayout><Moments /></PublicLayout>} />
      <Route path="/join" element={<PublicLayout><Join /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactForm /></PublicLayout>} />
      <Route path="/donate" element={<PublicLayout><Donate /></PublicLayout>} />
      <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
      <Route path="/terms" element={<PublicLayout><TermsOfUse /></PublicLayout>} />
      <Route path="/editorial-policy" element={<PublicLayout><EditorialPolicy /></PublicLayout>} />
      <Route path="/moments/:id" element={<PublicLayout><MomentDetail /></PublicLayout>} />

      {/* 404 - Catch ALL other undefined routes */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}

export default App;