import axios from 'axios';
const REACT_APP_API_URL='http://154.38.162.163:3003/api/v1'

const API_URL = process.env.REACT_APP_API_URL || REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) => api.post('/auth/login', { username, password });
export const register = (username, password) => api.post('/auth/register', { username, password });
export const getOperations = () => api.get('/operations');
export const performOperation = (type, args) => api.post('/operations', { type, args });
export const getRecords = () => api.get('/records');
export const deleteRecord = (id) => api.delete(`/records/${id}`);

export default api;