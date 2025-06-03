import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import Router from 'next/router';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, 
    timeout: 30000, 
});

apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = useAuthStore.getState().token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Sessão expirada ou não autorizada');
            if (typeof window !== 'undefined') {
                Router.push('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
