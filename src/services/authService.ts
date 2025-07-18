import apiClient from '@/services/apiClient';
import { useAuthStore } from '@/store/authStore';
import { parseJwt } from '@/utils/parseJwt';
import type { User } from '@/types/User';

export const authService = {
    login: async (username: string, password: string): Promise<{ user: User; access: string; refresh: string }> => {
        try {
            const response = await apiClient.post('/api/token/', { username, password });
            const { access, refresh, corporation_member } = response.data;

            const decoded = parseJwt(access);

            const user: User = {
                uid: decoded.user_id ?? decoded.uid,
                username: decoded.username,
                email: decoded.email,
                is_superuser: decoded.is_superuser ?? false,
                is_staff: decoded.is_staff ?? false,
                corporation_member: corporation_member ?? null,
            };

            localStorage.setItem('authToken', access);
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

