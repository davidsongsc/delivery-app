import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { notification } from 'antd';

import { useAuthStore } from '@/store/authStore';
import { CookiesHandler } from '@/cookies';
import { useRouter } from 'next/navigation';
import { use } from 'react';


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await CookiesHandler.session.get();
    if (session?.token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${session.token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

async function clearSession() {
  await CookiesHandler.session.remove();
  useAuthStore.getState().logout();
}

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((token: string) => {
            if (token) originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await apiClient.post('/api/token/refresh/');
        const newToken = refreshResponse.data?.access;

        if (newToken) {
          await CookiesHandler.session.set({ token: newToken });
          onRefreshed(newToken);

          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } else {
          throw new Error('Token não recebido');
        }
      } catch {
        await clearSession();
        notification.error({
          message: 'Sessão expirada',
          description: 'Você precisa fazer login novamente.',
          duration: 4,
        });
        useRouter().push('/');
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
