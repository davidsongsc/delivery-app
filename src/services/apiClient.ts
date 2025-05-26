import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    timeout: 30000, 
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        // Manipula respostas bem-sucedidas
        return response;
    },
    (error) => {
        // Manipula erros globais
        if (error.response?.status === 401) {
            console.error('Sessão expirada ou não autorizada');
            // Redireciona para a página de login, se necessário
        }
        return Promise.reject(error);
    }
);

export default apiClient;