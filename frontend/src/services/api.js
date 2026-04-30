import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api'),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // You could dispatch loading state here if you use Redux
    const token = localStorage.getItem('shoptiq_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor with Retry Logic
api.interceptors.response.use(
  (response) => {
    // You could clear loading state here
    return response;
  },
  async (error) => {
    const config = error.config;
    
    // Fallback/Retry configuration
    if (!config || !config.retry) {
      config.retry = 3; // Max retries
      config.retryCount = 0;
    }

    const shouldRetry = error.response && error.response.status >= 500 || error.code === 'ECONNABORTED' || !error.response;

    if (shouldRetry && config.retryCount < config.retry) {
      config.retryCount += 1;
      
      // Exponential backoff
      const backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, config.retryCount * 1000);
      });
      
      await backoff;
      return api(config);
    }

    if (error.response?.status === 401) {
      // Handle unauthorized (logout)
      localStorage.removeItem('shoptiq_token');
      window.location.href = '/login';
    }
    
    // Return custom error object for easier frontend handling
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      data: error.response?.data,
    };

    return Promise.reject(customError);
  }
);

export default api;
