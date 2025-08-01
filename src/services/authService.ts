import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '@/types/auth';

import type { IUser } from '@/interfaces/IUser';
import { formatUserFromAuthResponse } from '@/utils/formatUser';
import { IPerfil } from '@/interfaces/IPerfil';

export const authService = {
    login: async (
        email: string,
        password: string
    ): Promise<{ user: IUser; perfis: IPerfil[] }> => {
        try {
            const response = await apiClient.post<AuthResponse>('/api/token/', {
                email,
                password,
            });

            const user = formatUserFromAuthResponse(response.data);
            useAuthStore.getState().setUser(user);

            return { user, perfis: user.perfis };
        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao fazer login');
        }
    },

    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/api/auth/logout/');
            useAuthStore.getState().logout();
        } catch (error: any) {
            throw error.response?.data || new Error('Erro ao sair');
        }
    },

    register: async (userData: any): Promise<void> => {
        await apiClient.post('/api/auth/register/', userData);
    },

    verifyEmail: async (token: string): Promise<void> => {
        await apiClient.get(`/verificar-email/?token=${token}`);
    },

    activateAccount: async (token: string): Promise<{ message: string }> => {
        const response = await apiClient.get('/api/auth/activate/', {
            params: { token },
        });
        return response.data;
    },

    checkAuth: async (): Promise<{ user: IUser }> => {
        const response = await apiClient.get('/home/');
        const user = formatUserFromAuthResponse(response.data);
        useAuthStore.getState().setUser(user);
        return { user };
    },
};

