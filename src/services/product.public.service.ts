import apiClient from './apiClient'; // Certifique-se de que apiClient está configurado corretamente
import { IProduto } from '@/interfaces/IProducts'; // Assumindo que IProduto está aqui

// --- NOVAS INTERFACES ---

// Interface para os parâmetros de query da função getAllProducts
interface ProdutosPublicosQueryParams {
    tenant: string; // O ID do tenant é agora obrigatório
    page?: number;
    per_page?: number;
    category_name?: string; // Para buscar produtos de uma categoria específica
    search?: string;
    order_by?: string;
    order_type?: 'ASC' | 'DESC';
}

// Interface para a estrutura do objeto 'products' dentro da resposta de produtos
interface ProdutoPublicoResult {
    result: IProduto[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
    has_more: boolean; // Flag crucial para o frontend
}

// Interface completa da resposta da API para a listagem de produtos
interface ProdutoPublicoGetAllResponse {
    products: ProdutoPublicoResult;
    status: string;
    message: string;
}

// Interface para um objeto de Categoria (como retornado pela API)
interface ICategoria {
    id: string;
    nome: string;
    ativo: boolean;
    parent: string | null;
    tipo: string;
    subcategorias: any[]; // Pode ser mais específico se souber a estrutura
}

// Interface para a estrutura do objeto 'categories' dentro da resposta da API de categorias
interface CategoriaPublicoResult {
    result: ICategoria[];
    total: number;
}

// Interface completa da resposta da API para a listagem de categorias
interface CategoriaPublicoGetAllResponse {
    categories: CategoriaPublicoResult;
    status: string;
    message: string;
}

// --- FUNÇÕES DE SERVIÇO ATUALIZADAS ---

const getAllProducts = (params: ProdutosPublicosQueryParams) => {
    const queryString = new URLSearchParams(
        params as Record<string, string | number>
    ).toString();
    return apiClient.get<ProdutoPublicoGetAllResponse>(`/api/public/produtos/?${queryString}`);
};

const getProductById = (id: string) =>
    apiClient.get<IProduto>(`/api/public/produtos/${id}/`);

// NOVA FUNÇÃO: Para obter todas as categorias de um tenant
const getAllCategories = (tenantId: string) => {
    const queryString = new URLSearchParams({ tenant: tenantId }).toString();
    return apiClient.get<CategoriaPublicoGetAllResponse>(`/api/public/categorias/?${queryString}`);
};

export const produtosPublicosService = {
    getAllProducts,
    getProductById,
    getAllCategories, 
};

