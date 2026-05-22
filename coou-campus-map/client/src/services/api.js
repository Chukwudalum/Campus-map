// Axios instance configured for COOU Campus Map API
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ── Request Interceptor: attach JWT token if present ─────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('coou_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: handle 401 globally ─────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('coou_admin_token');
      localStorage.removeItem('coou_admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Location API methods ──────────────────────────────────────────────────────

/** Get all locations (optionally filtered by category) */
export const getLocations = (params = {}) =>
  api.get('/locations', { params });

/** Get a single location by ID */
export const getLocationById = (id) =>
  api.get(`/locations/${id}`);

/** Search locations by name query */
export const searchLocations = (query, category = '') =>
  api.get('/locations/search', { params: { q: query, category } });

/** Get nearby locations within radius (meters) */
export const getNearbyLocations = (lat, lng, radius = 300) =>
  api.get('/locations/nearby', { params: { lat, lng, radius } });

/** Create new location (admin only) */
export const createLocation = (data) =>
  api.post('/locations', data);

/** Update location (admin only) */
export const updateLocation = (id, data) =>
  api.put(`/locations/${id}`, data);

/** Delete location (admin only) */
export const deleteLocation = (id) =>
  api.delete(`/locations/${id}`);

// ── Category API methods ──────────────────────────────────────────────────────

/** Get all categories */
export const getCategories = () =>
  api.get('/categories');

/** Create category (admin only) */
export const createCategory = (data) =>
  api.post('/categories', data);

// ── Auth API methods ──────────────────────────────────────────────────────────

/** Admin login */
export const loginAdmin = (credentials) =>
  api.post('/auth/login', credentials);

/** Get current admin profile */
export const getAdminProfile = () =>
  api.get('/auth/profile');

export default api;

