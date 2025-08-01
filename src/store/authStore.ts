// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/authService';
import { notification } from 'antd';
import { CorporationForm } from './CorporationRegisterForm';
import { corporationService } from '@/services/corporationService';
import { isStrongPassword, isValidEmail } from '@/utils/login';
import { IUser } from '@/interfaces/IUser';
import { IPerfil } from '@/interfaces/IPerfil';

export interface AuthState {
    token: string | null;
    user: IUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    access_level?: any;
    rememberMe?: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    verifyEmail: (token: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    setToken: (token: string | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: IUser | null) => void;
    perfis: IPerfil[];
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
            rememberMe: false,
            hydrated: false,
            setUser: (user) => set({ user }),
            perfis: [],
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
            login: async (username: string, password: string, rememberMe: boolean) => {
                set({ loading: true, error: null });
                try {
                    // Passar rememberMe para o backend
                    const { user, access, refresh, access_level } = await authService.login(username, password, rememberMe);

                    // Salvar token dependendo do rememberMe
                    if (rememberMe) {
                        localStorage.setItem('accessToken', access);
                        localStorage.setItem('refreshToken', refresh);
                    } else {
                        sessionStorage.setItem('accessToken', access);
                        sessionStorage.setItem('refreshToken', refresh);
                    }

                    set({
                        user,
                        token: access,
                        refreshToken: refresh,
                        isAuthenticated: true,
                        loading: false,
                        access_level,
                        rememberMe,
                    });

                    notification.info({
                        message: `Bem-vindo, ${user.first_name || user.username}!`,
                        description: 'Você está logado com sucesso.',
                        duration: 10,
                        placement: 'bottomRight',
                    });
                } catch (error: any) {
                    // Pega título e detalhe da resposta de erro, se houver
                    const title = error?.response?.data?.title || 'Erro ao fazer login';
                    const detail = error?.response?.data?.detail || 'Tente novamente mais tarde';

                    set({
                        isAuthenticated: false,
                        loading: false,
                        error: detail,
                    });

                    notification.error({
                        message: title,
                        description: detail,
                        placement: 'bottomRight',
                    });
                }
            },



            clearAuth: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                });
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
                } finally {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    sessionStorage.removeItem('accessToken');
                    sessionStorage.removeItem('refreshToken');

                    set({
                        token: null,
                        refreshToken: null,
                        user: null,
                        isAuthenticated: false,
                        loading: false,
                        rememberMe: false,
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
                    const response = await authService.checkAuth();
                    console.log('checkAuth -> response.user:', response.user); // <== veja o que vem aqui

                    set({
                        user: response.user,
                        token: null,
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

        }
    )
);
