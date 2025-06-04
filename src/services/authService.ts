// src/services/authService.ts
import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '@/types/auth';
import { parseJwt } from '@/utils/parseJwt';
import type { User } from '@/types/User';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    login: async (username: string, password: string): Promise<{ user: User; access: string; refresh: string }> => {
        try {
            // Altere o endpoint para usar o SimpleJWT
            const response = await apiClient.post<AuthResponse>('/api/token/', {
                username,
                password,
            });

            const { access, refresh } = response.data;
            const decoded = parseJwt(access);

            const user: User = {
                uid: decoded.user_id ?? decoded.uid,
                username: decoded.username,
                email: decoded.email,
                is_superuser: decoded.is_superuser ?? false,
                is_staff: decoded.is_staff ?? false,
            };

            localStorage.setItem('authToken', access);
            useAuthStore.getState().setToken(access);
            useAuthStore.getState().setUser(user);

            return { user, access, refresh };
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
