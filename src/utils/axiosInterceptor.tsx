
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';

// Create a custom instance of axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Component to set up axios interceptors
export const AxiosInterceptor = () => {
  useEffect(() => {
    // Request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        // Add authorization token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const status = error.response?.status;
        const isNetworkError = !error.response;

        // Handle network errors
        if (isNetworkError) {
          toast.error('Network error. Please check your connection.');
          return Promise.reject(error);
        }

        // Handle different status codes
        switch (status) {
          case 401:
            toast.error('Authentication expired. Please log in again.');
            // Clear token and redirect to login if needed
            break;
          case 403:
            toast.error('You do not have permission to access this resource.');
            break;
          case 404:
            toast.error('Resource not found.');
            break;
          case 422:
            toast.error('Validation error. Please check your input.');
            break;
          case 429:
            toast.error('Too many requests. Please try again later.');
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            toast.error('Server error. Please try again later.');
            break;
          default:
            toast.error('An error occurred. Please try again.');
        }

        return Promise.reject(error);
      }
    );

    // Clean up interceptors when component unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return null;
};
