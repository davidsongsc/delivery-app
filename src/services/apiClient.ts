import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { notification } from 'antd';
import Router from 'next/router';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true, // importante para cookies HttpOnly
});

// Interceptador de requisição (opcional, por ex. para logs ou headers)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Você pode adicionar headers aqui, se necessário
    // const token = useAuthStore.getState().token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Variável de controle para evitar múltiplos redirects simultâneos
let alreadyRedirected = false;

// Interceptador de resposta
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && !alreadyRedirected) {
      alreadyRedirected = true;

      // Limpa estado de autenticação
      useAuthStore.getState().logout();

      // Notificação amigável
      notification.error({
        message: 'Sessão expirada',
        description: 'Você precisa fazer login novamente.',
        duration: 4,
      });

      // Redireciona para login (sem reload)
      if (Router.pathname !== '/login') {
        Router.push('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
