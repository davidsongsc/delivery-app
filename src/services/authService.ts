import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '@/types/auth';

import { parseJwt } from '@/utils/parseJwt';
import type { User } from '@/types/User';
import { formatUserFromAuthResponse } from '@/utils/formatUser';

export const authService = {
    login: async (username: string, password: string): Promise<{ user: User; access: string; refresh: string }> => {
        try {
            const response = await apiClient.post<AuthResponse>('/api/token/', { email: username, password });

            const { access, refresh } = response.data;
            const user = formatUserFromAuthResponse(response.data);

            localStorage.setItem('authToken', access); // opcional se já usa Zustand persist
            useAuthStore.getState().setToken(access);
            useAuthStore.getState().setUser(user);

            return { user, access, refresh };

        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao fazer login');
        }
    }
    ,

    register: async (userData: any): Promise<void> => {
        try {
            await apiClient.post('/api/auth/register/', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao cadastrar usuário');
        }
    },

    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/usuarios/logout/');
        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao fazer logout');
        }
    },

    verifyEmail: async (token: string): Promise<void> => {
        try {
            await apiClient.get(`/verificar-email/?token=${token}`);
        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao verificar e-mail');
        }
    },

    checkAuth: async (): Promise<{ user: any }> => {
        try {
            const response = await apiClient.get('/home/', {
                withCredentials: true, // envia cookies automaticamente
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao verificar autenticação');
        }
    },


    activateAccount: async (token: string): Promise<{ message: string }> => {
        try {
            const response = await apiClient.get('/api/auth/activate/', { params: { token } });

            return response.data; // espera { message: string }
        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao ativar conta');
        }
    },
};

