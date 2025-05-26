// src/services/authService.ts
import { User } from '@/types/User';
import apiClient from '@/services/apiClient';

interface LoginResponse {
    user: {
        uid: string;
        username: string;
        email: string;
        is_superuser: boolean;
        is_staff: boolean;
    };
}

export const authService = {
    login: async (username: string, password: string): Promise<{ user: User, token: string }> => {
        try {
            const response = await apiClient.post('/usuarios/login/', { username, password });
            return {
                user: response.data.user,
                token: response.data.token,
            };
        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao fazer login');
        }
    },

    register: async (userData: any): Promise<void> => {
        try {
            await apiClient.post('/usuarios/register/', userData);
        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao cadastrar usuário');
        }
    },

    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/logout/');
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

    checkAuth: async (token: string): Promise<{ user: any }> => {
        try {
            // Passando o token no header Authorization para autenticação
            const response = await apiClient.get('/home/', {
                headers: {
                    Authorization: `Bearer ${token}`, // Passa o token na autorização
                }
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao verificar autenticação');
        }
    },
};
