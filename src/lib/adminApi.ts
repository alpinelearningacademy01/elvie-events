import axios from 'axios';

const ADMIN_STORAGE_KEY = 'elvie_admin_user';
const API_URL = 'http://localhost:5001/api/admin';

const adminApi = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach admin token to every request
adminApi.interceptors.request.use((config) => {
  const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { ADMIN_STORAGE_KEY };
export default adminApi;
