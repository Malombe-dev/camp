// services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://server-mern-zc6l.onrender.com';

// Create axios instance with /api prefix
export const apiRequest = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Add /api here
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
apiRequest.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    console.log('Full URL:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiRequest.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.message);
    console.error('API Error Details:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      fullURL: `${error.config?.baseURL}${error.config?.url}`
    });
    return Promise.reject(error);
  }
);

// API endpoints - remove /api prefix since it's in baseURL now
export const endpoints = {
  press: '/press',
  volunteers: '/volunteers',
  media: '/media',
  contact: '/contact',
  events: '/events',
  gallery: '/gallery', 
};

export default apiRequest;