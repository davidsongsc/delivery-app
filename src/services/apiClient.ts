import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { notification } from 'antd';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    // withCredentials: true,
});

const publicPaths = ['/api/auth/register', '/api/auth/login'];

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().token;

        // Só envia token se existir e a URL não for uma rota pública
        if (
            token &&
            !publicPaths.some((path) => config.url?.startsWith(path))
        ) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            notification.error({ message: 'Sua sessão expirou!' });

            if (typeof window !== 'undefined') {
                window.localStorage.removeItem('authToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
