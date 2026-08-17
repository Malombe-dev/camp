// ==========================================
// pages/NotFound.jsx
// ==========================================
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Large 404 */}
            <h1 className="text-[180px] md:text-[240px] font-bold text-gray-200 leading-none">
              404
            </h1>
            
            {/* Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <AlertTriangle className="text-white" size={64} />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>

        {/* Suggested Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/about"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/press"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Press Releases
            </Link>
            <Link
              to="/moments"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Moments
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Search size={16} />
            <span>Try searching from the homepage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
