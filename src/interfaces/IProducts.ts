
export interface IProduto {
    id: number;
    tenant: string;
    nome: string;
    descricao: string | null;
    preco: string;
    categoria: string;
    categoria_id: number;
    sku: string | null;
    ativo: boolean;
    estoque: number;
    unidade_medida: string | null;
    peso: string | null;
    volume: string | null;
    created_at: string;
    updated_at: string;
    created_by: {
        id: string;
    } | null;
    updated_by: {
        id: string;
    } | null;
}