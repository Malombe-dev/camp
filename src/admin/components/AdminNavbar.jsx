// src/admin/components/AdminNavbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, Image, Home, LogOut, LayoutDashboard } from 'lucide-react';


const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getUserInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  const user = getUserInfo();

  const navItems = [
    {
      path: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      path: '/admin/press',
      label: 'Press Management',
      icon: FileText
    },
    {
      path: '/admin/gallery',
      label: 'Gallery Management',
      icon: Image
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/admin" className="flex items-center">
            <div className="text-white font-bold text-xl flex items-center">
              <span className="text-2xl mr-2">🗳️</span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm sm:text-base">Civic Voice Admin</span>
                <span className="text-xs text-cyan-200">Machakos Chapter</span>
              </div>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* View Site */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all text-sm font-medium"
            >
              <Home size={18} />
              View Site
            </Link>

            {/* User Info */}
            <div className="hidden lg:flex items-center gap-2 text-white text-sm">
              <div className="text-right">
                <div className="font-medium">{user?.name || 'Admin'}</div>
                <div className="text-xs text-cyan-200">{user?.role || 'admin'}</div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;