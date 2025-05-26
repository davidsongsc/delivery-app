import apiClient from '@/services/apiClient';
interface LoginData {
    username: string;
    password: string;
}
const loginUser = async ({ username, password }: LoginData) => apiClient.post('/usuarios/login/', { username, password });


export const loginService = { loginUser };