import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3010';
const API_BASE_URL = 'https://apigateway.seclob.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  googleAuth: (credential) => api.post('/v1/user-no/auth/google', { credential }),
  appleAuth: (idToken) => api.post('/auth/apple', { idToken }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  getProfile: () => api.get('/auth/profile'),
};

export default api;