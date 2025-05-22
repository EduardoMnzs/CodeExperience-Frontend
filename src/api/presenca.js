import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const presencaAPI = {
    registrar: (dados) => API.post('/presenca', dados),
    secretKey: (credentials) => API.get('/key/palavra-chave', credentials),
};
