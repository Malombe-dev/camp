// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://server-mern-zc6l.onrender.com/api';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    localStorage.setItem('token', data.token);

    console.log('Login successful:', data);
    const from = location.state?.from || '/pressadmin';
    navigate(from, { replace: true });   // ← SPA navigation
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 text-sm text-white bg-red-500 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium
              ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          <Link to="/" className="text-green-600 hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}