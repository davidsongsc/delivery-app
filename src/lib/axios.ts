// src/lib/axios.ts
import axios from 'axios'
import { useAuthStore } from '@/store/authStore'
import { notification } from 'antd'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
            notification.warning({
                message: 'Sessão expirada',
                description: 'Faça login novamente para continuar.',
            })
        } else {
            // Erro genérico
            notification.error({
                message: 'Erro ao processar',
                description: error.response?.data?.message || 'Algo deu errado.',
            })
        }

        return Promise.reject(error)
    }
)

export default api
