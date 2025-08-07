import axios from 'axios';
function parseApiError(error: any) {
    if (axios.isAxiosError(error) && error.response) {
        return {
            title: error.response.data?.title || 'Erro',
            detail: error.response.data?.detail || 'Erro desconhecido',
            status: error.response.status,
        };
    }
    return {
        title: 'Erro de rede',
        detail: 'Não foi possível conectar ao servidor.',
        status: 500,
    };
}

export default parseApiError;