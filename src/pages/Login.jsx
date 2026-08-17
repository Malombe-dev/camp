// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle, Home } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://server-mern-zc6l.onrender.com';

const KenyaLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Store token
      localStorage.setItem('token', data.token);
      
      // Show success message
      setSuccess(true);
      
      console.log('Login successful:', data);
      
      // Redirect after short delay
      setTimeout(() => {
        const from = location.state?.from || '/admin';
        navigate(from, { replace: true });
      }, 1000);

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Kenyan Flag Inspired Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 right-0 h-1/4 bg-black"></div>
        <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white"></div>
        <div className="absolute top-1/4 left-0 right-0 h-1/4 bg-[#922529]"></div>
        <div className="absolute top-2/4 left-0 right-0 h-0.5 bg-white"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-[#008C51]"></div>
      </div>

      {/* Decorative Shield Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 transform rotate-12">
          <Shield size={256} className="text-white" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 transform -rotate-12">
          <Shield size={192} className="text-white" />
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header with Kenya Colors Accent */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#922529] via-white to-[#008C51] p-1 mb-4 shadow-2xl">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <Shield size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Civic Voice - <span className="text-[#008C51]">Machakos Chapter</span>
          </h1>
          <p className="text-gray-400">Admin Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-8">
          {/* Kenya Flag Color Strip */}
          <div className="flex h-2 mb-6 rounded-full overflow-hidden">
            <div className="flex-1 bg-black"></div>
            <div className="w-1 bg-white"></div>
            <div className="flex-1 bg-[#922529]"></div>
            <div className="w-1 bg-white"></div>
            <div className="flex-1 bg-[#008C51]"></div>
          </div>

          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900 bg-opacity-50 border border-red-700 rounded-lg p-4 flex items-start gap-3 animate-shake">
                <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-200 text-sm font-medium">Authentication Error</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-[#008C51] bg-opacity-20 border border-[#008C51] rounded-lg p-4 flex items-center gap-3">
                <CheckCircle size={20} className="text-[#008C51] flex-shrink-0" />
                <p className="text-green-100 text-sm font-medium">Login successful! Redirecting to dashboard...</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#008C51] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="admin@civicvoice.ke"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#008C51] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-[#008C51] focus:ring-[#008C51] focus:ring-offset-gray-800 cursor-pointer"
                  disabled={loading}
                />
                <span className="ml-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                disabled={loading}
                className="text-[#008C51] hover:text-[#00a862] transition-colors font-medium disabled:opacity-50"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-gradient-to-r from-[#922529] to-[#008C51] hover:from-[#a02a2e] hover:to-[#00a862] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle size={20} />
                  <span>Success! Redirecting...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>

            {/* Back to Site */}
            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-[#008C51] transition-colors"
            >
              <Home size={16} />
              <span>Back to main site</span>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-center text-sm text-gray-500">
              Protected by enterprise security
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-[#008C51] animate-pulse"></div>
              <span className="text-xs text-gray-600">Secure Connection Active</span>
            </div>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2025 Civic Voice – Machakos Chapter. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-[#008C51] transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#008C51] transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-[#008C51] transition-colors">Support</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default KenyaLoginPage;