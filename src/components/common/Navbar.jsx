import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// tiny auth helpers
const isLoggedIn = () => !!localStorage.getItem("token");

const getRole = () => {
  const t = localStorage.getItem("token");
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).role;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { id: "/", label: "Home", icon: "🏠" },
    { id: "/about", label: "About", icon: "ℹ️" },
    { id: "/press", label: "News", icon: "📰" },
    { id: "/moments", label: "Memories", icon: "📸" },
    { id: "/contact", label: "Contact", icon: "📞" },
    { id: "/pressadmin", label: "Admin", icon: "⚙️", guard: true },
  ];

  const handleNav = (item) => {
    if (item.guard) {
      if (!isLoggedIn()) {
        navigate("/login", { state: { from: "/pressadmin" } });
        return;
      }
      if (getRole() !== "super-admin" && getRole() !== "communications") {
        alert("Access denied");
        return;
      }
    }
    navigate(item.id);
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-red-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <div className="text-white font-bold text-xl">
              🗣️ <span className="ml-2">Civic Voice | Machakos Chapter</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNav(item);
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.id
                    ? "bg-white bg-opacity-20 text-white"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* Desktop Logout Button */}
            {isLoggedIn() && (
              <button
                onClick={logout}
                className="ml-4 bg-white text-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition duration-200 text-sm"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black bg-opacity-20">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNav(item);
                  setIsMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 ${
                  location.pathname === item.id
                    ? "bg-white bg-opacity-20 text-white"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* Mobile Logout Button */}
            {isLoggedIn() && (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer Banner */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-gray-700 text-center">
            <strong>Independent Platform:</strong> Civic Voice – Machakos Chapter is not affiliated with any political party, government institution, or electoral body.
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;