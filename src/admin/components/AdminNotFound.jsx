// ==========================================
// pages/AdminNotFound.jsx (for logged-in users)
// ==========================================
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Shield, Lock } from 'lucide-react';

const AdminNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Large 404 */}
            <h1 className="text-[180px] md:text-[240px] font-bold text-gray-800 leading-none">
              404
            </h1>
            
            {/* Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Lock className="text-white" size={64} />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Admin Page Not Found
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            The admin page you're looking for doesn't exist or you don't have permission to access it.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-red-700 transition-all duration-200 shadow-lg"
          >
            <Shield size={20} />
            Admin Dashboard
          </Link>
        </div>

        {/* Suggested Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 mb-4">Available admin sections:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/admin/press"
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Press Management
            </Link>
            <Link
              to="/admin/gallery"
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Gallery Management
            </Link>
            <Link
              to="/"
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              <Home size={16} className="inline mr-1" />
              Public Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotFound;
