import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

let accessToken = null;
let refreshToken = null;
let isRefreshing = false;
let refreshQueue = [];

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

const subscribeTokenRefresh = (cb) => {
  refreshQueue.push(cb);
};

const onRefreshed = (token) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await refreshClient.post('/refresh', {
          refresh_token: refreshToken
        });
        setTokens(data.access_token, data.refresh_token ?? refreshToken);
        onRefreshed(data.access_token);
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const setTokens = (access, refresh) => {
  accessToken = access;
  refreshToken = refresh;
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
};

const login = async (payload) => {
  const { data } = await apiClient.post('/login', payload);
  return data;
};

const signup = async (payload) => {
  const { data } = await apiClient.post('/signup', payload);
  return data;
};

const refresh = async (refresh_token) => {
  const { data } = await refreshClient.post('/refresh', { refresh_token });
  setTokens(data.access_token, data.refresh_token ?? refresh_token);
  return data;
};

const getProfile = async () => {
  const { data } = await apiClient.get('/profile');
  return data;
};

const updateProfile = async (payload) => {
  const { data } = await apiClient.put('/profile', payload);
  return data;
};

const requestPasswordReset = async (email, newPassword, humanAnswer, trap) => {
  const { data } = await apiClient.post('/password-reset', {
    email,
    new_password: newPassword,
    human_answer: humanAnswer,
    trap
  });
  return data;
};

const fetchProducts = async () => {
  const { data } = await apiClient.get('/products');
  return data;
};

export default {
  login,
  signup,
  refresh,
  getProfile,
  updateProfile,
  requestPasswordReset,
  fetchProducts,
  setTokens,
  clearTokens
};
