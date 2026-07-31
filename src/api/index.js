import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if token exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public Endpoints
export const getProjects = async (category = "All") => {
  const url = category && category !== "All" ? `/api/projects?category=${encodeURIComponent(category)}` : "/api/projects";
  const res = await api.get(url);
  return res.data.data;
};

export const getServices = async () => {
  const res = await api.get("/api/services");
  return res.data.data;
};

export const getCoachingPlans = async () => {
  const res = await api.get("/api/coaching/plans");
  return res.data.data;
};

export const getTestimonials = async () => {
  const res = await api.get("/api/coaching/testimonials");
  return res.data.data;
};

export const getTeamMembers = async () => {
  const res = await api.get("/api/team");
  return res.data.data;
};

export const getStats = async () => {
  const res = await api.get("/api/stats");
  return res.data.data;
};

export const sendContact = async (formData) => {
  const res = await api.post("/api/contact", formData);
  return res.data;
};

// Admin Endpoints
export const loginAdmin = async (email, password) => {
  const res = await api.post("/api/auth/login", { email, password });
  if (res.data.success && res.data.data.token) {
    localStorage.setItem("admin_token", res.data.data.token);
    localStorage.setItem("admin_user", JSON.stringify(res.data.data));
  }
  return res.data;
};

export const getAdminMe = async () => {
  const res = await api.get("/api/auth/me");
  return res.data.data;
};

export const getContactsAdmin = async (status = "all") => {
  const res = await api.get(`/api/contact?status=${status}`);
  return res.data;
};

export const updateContactStatusAdmin = async (id, status) => {
  const res = await api.patch(`/api/contact/${id}`, { status });
  return res.data;
};

export const deleteContactAdmin = async (id) => {
  const res = await api.delete(`/api/contact/${id}`);
  return res.data;
};

export default api;
