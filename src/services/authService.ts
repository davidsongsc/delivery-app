import axios from 'axios';
import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '@/types/auth';
import { CookiesHandler } from '@/cookies';

import type { IUser } from '@/interfaces/IUser';
import { formatUserFromAuthResponse } from '@/utils/formatUser';
import { IPerfil } from '@/interfaces/IPerfil';
import { ILoginResponse } from '@/interfaces/ILoginResponse';
import parseApiError from '@/utils/parseApiError';

export const authService = {
    login: async (email: string, password: string) => {
        const response = await apiClient.post('/api/token/', { email, password });
        const { access, refresh } = response.data;

        // Salva tokens
        await CookiesHandler.session.set({ token: access, refresh });

        // Busca dados do usuário
        const userResponse = await apiClient.get('/api/users/me/');
        const user = userResponse.data;

        useAuthStore.getState().setUser(user);

        return user;
    },


    logout: async () => {
        await CookiesHandler.session.remove();
        useAuthStore.getState().logout();
    },
    register: async (userData: any): Promise<void> => {
        try {
            await apiClient.post('/api/auth/register/', userData);
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                throw {
                    title: error.response.data?.title || 'Erro no cadastro',
                    detail: error.response.data?.detail || 'Verifique os dados e tente novamente.',
                    status: error.response.status,
                };
            }
            throw parseApiError(error);
        }
    }
    ,

    verifyEmail: async (token: string): Promise<void> => {
        await apiClient.get(`/verificar-email/?token=${token}`);
    },

    activateAccount: async (token: string): Promise<{ message: string }> => {
        const response = await apiClient.get('/api/auth/activate/', {
            params: { token },
        });
        return response.data;
    },

    checkAuth: async () => {
        try {
            const refresh = (await CookiesHandler.session.get()).refresh;
            if (!refresh) throw new Error('Não autenticado');

            const refreshResponse = await apiClient.post('/api/token/refresh/', { refresh });
            const access = refreshResponse.data?.access;

            if (!access) throw new Error('Não autenticado');

            await CookiesHandler.session.set({ token: access });
            const userResponse = await apiClient.get('/api/users/me/'); // sua rota para pegar dados do user
            useAuthStore.getState().setUser(userResponse.data);

            return userResponse.data;
        } catch {
            await CookiesHandler.session.remove();
            useAuthStore.getState().logout();
            throw new Error('Não autenticado');
        }
    },



};

