import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle responses and errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// User API
export const userAPI = {
    signup: (userData) => api.post('/user/signup', userData),
    login: (credentials) => api.post('/user/login', credentials)
};

// Employee API
export const employeeAPI = {
    getAll: () => api.get('/emp/employees'),

    getById: (id) => api.get(`/emp/employees/${id}`),

    create: (employeeData) => {
        const formData = new FormData();
        Object.keys(employeeData).forEach(key => {
            formData.append(key, employeeData[key]);
        });
        return api.post('/emp/employees', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    update: (id, employeeData) => {
        const formData = new FormData();
        Object.keys(employeeData).forEach(key => {
            if (employeeData[key] !== null && employeeData[key] !== undefined) {
                formData.append(key, employeeData[key]);
            }
        });
        return api.put(`/emp/employees/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    delete: (id) => api.delete(`/emp/employees/${id}`),

    search: (params) => api.get('/emp/search', { params })
};

export default api;