import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ctms_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.response?.data?.code === 'TOKEN_EXPIRED') {
      localStorage.removeItem('ctms_token');
      localStorage.removeItem('ctms_user');
      window.location.href = '/login/student';
    }
    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

export const busAPI = {
  getAll: () => api.get('/buses'),
  getById: (id) => api.get(`/buses/${id}`),
  getByNumber: (num) => api.get(`/buses/number/${num}`),
  search: (q) => api.get('/buses/search', { params: { q } }),
  getPublicStats: () => api.get('/buses/public/stats'),
  setFavorite: (busId) => api.post('/buses/favorite', { busId }),
};

export const routeAPI = {
  getAll: () => api.get('/routes'),
  getById: (id) => api.get(`/routes/${id}`),
  getStops: (routeId) => api.get(`/routes/${routeId}/stops`),
  getETA: (stopId, busId) => api.get('/routes/eta', { params: { stopId, busId } }),
  search: (q) => api.get('/routes/search', { params: { q } }),
};

export const announcementAPI = {
  getAll: () => api.get('/announcements'),
  getLatest: () => api.get('/announcements/latest'),
  create: (data) => api.post('/announcements', data),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  delete: (id) => api.delete(`/announcements/${id}`),
};

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  getUnread: () => api.get('/notifications/unread'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
};

export const driverAPI = {
  getDashboard: () => api.get('/driver/dashboard'),
  startJourney: () => api.post('/driver/journey/start'),
  pauseJourney: () => api.post('/driver/journey/pause'),
  endJourney: () => api.post('/driver/journey/end'),
  shareLocation: (data) => api.post('/driver/location', data),
  updateStatus: (data) => api.put('/driver/status', data),
  toggleSharing: (enabled) => api.post('/driver/sharing', { enabled }),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getLive: () => api.get('/admin/live'),
  getStudents: () => api.get('/admin/students'),
  createStudent: (data) => api.post('/admin/students', data),
  updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),
  getDrivers: () => api.get('/admin/drivers'),
  createDriver: (data) => api.post('/admin/drivers', data),
  updateDriver: (id, data) => api.put(`/admin/drivers/${id}`, data),
  deleteDriver: (id) => api.delete(`/admin/drivers/${id}`),
  getReports: (params) => api.get('/admin/reports', { params }),
  getSettings: () => api.get('/admin/settings'),
  createBus: (data) => api.post('/buses', data),
  updateBus: (id, data) => api.put(`/buses/${id}`, data),
  deleteBus: (id) => api.delete(`/buses/${id}`),
  createRoute: (data) => api.post('/routes', data),
  updateRoute: (id, data) => api.put(`/routes/${id}`, data),
  deleteRoute: (id) => api.delete(`/routes/${id}`),
};
