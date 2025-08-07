import axios from 'axios';
import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '@/types/auth';

import type { IUser } from '@/interfaces/IUser';
import { formatUserFromAuthResponse } from '@/utils/formatUser';
import { IPerfil } from '@/interfaces/IPerfil';
import { ILoginResponse } from '@/interfaces/ILoginResponse';
import parseApiError from '@/utils/parseApiError';

export const authService = {
    login: async (
        email: string,
        password: string,
    ): Promise<{
        user: IUser;
        perfis: IPerfil[];
        access: string;
        refresh: string;
    }> => {
        try {
            const response = await apiClient.post<AuthResponse>('/api/token/', {
                email,
                password,
            });

            const user = formatUserFromAuthResponse(response.data);

            return {
                user,
                perfis: user.perfis,
                access: response.data.access,
                refresh: response.data.refresh
            };
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                // Retorna erro formatado vindo da API
                throw parseApiError(error);
            } else {
                throw parseApiError(error);
            }
        }
    },

    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/api/auth/logout/');
            useAuthStore.getState().logout();
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                throw parseApiError(error);
            } else {
                throw parseApiError(error);
            }
        }
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

    checkAuth: async (): Promise<{ user: IUser }> => {
        const response = await apiClient.get('/api/auth/check/');
        const user = formatUserFromAuthResponse(response.data);
        useAuthStore.getState().setUser(user);
        return { user };
    },
};

