// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/authService';
import { notification } from 'antd';
import { User } from '@/types/User';
import { CorporationForm } from './CorporationRegisterForm';
import { corporationService } from '@/services/corporationService';
import { isStrongPassword, isValidEmail } from '@/utils/login';

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
    setUser: (user: User | null) => void;
    hydrated: boolean;
    setHydrated: () => void;
    refreshToken: string | null;
    setRefreshToken: (token: string | null) => void;
    registerCorporation: (data: CorporationForm) => Promise<void>;
    corporationLoading: boolean;
    corporationError: string | null;
}


const errorMessages = {
    loginFailed: 'Falha no login',
    registrationFailed: 'Falha no cadastro',
    emailVerificationFailed: 'Falha na verificação de e-mail',
    logoutFailed: 'Falha no logout',
    unknownError: 'Ocorreu um erro inesperado',
};


export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            hydrated: false,
            setUser: (user) => set({ user }),
            setHydrated: () => set({ hydrated: true }),
            setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            setToken: (token) => set({ token }),
            setRefreshToken: (token) => set({ refreshToken: token }),
            refreshToken: null,
            corporationLoading: false,
            corporationError: null,
            registerCorporation: async (data) => {
                set({ corporationLoading: true, corporationError: null });
                try {
                    await corporationService.registerCorporation(data);
                    notification.success({
                        message: 'Empresa cadastrada com sucesso!',
                    });
                    set({ corporationLoading: false });
                } catch (error: any) {
                    set({
                        corporationLoading: false,
                        corporationError: error.response?.data?.detail || error.message || 'Erro desconhecido',
                    });
                    notification.error({
                        message: 'Erro ao cadastrar empresa',
                        description: error.response?.data?.detail || error.message || 'Tente novamente mais tarde',
                    });
                    throw error;
                }
            },
            login: async (username, password) => {
                set({ loading: true, error: null });
                try {
                    const { user, access, refresh } = await authService.login(username, password);

                    set({
                        user,
                        token: access,
                        isAuthenticated: true,
                        loading: false,
                    });

                    // ⚠️ Se você estiver usando cookies HttpOnly no backend, esse cookie não precisa ser salvo aqui
                    document.cookie = `token=${access}; path=/; max-age=3600; SameSite=Lax`;

                    notification.success({
                        message: 'Login realizado com sucesso',
                    });

                } catch (error: any) {
                    set({
                        isAuthenticated: false,
                        loading: false,
                    });
                    notification.error({
                        message: 'Erro ao fazer login',
                        description: error?.response?.data?.detail || error.message,
                    });
                    throw error;
                }
            },
            clearAuth: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                });
                document.cookie = 'token=; path=/; max-age=0';
            },
            register: async (userData) => {
                set({ loading: true, error: null });

                const { email, password } = userData;

                // Validações manuais antes de enviar
                if (!isValidEmail(email)) {
                    set({ loading: false, error: 'Email inválido ou de domínio não permitido.' });
                    return;
                }

                if (!isStrongPassword(password)) {
                    set({ loading: false, error: 'Senha fraca. Use letras, números e símbolos com no mínimo 6 caracteres.' });
                    return;
                }

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
                    document.cookie = 'token=; path=/; max-age=0';

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
                set({ loading: true });

                try {
                    // authService.checkAuth não recebe token, pois o cookie já é enviado automaticamente via withCredentials
                    const { user } = await authService.checkAuth();

                    set({
                        user,
                        token: null, // você pode remover ou manter o token, mas idealmente você não gerencia token no front
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
            name: 'auth-storage', // chave no localStorage
            // pode adicionar onRehydrateStorage etc.
        }
    )
);
