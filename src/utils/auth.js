// src/utils/auth.js
export const isLoggedIn = () => !!localStorage.getItem('token');
export const getRole   = () => {
  const t = localStorage.getItem('token');
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split('.')[1])).role;
  } catch {
    return null;
  }
};