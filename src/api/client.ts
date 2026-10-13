import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gressio_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    // Automatically unwrap NestJS TransformInterceptor: { statusCode, data, timestamp }
    if (
      response.data &&
      typeof response.data === 'object' &&
      'statusCode' in response.data &&
      'data' in response.data &&
      response.data.data !== undefined
    ) {
      return {
        ...response,
        data: response.data.data,
      };
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('gressio_admin_token');
      localStorage.removeItem('gressio_admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
