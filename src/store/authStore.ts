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
    permissions: string[]; // array com os códigos das permissões
    setpermissions: (permissions: string[]) => void;
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

// Função para obter o token do cookie
const getTokenFromCookie = () => {
    if (typeof document === 'undefined') return null; // Garante que só roda no lado do cliente
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? match[2] : null;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            rememberMe: false, // Adicionado de volta
            hydrated: false,
            setUser: (user) => set({ user }),
            perfis: [],
            permissions: [],
            setpermissions: (permissions) => set({ permissions }),
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
            login: async (username: string, password: string) => {
                set({ loading: true, error: null });
                try {
                    const { user, perfis, access, refresh } = await authService.login(username, password);

                    set({
                        user,
                        token: access,
                        refreshToken: refresh,
                        isAuthenticated: true,
                        loading: false,
                        perfis,
                        permissions: user.permissoes || [],
                    });

                    // Salva o token no cookie para o middleware do Axios
                    // Adicionei o `SameSite=Lax` para melhor compatibilidade e segurança
                    document.cookie = `token=${access}; path=/; max-age=3600; SameSite=Lax`;

                    // Se você ainda usa localStorage para algo (como o refresh token para re-login silencioso), mantenha:
                    localStorage.setItem('authToken', access);
                    localStorage.setItem('refreshToken', refresh);


                    notification.open({
                        message: `Bem-vindo, ${user.first_name || user.username}!`,
                        description: 'Você está logado com sucesso.',
                        duration: 2,
                    });
                } catch (error: any) {
                    const title = error?.title || 'Erro ao fazer login';
                    const detail = error?.detail || 'Tente novamente mais tarde';

                    set({
                        isAuthenticated: false,
                        loading: false,
                        error: detail,
                    });

                    notification.error({
                        message: title,
                        description: detail,
                    });
                    throw error; // Propaga o erro para que o componente chamador possa tratá-lo
                }
            },

            clearAuth: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                });
                // Remove o token do cookie
                document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';
                // Remove do localStorage também
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
            },
            register: async (userData) => {
                set({ loading: true, error: null });

                const { email, password } = userData;

                if (!isValidEmail(email)) {
                    set({ loading: false, error: 'Email inválido ou de domínio não permitido.' });
                    notification.error({
                        message: 'Erro no cadastro',
                        description: 'Email inválido ou de domínio não permitido.',
                    });
                    return;
                }

                if (!isStrongPassword(password)) {
                    set({ loading: false, error: 'Senha fraca. Use letras, números e símbolos com no mínimo 6 caracteres.' });
                    notification.error({
                        message: 'Erro no cadastro',
                        description: 'Senha fraca. Use letras, números e símbolos com no mínimo 6 caracteres.',
                    });
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
                    notification.error({
                        message: 'Erro no cadastro',
                        description: error.message || errorMessages.registrationFailed,
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
                    // Garante que o estado é limpo, mesmo se o logout da API falhar
                    get().clearAuth(); // Chama a função clearAuth para limpar tudo
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
                // Tenta obter o token do cookie
                const token = getTokenFromCookie();

                // Se não houver token no cookie, limpa o estado e sai
                if (!token) {
                    set({
                        token: null,
                        user: null,
                        isAuthenticated: false,
                        loading: false,
                        permissions: [],
                    });
                    return;
                }

                set({ loading: true });
                try {
                    // Tenta verificar o token com o serviço de autenticação
                    const response = await authService.checkAuth(token); // Passa o token para checkAuth
                    set((state) => ({
                        user: response.user,
                        isAuthenticated: true,
                        token: token, // Mantém o token que foi encontrado no cookie
                        loading: false,
                        rememberMe: state.rememberMe, // Mantém o estado de rememberMe
                        // CORREÇÃO: Mapeia IPermissao[] para string[]
                        permissions: (response.user.permissoes || []).map(p => p.code), // Assumindo que IPermissao tem uma propriedade 'code'
                    }));
                } catch (err) {
                    // Se a verificação falhar (token inválido/expirado), limpa o estado
                    set({
                        token: null,
                        user: null,
                        isAuthenticated: false,
                        loading: false,
                        permissions: [],
                    });
                    // Opcional: remover o cookie inválido aqui também
                    document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';
                } finally {
                    set({ hydrated: true }); // Marca como hidratado após a tentativa de autenticação
                }
            }
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: (state) => {
                return () => {
                    const store = state as unknown as { getState: () => AuthState };
                    store.getState().checkAuth();
                };
            },
        }
    )
);
