// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/authService';
import { notification } from 'antd';
import { User } from '@/types/User';

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    verifyEmail: (token: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setToken: (token: string | null) => void;
}

// Mensagens de erro
const errorMessages = {
    loginFailed: 'Falha no login',
    registrationFailed: 'Falha no cadastro',
    emailVerificationFailed: 'Falha na verificação de e-mail',
    logoutFailed: 'Falha no logout',
    unknownError: 'Ocorreu um erro inesperado',
};

// Store de autenticação
export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            hydrated: false,

            setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            setToken: (token) => set({ token }),

            login: async (username, password) => {
                set({ loading: true, error: null });
                try {
                    const { user, token } = await authService.login(username, password);

                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        loading: false,
                    });

                    notification.success({
                        message: 'Login realizado com sucesso',
                    });
                } catch (error: any) {
                    set({
                        error: error.message || errorMessages.loginFailed,
                        loading: false,
                    });

                    notification.error({
                        message: 'Erro ao fazer login',
                        description: error.message || 'Verifique suas credenciais e tente novamente.',
                    });

                    throw error;
                }
            },

            register: async (userData) => {
                set({ loading: true, error: null });
                try {
                    await authService.register(userData);

                    set({ loading: false });

                    notification.success({
                        message: 'Cadastro realizado com sucesso',
                        description: 'Agora você pode fazer login.',
                    });
                } catch (error: any) {
                    set({
                        error: error.message || errorMessages.registrationFailed,
                        loading: false,
                    });

                    notification.error({
                        message: 'Erro ao cadastrar',
                        description: error.message || 'Tente novamente mais tarde.',
                    });

                    throw error;
                }
            },

            logout: async () => {
                try {
                    await authService.logout();

                    notification.success({
                        message: 'Logout realizado com sucesso',
                    });
                } finally {
                    set({
                        token: null,
                        user: null,
                        isAuthenticated: false,
                        loading: false,
                    });
                }
            },

            verifyEmail: async (token: string) => {
                set({ loading: true, error: null });
                try {
                    await authService.verifyEmail(token);

                    set({ loading: false });

                    notification.success({
                        message: 'E-mail verificado com sucesso!',
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || errorMessages.emailVerificationFailed,
                        loading: false,
                    });

                    notification.error({
                        message: 'Erro ao verificar e-mail',
                        description: error.response?.data?.message || 'Tente novamente mais tarde.',
                    });

                    throw error;
                }
            },
            checkAuth: async () => {
                const token = get().token;
                if (!token) {
                    set({
                        token: null,
                        user: null,
                        isAuthenticated: false,
                        loading: false,
                    });
                    return;
                }
                set({ loading: true });
                try {
                    const { user } = await authService.checkAuth(token);
                    set({
                        user,
                        isAuthenticated: true,
                        loading: false,
                    });
                } catch {
                    set({
                        token: null,
                        user: null,
                        isAuthenticated: false,
                        loading: false,
                    });
                }
            },
        }),
        {
            name: 'auth-storage',
            skipHydration: false,
            onRehydrateStorage: () => (state) => {
                state?.checkAuth();
            },
        }
    )
);
